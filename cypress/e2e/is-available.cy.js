describe("Web-приложение поднялось", function () {
  it("Есть доступ на localhost:3000", () => {
    cy.visit("http://localhost:3000");
  });
  it("Есть доступ на localhost:3000/recursion", () => {
    cy.visit("http://localhost:3000/recursion");
  });
  it("Есть доступ на localhost:3000/fibonacci", () => {
    cy.visit("http://localhost:3000/fibonacci");
  });
  it("Есть доступ на localhost:3000/sorting", () => {
    cy.visit("http://localhost:3000/sorting");
  });
  it("Есть доступ на localhost:3000/stack", () => {
    cy.visit("http://localhost:3000/stack");
  });
  it("Есть доступ на localhost:3000/queue", () => {
    cy.visit("http://localhost:3000/queue");
  });
  it("Есть доступ на localhost:3000/list", () => {
    cy.visit("http://localhost:3000/list");
  });
});
