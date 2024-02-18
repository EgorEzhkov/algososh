describe("Web-приложение поднялось", function () {
  it("Есть доступ на localhost:3000", () => {
    cy.visit('');
  });
  it("Есть доступ на localhost:3000/recursion", () => {
    cy.visit("recursion");
  });
  it("Есть доступ на localhost:3000/fibonacci", () => {
    cy.visit("fibonacci");
  });
  it("Есть доступ на localhost:3000/sorting", () => {
    cy.visit("sorting");
  });
  it("Есть доступ на localhost:3000/stack", () => {
    cy.visit("stack");
  });
  it("Есть доступ на localhost:3000/queue", () => {
    cy.visit("queue");
  });
  it("Есть доступ на localhost:3000/list", () => {
    cy.visit("list");
  });
});
