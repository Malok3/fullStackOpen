
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testing_user', password: '123456' })
    })

    it('A blog can be created', function() {
      cy.get('#create-newblog-button').click()
      cy.get('#blog-title').type('Le bateau ivre')
      cy.get('#blog-author').type('Arthur Rimbaud')
      cy.get('#blog-url').type('http://www.test.fi')
      cy.get('#blog-submit').click()
      cy.contains('Arthur Rimbaud')
    })

    it('A blog can be liked', function(){
      cy.createBlog({
        title: 'another blog cypress',
        author: 'tester',
        url: 'testing',
        likes: 0
      })
      cy.get('#seemore-button').click()
      cy.contains('0')
      cy.get('#like-button').click()
      cy.contains('1')
    })
    it.only('A blog can be deleted', function(){
      cy.createBlog({
        title: 'a blog to delete',
        author: 'tester',
        url: 'testing'
      })
      cy.contains('a blog to delete')
      cy.contains('a blog to delete').parent().find('#seemore-button').click()
      cy.get('#delete-button').as('theButton')
      cy.get('@theButton').click()
      cy.get('@theButton').should('not.exist')
    })
  })

})