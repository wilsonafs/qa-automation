const el = require('./elements').ELEMENTS

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Cypress.Commands.add('validateFieldsCart', () => {
    cy.get(el.cartItems).should('be.visible').and('have.length', 2)
  
    let total = 0
  
    cy.get(el.cartItems).each(($row) => {
      const tdValue = $row.find('td').eq(2).text()
      const numValue = parseInt(tdValue.trim())
      total += numValue
    }).then(() => {
      cy.wrap(total).as('cartTotal') // Usar cy.wrap para armazenar o valor do total
    })
  })

Cypress.Commands.add('placeOrder', () => {
    cy.get(el.placeOrderbtn).click()
})

Cypress.Commands.add('validateModalPlaceOrder', () => {
    cy.get(el.modalPlaceOrder).should('be.visible')
    cy.get(el.placeOrderName).should('be.visible')
    cy.get(el.placeOrderCountry).should('be.visible')
    cy.get(el.placeOrderCity).should('be.visible')
    cy.get(el.placeOrderCard).should('be.visible')
    cy.get(el.placeOrderMonth).should('be.visible')
    cy.get(el.placeOrderYear).should('be.visible')
})

Cypress.Commands.add('fillPlaceOrder', (name, country, city, card, month, year) => {
    cy.get(el.placeOrderName).type(name)
    cy.get(el.placeOrderCountry).type(country)
    cy.get(el.placeOrderCity).type(city)
    cy.get(el.placeOrderCard).type(card)
    cy.get(el.placeOrderMonth).type(month)
    cy.get(el.placeOrderYear).type(year)
})

Cypress.Commands.add('purchaseButton', () => {
    cy.get(el.placeOrderBtns).eq(1).click()
})

Cypress.Commands.add('validateFinishingPurchase', () => {
    cy.intercept('POST', 'https://api.demoblaze.com/deletecart').as('deleteCart')
    cy.wait('@deleteCart').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
    })
})

Cypress.Commands.add('sucessModal', () => {
    cy.get(el.successModal).should('be.visible')
    cy.get(el.successMessage).should('be.visible')

    cy.get('@cartTotal').then((total) => {
        cy.get('p.lead').then(($p) => {
            cy.validateFieldsCart().then((total) => {
                const textoParagrafo = $p.text()

                const amountRegex = /Amount: (\d+) USD/
                const cardNumberRegex = /Card Number: (\d+)/
            
                const amountMatch = textoParagrafo.match(amountRegex)
                const cardNumberMatch = textoParagrafo.match(cardNumberRegex)

                expect(amountMatch).to.have.lengthOf(2)
                expect(parseInt(amountMatch[1])).to.equal(total)
                expect(cardNumberMatch[1]).to.equal('4111111111111')
            })
        })
    })
   
})