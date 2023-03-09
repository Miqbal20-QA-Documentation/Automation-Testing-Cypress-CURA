let waiting_time = 800
let timeout_time = 10000

Cypress.Commands.add('visitURL', (url, assert) =>{
    cy.visit(url)
    cy.url().should('include', assert)
})

Cypress.Commands.add('urlCheck', (assert) =>{
    cy.url().should('include', assert)
})


Cypress.Commands.add('getClick', (el) => {
    cy.get(el, { timeout: timeout_time }).click().wait(waiting_time)
})

Cypress.Commands.add('getTyped', (el, data) => {
    cy.get(el, { timeout: timeout_time }).clear().type(`{backspace}` + data).wait(waiting_time)
})

Cypress.Commands.add('getValidate', (el, assert) => {
    cy.get(el, { timeout: timeout_time }).should(assert).wait(waiting_time)
})

Cypress.Commands.add('getValidateCondition', (el, condition, assert) => {
    cy.get(el, { timeout: timeout_time }).should(condition, assert).wait(waiting_time)
})
