// Import API & UI commands
import * as apiCmd from './api.cmd.js';
import * as uiCmd from './ui.cmd.js';

// Authentication

Cypress.Commands.add('adminLoginAPI', () => {
    Cypress.log({ name: 'adminLoginAPI' });

    return apiCmd.adminLoginAPI();
});

Cypress.Commands.add('adminLoginUI', () => {
    Cypress.log({ name: 'adminLoginUI' });

    return uiCmd.adminLoginUI();
});


// Locator 
Cypress.Commands.add('getInput', (modal, labelText) => {
    Cypress.log({ name: 'getInput' });

    return uiCmd.getInput(modal, labelText);
});

// Locate elements via test id
Cypress.Commands.add('getByTestId', (testId) => {
    return cy.get(`[data-testid="${testId}"]`);
});

// Fillers
Cypress.Commands.add('fillField', (parent, field, value) => { // Finds a field based on text of its label 
    cy.get(parent)
        .find('label')
        .contains(field, { matchCase: false })
        .next('input')
        .clear()
        .type(value)
});

// Creates a new entity
Cypress.Commands.add('createNewEntity', (entityType, entityData) => {
    Cypress.log({ name: 'createNewEntity' });

    return uiCmd.createNewEntity({ entityType, entityData });
});

Cypress.Commands.add('userCreateAPI', () => {
    Cypress.log({ name: 'userCreateAPI' });

    return apiCmd.userCreateAPI();
});


// Filters
Cypress.Commands.add('filterControls', (action) => {
    Cypress.log({ name: 'filterControls' });

    return uiCmd.filterControls(action);
});

Cypress.Commands.add('filterTable', (filterValues) => {
    Cypress.log({ name: 'filterTable' });

    return uiCmd.filterTable(filterValues);
});