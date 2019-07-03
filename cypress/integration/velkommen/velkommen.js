/// <reference types="Cypress" />

context('Velkommen side med sak fra infotrygd', () => {
    before(() => {
        cy.server();
        cy.route('GET', '**/storage*', 'fixture:storage/empty.json');
        cy.route('GET', '**/saker*', 'fixture:saker/infotrygd.json');
        cy.visit('http://localhost:8080');
    });

    it('Skal tilby endringssøknad for saker fra infotrygd', () => {
        cy.wait(3000);
        cy.get('div[data-name="soknadstype-spm"]').should('exist');
    });
});
