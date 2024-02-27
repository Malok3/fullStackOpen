
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:5173/api/testing/reset')
    const user = {
      name: 'Nicolas',
      username: 'testing_user',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:5173/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Login to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('testing_user')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()
      cy.contains('Nicolas logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('testing_user')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testing_user', password: '123456' })
    })

    it('A blog can be created', function () {
      cy.get('#create-newblog-button').click()
      cy.get('#blog-title').type('Le bateau ivre')
      cy.get('#blog-author').type('Arthur Rimbaud')
      cy.get('#blog-url').type('http://www.test.fi')
      cy.get('#blog-submit').click()
      cy.contains('Arthur Rimbaud')
    })

    it('A blog can be liked', function () {
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


  })

  describe('Deleting a blog', function () {
    beforeEach(function () {
      cy.login({ username: 'testing_user', password: '123456' })
      cy.createBlog({
        title: 'a blog to delete',
        author: 'tester',
        url: 'testing'
      })
      cy.contains('a blog to delete')
    })

    // If the delete button belonging to the blog created in beforeEach doesn't exist, it means the blog has been deleted
    it('A blog can be deleted', function () {
      cy.contains('a blog to delete').parent().find('#seemore-button').click()
      cy.get('#delete-button').as('theButton')
      cy.get('@theButton').click()
      cy.get('@theButton').should('not.exist')
    })

    // The exercise is asking to check that the delete button is not shown if the user is not the author. 
    // This feature is not implemented in the material so I made a test that checks an error message is displayed
    // if a user tries to delete someone else's blog.
    it('only the creator can delete own blogs', function () {
      const user = {
        name: 'john',
        username: 'johndoe',
        password: '123456'
      }
      cy.request('POST', 'http://localhost:5173/api/users', user)
      cy.visit('http://localhost:5173')
      cy.login({ username: 'johndoe', password: '123456' })
      cy.contains('a blog to delete').parent().find('#seemore-button').click()
      cy.get('#delete-button').click()
      cy.contains('Error in deleting blog')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })

  describe('Blogs rendering',function(){
    beforeEach(function(){
      cy.login({ username: 'testing_user', password: '123456' })
      cy.createBlog({title: 'blog with less likes',author: 'tester1',url: 'testing',likes:2 })
      cy.createBlog({title: 'blog with most likes',author: 'tester2',url: 'testing',likes:10 })
      cy.createBlog({title: 'blog with 5 likes',author: 'tester3',url: 'testing',likes:5 })
    })

    it('Blogs are ordered by likes with the most liked blog being first', function(){
      cy.get('.blog').eq(0).should('contain', 'blog with most likes')
      cy.get('.blog').eq(1).should('contain', 'blog with 5 likes')
      cy.get('.blog').eq(2).should('contain', 'blog with less likes')
    })
  })

})


