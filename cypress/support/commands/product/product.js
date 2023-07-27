const el = require('./elements').ELEMENTS

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Cypress.Commands.add('validateFieldsProduct', () => {
    cy.get(el.productContent).should('be.visible')
    cy.get(el.productImage).should('be.visible')
    cy.get(el.productName).should('be.visible')
    cy.get(el.productPrice).should('be.visible')
    cy.get(el.productInfo).should('be.visible')
    cy.get(el.addToCartBtn).should('be.visible')
})

Cypress.Commands.add('addToCart', () => {
    cy.get(el.addToCartBtn).click()
    cy.intercept('POST', 'https://api.demoblaze.com/addtocart').as('addToCart')
    cy.wait('@addToCart').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
    })
})


