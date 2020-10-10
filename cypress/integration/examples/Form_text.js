describe('texting our form inputs', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it("add texts to input and submits form", () => {
        cy.get('[data-cy=name]').type("Chad").should("have.value" ,"Chad")
    })
});
