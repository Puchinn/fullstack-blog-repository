describe('visit the website', () => {
  beforeEach(() => {
    cy.resetAndSignup()
  })
  it('there is a title Login', () => {
    cy.contains('Login')
  })
  it('there is a form', () => {
    cy.get('form')
  })
  it('there are inputs fields', () => {
    cy.get('input')
  })
  it('the user can login', () => {
    cy.login()
  })
  it('the user can log out', () => {
    cy.login()
    cy.get('button').contains('logout').click()
    cy.contains('Login')
  })
  it('login fails with wrong password', () => {
    cy.get('#name').type('Puchin')
    cy.get('#password').type('wrongpass')
    cy.get('button').contains('login').click()
    cy.get('.error-msg')
      .should('contain', 'invalid password')
      .and('have.css', 'color', 'rgb(216, 0, 12)')
    cy.get('html').should('not.contain', 'sesion iniciada')
  })
})

describe('when the user is logged', () => {
  beforeEach(() => {
    cy.resetAndSignup()
    cy.login()
  })
  it('there are info about the user', () => {
    cy.contains('logged in Puchin')
  })
  it('the user can see blogs', () => {
    cy.get('html').should('contain', 'Blogs')
  })
  it('the user can create a blog', () => {
    cy.createBlog('blog from cypress test')
    cy.get('button').contains('create').click()
    cy.contains('blog from cypress test')
  })
  it('the user can delete a blog', () => {
    cy.createBlog('blog from cypress test')
    cy.contains('blog from cypress test')
    cy.get('button').contains('delete blog').click()
    cy.get('h2').should('not.contain', 'blog from cypress test')
  })
  it('select a specific delete blog button between buttons', () => {
    cy.createBlog('blog 1')
    cy.createBlog('blog 2')
    cy.contains('blog 1')
    cy.contains('blog 2')
    cy.get('li').contains('blog 1').get('button').contains('delete blog').click()
  })
  it('the user can like a blog', () => {
    cy.createBlog('blog to like')
    cy.contains('blog to like').get('button').contains('Like').click()
    cy.contains('blog to like').parent().contains('Likes').should('contain', '1')
  })
})
