describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.findAllByTestId('pokemon-card', {timeout: 5000}).should("have.length", 9)
    cy.scrollTo("bottom")
    cy.findAllByTestId('pokemon-card', {timeout: 5000}).should("have.length", 18)
    cy.findAllByTestId('pokemon-card').first().click()
    cy.url().should('include', '/pokemon/1')
    cy.findAllByText(/Bulbasaur/).should("exist")
    cy.findByText(/Stats/).should("exist")
    cy.findByText(/Hp/).should("exist")
  })
})