import {
  addButton,
  circle,
  circleChanging,
  circleContainer,
  circleDefault,
  circleHead,
  circleLetter,
  circleTail,
  input,
  removeButton,
} from "../constans";

describe("Queue page", () => {
  before(() => {
    cy.visit("queue");
  });
  it("Если в инпуте пусто, то кнопка добавления недоступн", () => {
    cy.get(input).then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.contains(addButton).should("have.attr", "disabled");
    cy.contains(removeButton).should("have.attr", "disabled");
  });
  it("Правильность добавления элемента в очередь", () => {
    cy.get(circleContainer).each((el) => {
      cy.wrap(el.children()).should("have.length", 7);
    });
    cy.get(input).type("1");
    cy.contains(addButton).click();
    cy.get("li:nth-child(1)").then((el) => {
      cy.wrap(el).find(circleChanging);
      cy.wait(500);
      cy.wrap(el).find(circleDefault);
      cy.wrap(el).find(circleLetter).should("have.text", "1");
      cy.wrap(el).find(circleTail).should("have.text", "tail");
      cy.wrap(el).find(circleHead).should("have.text", "head");
    });
    cy.get(input).type("2");
    cy.contains(addButton).click();
    cy.get("li:nth-child(2)").then((el) => {
      cy.wrap(el).find(circleChanging);
      cy.wait(500);
      cy.wrap(el).find(circleDefault);
      cy.wrap(el).find(circleLetter).should("have.text", "2");
      cy.wrap(el).find(circleTail).should("have.text", "tail");
      cy.wrap(el).find(circleHead).should("not.have.text", "head");
    });
    cy.get("li:nth-child(1)").then((el) => {
      cy.wrap(el).find(circleHead).should("have.text", "head");
    });
    cy.get(input).type("3");
    cy.contains(addButton).click();
    cy.get("li:nth-child(3)").then((el) => {
      cy.wrap(el).find(circleChanging);
      cy.wait(500);
      cy.wrap(el).find(circleDefault);
      cy.wrap(el).find(circleLetter).should("have.text", "3");
      cy.wrap(el).find(circleTail).should("have.text", "tail");
      cy.wrap(el).find(circleHead).should("not.have.text", "head");
    });
    cy.get(input).type("4");
    cy.contains(addButton).click();
    cy.get("li:nth-child(4)").then((el) => {
      cy.wrap(el).find(circleChanging);
      cy.wait(500);
      cy.wrap(el).find(circleDefault);
      cy.wrap(el).find(circleLetter).should("have.text", "4");
      cy.wrap(el).find(circleTail).should("have.text", "tail");
      cy.wrap(el).find(circleHead).should("not.have.text", "head");
    });
    cy.get(input).type("5");
    cy.contains(addButton).click();
    cy.get("li:nth-child(5)").then((el) => {
      cy.wrap(el).find(circleChanging);
      cy.wait(500);
      cy.wrap(el).find(circleDefault);
      cy.wrap(el).find(circleLetter).should("have.text", "5");
      cy.wrap(el).find(circleTail).should("have.text", "tail");
      cy.wrap(el).find(circleHead).should("not.have.text", "head");
    });
  });
  it("Правильность удаления элемента из очереди", () => {
    cy.contains(removeButton).click();

    cy.get("li:nth-child(1)").then((el) => {
      cy.wrap(el).find(circleChanging);
      cy.wait(500);
      cy.wrap(el).find(circleDefault);
      cy.wrap(el).find(circleLetter).should("not.have.text", "1");
      cy.wrap(el).find(circleHead).should("not.have.text", "head");
    });

    cy.get("li:nth-child(2)").then((el) => {
      cy.wrap(el).find(circleHead).should("have.text", "head");
    });
    cy.contains(removeButton).click();

    cy.get("li:nth-child(2)").then((el) => {
      cy.wrap(el).find(circleChanging);
      cy.wait(500);
      cy.wrap(el).find(circleDefault);
      cy.wrap(el).find(circleLetter).should("not.have.text", "2");
      cy.wrap(el).find(circleHead).should("not.have.text", "head");
    });

    cy.get("li:nth-child(3)").then((el) => {
      cy.wrap(el).find(circleHead).should("have.text", "head");
    });
  });
  it("Корректная работа кнопки Очистить", () => {
    cy.get(circleContainer).should("have.text", "01head324354tail56");
    cy.contains("Очистить").click();
    cy.get(circleContainer).should("not.have.text", "01head324354tail56");
    cy.get(circle).then((el) => {
      cy.wrap(el.find(circleLetter).text()).should("have.length", "0");
      cy.wrap(el.find(circleHead)).should("not.have.text", "head");
      cy.wrap(el.find(circleTail)).should("not.have.text", "tail");
    });
  });
});
