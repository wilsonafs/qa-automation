const el = require('./elements').ELEMENTS

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Cypress.Commands.add('validateFieldsContent', () => {
    cy.get(el.listGroup).should('be.visible')
    cy.get(el.cards).should('be.visible')
})

Cypress.Commands.add('clickPhones', () => {
    cy.get(el.listMenuItem).eq(0).click()
    cy.intercept('POST', 'https://api.demoblaze.com/bycat').as('listPhones')
    cy.wait('@listPhones').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
    })
})

Cypress.Commands.add('clickCardPhone', () => {
    cy.get(el.card).eq(0).click()
})

Cypress.Commands.add('clickNextCardPhone', () => {
    cy.get(el.card).eq(2).click()
})
