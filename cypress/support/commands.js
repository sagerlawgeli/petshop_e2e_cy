// Import API & UI commands
import * as apiCmd from './api.cmd.js';
import * as uiCmd from './api.cmd.js';

// Authentication

Cypress.Commands.add('adminLoginAPI', () => {
    Cypress.log({ name: 'adminLoginAPI' });

    return apiCmd.adminLoginAPI();
});

Cypress.Commands.add('adminLoginUI', () => {
    Cypress.log({ name: 'adminLoginUI' });

    return uiCmd.adminLoginUI();
});

Cypress.Commands.add('getInput', (modal, labelText) => {
    Cypress.log({ name: 'getInput' });

    return uiCmd.getInput(modal, labelText);
});
