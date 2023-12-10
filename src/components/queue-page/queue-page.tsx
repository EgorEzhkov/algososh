import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";

interface Arr {
  value: number;
  state: ElementStates;
}

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
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
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    if (this.length <= this.size) {
      this.container[this.head % this.size] = null;
      this.length--;
      this.head++;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    if (!this.isEmpty()) {
      console.log(this.container);
      return this.container[this.head % this.length];
    }
    return null;
  };

  isEmpty = () => this.length === 0;

  getElements = () => this.container
}

const queue = new Queue<Arr>(7)

export const QueuePage: React.FC = () => {

  const [arr, setArr] = useState<Arr[] | any[]>([])

  const lal = () => {
    setArr(queue.getElements())

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


            >
            </Input>
            <Button text="Добавить" onClick={lal} ></Button>
            <Button text="Удалить" ></Button>
          </div>
          <div className={styles.secondContainer}>
            <Button text="Очистить"></Button>
          </div>
        </div>
        <ul className={styles.circleContainer}>
          {arr && arr.map((el, index) => {
            return (
              <li key={index} className={styles.circleElement}>
                <Circle index={index} state={el.state}>

                </Circle>
              </li>
            )
          })}
        </ul>
      </main>
    </SolutionLayout>
  );
};
