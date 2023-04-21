/// <reference types='Cypress' />
const env = Cypress.env();

describe('Admin: Running tests on the dsahboard (orders) page', { testIsolation: false }, () => {
    before(() => {
        // Clear saved sessions and login as admin
        Cypress.session.clearAllSavedSessions()
        cy.adminLoginUI()
    });


    describe('Test sales orders', () => {
        it('Should create a new order', () => {
            // Intercept the API request that fetchs orders
            cy.intercept(env.baseUrlAPI + 'orders/dashboard*').as('fetchRequest')

            // Create a new order
            cy.createSales().then((uuid) => {
                // Navigate to today's orders on the dashboard
                cy.get('.page-header span').contains('Today').click();

                // Wait for the intercepted request to complete and check the response status code
                cy.wait('@fetchRequest').its('response.statusCode').should('eq', 200)

                // Check if the new order's ID is displayed in the orders table
                cy.get('td').should('include.text', uuid);
            })
        });
    });
});