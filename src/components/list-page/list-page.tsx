import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { resolve } from "path";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

interface Arr {
  value: string;
  state: ElementStates;
}

interface NodeArr<T> {
  value: T
  next: NodeArr<T> | null
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
  getHead: () => NodeArr<T> | null
  getTail: () => NodeArr<T> | null | undefined
  getElements: () => NodeArr<T>[];
  removeHead: () => void;
  removeTail: () => void;
}

class Node<T> {
  value: T
  next: NodeArr<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}


class LinkedList<T> implements ILinkedList<T> {
  private head: NodeArr<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (curr) {
          if (currIndex === index - 1) {
            node.next = curr.next;
            curr.next = node;
          }
          curr = curr.next;
          currIndex++;
        }
      }
      this.size++;
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      this.head = node
      this.head.next = current
    }
    this.size++
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
  }

  removeHead() {
    if (this.head === null) {
      return null
    }
    if (this.head?.next !== null) {
      this.head = this.head!.next
      this.size--
    } else {
      this.head = null
    }
  }

  removeTail() {
    let curr = this.head
    if (this.head === null) {
      return null
    }
    while (curr) {
      if (curr.next?.next === null) {
        curr.next = null
        this.size--
      }
      curr = curr.next
    }
  }

  getHead() {
    return this.head ? this.head : null
  }

  getTail() {
    let curr = this.head

    while (curr) {

      if (curr.next === null) {
        return curr
      }

      curr = curr.next
    }

  }

  getElements() {
    const arr: NodeArr<T>[] = []
    let curr = this.head;
    while (curr) {
      arr.push(curr)
      curr = curr.next
    }
    return arr
  }
}

const list = new LinkedList<Arr>();

export const ListPage: React.FC = () => {


  const [arr, setArr] = useState<NodeArr<Arr>[]>([])
  const [valueInput, setValueInput] = useState<string | null>(null)
  const [indexInput, setIndexInput] = useState<string | null>(null)
  const [indexChanging, setIndexChanging] = useState<any>(null)
  const [headShow, setHeadShow] = useState<boolean>(false)
  const [tailShow, setTailShow] = useState<boolean>(false)

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value)
  }

  const onChangeIndexValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndexInput(e.currentTarget.value)
  }

  const addOnHeadButtonHandler = async () => {
    setHeadShow(true)
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    setHeadShow(false)
    list.prepend({ value: valueInput!, state: ElementStates.Modified })
    setArr([...list.getElements()])
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    list.getHead()!.value.state = ElementStates.Default
    setArr([...list.getElements()])
    setValueInput('')
  }

  const addOnTailButtonHandler = async () => {
    setTailShow(true)
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    setTailShow(false)
    list.append({ value: valueInput!, state: ElementStates.Modified })
    setArr([...list.getElements()])
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    list.getTail()!.value.state = ElementStates.Default
    setArr([...list.getElements()])
    setValueInput('')
  }

  const removeHeadButtonHandler = () => {
    list.removeHead()
    setArr([...list.getElements()])
  }

  const removeTailButtonHandler = () => {
    list.removeTail()
    setArr([...list.getElements()])
  }

  const addHead = (index: number) => {
    return index === 0 && headShow ?
      <Circle letter={valueInput!} state={ElementStates.Changing} isSmall={true}></Circle>
      : index === 0 ?
        'head' : null
  }

  const addTail = (index: number) => {
    const tailIndex = list.getSize()
    console.log(tailIndex)
    return index === tailIndex - 1 && tailShow ?
      <Circle letter={valueInput!} state={ElementStates.Changing} isSmall={true}></Circle>
      : index === tailIndex - 1 ?
        'tail' : null
  }

  return (
    <SolutionLayout title="Связный список">
      <main className={styles.main}>
        <div className={styles.inputsContainer}>
          <div className={styles.firstContainer}>
            <Input
              extraClass={styles.input}
              placeholder="Введите значение"
              max='4'
              maxLength={4}
              isLimitText={true}
              value={valueInput ? valueInput : ''}
              onChange={onChangeInputValue}
            >
            </Input>
            <Button text="Добавить в head" onClick={addOnHeadButtonHandler} extraClass={styles.buttonFirstContainer}></Button>
            <Button text="Добавить в tail" onClick={addOnTailButtonHandler} extraClass={styles.buttonFirstContainer}></Button>
            <Button text="Удалить из head" onClick={removeHeadButtonHandler} extraClass={styles.buttonFirstContainer}></Button>
            <Button text="Удалить из tail" onClick={removeTailButtonHandler} extraClass={styles.buttonFirstContainer}></Button>
          </div>
          <div className={styles.secondContainer}>
            <Input
              extraClass={styles.input}
              max='4'
              maxLength={4}
              isLimitText={true}
              placeholder='Введите индекс'
              value={indexInput ? indexInput : ''}
              onChange={onChangeIndexValue}
            >
            </Input>
            <Button text="Удалить по индексу" extraClass={styles.buttonSecondContainer}></Button>
            <Button text="Добавить по индексу" extraClass={styles.buttonSecondContainer}></Button>
          </div>
        </div>
        <ul className={styles.circleContainer}>
          {arr && arr.map((el, index) => {
            return (
              <li key={index} className={styles.circleList}>
                <Circle
                  extraClass={styles.circleElement}
                  letter={el.value.value}
                  index={index}
                  head={addHead(index)}
                  tail={addTail(index)}
                  state={el.value.state}>
                </Circle>
                {index < arr.length - 1 ? <ArrowIcon></ArrowIcon> : null}
              </li>
            )
          })}
        </ul>
      </main>
    </SolutionLayout>
  );
};
