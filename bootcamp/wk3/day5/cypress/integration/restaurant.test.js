describe('My First Test', () => {
    it('finds the restaurant website', () => {
      cy.visit('http://localhost:3000');
    })

    it('opens the Add Restaurant page', () => {
        cy.visit('http://localhost:3000');

        // search for the DOM element by name and then call 'click'
        cy.contains('Add').click();
      })
  })