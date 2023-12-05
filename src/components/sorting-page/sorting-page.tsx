import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';

const swap = (arr: Arr[], firstIndex: number, secondIndex: number) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

interface Arr {
  value: number;
  state: ElementStates;
};

const selectionSort = async (arr: Arr[], setArr: React.Dispatch<React.SetStateAction<Arr[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    arr[maxInd].state = ElementStates.Changing;
    setArr([...arr]);
    for (let j = i + 1; j < length; j++) {
      arr[j].state = ElementStates.Changing;
      setArr([...arr]);
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      if (arr[maxInd].value > arr[j].value) {
        maxInd = j;
      };
      arr[j].state = ElementStates.Default;
      setArr([...arr]);
    }
    if (maxInd !== i) {
      swap(arr, maxInd, i);
      arr[i].state = ElementStates.Modified;
      setArr([...arr]);
    }
    [arr[maxInd].state, arr[i + 1].state, arr[i].state] = [ElementStates.Default, ElementStates.Modified, ElementStates.Modified];
    setArr([...arr]);
  }
  setLoading(false);
};

export const SortingPage: React.FC = () => {

  const [radioSelect, setRadioSelect] = useState("Выбор");
  const [arr, setArr] = useState<Arr[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioSelect(e.target.value);
  };

  const randomArr = () => {
    return [...new Array(Math.floor(Math.random() * (17 - 3 + 1)) + 3)]
      .map(() => {
        return {
          value: Math.round(Math.floor(Math.random() * (100 - 0 + 1))),
          state: ElementStates.Default
        };
      });
  };

  const newArrButtonHandler = () => {
    const newArr = randomArr();
    setArr(newArr);
  };

  const sortArrButtonHandler = () => {
    if (radioSelect === "Выбор") {
      selectionSort(arr, setArr, setLoading)
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <main className={styles.main}>
        <div className={styles.settingsContainer}>
          <div className={styles.radioInput}>
            <RadioInput
              label="Выбор"
              name="sort"
              value='Выбор'
              onChange={onChangeRadio}
              defaultChecked>
            </RadioInput>
            <RadioInput
              label="Пузырёк"
              name='sort'
              value='Пузырёк'
              onChange={onChangeRadio}>
            </RadioInput>
          </div>
          <div className={styles.typeSortContainer}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              extraClass={styles.btn}
              onClick={sortArrButtonHandler}
              isLoader={loading}></Button>
            <Button
              text='По убыванию'
              sorting={Direction.Descending}
              extraClass={styles.btn}
              disabled={loading}></Button>
          </div>
          <div>
            <Button
              text="Новый массив"
              extraClass={styles.btn}
              onClick={newArrButtonHandler}
              disabled={loading}>
            </Button>
          </div>
        </div>
        <div >
          <ul className={styles.columnContainer}>
            {arr && arr.map((el: Arr, index: number) => {
              return (
                <li className={styles.columnElement} key={index}>
                  <Column index={el.value} state={el.state}></Column>
                </li>
              )
            })}
          </ul>
        </div>
      </main>
    </SolutionLayout>
  );
};
