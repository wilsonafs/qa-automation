describe('Validate the category left menu', () => {
    beforeEach(()=> {
        cy.homeUrl()
        cy.validateFields()
    })
    it('Validate that main category level page contains all items from subcategories', () => {
        cy.validateFieldsContent()
        cy.get('a#itemc').each(($link) => {
            let quantityCards
      
            cy.wrap($link).click()
            cy.get('.col-lg-4.col-md-6.mb-4 .card', { timeout: 10000 }).should('have.length.gt', 0)
            cy.get('.col-lg-4.col-md-6.mb-4 .card').then(($cards) => {
              quantityCards = $cards.length
              expect(quantityCards).to.be.greaterThan(0)
            })
        })
    })
})