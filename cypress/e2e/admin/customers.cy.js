// This tests the functionality of the Customers page on the admin dashboard.
// It ensures that customers can be viewed, created, updated, and deleted successfully. 

/// <reference types='Cypress' />
const env = Cypress.env();
import { generateUniqueData } from '/cypress/support/utils';

describe('Customers Page', { testIsolation: false }, () => {
    before(() => {
        // Clear saved sessions and login as admin
        Cypress.session.clearAllSavedSessions()
        cy.adminLoginUI()

        // Navigate to customers page
        cy.get('a[href="/dashboard/customers"]').click();
        cy.get('.breadcrumb__title').contains('dashboard-customers').should('be.visible');
    });


    describe('Create, update & delete custoemrs', () => {
        it('Should create a new customer', () => {
            // Open the create modal
            cy.get('button > span').contains('new customer').should('be.visible').click();

            // Load customer data from a fixture
            cy.fixture('customer.json').then(data => {
                // Generate a unique email using the 'generateUniqueData' utility function
                const uniqueData = generateUniqueData();
                const email = uniqueData.email;

                // Use spread operator to create a new customer object with updated unique email
                const customerData = { ...data.customer1, email: email };

                // 'createNewEntity' command expects 2 properties (entityType, EntityData)
                cy.createNewEntity('customer', customerData);

                // Assert that the newly created customer email is displayed on the page
                cy.contains(email);
            });
        });

        it('Should update an existing customer', () => {
            cy.intercept('PUT', env.baseUrlAPI + 'admin/user-edit/*').as('updateRequest')

            // select the delete button for the first row and click it
            cy.get('.customers__action-btn').first().click();
            cy.get('.customers__action-btn').find('.mdi-pencil').click();

            // Edit a field
            cy.fillField('.customer-card', 'password', 'petshop2023')
            cy.fillField('.customer-card', 'confirm password', 'petshop2023')
            cy.get(`.customer-card button`).click({ force: true });

            cy.wait('@updateRequest').its('response.statusCode').should('eq', 200)
            // Close create modal
            cy.get('.mdi-close').should('be.visible').click();
        });

        it('Should delete a customer', () => {
            cy.intercept('DELETE', env.baseUrlAPI + 'admin/user-delete/*').as('deleteRequest')

            cy.get('table tr:visible').its('length').then((initialRowCount) => {+
                // do something with the initial row count, such as log it to the console
                console.log(`Initial row count: ${initialRowCount}`);

                // select the delete button for the first row and click it
                cy.get('.customers__action-btn').first().click();
                cy.get('.customers__action-btn').find('.mdi-delete').click();
                cy.get('.v-card').should('be.visible').find('span').contains('delete', { matchCase: false }).click();

                cy.wait('@deleteRequest').its('response.statusCode').should('eq', 200)
                // select all visible tr elements again and assert that there is one fewer than before
                cy.get('table tr:visible').its('length').should('eq', initialRowCount - 1);
            });
        });
    });
});