describe('My First Test', () => {
    it('finds the restaurant website', () => {
      cy.visit('http://localhost:3000');
    })

    it('opens the Add Restaurant page', () => {
        cy.visit('http://localhost:3000');

        // search for the DOM element by name and then call 'click'
        cy.contains('Add').click();
      })

    it('should be possible to add new restuarants', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Add').click();

        // find the input element with the attribute `name="name"` and type 'Spice Merchant'
        cy.get('input[name="name"]').type('Spice Merchant');

        cy.get('input[name="image"]').type('https://lh3.googleusercontent.com/proxy/8bnCNxGhimapSpNTRjpv1WOfX34122flhJ-W2ik-QHmwmQi1dg0o8BETePec-3cDu_iVR497BUkFS3yn9aTZzSa_A4W3dLE0gwaEpz1Vu4Q756hgoWCZGCpsgig');
        cy.get('input[type="submit"]').click();

        // Check restaurant has been added
        cy.get('article[aria-label="Spice Merchant"]').should('be.visible');
    });

    it('should be possible to delete a restaurant', () => {
      cy.visit('http://localhost:3000');
      cy.get('article[aria-label="Bayroot"] a[aria-label="Delete Bayroot"]').click();
    });
 
  })