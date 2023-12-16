import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clear: () => void;
  getElements: () => T[];
}

interface Arr {
  value: string;
  state: ElementStates;
}

class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.container.length > 0) {
      return this.container[this.container.length - 1];
    }

    return null;
  };

  getSize = () => this.container.length;

  getElements = () => this.container

  clear = () => this.container = []
}

const stack = new Stack<Arr>()

export const StackPage: React.FC = () => {

  const [arr, setArr] = useState<Arr[]>([])
  const [inputValue, setInputValue] = useState<string | null>(null)

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const buttonAddHandler = async () => {
    stack.push({ value: inputValue!, state: ElementStates.Changing })
    setInputValue('')
    setArr([...stack.getElements()])
    await new Promise(resolve => setTimeout(resolve, 500))
    stack.peak()!.state = ElementStates.Default
    setArr([...stack.getElements()])
  }

  const buttonRemoveHandler = () => {
    stack.pop()
    setArr([...stack.getElements()])
  }

  const buttonClearHandler = () => {
    stack.clear()
    setArr([])
  }

  const setPositionHead = (index: number, arr: Arr[]) => {
    return index === arr.length - 1 ? 'top' : ''
  }

  return (
    <SolutionLayout title="Стек">
      <main className={styles.main}>
        <div className={styles.inputContainer}>
          <div className={styles.firstContainer}>
            <Input
              extraClass={styles.input}
              max='4'
              maxLength={4}
              isLimitText={true}
              onChange={onChangeInput}
              value={inputValue ? inputValue : ''}
            >
            </Input>
            <Button text="Добавить" disabled={!(inputValue!?.length > 0)} onClick={buttonAddHandler}></Button>
            <Button text="Удалить" disabled={!(arr.length > 0)} onClick={buttonRemoveHandler}></Button>
          </div>
          <div className={styles.secondContainer}>
            <Button text="Очистить" onClick={buttonClearHandler}></Button>
          </div>
        </div>
        <ul className={styles.circleContainer}>
          {arr && arr.map((el, index) => {
            return (
              <li key={index} className={styles.circleElement}>
                <Circle index={index} state={el.state} letter={el.value} head={setPositionHead(index, arr)}>

                </Circle>
              </li>
            )
          })}
        </ul>
      </main>
    </SolutionLayout >
  );
};
