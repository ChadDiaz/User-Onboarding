describe('texting our form inputs', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it("add texts to input and submits form", () => {
        cy.get('[data-cy=name]').type("Chad").should("have.value" ,"Chad");
        cy.get('[data-cy=email]').type("chad@gmail.com").should('have.value', 'chad@gmail.com');
        cy.get('[data-cy=password]').type('password').should('have.value','password');
        cy.get('[data-cy=terms]').check().should('be.checked')
        cy.get('[data-cy=submit]').click()
    })
});
