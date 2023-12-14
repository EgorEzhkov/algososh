import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


interface Arr {
  value: number | string;
  state: ElementStates;
}

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getHead: () => number;
  getTail: () => number;
  getPrevTail: () => number;
  isEmpty: () => void;
  getElements: () => void;
  isFull: () => boolean;
  clear: () => void;
}

class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private prevTail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }


  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.prevTail = this.tail;
    this.container[this.tail % this.size] = item;
    this.tail = (this.tail + 1) % this.size;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    if (this.length <= this.size) {
      this.container[this.head % this.size] = null;
      this.head = (this.head + 1) % this.size;
      this.length--;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    if (!this.isEmpty()) {
      return this.container[this.head % this.length];
    }
    return null;
  };

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  getPrevTail = () => {
    return this.prevTail
  }

  clear = () => {
    this.tail = 0
    this.head = 0
    this.length = 0
    this.container = Array(this.size);
  }

  isEmpty = () => this.length === 0;

  isFull = () => {
    return this.length >= this.size;
  }

  getElements = () => this.container
}

const queue = new Queue<Arr>(7)

export const QueuePage: React.FC = () => {

  const [arr, setArr] = useState<(Arr | null)[]>([])
  const [inputValue, setInputValue] = useState<string | null>(null)
  const [indexChanging, setIndexChanging] = useState<number | null>(null)
  const [loaderAdd, setLoaderAdd] = useState<boolean>(false)
  const [loaderRemove, setLoaderRemove] = useState<boolean>(false)

  useEffect(() => {
    setArr([...queue.getElements()])
  }, [])

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const addButtonHandler = async () => {
    setLoaderAdd(true)
    setIndexChanging(queue.getTail())
    queue.enqueue({ value: inputValue!, state: ElementStates.Changing })
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    setArr([...queue.getElements()])
    setInputValue('')
    setIndexChanging(null)
    setLoaderAdd(false)
  }

  const removeButtonHandler = async () => {
    setLoaderRemove(true)
    setIndexChanging(queue.getHead())
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS))
    queue.dequeue()
    setArr([...queue.getElements()])
    setIndexChanging(null)
    setLoaderRemove(false)
  }

  const clear = () => {
    queue.clear()
    setArr([...queue.getElements()])
  }

  return (
    <SolutionLayout title="Очередь">
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
            <Button text="Добавить" onClick={addButtonHandler} disabled={!inputValue || queue.isFull()} isLoader={loaderAdd}></Button>
            <Button text="Удалить" onClick={removeButtonHandler} disabled={queue.isEmpty()} isLoader={loaderRemove}></Button>
          </div>
          <div className={styles.secondContainer}>
            <Button text="Очистить" onClick={clear} disabled={queue.isEmpty()}></Button>
          </div>
        </div>
        <ul className={styles.circleContainer}>
          {arr && arr.map((el: Arr | null, index: number) => {
            return (
              <li key={index} className={styles.circleElement}>
                <Circle
                  index={index}
                  letter={el ? String(el.value) : ''}
                  state={indexChanging === index ? ElementStates.Changing : ElementStates.Default}
                  head={el && queue.getHead() === index ? 'head' : ''}
                  tail={el && queue.getPrevTail() === index ? 'tail' : ''}>
                </Circle>
              </li>
            )
          })}
        </ul>
      </main>
    </SolutionLayout>
  );
};
