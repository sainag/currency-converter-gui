describe("Home page", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h4", "Login");
    cy.get("input[name='email']").type("tony@stark.com");
    cy.get("input[name='password']").type("secret");
    cy.get("button").contains("Login").click();
    cy.wait(1000);
    cy.get("[data-cy=select-field]").click({ force: true });
    cy.contains("AUD").type("{esc}");
    cy.get("button").contains("Convert").click();
    cy.wait(1000);
    cy.contains("th", "Amount (1 USD)");
  });
});
