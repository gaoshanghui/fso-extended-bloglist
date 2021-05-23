describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'tester',
      name: 'Test Engineer',
      password: 'test123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('.form-input-username').type('tester')
      cy.get('.form-input-password').type('test123')
      cy.get('.form-submit-button').click()

      cy.contains('Test Engineer logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('.form-input-username').type('tester')
      cy.get('.form-input-password').type('test1234')
      cy.get('.form-submit-button').click()

      cy.contains('wrong username or password')
      cy.get('.error-message').should('have.css', 'color', 'rgb(184, 28, 28)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('.form-input-username').type('tester')
      cy.get('.form-input-password').type('test123')
      cy.get('.form-submit-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('.new-blog-form__title-input').type('Test blog')
      cy.get('.new-blog-form__author-input').type('cypress')
      cy.get('.new-blog-form__url-input').type('https://www.cypress.io/')

      cy.get('.new-blog-form__submit').click()
      cy.contains('A new blog Test blog by cypress added')
    })

    it('A user can like a blog', function() {
      cy.contains('new blog').click()
      cy.get('.new-blog-form__title-input').type('Test blog')
      cy.get('.new-blog-form__author-input').type('cypress')
      cy.get('.new-blog-form__url-input').type('https://www.cypress.io/')
      cy.get('.new-blog-form__submit').click()

      cy.get('.blog__view-controlling-button').click()
      cy.get('.blog__like-button').click()
      cy.contains('Likes: 1')
    })

    it('blog owner can delete the blog', function() {
      cy.contains('new blog').click()
      cy.get('.new-blog-form__title-input').type('Test blog')
      cy.get('.new-blog-form__author-input').type('cypress')
      cy.get('.new-blog-form__url-input').type('https://www.cypress.io/')
      cy.get('.new-blog-form__submit').click()

      cy.get('.blog__view-controlling-button').click()
      cy.get('.blog__remove-button').click()
      cy.contains('Test blog - cypress').should('not.exist')
    })

    it.only('blogs are ordered by the number of likes', function () {
      // Create three blogs
      cy.contains('new blog').click()
      cy.get('.new-blog-form__title-input').type('Test blog 1')
      cy.get('.new-blog-form__author-input').type('cypress')
      cy.get('.new-blog-form__url-input').type('https://www.cypress.io/')
      cy.get('.new-blog-form__submit').click()

      cy.get('.new-blog-form__title-input').type('Test blog 2')
      cy.get('.new-blog-form__author-input').type('cypress')
      cy.get('.new-blog-form__url-input').type('https://www.cypress.io/')
      cy.get('.new-blog-form__submit').click()

      cy.get('.new-blog-form__title-input').type('Test blog 3')
      cy.get('.new-blog-form__author-input').type('cypress')
      cy.get('.new-blog-form__url-input').type('https://www.cypress.io/')
      cy.get('.new-blog-form__submit').click()

      cy.wait(2000)

      // click a blog's like button three times
      cy.get('.blog__view-controlling-button')
        .then((button) => {
          button.click()
        })
      
      // Click blog 3 two times and click blog 2 one time.
      cy.get('.blog').find('.blog__title').contains('Test blog 3 - cypress')
      .next('.blog__body').find('.blog__like-button').click()
      cy.wait(1000)

      cy.get('.blog').find('.blog__title').contains('Test blog 3 - cypress')
      .next('.blog__body').find('.blog__like-button').click()
      cy.wait(1000)

      cy.get('.blog').find('.blog__title').contains('Test blog 2 - cypress')
      .next('.blog__body').find('.blog__like-button').click()
      cy.wait(1000)

      // Check ordered blogs
      cy.get('.blog__title').eq(0).should('contain', 'Test blog 3 - cypress')
      cy.get('.blog__title').eq(1).should('contain', 'Test blog 2 - cypress')
      cy.get('.blog__title').eq(2).should('contain', 'Test blog 1 - cypress')
    })
  })
})