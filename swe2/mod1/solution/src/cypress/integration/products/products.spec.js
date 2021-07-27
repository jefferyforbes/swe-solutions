describe('Products', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should change the button text when clicked', () => {
    cy.addProductsToCart();

    cy.get('[data-cy=addToCartBtn]').each(($el, index) => {
      expect($el).to.contain('Remove from cart');
    });
  });

  it('should navigate to first product details page', () => {
    cy.get('[data-cy=product-link]')
      .eq(0)
      .then(($el, index) => {
        cy.visit($el[0].href);
        cy.url().should('include', $el[0].hash);
      });
  });
});
