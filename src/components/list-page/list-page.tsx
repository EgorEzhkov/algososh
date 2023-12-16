import React, { useEffect, useState } from "react";
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
  removeHead: () => void;
  removeTail: () => void;
  deleteAt: (index: number) => void;
  getSize: () => number;
  getHead: () => NodeArr<T> | null
  getTail: () => NodeArr<T> | null | undefined
  getElements: () => NodeArr<T>[];
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

  deleteAt(index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      if (index === 0) {
        if (this.head?.next !== null) {
          this.head = this.head!.next
        } else {
          this.head = null
        }
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (curr) {
          if (currIndex === index - 1) {
            console.log(curr)
            curr.next = curr.next!.next
          }
          curr = curr.next;
          currIndex++;
        }
      }
      this.size--
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

  removeHead() {
    if (this.head === null) {
      return null
    }
    if (this.head?.next !== null) {
      this.head = this.head!.next
      this.size--
    } else {
      this.head = null
      this.size--
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
  const [headShow, setHeadShow] = useState<boolean>(false)
  const [tailShow, setTailShow] = useState<boolean>(false)
  const [circleValue, setCircleValue] = useState<number | string | null>(null)
  const [indexChanging, setIndexChanging] = useState<number | null>(null)
  const [loaderAddHead, setLoaderAddHead] = useState<boolean>(false)
  const [loaderAddTail, setLoaderAddTail] = useState<boolean>(false)
  const [loaderRemoveHead, setLoaderRemoveHead] = useState<boolean>(false)
  const [loaderRemoveTail, setLoaderRemoveTail] = useState<boolean>(false)
  const [loaderInsertAt, setLoaderInsertAt] = useState<boolean>(false)
  const [loaderRemoveAt, setLoaderRemoveAt] = useState<boolean>(false)

  useEffect(() => {
    const firstArr = [...new Array(Math.floor(Math.random() * (5)) + 1)]
      .map(() => Math.round(Math.random() * 6))
    firstArr.forEach((el) => {
      list.append({ value: String(el), state: ElementStates.Default })
      setArr([...list.getElements()])
    })
  }, [])

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value)
  }

  const onChangeIndexValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndexInput(e.currentTarget.value)
  }

  const addOnHeadButtonHandler = async () => {
    setLoaderAddHead(true)
    setValueInput('')
    setHeadShow(true)
    setCircleValue(valueInput)
    setIndexChanging(0)
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    setHeadShow(false)
    setCircleValue(null)
    setIndexChanging(null)
    list.prepend({ value: valueInput!, state: ElementStates.Modified })
    setArr([...list.getElements()])
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    list.getHead()!.value.state = ElementStates.Default
    setArr([...list.getElements()])
    setLoaderAddHead(false)
  }

  const addOnTailButtonHandler = async () => {
    setLoaderAddTail(true)
    setValueInput('')
    setTailShow(true)
    setCircleValue(valueInput)
    setIndexChanging(list.getSize() - 1)
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    setTailShow(false)
    setCircleValue(null)
    setIndexChanging(null)
    list.append({ value: valueInput!, state: ElementStates.Modified })
    setArr([...list.getElements()])
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    list.getTail()!.value.state = ElementStates.Default
    setArr([...list.getElements()])
    setLoaderAddTail(false)
  }

  const insertAtButtonHandler = async (element: Arr, index: number) => {
    setLoaderInsertAt(true)
    let count = 0
    setIndexInput('')
    setValueInput('')
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    while (index >= count) {
      setHeadShow(true)
      list.getElements()[count].value.state = ElementStates.Changing
      setArr([...list.getElements()])
      setIndexChanging(count)
      setCircleValue(element.value)
      count++
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    }
    list.insertAt(element, index)
    setArr([...list.getElements()])
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    while (count !== -1) {
      list.getElements()[count].value.state = ElementStates.Default
      setArr([...list.getElements()])
      count--
    }
    setArr([...list.getElements()])
    setHeadShow(false)
    setLoaderInsertAt(false)
  }

  const removeAtIndexButtonHandler = async (index: number) => {
    setLoaderRemoveAt(true)
    let count = 0
    setIndexInput('')
    while (index >= count) {
      list.getElements()[count].value.state = ElementStates.Changing
      setArr([...list.getElements()])
      setIndexChanging(count)
      count++
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    }
    setTailShow(true)
    setCircleValue(list.getElements()[index].value.value)
    list.getElements()[index].value.value = ''
    setArr([...list.getElements()])
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    list.deleteAt(index)
    setArr([...list.getElements()])
    setTailShow(false)
    count -= 2
    while (count !== -1) {
      list.getElements()[count].value.state = ElementStates.Default
      setArr([...list.getElements()])
      count--
    }
    setArr([...list.getElements()])
    setTailShow(false)
    setLoaderRemoveAt(false)
  }

  const removeHeadButtonHandler = async () => {
    setLoaderRemoveHead(true)
    setHeadShow(true)
    setIndexChanging(0)
    setCircleValue(list.getHead()!.value.value)
    list.getHead()!.value.value = ''
    setArr([...list.getElements()])
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    list.removeHead()
    setArr([...list.getElements()])
    setHeadShow(false)
    setCircleValue(null)
    setIndexChanging(null)
    setLoaderRemoveHead(false)
  }

  const removeTailButtonHandler = async () => {
    setLoaderRemoveTail(true)
    setTailShow(true)
    setIndexChanging(list.getSize() - 1)
    setCircleValue(list.getTail()!.value.value)
    list.getTail()!.value.value = ''
    setArr([...list.getElements()])
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    list.removeTail()
    setArr([...list.getElements()])
    setTailShow(false)
    setCircleValue(null)
    setIndexChanging(null)
    setLoaderRemoveTail(false)
  }

  const addHead = (index: number) => {
    return index === indexChanging && headShow ?
      <Circle letter={String(circleValue)} state={ElementStates.Changing} isSmall={true}></Circle>
      : index === 0 ?
        'head' : null
  }

  const addTail = (index: number) => {
    const tailIndex = list.getSize()
    return index === indexChanging && tailShow ?
      <Circle letter={String(circleValue)} state={ElementStates.Changing} isSmall={true}></Circle>
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
            <Button
              text="Добавить в head"
              onClick={addOnHeadButtonHandler}
              extraClass={styles.buttonFirstContainer}
              disabled={!valueInput || loaderAddTail || loaderInsertAt || loaderRemoveAt || loaderRemoveHead || loaderRemoveTail || loaderAddHead}
              isLoader={loaderAddHead}

            ></Button>
            <Button text="Добавить в tail"
              onClick={addOnTailButtonHandler}
              extraClass={styles.buttonFirstContainer}
              disabled={!valueInput || loaderInsertAt || loaderRemoveAt || loaderRemoveHead || loaderRemoveTail || loaderAddHead}
              isLoader={loaderAddTail}
            ></Button>
            <Button text="Удалить из head"
              onClick={removeHeadButtonHandler}
              extraClass={styles.buttonFirstContainer}
              disabled={!(list.getElements().length > 0) || loaderAddTail || loaderInsertAt || loaderRemoveAt || loaderRemoveTail || loaderAddHead}
              isLoader={loaderRemoveHead}
            ></Button>
            <Button text="Удалить из tail"
              onClick={removeTailButtonHandler}
              extraClass={styles.buttonFirstContainer}
              disabled={!(list.getElements().length > 0) || loaderAddTail || loaderInsertAt || loaderRemoveAt || loaderRemoveHead || loaderAddHead}
              isLoader={loaderRemoveTail}
            ></Button>
          </div>
          <div className={styles.secondContainer}>
            <Input
              extraClass={styles.input}
              type={'number'}
              max={list.getSize() - 1}
              min={arr && 0}
              placeholder='Введите индекс'
              value={indexInput ? indexInput : ''}
              onChange={onChangeIndexValue}
            >
            </Input>
            <Button
              text="Удалить по индексу"
              extraClass={styles.buttonSecondContainer}
              onClick={() => removeAtIndexButtonHandler(Number(indexInput!))}
              isLoader={loaderRemoveAt}
              disabled={!indexInput || loaderAddTail || loaderInsertAt || loaderRemoveHead || loaderRemoveTail || loaderAddHead || arr.length < 1 || list.getSize() - 1 < Number(indexInput) || Number(indexInput) < 0}
            ></Button>
            <Button
              text="Добавить по индексу"
              extraClass={styles.buttonSecondContainer}
              onClick={() =>
                insertAtButtonHandler({ value: valueInput!, state: ElementStates.Modified }, Number(indexInput))}
              isLoader={loaderInsertAt}
              disabled={!indexInput || loaderAddTail || loaderRemoveAt || loaderRemoveHead || loaderRemoveTail || loaderAddHead || arr.length < 1 || list.getSize() - 1 < Number(indexInput) || Number(indexInput) < 0}
            ></Button>
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
