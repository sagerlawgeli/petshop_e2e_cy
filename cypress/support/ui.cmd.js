// Grab the environment variables
const env = Cypress.env();

// Admin Login - Returns the auth token
function adminLoginUI() {
    cy.session(env.adminUser, () => {
        cy.visit(env.baseUrl + 'login')
        cy.get("#input-0").type(env.adminUser)
        cy.get("#input-2").type(env.adminPassword)
        cy.get('button').click()
        cy.url().should("include", "/dashboard");
    });

    // Wait for the admin dashboard to load
    cy.contains("Monthly sales")
};

module.exports = {
    adminLoginUI,
};