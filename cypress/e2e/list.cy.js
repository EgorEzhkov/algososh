import {
  circle,
  circleChanging,
  circleContainer,
  circleDefault,
  circleHead,
  circleLetter,
  circleModified,
  circleTail,
  firstCircle,
  inputIndex,
  inputValue,
  lastCircle,
} from "../constans";

describe("list page", () => {
  before(() => {
    cy.visit("list");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна, кнопки добавления по индексу и удаления по индексу недоступны тоже", () => {
    cy.get(inputValue).then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.get(inputIndex).then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.contains("Добавить в head").should("have.attr", "disabled");
    cy.contains("Добавить в tail").should("have.attr", "disabled");
    cy.contains("Удалить по индексу").should("have.attr", "disabled");
    cy.contains("Добавить по индексу").should("have.attr", "disabled");
  });

  it("Корректная отрисовка дефолтного списка", () => {
    cy.get(circleContainer)
      .then((el) => cy.wrap(el.find(circleLetter).text().length))
      .should("be.ok");
    cy.get(firstCircle).then((el) => cy.wrap(el.find(circleHead)).should("have.text", "head"));
    cy.get(lastCircle).then((el) => cy.wrap(el.find(circleTail)).should("have.text", "tail"));
  });

  it("Корректное добавление элемента в head", () => {
    cy.get(inputValue).as("addValue");
    cy.get("@addValue").type("8");
    cy.contains("Добавить в head").click();
    cy.get(firstCircle).then((el) => {
      cy.wrap(el.find(circleHead)).should("have.text", "8");
      cy.wrap(el.find(circleHead)).find(circleChanging);
    });

    cy.wait(500);

    cy.get(firstCircle).then((el) => {
      cy.wrap(el).find(circleModified);
      cy.wrap(el.find(circleHead)).should("have.text", "head");
      cy.wrap(el.find(circleLetter)).should("have.text", "8");
      cy.wait(500);
      cy.wrap(el).find(circleDefault);
    });
  });

  it("Корректное добавление элемента в tail", () => {
    cy.get(inputValue).type("9");
    cy.contains("Добавить в tail").click();

    cy.get(lastCircle).then((el) => {
      cy.wrap(el.find(circleTail)).should("have.text", "9");
      cy.wrap(el.find(circleTail)).find(circleChanging);
    });

    cy.wait(500);

    cy.get(lastCircle).then((el) => {
      cy.wrap(el).find(circleModified);
      cy.wrap(el.find(circleTail)).should("have.text", "tail");
      cy.wrap(el.find(circleLetter)).should("have.text", "9");
      cy.wait(500);
      cy.wrap(el).find(circleDefault);
    });
  });

  it("Корректное добавление элемента по индексу", () => {
    cy.get(circle).then((el) => {
      cy.wrap(el.length).should("be.ok");
    });

    cy.get(inputIndex).type("2");
    cy.get(inputValue).type("44");
    cy.contains("Добавить по индексу").click();

    cy.get(circle).each((el, index) => {
      if (index === 0) {
        cy.wait(500);
        cy.wrap(el).find(circleChanging);
        cy.wrap(el.find(circleHead)).should("have.text", "44");
      }
      if (index === 1) {
        cy.wait(500);
        cy.wrap(el).find(circleChanging);
        cy.wrap(el.find(circleHead)).should("have.text", "44");
      }
      if (index === 2) {
        cy.wait(500);
        cy.wrap(el).find(circleChanging);
        cy.wrap(el.find(circleHead)).should("have.text", "44");
      }
      if (index === 3) {
        cy.wait(500);
        cy.wrap(el).find(circleChanging);
      }
    });
    cy.get(circle).each((el, index) => {
      if (index === 0) {
        cy.wrap(el.find(circleHead)).should("have.text", "head");
      }
      if (index === 1) {
        cy.wrap(el.find(circleHead)).should("not.have.text", "44");
      }
      if (index === 2) {
        cy.wrap(el).find(circleModified);
      }
    });
    cy.wait(500);
    cy.get(circle).each((el, index) => {
      cy.wrap(el).find(circleDefault);
    });
    cy.get("li:nth-child(3)").then((el) => cy.wrap(el.find(circleLetter)).should("have.text", "44"));
  });
  it("Корректность удаления элемента из head", () => {
    cy.contains("Удалить из head").click();
    cy.get(firstCircle).then((el) => {
      cy.wrap(el.find(circleHead)).should("have.text", "8");
    });
    cy.wait(500);
    cy.get(firstCircle).then((el) => {
      cy.wrap(el.find(circleLetter)).should("not.have.text", "8");
    });
  });
  it("Корректность удаления элемента из tail", () => {
    cy.contains("Удалить из tail").click();
    cy.get(lastCircle).then((el) => {
      cy.wrap(el.find(circleTail)).should("have.text", "9");
    });
    cy.wait(500);
    cy.get(firstCircle).then((el) => {
      cy.wrap(el.find(circleLetter)).should("not.have.text", "9");
    });
  });
  it("Корректность удаления элемента по индексу", () => {
    cy.get("li:nth-child(2)").then((el) => cy.wrap(el.find(circleLetter)).should("have.text", "44"));
    cy.get(inputIndex).type("1");
    cy.contains("Удалить по индексу").click();
    cy.get(circle).each((el, index) => {
      if (index === 0) {
        cy.wrap(el).find(circleChanging);
      }
      if (index === 1) {
        cy.wrap(el).find(circleChanging);
        cy.wait(500);
        cy.wrap(el.find(circleTail)).should("have.text", "44");
        cy.wrap(el.find(circleLetter)).should("not.have.text", "44");
      }
    });
    cy.wait(500);

    cy.get(circle).each((el, index) => {
      if (index === 0) {
        cy.wrap(el).find(circleDefault);
      }
      if (index === 1) {
        cy.wrap(el).find(circleDefault);
      }
    });

    cy.get(circle).then((el) => {
      if (el.find("[class*=circle_circle]").length > 1) {
        cy.get("li:nth-child(2)").then((el) => cy.wrap(el.find(circleLetter)).should("not.have.text", "44"));
      } else {
        cy.get("li:nth-child(1)").should("not.have.text", "44");
      }
    });
  });
});
