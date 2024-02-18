import { circle, circleChanging, circleDefault, circleModified } from "../constans";

describe("string page", () => {
  before(function () {
    cy.visit("recursion");
  });
  it("Если input пустой, то кнопка отключена", () => {
    cy.get("input").then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.get("button").should("be.disabled");
  });
  it("Корректный разворот строки", () => {
    cy.get("input").type("qwer");
    cy.get("button").eq(1).click();

    cy.get(circle).each((el, index) => {
      if (index === 0 || index === 3) {
        cy.wrap(el).find(circleChanging);
      }
      if (index === 1 || index === 2) {
        cy.wrap(el).find(circleDefault);
      }
    });

    cy.wait(1000);
    cy.get(circle).then((el) => {
      cy.wrap(el.text()).should("equal", "rweq");
    });

    cy.get(circle).each((el, index) => {
      if (index === 0 || index === 3) {
        cy.wrap(el).find(circleModified);
      }
      if (index === 1 || index === 2) {
        cy.wrap(el).find(circleChanging);
      }
    });

    cy.get(circle).each((el) => {
      cy.wrap(el).find(circleModified);
    });

    cy.wait(1000);
    cy.get(circle).then((el) => {
      cy.wrap(el.text()).should("equal", "rewq");
    });
  });
});
