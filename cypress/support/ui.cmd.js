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

// Use to locate input elements
function getInput(modal, labelText) {
    cy.contains(`${modal} .v-field__field label`, labelText, { matchCase: false })
        .then(($label) => {
            const inputId = $label.attr('for');
            cy.get(`#${inputId}`).should('exist');
        });
};

// Creates a customer or a product
function createNewEntity({ entityType, entityData }) {
    // Customize the API endpoint and parent selector based on the entity type
    let endpoint;
    let modal;
    switch (entityType) {
        case 'customer':
            endpoint = 'admin/create';
            modal = '.customer-card'
            break;
        case 'product':
            endpoint = 'product/create';
            modal = '.product-card'
            break;
        default:
            throw new Error(`Invalid entity type: ${entityType}`);
    }

    // Intercept the create request
    cy.intercept('POST', env.baseUrlAPI + endpoint).as('createRequest');


    // If the entity is a product, then we want to upload a product image
    if (entityType == 'product') {
        // Load a test image file
        cy.fixture('product-img.jpg', { encoding: null }).as('img')

        // Locate the file input element and attach the file to it
        cy.get('#product-card__image-input').selectFile('@img', { force: true });
    };

    // Fill in the form fields based on the entity data
    Object.entries(entityData).forEach(([labelText, value]) => {

        // if the element is readonly and intended for item selection, then select instead of cy.type
        cy.getInput(modal, labelText).then((el) => {
            if (el.prop('readonly')) {
                cy.get(el).click({ force: true });
                cy.wait(50)
                cy.get('.v-overlay__content > .v-list > .v-list-item:nth-child(2) > .v-list-item__content > .v-list-item-title').click()
            } else {
                cy.get(el).type(value)
            }
        });
    });
    cy.get('button.v-btn--elevated:nth-child(1)').click({ force: true }); // Should figure a better selector

    // Close the create modal and wait for the request to complete
    cy.get('.mdi-close').click();
    cy.wait('@createRequest').its('response.statusCode').should('eq', 200, `A new ${entityType} has been created successfully`);

};

// Toggles filter controls on tables showing records - takes 'reset' as an argument to clear filters
function filterControls(action) {
    // Click filters controls button to show/hide the filters controls
    cy.getByTestId('filters-control').find('i').should('be.visible').click();
    if (action == "reset") {
        // Reset results & hide controls
        cy.getByTestId('table-filter-reset').should('be.visible').click();
        cy.getByTestId('filters-control').find('i').should('be.visible').click();
    }
};

module.exports = {
    adminLoginUI,
    getInput,
    createNewEntity,
    filterControls
};