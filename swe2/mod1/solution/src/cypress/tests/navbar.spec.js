const routerActiveClass = 'router-link-exact-active';

describe('Navbar', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add active class to first link', () => {
    cy.get('[data-cy="navbar--link"]')
      .eq(0)
      .should('have.class', routerActiveClass);
  });

  it('should add active class to other links', () => {
    cy.get('[data-cy="navbar--link"]').eq(1).click();

    cy.get('[data-cy="navbar--link"]')
      .eq(1)
      .should('have.class', routerActiveClass);
  });

  it('should increment/decrement the cart value', () => {
    cy.addProductsToCart();
    cy.get('[data-cy="navbar"]').should('contain', 'Cart (2)');
    cy.addProductsToCart();
    cy.get('[data-cy="navbar"]').should('contain', 'Cart (0)');
  });
});
