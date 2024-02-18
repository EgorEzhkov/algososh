import {
  addButton,
  circleChanging,
  circleContainer,
  circleDefault,
  circleHead,
  circleIndex,
  circleLetter,
  firstCircle,
  input,
  lastCircle,
  removeButton,
} from "../constans";

describe("stack page", () => {
  before(() => {
    cy.visit("stack");
  });
  it("Если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get(input).then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.contains(addButton).should("have.attr", "disabled");
    cy.contains(removeButton).should("have.attr", "disabled");
  });

  it("Правильность добавления элемента в стек", () => {
    cy.get(circleContainer).then((el) => cy.wrap(el.text()).should("have.length", "0"));
    cy.get(input).type("1");
    cy.contains(addButton).click();
    cy.get(lastCircle).then((el) => {
      cy.wrap(el).find(circleChanging);
      cy.wait(500);
      cy.wrap(el).find(circleDefault);
      cy.wrap(el.find(circleHead)).should("have.text", "top");
      cy.wrap(el.find(circleLetter)).should("have.text", "1");
      cy.wrap(el.find(circleIndex)).should("have.text", "0");
    });
    cy.get(input).type("2");
    cy.contains(addButton).click();

    cy.get(firstCircle).then((el) => {
      cy.wrap(el.find(circleHead)).should("not.have.text", "top");
      cy.wrap(el.find(circleLetter)).should("have.text", "1");
    });

    cy.get(lastCircle).then((el) => {
      cy.wrap(el).find(circleChanging);
      cy.wait(500);
      cy.wrap(el).find(circleDefault);
      cy.wrap(el.find(circleHead)).should("have.text", "top");
      cy.wrap(el.find(circleLetter)).should("have.text", "2");
      cy.wrap(el.find(circleIndex)).should("have.text", "1");
    });

    cy.get(input).type("3");
    cy.contains(addButton).click();

    cy.get("li:nth-child(2)").then((el) => {
      cy.wrap(el.find(circleHead)).should("not.have.text", "top");
      cy.wrap(el.find(circleLetter)).should("have.text", "2");
    });

    cy.get(lastCircle).then((el) => {
      cy.wrap(el).find(circleChanging);
      cy.wait(500);
      cy.wrap(el).find(circleDefault);
      cy.wrap(el.find(circleHead)).should("have.text", "top");
      cy.wrap(el.find(circleLetter)).should("have.text", "3");
      cy.wrap(el.find(circleIndex)).should("have.text", "2");
    });

    cy.get(input).type("4");
    cy.contains(addButton).click();

    cy.get("li:nth-child(3)").then((el) => {
      cy.wrap(el.find(circleHead)).should("not.have.text", "top");
      cy.wrap(el.find(circleLetter)).should("have.text", "3");
    });

    cy.get(lastCircle).then((el) => {
      cy.wrap(el).find(circleChanging);
      cy.wait(500);
      cy.wrap(el).find(circleDefault);
      cy.wrap(el.find(circleHead)).should("have.text", "top");
      cy.wrap(el.find(circleLetter)).should("have.text", "4");
      cy.wrap(el.find(circleIndex)).should("have.text", "3");
    });
  });

  it("Правильность удаления элемента из стека", () => {
    cy.get(circleContainer).then((el) => cy.wrap(el.find(circleLetter)).should("have.length", "4"));

    cy.contains(removeButton).click();

    cy.get(circleContainer).then((el) => cy.wrap(el.find(circleLetter)).should("have.length", "3"));

    cy.get(circleContainer).then((el) => cy.wrap(el.find(circleLetter)).should("not.have.text", "4"));

    cy.get(lastCircle).then((el) => {
      cy.wrap(el.find(circleHead)).should("have.text", "top");
      cy.wrap(el.find(circleLetter)).should("have.text", "3");
      cy.wrap(el.find(circleIndex)).should("have.text", "2");
    });
  });

  it("Правильность работы кнопки Очистить", () => {
    cy.get(circleContainer).then((el) => cy.wrap(el.find(circleLetter)).should("have.length", "3"));

    cy.contains("Очистить").click();

    cy.get(circleContainer).then((el) => cy.wrap(el.find(circleLetter)).should("have.length", "0"));

    cy.get(input).then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.contains(addButton).should("have.attr", "disabled");
    cy.contains(removeButton).should("have.attr", "disabled");
  });
});
