class Auth{
    login(url, username, password){
        cy.visitURL(url, '/')

        cy.getClick('#menu-toggle > .fa')
        cy.getClick('.sidebar-nav > :nth-child(4) > a')
        cy.urlCheck('/profile.php#login')
        cy.getValidateCondition('h2', 'contain', 'Login')
        
        cy.getTyped('#txt-username', username)
        cy.getTyped('#txt-password', password)
        cy.getClick('#btn-login')
        cy.urlCheck('/#appointment')
        cy.getValidateCondition('h2', 'contain', 'Make Appointment')
    }
}

export default Auth