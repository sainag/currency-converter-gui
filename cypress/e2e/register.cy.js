describe("Register page", () => {
  it("visits the app root url", () => {
    cy.visit("/account/register");
    cy.contains("h4", "Register");
    cy.get("input[name='name']").type("Test");
    cy.get("input[name='email']").type("test@test.com");
    cy.get("input[name='password']").type("secret");
    cy.get("input[name='password_confirmation']").type("secret");
    cy.get("button").contains("Register").click();
  });
});
