describe("Queue page", () => {
  before(() => {
    cy.visit("http://localhost:3000/queue");
  });
  it("Если в инпуте пусто, то кнопка добавления недоступн", () => {
    cy.get("input").then((el) => cy.wrap(el.val()).should("have.length", "0"));
    cy.contains("Добавить").should("have.attr", "disabled");
    cy.contains("Удалить").should("have.attr", "disabled");
  });
  it("Правильность добавления элемента в очередь", () => {
    cy.get("ul").each((el) => {
      cy.wrap(el.children()).should("have.length", 7);
    });
    cy.get("input").type("1");
    cy.contains("Добавить").click();
    cy.get("li:nth-child(1)").then((el) => {
      cy.wrap(el).find("[class*=circle_changing]");
      cy.wait(500);
      cy.wrap(el).find("[class*=circle_default]");
      cy.wrap(el).find("[class*=text_type_circle]").should("have.text", "1");
      cy.wrap(el).find("[class*=circle_tail]").should("have.text", "tail");
      cy.wrap(el).find("[class*=circle_head]").should("have.text", "head");
    });
    cy.get("input").type("2");
    cy.contains("Добавить").click();
    cy.get("li:nth-child(2)").then((el) => {
      cy.wrap(el).find("[class*=circle_changing]");
      cy.wait(500);
      cy.wrap(el).find("[class*=circle_default]");
      cy.wrap(el).find("[class*=text_type_circle]").should("have.text", "2");
      cy.wrap(el).find("[class*=circle_tail]").should("have.text", "tail");
      cy.wrap(el).find("[class*=circle_head]").should("not.have.text", "head");
    });
    cy.get("li:nth-child(1)").then((el) => {
      cy.wrap(el).find("[class*=circle_head]").should("have.text", "head");
    });
    cy.get("input").type("3");
    cy.contains("Добавить").click();
    cy.get("li:nth-child(3)").then((el) => {
      cy.wrap(el).find("[class*=circle_changing]");
      cy.wait(500);
      cy.wrap(el).find("[class*=circle_default]");
      cy.wrap(el).find("[class*=text_type_circle]").should("have.text", "3");
      cy.wrap(el).find("[class*=circle_tail]").should("have.text", "tail");
      cy.wrap(el).find("[class*=circle_head]").should("not.have.text", "head");
    });
    cy.get("input").type("4");
    cy.contains("Добавить").click();
    cy.get("li:nth-child(4)").then((el) => {
      cy.wrap(el).find("[class*=circle_changing]");
      cy.wait(500);
      cy.wrap(el).find("[class*=circle_default]");
      cy.wrap(el).find("[class*=text_type_circle]").should("have.text", "4");
      cy.wrap(el).find("[class*=circle_tail]").should("have.text", "tail");
      cy.wrap(el).find("[class*=circle_head]").should("not.have.text", "head");
    });
    cy.get("input").type("5");
    cy.contains("Добавить").click();
    cy.get("li:nth-child(5)").then((el) => {
      cy.wrap(el).find("[class*=circle_changing]");
      cy.wait(500);
      cy.wrap(el).find("[class*=circle_default]");
      cy.wrap(el).find("[class*=text_type_circle]").should("have.text", "5");
      cy.wrap(el).find("[class*=circle_tail]").should("have.text", "tail");
      cy.wrap(el).find("[class*=circle_head]").should("not.have.text", "head");
    });
  });
  it("Правильность удаления элемента из очереди", () => {
    cy.contains("Удалить").click();

    cy.get("li:nth-child(1)").then((el) => {
      cy.wrap(el).find("[class*=circle_changing]");
      cy.wait(500);
      cy.wrap(el).find("[class*=circle_default]");
      cy.wrap(el).find("[class*=text_type_circle]").should("not.have.text", "1");
      cy.wrap(el).find("[class*=circle_head]").should("not.have.text", "head");
    });

    cy.get("li:nth-child(2)").then((el) => {
      cy.wrap(el).find("[class*=circle_head]").should("have.text", "head");
    });
    cy.contains("Удалить").click();

    cy.get("li:nth-child(2)").then((el) => {
      cy.wrap(el).find("[class*=circle_changing]");
      cy.wait(500);
      cy.wrap(el).find("[class*=circle_default]");
      cy.wrap(el).find("[class*=text_type_circle]").should("not.have.text", "2");
      cy.wrap(el).find("[class*=circle_head]").should("not.have.text", "head");
    });

    cy.get("li:nth-child(3)").then((el) => {
      cy.wrap(el).find("[class*=circle_head]").should("have.text", "head");
    });
  });
  it("Корректная работа кнопки Очистить", () => {
    cy.get("ul").should("have.text", "01head324354tail56");
    cy.contains("Очистить").click();
    cy.get("ul").should("not.have.text", "01head324354tail56");
    cy.get("li").then((el) => {
      cy.wrap(el.find("[class*=text_type_circle]").text()).should("have.length", "0");
      cy.wrap(el.find("[class*=circle_head]")).should("not.have.text", "head");
      cy.wrap(el.find("[class*=circle_tail]")).should("not.have.text", "tail");
    });
  });
});
// circle_circle  circle_default
// text text_type_circle text_color_input circle_letter
// text text_type_input text_color_input mt-4 circle_absolute__gMyJQ circle_tail60__zOfBi circle_string__pqCwf
// text text_type_input text_color_input mb-4 circle_absolute__gMyJQ circle_head__tXewT circle_string__pqCwf
