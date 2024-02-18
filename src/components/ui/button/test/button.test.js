import renderer from "react-test-renderer";
import { Button } from "../button";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Корректное отображение компонента Button", () => {
  it("Button правильно отображается с текстом", () => {
    const button = renderer.create(<Button text="Пупупу"></Button>).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Button правильно отображается без текста", () => {
    const button = renderer.create(<Button></Button>).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Button правильно отображается при блокировки кнопки", () => {
    const button = renderer.create(<Button disabled={true}></Button>).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Button правильно отображается с индикацией загрузки", () => {
    const button = renderer.create(<Button isLoader={true}></Button>).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Button правильно отображается при вызове колбека при клике", () => {
    window.alert = jest.fn();
    render(<Button text="Нажми" onClick={() => alert("пупупу")}></Button>);
    const button = screen.getByText("Нажми");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("пупупу");
  });
});
