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

const selectionSort = async (arr: Arr[], setArr: React.Dispatch<React.SetStateAction<Arr[]>>, setLoader: React.Dispatch<React.SetStateAction<boolean>>, increasing: boolean) => {
  setLoader(true);
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    arr[maxInd].state = ElementStates.Changing;
    setArr([...arr]);
    for (let j = i + 1; j < length; j++) {
      arr[j].state = ElementStates.Changing;
      setArr([...arr]);
      await new Promise(resolve => setTimeout(resolve, 20));
      if (increasing === true) {
        if (arr[maxInd].value > arr[j].value) {
          maxInd = j;
        }
      }
      if (increasing === false) {
        if (arr[maxInd].value < arr[j].value) {
          maxInd = j;
        }
      }
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
  setLoader(false);
};

export const SortingPage: React.FC = () => {

  const [radioSelect, setRadioSelect] = useState("Выбор");
  const [arr, setArr] = useState<Arr[]>([]);
  const [loaderIncreasing, setLoaderIncreasing] = useState<boolean>(false)
  const [loaderDescending, setLoaderDescending] = useState<boolean>(false)

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

  const sortArrButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (radioSelect === "Выбор") {
      if (e.currentTarget.value === 'По убыванию') {
        selectionSort(arr, setArr, setLoaderDescending, false);
      } else {
        selectionSort(arr, setArr, setLoaderIncreasing, true);
      }
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
              defaultChecked
              disabled={loaderDescending || loaderIncreasing}>
            </RadioInput>
            <RadioInput
              label="Пузырёк"
              name='sort'
              value='Пузырёк'
              onChange={onChangeRadio}
              disabled={loaderDescending || loaderIncreasing}>
            </RadioInput>
          </div>
          <div className={styles.typeSortContainer}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              extraClass={styles.btn}
              value='По возрастанию'
              onClick={(e) => { sortArrButtonHandler(e) }}
              isLoader={loaderIncreasing}
              disabled={loaderDescending}
            ></Button>
            <Button
              text='По убыванию'
              sorting={Direction.Descending}
              extraClass={styles.btn}
              value='По убыванию'
              onClick={(e) => { sortArrButtonHandler(e) }}
              isLoader={loaderDescending}
              disabled={loaderIncreasing}
            ></Button>
          </div>
          <div>
            <Button
              text="Новый массив"
              extraClass={styles.btn}
              onClick={newArrButtonHandler}
              disabled={loaderDescending || loaderIncreasing}>
            </Button>
          </div>
        </div>
        <div>
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
