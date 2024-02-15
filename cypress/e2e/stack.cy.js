describe("stack page", () => {
  before(() => {
    cy.visit("http://localhost:3000/stack");
  });
  it("Если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("input").then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.contains("Добавить").should("have.attr", "disabled");
    cy.contains("Удалить").should("have.attr", "disabled");
  });

  it("Правильность добавления элемента в стек", () => {
    cy.get("ul").then((el) => cy.wrap(el.text()).should("have.length", "0"));
    cy.get("input").type("1");
    cy.contains("Добавить").click();
    cy.get("li:last-child").then((el) => {
      cy.wrap(el).find("[class*=circle_changing]");
      cy.wait(500);
      cy.wrap(el).find("[class*=circle_default]");
      cy.wrap(el.find("[class*=circle_head]")).should("have.text", "top");
      cy.wrap(el.find("[class*=circle_letter]")).should("have.text", "1");
      cy.wrap(el.find("[class*=circle_index]")).should("have.text", "0");
    });
    cy.get("input").type("2");
    cy.contains("Добавить").click();

    cy.get("li:first-child").then((el) => {
      cy.wrap(el.find("[class*=circle_head]")).should("not.have.text", "top");
      cy.wrap(el.find("[class*=circle_letter]")).should("have.text", "1");
    });

    cy.get("li:last-child").then((el) => {
      cy.wrap(el).find("[class*=circle_changing]");
      cy.wait(500);
      cy.wrap(el).find("[class*=circle_default]");
      cy.wrap(el.find("[class*=circle_head]")).should("have.text", "top");
      cy.wrap(el.find("[class*=circle_letter]")).should("have.text", "2");
      cy.wrap(el.find("[class*=circle_index]")).should("have.text", "1");
    });

    cy.get("input").type("3");
    cy.contains("Добавить").click();

    cy.get("li:nth-child(2)").then((el) => {
      cy.wrap(el.find("[class*=circle_head]")).should("not.have.text", "top");
      cy.wrap(el.find("[class*=circle_letter]")).should("have.text", "2");
    });

    cy.get("li:last-child").then((el) => {
      cy.wrap(el).find("[class*=circle_changing]");
      cy.wait(500);
      cy.wrap(el).find("[class*=circle_default]");
      cy.wrap(el.find("[class*=circle_head]")).should("have.text", "top");
      cy.wrap(el.find("[class*=circle_letter]")).should("have.text", "3");
      cy.wrap(el.find("[class*=circle_index]")).should("have.text", "2");
    });

    cy.get("input").type("4");
    cy.contains("Добавить").click();

    cy.get("li:nth-child(3)").then((el) => {
      cy.wrap(el.find("[class*=circle_head]")).should("not.have.text", "top");
      cy.wrap(el.find("[class*=circle_letter]")).should("have.text", "3");
    });

    cy.get("li:last-child").then((el) => {
      cy.wrap(el).find("[class*=circle_changing]");
      cy.wait(500);
      cy.wrap(el).find("[class*=circle_default]");
      cy.wrap(el.find("[class*=circle_head]")).should("have.text", "top");
      cy.wrap(el.find("[class*=circle_letter]")).should("have.text", "4");
      cy.wrap(el.find("[class*=circle_index]")).should("have.text", "3");
    });
  });

  it("Правильность удаления элемента из стека", () => {
    cy.get("ul").then((el) => cy.wrap(el.find("[class*=circle_letter]")).should("have.length", "4"));

    cy.contains("Удалить").click();

    cy.get("ul").then((el) => cy.wrap(el.find("[class*=circle_letter]")).should("have.length", "3"));

    cy.get("ul").then((el) => cy.wrap(el.find("[class*=circle_letter]")).should("not.have.text", "4"));

    cy.get("li:last-child").then((el) => {
      cy.wrap(el.find("[class*=circle_head]")).should("have.text", "top");
      cy.wrap(el.find("[class*=circle_letter]")).should("have.text", "3");
      cy.wrap(el.find("[class*=circle_index]")).should("have.text", "2");
    });
  });

  it("Правильность работы кнопки Очистить", () => {
    cy.get("ul").then((el) => cy.wrap(el.find("[class*=circle_letter]")).should("have.length", "3"));

    cy.contains("Очистить").click();

    cy.get("ul").then((el) => cy.wrap(el.find("[class*=circle_letter]")).should("have.length", "0"));

    cy.get("input").then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.contains("Добавить").should("have.attr", "disabled");
    cy.contains("Удалить").should("have.attr", "disabled");
  });
});
