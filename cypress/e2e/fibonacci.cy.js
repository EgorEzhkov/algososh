import { circle, circleIndex, circleLetter, lastCircle } from "../constans";

describe("Fibonacci page", () => {
  before(() => {
    cy.visit("fibonacci");
  });
  it("Если input пустой, то кнопка добавления недоступна", () => {
    cy.get("input").then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.contains("Рассчитать").should("have.attr", "disabled");
  });
  it("Корректность генерации чисел", () => {
    cy.get("input").type("5");
    cy.contains("Рассчитать").click();

    cy.wait(500);

    cy.get(lastCircle).then((el) => {
      cy.wrap(el.find(circleLetter)).should("include.text", "1");
      cy.wrap(el.find(circleIndex)).should("include.text", "0");
    });

    cy.wait(500);

    cy.get(lastCircle).then((el) => {
      cy.wrap(el.find(circleLetter)).should("include.text", "1");
      cy.wrap(el.find(circleIndex)).should("include.text", "1");
    });

    cy.wait(500);

    cy.get(lastCircle).then((el) => {
      cy.wrap(el.find(circleLetter)).should("include.text", "2");
      cy.wrap(el.find(circleIndex)).should("include.text", "2");
    });

    cy.wait(500);

    cy.get(lastCircle).then((el) => {
      cy.wrap(el.find(circleLetter)).should("include.text", "3");
      cy.wrap(el.find(circleIndex)).should("include.text", "3");
    });

    cy.wait(500);

    cy.get(lastCircle).then((el) => {
      cy.wrap(el.find(circleLetter)).should("include.text", "5");
      cy.wrap(el.find(circleIndex)).should("include.text", "4");
    });

    cy.wait(500);

    cy.get(lastCircle).then((el) => {
      cy.wrap(el.find(circleLetter)).should("include.text", "8");
      cy.wrap(el.find(circleIndex)).should("include.text", "5");
    });

    cy.get(circle).should("have.length", "6");
  });
});
