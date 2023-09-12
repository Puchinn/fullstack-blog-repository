// -- This is a parent command --
Cypress.Commands.add('login', () => {
  const user = {
    username: 'Puchin',
    password: '3572nota'
  }
  cy.request('POST', 'http://localhost:3001/auth/login', user).then(({ body }) => {
    localStorage.setItem('appUser', JSON.stringify(body))
    cy.visit('/')
  })
})

Cypress.Commands.add('createBlog', (title) => {
  const blog = {
    title,
    url: 'http://localhost:3001/api/blogs',
    author: 'puchincito'
  }
  const token = JSON.parse(localStorage.getItem('appUser')).token
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  cy.visit('/')
})

Cypress.Commands.add('resetAndSignup', () => {
  cy.request('GET', 'http://localhost:3001/api/testing/reset')
  const user = {
    username: 'Puchin',
    password: '3572nota',
    user: 'Esteban'
  }
  cy.request('POST', 'http://localhost:3001/auth/signup', user)
  cy.visit('/')
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
