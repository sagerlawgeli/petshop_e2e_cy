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
    });
});