import renderer from "react-test-renderer";
import { ElementStates } from "../../../../types/element-states";
import { Button } from "../../button/button";

import { Circle } from "../circle";

describe("Тестирование компонента Circle", () => {
  it("Circle правильно отображается без буквы", () => {
    const circle = renderer.create(<Circle></Circle>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle правильно отображается c буквами", () => {
    const circle = renderer.create(<Circle letter="asdf"></Circle>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle правильно отображается c head", () => {
    const circle = renderer.create(<Circle head="asdf"></Circle>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle правильно отображается c react-элементом в head", () => {
    const circle = renderer.create(<Circle head={<Button />}></Circle>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle правильно отображается c tail", () => {
    const circle = renderer.create(<Circle tail="asdf"></Circle>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle правильно отображается c react-элементом в tail", () => {
    const circle = renderer.create(<Circle tail={<Button />}></Circle>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle правильно отображается c пропом isSmall ===  true", () => {
    const circle = renderer.create(<Circle isSmall={true}></Circle>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle правильно отображается в состоянии changing", () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing}></Circle>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle правильно отображается в состоянии default", () => {
    const circle = renderer.create(<Circle state={ElementStates.Default}></Circle>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Circle правильно отображается в состоянии modified", () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified}></Circle>).toJSON();
    expect(circle).toMatchSnapshot();
  });
});
