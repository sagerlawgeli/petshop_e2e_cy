// Grab the environment variables
const env = Cypress.env();
// Import utils function for controlled-unique data generation
import { generateUniqueData } from '/cypress/support/utils';


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

// Sales
function getProductUUID() {
    return cy.request({
        method: 'GET',
        url: env.baseUrlAPI + 'products',
    }).then((productsResponse) => {
        return productsResponse.body.data[0].uuid;
    });
};

function getOrderStatusUUID() {
    return cy.request({
        method: 'GET',
        url: env.baseUrlAPI + 'order-statuses',
    }).then((statusResponse) => {
        const data = statusResponse.body.data;
        let orderStatusUUID = '';
        data.forEach((status) => {
            if (status.title == 'pending payment') {
                orderStatusUUID = status.uuid;
            }
        });
        return orderStatusUUID;
    });
};

function createPayment(token) {
    return cy.request({
        method: 'POST',
        url: env.baseUrlAPI + 'payment/create',
        auth: {
            'bearer': token
        },
        body: {
            "type": "cash_on_delivery",
            "details": {
                "text": "Cash on delivery",
                "firstName": "Brooke",
                "lastName": "O'Keefe",
                "addressLine1": "9710 Sherwood Prairie",
                "consent": true
            }
        }
    }).then((paymentResponse) => {
        return paymentResponse.body.data.uuid;
    });
};

function createOrder(productUUID, orderStatusUUID, paymentUUID, token) {
    const products = {
        uuid: productUUID,
        quantity: 1
    };

    const address = {
        billing: 'string',
        shipping: 'string'
    };

    return cy.request({
        method: 'POST',
        url: env.baseUrlAPI + 'order/create',
        headers: {
            'Authorization': token,
        },
        form: true,
        body: {
            products: JSON.stringify(products),
            order_status_uuid: orderStatusUUID,
            payment_uuid: paymentUUID,
            address: JSON.stringify(address),
        }
    });
};

function createSales() {
    let productUUID;
    let orderStatusUUID;
    let paymentUUID;
    let token;

    // cy.adminLoginAPI()
    // cy.getCookie('auth').then((cookie) => {
    //     token = cookie.value;
    // });

    cy.userCreateAPI().then((response) => {
        token = response.token;
        cy.log(response.token);
    });


    cy.getProductUUID().then((uuid) => {
        productUUID = uuid;
        return cy.getOrderStatusUUID();
    }).then((uuid) => {
        orderStatusUUID = uuid;
        return cy.createPayment(token);
    }).then((uuid) => {
        paymentUUID = uuid;
        return cy.createOrder({ productUUID, orderStatusUUID, paymentUUID, token });
    }).then((response) => {
        // Handle response here
        // cy.log(response.body.data.uuid);
        return response.body.data.uuid;
    });
};

module.exports = {
    adminLoginAPI,
    userCreateAPI,
    getProductUUID,
    getOrderStatusUUID,
    createPayment,
    createOrder,
    createSales
};