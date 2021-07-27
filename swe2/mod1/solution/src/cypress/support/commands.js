Cypress.Commands.add('addProductsToCart', () => {
  cy.get('[data-cy=addToCartBtn]').each(($el, index) => {
    $el.click();
  });
});
