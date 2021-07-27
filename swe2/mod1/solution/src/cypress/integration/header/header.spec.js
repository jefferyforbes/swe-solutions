describe('Header', () => {
  before(() => {
    cy.visit('/');
  });

  it('should active class to first link', () => {
    cy.get('[data-cy="home"]').should('have.class', 'router-link-exact-active');
  });
});
