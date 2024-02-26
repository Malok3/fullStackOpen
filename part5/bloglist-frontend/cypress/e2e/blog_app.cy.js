

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:5173/api/testing/reset')

    const user = {
      name: 'Nicolas',
      username: 'testing_user',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:5173/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testing_user')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()
      cy.contains('Nicolas logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('testing_user')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      cy.contains('wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})