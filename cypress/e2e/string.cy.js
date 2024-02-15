describe("string page", () => {
  before(function () {
    cy.visit("http://localhost:3000/recursion");
  });
  it("Если input пустой, то кнопка отключена", () => {
    cy.get("input").then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.get("button").should("be.disabled");
  });
  it("Корректный разворот строки", () => {
    cy.get("input").type("qwer");
    cy.get("button").eq(1).click();

    cy.get("li").each((el, index) => {
      if (index === 0 || index === 3) {
        cy.wrap(el).find("[class*=circle_changing]");
      }
      if (index === 1 || index === 2) {
        cy.wrap(el).find("[class*=circle_default]");
      }
    });

    cy.wait(1000);
    cy.get("li").then((el) => {
      cy.wrap(el.text()).should("equal", "rweq");
    });

    cy.get("li").each((el, index) => {
      if (index === 0 || index === 3) {
        cy.wrap(el).find("[class*=circle_modified]");
      }
      if (index === 1 || index === 2) {
        cy.wrap(el).find("[class*=circle_changing]");
      }
    });

    cy.get("li").each((el) => {
      cy.wrap(el).find("[class*=circle_modified]");
    });

    cy.wait(1000);
    cy.get("li").then((el) => {
      cy.wrap(el.text()).should("equal", "rewq");
    });
  });
});
