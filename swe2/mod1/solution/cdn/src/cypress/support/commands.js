Cypress.Commands.add('addProductsToCart', () => {
  cy.get('[data-cy=product--addToCart]').each(($el, index) => {
    $el.click();
  });
});
