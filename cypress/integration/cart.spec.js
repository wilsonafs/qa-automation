describe('Validate the cart page', () => {
    beforeEach(()=> {
        const username = `${Date.now()}`

        cy.homeUrl()
        cy.validateFields()
        cy.clickSignup()
        cy.validateSignUpModal()
        cy.fillUser(username, 'test123')
        cy.submitUser()
        cy.checkSubmitApi()
        cy.reload()
        cy.clickLogin()
        cy.validateLoginModal()
        cy.loginUser(username, 'test123')
        cy.clickLoginModal()
        cy.validadeLoggedUser()
        cy.reload()
    })
    it('Add to cart and place order', () => {
        cy.validateFieldsContent()
        cy.clickPhones()
        cy.clickCardPhone()
        cy.validateFieldsProduct()
        cy.addToCart()
        cy.clickHome()
        cy.clickPhones()
        cy.clickNextCardPhone()
        cy.addToCart()
        cy.clickCart()
        cy.validateFieldsCart()
        cy.placeOrder()
        cy.validateModalPlaceOrder()
        cy.fillPlaceOrder('Wilson', 'Brazil', 'São Paulo', '4111111111111', '09', '25')
        cy.purchaseButton()
        cy.validateFinishingPurchase()
        cy.sucessModal()
    })
})