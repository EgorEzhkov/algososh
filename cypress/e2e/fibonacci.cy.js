describe("Fibonacci page", () => {
  before(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });
  it("Если input пустой, то кнопка добавления недоступна", () => {
    cy.get("input").then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.contains("Рассчитать").should("have.attr", "disabled");
  });
  it("Корректность генерации чисел", () => {
    cy.get("input").type("5");
    cy.contains("Рассчитать").click();

    cy.wait(500);

    cy.get("li:last-child p").should("include.text", "1");
    cy.get("li:last-child div").should("include.text", "0");

    cy.wait(500);

    cy.get("li:last-child p").should("include.text", "1");
    cy.get("li:last-child div").should("include.text", "1");

    cy.wait(500);

    cy.get("li:last-child p").should("include.text", "2");
    cy.get("li:last-child div").should("include.text", "2");

    cy.wait(500);

    cy.get("li:last-child p").should("include.text", "3");
    cy.get("li:last-child div").should("include.text", "3");

    cy.wait(500);

    cy.get("li:last-child p").should("include.text", "5");
    cy.get("li:last-child div").should("include.text", "4");

    cy.wait(500);

    cy.get("li:last-child p").should("include.text", "8");
    cy.get("li:last-child div").should("include.text", "5");

    cy.get("li").should("have.length", "6");
  });
});
