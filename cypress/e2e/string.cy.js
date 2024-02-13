import { ElementStates } from "../../src/types/element-states";

describe("string page", () => {
  before(function () {
    cy.visit("http://localhost:3000/recursion");
  });
  it("if the input is empty, then the add button is not available", () => {
    cy.get("input").should("have.text", "");
    cy.get("button").should("be.disabled");
  });
  it("Correct string reversal", () => {
    cy.get("input").type("qwer");
    cy.get("button").eq(1).click();

    cy.get("li").each((el, index) => {
      if (index === 0 || index === 3) {
        cy.get("[class^=circle_circle__TeYrD]").should("have.class", "circle_changing__kFPvL");
      }
      if (index === 1 || index === 2) {
        cy.get("[class^=circle_circle__TeYrD]").should("have.class", "circle_default__d-W4U");
      }
    });
    cy.wait(1000);
    cy.get("li").then((el) => {
      cy.wrap(el.text()).should("equal", "rweq");
    });
    cy.get("li").each((el, index) => {
      if (index === 0 || index === 3) {
        cy.get("[class^=circle_circle__TeYrD]").should("have.class", "circle_modified__2QHpx");
      }

      if (index === 1 || index === 2) {
        cy.get("[class^=circle_circle__TeYrD]").should("have.class", "circle_changing__kFPvL");
      }
    });

    cy.get("li").each(() => {
      cy.get("[class^=circle_circle__TeYrD]").should("have.class", "circle_modified__2QHpx");
    });
    cy.wait(1000);
    cy.get("li").then((el) => {
      cy.wrap(el.text()).should("equal", "rewq");
    });
  });
});
