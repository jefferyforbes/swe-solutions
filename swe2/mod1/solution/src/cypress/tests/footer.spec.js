const address = '21 Sussex Gardens, London, SW1 01L';
const copyright = '2021 Plants Direct';

describe('Footer', () => {
  before(() => {
    cy.visit('/');
  });

  it('should show the company address', () => {
    cy.get('[data-cy=footer]').should('contain', address);
  });

  it('should show the copyright notice', () => {
    cy.get('[data-cy=footer]').should('contain', copyright);
  });
});
