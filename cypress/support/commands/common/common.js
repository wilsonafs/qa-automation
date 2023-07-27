const el = require('./elements').ELEMENTS

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Cypress.Commands.add('homeUrl', () => {
    cy.visit('https://www.demoblaze.com/', {"failOnStatusCode": false})
})

Cypress.Commands.add('validateFields', () => {
    cy.get(el.navBar).should('be.visible')
    cy.get(el.navBrand).should('be.visible')
    cy.get(el.menuListItem).should('be.visible')
    cy.get(el.sideMenu).should('be.visible')
    cy.get(el.contentList).should('be.visible')
})

Cypress.Commands.add('clickSignup', () => {
    cy.get(el.menuListItem).eq(7).click()
})

Cypress.Commands.add('validateSignUpModal', () => {
    cy.get(el.modalPage).should('be.visible')
    cy.get(el.signUsername).should('be.visible')
    cy.get(el.signPassword).should('be.visible')
    cy.get(el.signUpBtn).should('be.visible')
    cy.get(el.closeBtn).should('be.visible')
})

Cypress.Commands.add('fillUser', (username, password) => {
    cy.wait(2000)
    cy.get(el.signUsername).type(username, {delay: 100})
    cy.get(el.signPassword).type(password)
})

Cypress.Commands.add('submitUser', () => {
    cy.get(el.signUpBtn).click()
})

Cypress.Commands.add('checkSubmitApi', () => {
    cy.intercept('POST', 'https://api.demoblaze.com/signup').as('signupAPI')
    cy.wait('@signupAPI').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
    })
})

Cypress.Commands.add('errorMessage', () => {
    cy.intercept('POST', 'https://api.demoblaze.com/signup').as('signupAPI')
    cy.wait('@signupAPI').then((interception) => {
        const responseMessage = interception.response.body.errorMessage
        expect(responseMessage).to.eq('This user already exist.')
    })
})

Cypress.Commands.add('clickLogin', () => {
    cy.get(el.menuListItem).eq(4).click()
})

Cypress.Commands.add('validateLoginModal', () => {
    cy.get(el.modalLogin).should('be.visible')
    cy.get(el.loginUser).should('be.visible')
    cy.get(el.loginPass).should('be.visible')
    cy.get(el.loginBtn).should('be.visible')
    cy.get(el.closeBtn).should('be.visible')
})

Cypress.Commands.add('loginUser', (username, password) => {
    cy.get(el.loginUser).click()
    cy.wait(2000)
    cy.get(el.loginUser).type(username, {delay: 100})
    cy.get(el.loginPass).type(password)
})

Cypress.Commands.add('clickLoginModal', () => {
    cy.get(el.loginBtn).click()
})

Cypress.Commands.add('validadeLoggedUser', () => {
    cy.get(el.menuListItem).eq(7).should('not.have.text', 'Sign up', { timeout: 10000 })
})

Cypress.Commands.add('logoutUser', () => {
    cy.wait(2000)
    cy.get(el.menuListItem).eq(5).should('include.text', 'Log out', { timeout: 10000} )
        .should('be.visible').click()
    cy.get(el.menuListItem).eq(4).should('not.have.text', 'Log in', { timeout: 10000 })
})

Cypress.Commands.add('errorMessageLogin', () => {
    cy.intercept('POST', 'https://api.demoblaze.com/login').as('loginAPI')
    cy.wait('@loginAPI').then((interception) => {
        const responseMessage = interception.response.body.errorMessage
        expect(responseMessage).to.eq('User does not exist.')
    })
})

Cypress.Commands.add('clickHome', () => {
    cy.get(el.menuListItem).eq(0).click()
})

Cypress.Commands.add('clickCart', () => {
    cy.get(el.menuListItem).eq(3).click()
})