describe('texting our form inputs', () => {
    beforeEach(() => {
        // eslint-disable-next-line no-undef
        cy.visit('http://localhost:3000')
    })
    it("add texts to input and submits form", () => {
        // eslint-disable-next-line no-undef
        cy.get('[data-cy=name]').type("Chad").should("have.value" ,"Chad");
        // eslint-disable-next-line no-undef
        cy.get('[data-cy=email]').type("chad@gmail.com").should('have.value', 'chad@gmail.com');
        // eslint-disable-next-line no-undef
        cy.get('[data-cy=password]').type('password').should('have.value','password');
        // eslint-disable-next-line no-undef
        cy.get('[data-cy=terms]').check().should('be.checked')
        // eslint-disable-next-line no-undef
        cy.get('[data-cy=submit]').click()
    })
});
