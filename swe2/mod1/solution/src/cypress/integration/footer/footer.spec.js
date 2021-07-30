const address = '21 Sussex Gardens, London, SW1 01L';

describe('Footer', () => {
  before(() => {
    cy.visit('/');
  });

  it('should show the company address', () => {
    cy.get('[data-cy=footer--address]').should('have.text', address);
  });
});
