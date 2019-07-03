/// <reference types="Cypress" />

context('Uttaksplan', () => {
    before(() => {
        cy.server();
        cy.fixture('sokerinfo/mor_uten_barn.json').then((user) => {
            cy.route('GET', '**/sokerinfo*', user);
        });

        cy.fixture('storage/storage_uttaksplan_steg_delt_omsorg.js', 'utf-8').then((storage) => {
            cy.route('GET', '**/storage*', JSON.stringify(storage));
        });

        cy.visit('http://localhost:8080');
    });

    it('Skal kunne legge inn ny periode', () => {
        cy.leggTilUttaksperiode(
            Cypress.moment(),
            Cypress.moment()
                .subtract(1, 'day')
                .add(6, 'weeks')
        );
    });

    it('Skal legge inn ny utsettelse', () => {
        cy.leggTilUtsettelse(
            Cypress.moment().add(6, 'weeks'),
            Cypress.moment()
                .add(6 + 2, 'weeks')
                .subtract(1, 'day')
        );
    });
});
