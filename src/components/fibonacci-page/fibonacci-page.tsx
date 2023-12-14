import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css'

const delay = async () => {
  await new Promise(resolse => setTimeout(resolse, SHORT_DELAY_IN_MS))
}

const getFibonacciNumbers = async (n: number, arr: number[], setArrr: React.Dispatch<React.SetStateAction<number[]>>, setLoader: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoader(true)
  setArrr([])
  await delay()
  arr = [1]
  setArrr([...arr])
  await delay()
  arr = [1, 1]
  setArrr([...arr])
  for (let i = 2; i <= n; i++) {
    await delay()
    arr[i] = arr[i - 1] + arr[i - 2]
    setArrr([...arr])
  }
  setLoader(false)
}

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number | null>(null)
  const [arr, setArr] = useState<number[]>([])
  const [loader, setLoader] = useState<boolean>(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.currentTarget.value))
  }

  const buttonHandler = () => {
    getFibonacciNumbers(inputValue!, arr, setArr, setLoader)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <main className={styles.main} >
        <div className={styles.inputContainer}>
          <Input onChange={onChange} max={'19'} type='number' isLimitText={true}></Input>
          <div className={styles.button}>
            <Button text="Рассчитать" disabled={!(1 <= inputValue! && inputValue! <= 19)} onClick={buttonHandler} isLoader={loader}></Button>
          </div>
        </div>
        <div className={styles.divContainer}>
          <ul className={styles.circleContainer}>
            {arr && arr.map((el, index) => {

              return (<li key={index} className={styles.circleElement}>
                <Circle letter={`${el}`} index={index}></Circle>
              </li>)
            })}
          </ul>
        </div>
      </main>
    </SolutionLayout>
  );
};
