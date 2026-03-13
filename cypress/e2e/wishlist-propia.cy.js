describe('Wishlist propia', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ciudades*', {
      statusCode: 200,
      body: ['Barcelona, Spain', 'Berlin, Germany'],
    }).as('buscarCiudades');

    cy.intercept('POST', '**/mydestinos', (req) => {
      expect(req.body).to.deep.equal({ nuevo: 'Barcelona' });
      req.reply({
        statusCode: 200,
        body: ['Barcelona'],
      });
    }).as('guardarDestino');

    cy.intercept('POST', '**/tracking-tags', {
      statusCode: 201,
      body: { ok: true, total: 1 },
    }).as('trackingTags');

    cy.visit('http://localhost:4200/home', {
      onBeforeLoad(win) {
        win.localStorage.clear();
        win.indexedDB.deleteDatabase('MyDatabase');
      },
    });

    cy.wait('@trackingTags');
  });

  it('agrega un destino y refleja actividad y tracking en pantalla', () => {
    cy.get('#nombre').type('Barcelona');
    cy.wait('@buscarCiudades');
    cy.contains('li', 'Barcelona, Spain').should('be.visible');

    cy.get('#imagenUrl').type('https://images.example.com/barcelona.jpg');
    cy.contains('button', 'Agregar').click();

    cy.wait('@guardarDestino');
    cy.contains('.card-content h3', 'Barcelona').should('be.visible');
    cy.contains('.activity-text', 'Se agregó a Barcelona').should('be.visible');

    cy.contains('.card-content h3', 'Barcelona')
      .parents('.card-content')
      .first()
      .within(() => {
        cy.contains('a', 'Ir').click();
      });

    cy.wait('@trackingTags')
      .its('request.body.trackingTagsCount')
      .should('deep.include', { 'destino.ir': 1 });

    cy.contains('.activity-text', 'Se ha elegido a Barcelona').should('be.visible');
    cy.contains('.activity-text', 'destino.ir: 1').should('be.visible');
  });
});
