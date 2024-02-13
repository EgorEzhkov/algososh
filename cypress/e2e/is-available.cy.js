describe("service is available", function () {
  it("should be available on localhost:3000", () => {
    cy.visit("http://localhost:3000");
  });
  it("should be available on localhost:3000/recursion", () => {
    cy.visit("http://localhost:3000/recursion");
  });
  it("should be available on localhost:3000/fibonacci", () => {
    cy.visit("http://localhost:3000/fibonacci");
  });
  it("should be available on localhost:3000/sorting", () => {
    cy.visit("http://localhost:3000/sorting");
  });
  it("should be available on localhost:3000/stack", () => {
    cy.visit("http://localhost:3000/stack");
  });
  it("should be available on localhost:3000/queue", () => {
    cy.visit("http://localhost:3000/queue");
  });
  it("should be available on localhost:3000/list", () => {
    cy.visit("http://localhost:3000/list");
  });
});
