/// <reference types='Cypress' />
const env = Cypress.env();

describe('Admin: Running tests on the Products page', { testIsolation: false }, () => {
    let token;
    before(() => {
        // Clear saved sessions and login as admin
        Cypress.session.clearAllSavedSessions()
        cy.adminLoginUI()

        // Navigate to products page
        cy.get('a[href="/dashboard/products"]').click()

        cy.get('.breadcrumb__title').contains('dashboard-products').should('be.visible');
    })

    describe('View and filter through products data', () => {
        it('Should be able to render prodcuts records', () => {
            cy.get('table').should('be.visible');
            cy.get('tbody > tr').should('be.visible');
        });

        it('Should filter prodcuts by name', () => {
            // Define the filter values
            const filterValues = {
                title: 'Purina',
                //category: 'cat litter'
            };

            // Call the 'filterTable' command with the filter values object
            // This will apply the email filter to the customer table
            cy.filterTable(filterValues);
        });
    });

    describe('Create, update & delete prodcuts', () => {

        it('Should create a new product', () => { // PLEASE NOTE: This is not working at the moment. please see bug #0002 for more details
            cy.get('button > span').contains('new product').should('be.visible').click();
            // Load product data from a fixture
            cy.fixture('product.json').then(data => {

                // 'createNewEntity' command expects 2 properties (entityType, EntityData)
                cy.createNewEntity('product', data);

                // Assert that the newly created product is listed on the page
                // PLEASE NOTE: This is not working at the moment. please see bug #0002 for more details
            });
        });

        it('Should update an existing product', () => {
            cy.intercept('PUT', env.baseUrlAPI + 'product/*').as('updateRequest')

            // select the delete button for the first row and click it
            cy.get('.products__action-btn').first().click();
            cy.get('.products__action-btn').find('.mdi-pencil').click();

            cy.getInput('.product-card', 'Description').clear({ force: true }).type('some text');

            cy.get('button.bg-primary:nth-child(1)').click({ force: true });

            cy.wait('@updateRequest').its('response.statusCode').should('eq', 200)
            // Close create modal
            cy.get('.mdi-close').should('be.visible').click();
        });

        it('Should delete a product', () => {
            // Let get the product details
            cy.get('table tr:visible').its('length').then((initialRowCount) => {
                // do something with the initial row count, such as log it to the console
                console.log(`Initial row count: ${initialRowCount}`);

                // select the delete button for the first row and click it
                cy.get('.products__action-btn').first().click();
                cy.get('.products__action-btn').find('.mdi-delete').click();
                cy.get('.v-card').should('be.visible').find('span').contains('delete', { matchCase: false }).click();

                cy.get('table tr:visible').its('length').should('eq', initialRowCount - 1);
            });
        });
    });
});
