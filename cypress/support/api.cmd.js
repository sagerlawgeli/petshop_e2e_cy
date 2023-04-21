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

// Create a new customer user
function userCreateAPI() {

    const uniqueData = generateUniqueData();

    return cy.request({
        method: 'POST',
        url: env.baseUrlAPI + 'user/create',
        form: true,
        body: {
            first_name: uniqueData.firstName,
            last_name: uniqueData.lastName,
            email: uniqueData.email,
            password: 'petshop2023',
            password_confirmation: 'petshop2023',
            address: '34 John St',
            phone_number: '092515111',
            is_marketing: 1
        }
    }).then((response) => {
        return response.body.data
        // cy.setCookie('auth', response.body.data.token);
        // localStorage.setItem("token", response.body.data.token);
        // expect(response.status).to.eq(200);
    });
};

module.exports = {
    adminLoginAPI,
    userCreateAPI
};