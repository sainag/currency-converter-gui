describe("Login page", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h4", "Login");
    cy.get("input[name='email']").type("test@test.com");
    cy.get("input[name='password']").type("secret");
    cy.get("button").contains("Login").click();
  });
});
