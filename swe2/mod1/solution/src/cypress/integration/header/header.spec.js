describe('Header', () => {
  before(() => {
    cy.visit('/');
  });

  it('should add active class to first link', () => {
    cy.get('[data-cy="home"]').should('have.class', 'router-link-exact-active');
  });

  it('should increment/decrement the cart value', () => {
    cy.addProductsToCart();
    cy.get('[data-cy="cart"]').should('have.text', 'Cart (3)');
    cy.addProductsToCart();
    cy.get('[data-cy="cart"]').should('have.text', 'Cart (0)');
  });
});
