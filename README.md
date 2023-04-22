
# PetShop E2E Tests with Cypress

This repository contains end-to-end (E2E) tests for the PetShop web application using Cypress. 

## Getting Started

To get started, clone this repository:

```
git clone https://github.com/sagerlawgeli/petshop_e2e_cy.git
```

Then, install the necessary dependencies using `npm`:

```
npm install
```

## Configuration

To configure each environment, go to the `cypress/config` directory. Inside this folder, you'll find the configuration options, including examples that you can modify, environment variables, and other settings for each environment.


## Running Tests

To run the tests, you'll need to specify the enviorment and use the following commands:

* Admin Dashboard (E2E)

```
npm run cy:admin-e2e name=<enviorment>
```

Remember, you'll first need to setup enviorment variables such as admin credntials inside `cypress/config` 
