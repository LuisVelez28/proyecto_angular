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

    cy.intercept('GET', '**/mydestinos', {
      statusCode: 200,
      body: ['Bogota', 'Quito', 'Lima'],
    }).as('misDestinos');

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

  it('muestra validaciones del formulario y no permite agregar datos invalidos', () => {
    cy.get('#nombre').focus().blur();
    cy.get('#imagenUrl').focus().blur();

    cy.contains('.text-danger', 'El nombre es requerido.').should('be.visible');
    cy.contains('.text-danger', 'La URL de la imagen es requerida.').should('be.visible');
    cy.contains('button', 'Agregar').should('not.exist');

    cy.get('#nombre').type('Pa');
    cy.contains('.text-danger', 'El nombre debe tener al menos 3 caracteres.').should('be.visible');

    cy.get('#nombre').clear().type('Paris');
    cy.wait('@buscarCiudades');
    cy.get('#imagenUrl').type('ftp://imagen-invalida');
    cy.contains('.text-danger', 'La URL debe comenzar con http:// o https://').should('be.visible');
    cy.contains('button', 'Agregar').should('not.exist');
  });

  it('carga la vista de detalle y muestra destinos obtenidos del API', () => {
    cy.contains('a', '📍').click();

    cy.wait('@misDestinos');
    cy.contains('h2', 'Mis Destinos').should('be.visible');
    cy.contains('strong', 'Bogota').should('be.visible');
    cy.contains('strong', 'Quito').should('be.visible');
    cy.contains('strong', 'Lima').should('be.visible');
    cy.contains('.total', 'Total: 3 destino(s)').should('be.visible');
    cy.get('.map-canvas').should('exist');
  });
});
