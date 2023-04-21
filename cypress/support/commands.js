// Import API commands
import * as apiCmd from './api.cmd.js';

// Authentication

Cypress.Commands.add('adminLoginAPI', () => {
    Cypress.log({ name: 'adminLoginAPI' });

    return apiCmd.adminLoginAPI();
});