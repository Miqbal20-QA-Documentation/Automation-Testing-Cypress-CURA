import Auth from '../support/pages/auth'

const url = 'https://katalon-demo-cura.herokuapp.com/'
const auth = new Auth()

describe('CURA Healthcare Service', () => {
  it('TC1 - Verifikasi Akses Website', () => {
    cy.visitURL(url, '/')
  })

  it('TC2 - Verifikasi Login', () => {
    cy.visitURL(url, '/')

    cy.getClick('#menu-toggle > .fa')
    cy.getClick('.sidebar-nav > :nth-child(4) > a')
    cy.urlCheck('/profile.php#login')
    cy.getValidateCondition('h2', 'contain', 'Login')
    
    cy.getTyped('#txt-username', 'John Doe')
    cy.getTyped('#txt-password', 'ThisIsNotAPassword')
    cy.getClick('#btn-login')
    cy.urlCheck('/#appointment')
    cy.getValidateCondition('h2', 'contain', 'Make Appointment')
  })

  it('TC3 - Verifikasi Gagal Login | Username Invalid', () => {
    cy.visitURL(url, '/')

    cy.getClick('#menu-toggle > .fa')
    cy.getClick('.sidebar-nav > :nth-child(4) > a')
    cy.urlCheck('/profile.php#login')
    cy.getValidateCondition('h2', 'contain', 'Login')
    
    cy.getTyped('#txt-username', 'aaa')
    cy.getTyped('#txt-password', 'ThisIsNotAPassword')
    cy.getClick('#btn-login')
    cy.urlCheck('/profile.php#login')
    cy.getValidate('.text-danger', 'be.visible')
  })

  it('TC4 - Verifikasi Gagal Login | Password Invalid', () => {
    cy.visitURL(url, '/')

    cy.getClick('#menu-toggle > .fa')
    cy.getClick('.sidebar-nav > :nth-child(4) > a')
    cy.urlCheck('/profile.php#login')
    cy.getValidateCondition('h2', 'contain', 'Login')
    
    cy.getTyped('#txt-username', 'John Doe')
    cy.getTyped('#txt-password', 'pwd')
    cy.getClick('#btn-login')
    cy.urlCheck('/profile.php#login')
    cy.getValidate('.text-danger', 'be.visible')
  })

  it('TC5 - Verifikasi Gagal Login | Username & Password Invalid', () => {
    cy.visitURL(url, '/')

    cy.getClick('#menu-toggle > .fa')
    cy.getClick('.sidebar-nav > :nth-child(4) > a')
    cy.urlCheck('/profile.php#login')
    cy.getValidateCondition('h2', 'contain', 'Login')
    
    cy.getTyped('#txt-username', 'aaa')
    cy.getTyped('#txt-password', 'pwd')
    cy.getClick('#btn-login')
    cy.urlCheck('/profile.php#login')
    cy.getValidate('.text-danger', 'be.visible')
  })

  it('TC6 - Verifikasi Berhasil Membuat Appointment', () => {
    auth.login(url, 'John Doe', 'ThisIsNotAPassword')
    cy.getTyped('#txt_visit_date','01/02/2023{esc}')
    cy.getTyped('#txt_comment','Buat Janji')
    cy.getClick('#btn-book-appointment')

    cy.urlCheck('/appointment.php#summary')
    cy.getValidateCondition('h2','contain','Appointment Confirmation')
  })

  it('TC7 - Verifikasi Berhasil Membuat Appointment | Hospital Readmission', () => {
    auth.login(url, 'John Doe', 'ThisIsNotAPassword')
    
    cy.get('#combo_facility').select(1)
    cy.getTyped('#txt_visit_date','02/02/2023{esc}')
    cy.getTyped('#txt_comment','Buat Janji')
    cy.getClick('#btn-book-appointment')

    cy.urlCheck('/appointment.php#summary')
    cy.getValidateCondition('h2','contain','Appointment Confirmation')
  })

})