describe('Estructura basica', function(){

	it('Visita la pagina', function(){
		cy.visit('http://localhost:3000/')
	})

	it('Hay paginacion?', function() {
		cy.get('.pagination__list')
	})

	it('Esta disabled el boton ANTERIOR?', function() {
		cy.get('.pagination__list > li > button').should('be.disabled')
	})

	it('Esta enabled el boton SIGUENTE?', function() {
		cy.get('.pagination__list > li:last-child() > button').should('not.be.disabled')
	})

	it('Esta seleccionada la pagina 1?', function() {
		cy.get('.pagination__list > li:nth-child(2) > button')
			.should('contain', '1')
			.should('have.class', 'active')
	})

	it('El idioma es el correcto?', function() {
		cy.get('[type="radio"]').check('es')
		
		cy.get('.info__habilidades > .title').should('contain', 'Habilidades')
	})

	it('Existe la sideNav? Tiene la cantidad de elementos correctos?', function() {
		cy.get('.sidenav > ul').children()
			.should('have.length', 5)
	})

	it('Hay un pokemon cargado?', function() {
		cy.get('.info > h4')
			.should('not.exist')
	})
})

describe('Comportamiento', function() {

	it('Cambia de idioma', function(){
		cy.get('[type="radio"]').check('en', {force: true});
		cy.get('.info__habilidades > .title').should('contain', 'Abilities');
	})

	it('Selecciona un pokemon de la Sidenav', function(){
		cy.get('.sidenav__btn').eq(2).click()
			.then($nombre => {
				cy.get('.info__name').invoke('text').should('be.equal', $nombre[0].innerText)
			});
	})

	it("El boton seleccionado en la Sidenav tiene que tener la clase 'active'", function(){
		cy.get('.sidenav__btn').eq(2).click().should('have.class', 'is-primary');
	})

})