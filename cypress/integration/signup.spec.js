describe('Validate the home page from Demoblaze store', () => {

    beforeEach(() => {
        cy.homeUrl()
        cy.reload()
        cy.validateFields()
    })

    it('Signup as new user', () => {
        const username = `${Date.now()}`

        cy.clickSignup()
        cy.validateSignUpModal()
        cy.fillUser(username, 'test123')
        cy.submitUser()
        cy.checkSubmitApi()
    })
    it('Trying to submit with the same user', () => {
        const username = `${Date.now()}`
        
        cy.clickSignup()
        cy.validateSignUpModal()
        cy.fillUser(username, 'test123')
        cy.submitUser()
        cy.checkSubmitApi()

        cy.reload()
        cy.clickSignup()
        cy.fillUser(username, 'test123')
        cy.submitUser()
        cy.errorMessage()
    })
    it('Login with valid user', () => {
        const username = `${Date.now()}`

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
    })
    it('Logout', () => {
        const username = `${Date.now()}`

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
        cy.logoutUser()
    })
    it('Trying to login with invalid user', () => {
        const username = `${Date.now()}`

        cy.clickLogin()
        cy.validateLoginModal()
        cy.loginUser(username, 'test123')
        cy.clickLoginModal()
        cy.errorMessageLogin()
    })
})