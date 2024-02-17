describe("list page", () => {
  before(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна, кнопки добавления по индексу и удаления по индексу недоступны тоже", () => {
    cy.get('input[name="Введите значение"]').then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.get('input[name="Введите индекс"]').then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.contains("Добавить в head").should("have.attr", "disabled");
    cy.contains("Добавить в tail").should("have.attr", "disabled");
    cy.contains("Удалить по индексу").should("have.attr", "disabled");
    cy.contains("Добавить по индексу").should("have.attr", "disabled");
  });

  it("Корректная отрисовка дефолтного списка", () => {
    cy.get("ul")
      .then((el) => cy.wrap(el.find("[class*=circle_letter]").text().length))
      .should("be.ok");
    cy.get("li:first-child").then((el) => cy.wrap(el.find("[class*=circle_head]")).should("have.text", "head"));
    cy.get("li:last-child").then((el) => cy.wrap(el.find("[class*=circle_tail]")).should("have.text", "tail"));
  });

  it("Корректное добавление элемента в head", () => {
    cy.get('input[name="Введите значение"]').as("addValue");
    cy.get("@addValue").type("8");
    cy.contains("Добавить в head").click();
    cy.get("li:first-child").then((el) => {
      cy.wrap(el.find("[class*=circle_head]")).should("have.text", "8");
      cy.wrap(el.find("[class*=circle_head]")).find("[class*=circle_changing]");
    });

    cy.wait(500);

    cy.get("li:first-child").then((el) => {
      cy.wrap(el).find("[class*=circle_modified]");
      cy.wrap(el.find("[class*=circle_head]")).should("have.text", "head");
      cy.wrap(el.find("[class*=circle_letter]")).should("have.text", "8");
      cy.wait(500);
      cy.wrap(el).find("[class*=circle_default]");
    });
  });

  it("Корректное добавление элемента в tail", () => {
    cy.get('input[name="Введите значение"]').type("9");
    cy.contains("Добавить в tail").click();

    cy.get("li:last-child").then((el) => {
      cy.wrap(el.find("[class*=circle_tail]")).should("have.text", "9");
      cy.wrap(el.find("[class*=circle_tail]")).find("[class*=circle_changing]");
    });

    cy.wait(500);

    cy.get("li:last-child").then((el) => {
      cy.wrap(el).find("[class*=circle_modified]");
      cy.wrap(el.find("[class*=circle_tail]")).should("have.text", "tail");
      cy.wrap(el.find("[class*=circle_letter]")).should("have.text", "9");
      cy.wait(500);
      cy.wrap(el).find("[class*=circle_default]");
    });
  });

  it("Корректное добавление элемента по индексу", () => {
    cy.get("li").then((el) => {
      cy.wrap(el.length).should("be.ok");
    });

    cy.get('input[name="Введите индекс"]').type("2");
    cy.get('input[name="Введите значение"]').type("44");
    cy.contains("Добавить по индексу").click();

    cy.get("li").each((el, index) => {
      if (index === 0) {
        cy.wait(500);
        cy.wrap(el).find("[class*=circle_changing]");
        cy.wrap(el.find("[class*=circle_head]")).should("have.text", "44");
      }
      if (index === 1) {
        cy.wait(500);
        cy.wrap(el).find("[class*=circle_changing]");
        cy.wrap(el.find("[class*=circle_head]")).should("have.text", "44");
      }
      if (index === 2) {
        cy.wait(500);
        cy.wrap(el).find("[class*=circle_changing]");
        cy.wrap(el.find("[class*=circle_head]")).should("have.text", "44");
      }
      if (index === 3) {
        cy.wait(500);
        cy.wrap(el).find("[class*=circle_changing]");
      }
    });
    cy.get("li").each((el, index) => {
      if (index === 0) {
        cy.wrap(el.find("[class*=circle_head]")).should("have.text", "head");
      }
      if (index === 1) {
        cy.wrap(el.find("[class*=circle_head]")).should("not.have.text", "44");
      }
      if (index === 2) {
        cy.wrap(el).find("[class*=circle_modified]");
      }
    });
    cy.wait(500);
    cy.get("li").each((el, index) => {
      cy.wrap(el).find("[class*=circle_default]");
    });
    cy.get("li:nth-child(3)").then((el) => cy.wrap(el.find("[class*=circle_letter]")).should("have.text", "44"));
  });
  it("Корректность удаления элемента из head", () => {
    cy.contains("Удалить из head").click();
    cy.get("li:first-child").then((el) => {
      cy.wrap(el.find("[class*=circle_head]")).should("have.text", "8");
    });
    cy.wait(500);
    cy.get("li:first-child").then((el) => {
      cy.wrap(el.find("[class*=circle_letter]")).should("not.have.text", "8");
    });
  });
  it("Корректность удаления элемента из tail", () => {
    cy.contains("Удалить из tail").click();
    cy.get("li:last-child").then((el) => {
      cy.wrap(el.find("[class*=circle_tail]")).should("have.text", "9");
    });
    cy.wait(500);
    cy.get("li:first-child").then((el) => {
      cy.wrap(el.find("[class*=circle_letter]")).should("not.have.text", "9");
    });
  });
  it("Корректность удаления элемента по индексу", () => {
    cy.get("li:nth-child(2)").then((el) => cy.wrap(el.find("[class*=circle_letter]")).should("have.text", "44"));
    cy.get('input[name="Введите индекс"]').type("1");
    cy.contains("Удалить по индексу").click();
    cy.get("li").each((el, index) => {
      if (index === 0) {
        cy.wrap(el).find("[class*=circle_changing]");
      }
      if (index === 1) {
        cy.wrap(el).find("[class*=circle_changing]");
        cy.wait(500);
        cy.wrap(el.find("[class*=circle_tail]")).should("have.text", "44");
        cy.wrap(el.find("[class*=circle_letter]")).should("not.have.text", "44");
      }
    });
    cy.wait(500);

    cy.get("li").each((el, index) => {
      if (index === 0) {
        cy.wrap(el).find("[class*=circle_default]");
      }
      if (index === 1) {
        cy.wrap(el).find("[class*=circle_default]");
      }
    });

    cy.get("li").then((el) => {
      if (el.find("[class*=circle_circle]").length > 1) {
        cy.get("li:nth-child(2)").then((el) => cy.wrap(el.find("[class*=circle_letter]")).should("not.have.text", "44"));
      } else {
        cy.get("li:nth-child(1)").should("not.have.text", "44");
      }
    });
  });
});
