import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './string.module.css'
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

interface Arr {
  value: string
  state: ElementStates
}

const swap = (arr: Arr[], firstIndex: number, secondIndex: number) => {
  let tmp = arr[firstIndex]
  arr[firstIndex] = arr[secondIndex]
  arr[secondIndex] = tmp
  return arr
}

export const StringComponent: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [arr, setArr] = useState<Arr[]>([])
  const [input, setInput] = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const reverseString = async (arr: Arr[], setArr: React.Dispatch<React.SetStateAction<Arr[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    let mid = Math.ceil(arr.length / 2)
    let end = arr.length - 1
    for (let i = 0; i < mid; i++) {
      let j = end - i;
      [arr[i].state, arr[j].state] = [ElementStates.Changing, ElementStates.Changing];
      setArr([...arr]);
      await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
      swap(arr, i, j);
      [arr[i].state, arr[j].state] = [ElementStates.Modified, ElementStates.Modified];
      setArr([...arr]);
    }

    setLoading(false)
  }

  

  const buttonHandler = () => {
    const arr = input.split('').map((value => ({ value, state: ElementStates.Default })));
    setArr([...arr])
    reverseString(arr, setArr, setLoading)
  }

  return (
    <SolutionLayout title="Строка">
      <main className={styles.main}>
        <div className={styles.inputContainer}>
          <Input maxLength={11} isLimitText={true} onChange={onChange}></Input>
          <div className={styles.button} >
            <Button text="Развернуть" onClick={buttonHandler} isLoader={loading} disabled={input.length ? false : true}></Button>
          </div>
        </div>
        <div>
          <ul className={styles.circleList}>
            {arr && arr.map((el, index) => {
              return (
                <li key={index} className={styles.circleElement}>
                  <Circle letter={el.value} state={el.state}>
                  </Circle>
                </li>
              )
            })}
          </ul>
        </div>
      </main>
    </SolutionLayout>
  );
};
