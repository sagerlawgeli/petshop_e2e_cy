// Grab the environment variables
const env = Cypress.env();


// Admin Login - Returns the auth token
function adminLoginAPI() {
    return cy.session(env.adminUser, () => {
        cy.request({
            method: 'POST',
            url: env.baseUrlAPI + 'admin/login',
            form: true,
            body: {
                email: env.adminUser,
                password: env.adminPassword,
            }
        }).then((response) => {
            return response.body.data.token;
            // cy.setCookie('auth', response.body.data.token);
            // localStorage.setItem("token", response.body.data.token);
            // expect(response.status).to.eq(200);
        });
    }); //Session End
};

module.exports = {
    adminLoginAPI,
};