describe('Product', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should change the button text when clicked', () => {
    cy.addProductsToCart();

    cy.get('[data-cy=product--addToCart]').each(($el, index) => {
      expect($el).to.contain('Remove from cart');
    });
  });

  it.skip('should find an out of stock notice but no add to cart button', () => {
    cy.get('[data-cy=product]')
      .eq(0)
      .should('contain', 'Out of stock :(')
      .and('not.contain', 'Add to cart');
  });

  it('should navigate to first product details page', () => {
    cy.get('[data-cy=product--link]')
      .eq(0)
      .then(($el) => {
        cy.visit($el[0].href);
        cy.url().should('include', $el[0].hash);
      });
  });
});
