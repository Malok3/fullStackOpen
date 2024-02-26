

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:5173/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
  })
})