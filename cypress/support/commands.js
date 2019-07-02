// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const dateFormat = 'DD.MM.YYYY';

Cypress.Commands.add('leggTilUttaksperiode', (fom, tom) => {
    cy.get('.knapp[data-name="openNyPeriodeForm"]').click();
    cy
        .get('input[name="fraDatoInput"]')
        .type(fom.format(dateFormat))
        .blur();
    cy
        .get('input[name="tilDatoInput"]')
        .type(tom.format(dateFormat))
        .blur();

    cy.get('.inputPanel__field[value="mor"]').click({ force: true });
    cy.get('.inputPanel__field[value="MØDREKVOTE"]').click({ force: true });
    cy.get('.inputPanel__field[name="samtidigUttak"][value="nei"]').click({ force: true });
    cy.get('.inputPanel__field[name="ønskerDuGradertUttak"][value="nei"]').click({ force: true });
    cy.get('button[data-name="leggTilPeriode"]').click();
});

Cypress.Commands.add('leggTilUtsettelse', (fom, tom) => {
    cy.get('.knapp[data-name="openNyUtsettelseForm"]').click();
    cy
        .get('input[name="fraDatoInput"]')
        .type(fom.format(dateFormat))
        .blur();
    cy
        .get('input[name="tilDatoInput"]')
        .type(tom.format(dateFormat))
        .blur();

    cy.get('input[value="ferie"]').click({ force: true });
    cy.get('button[data-name="leggTilPeriode"]').click();
});

Cypress.Commands.add('sjekkResterendeKvote', (kvote, forventetVerdi) => {
    cy.get('strong[data-name={' + kvote + '}').should('eq', forventetVerdi);
});
