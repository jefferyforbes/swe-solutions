describe('Products', () => {
  before(() => {
    cy.visit('/');
  });

  it('changes the button text on add to cart', () => {
    cy.addAllProductsToCart();

    cy.get('[data-cy=addToCartBtn]').each(($el, index) => {
      expect($el).to.contain('Remove from cart');
    });
  });
});
