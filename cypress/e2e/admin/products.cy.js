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
});
