describe('Application', () => {
    it('should render app', () => {
        cy.server();
        cy.visit('/');
        cy.contains('Foreldrepengesøknad');
    });
});
