import React, { useState } from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css'

export const SortingPage: React.FC = () => {

  const [radioSelect, setRadioSelect] = useState("Выбор")

  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioSelect(e.target.value)
  }


  const onChangeRadio = (radio: boolean, setRadio: React.Dispatch<React.SetStateAction<boolean>>) => {
    setRadio(!radio)

  }



  return (
    <SolutionLayout title="Сортировка массива">
      <main className={styles.main}>
        <div className={styles.settingsContainer}>
          <div className={styles.radioInput}>
            <RadioInput label="Выбор" name="sort" value='Выбор' onChange={onOptionChange} defaultChecked></RadioInput>
            <RadioInput label="Пузырёк" name='sort' value='Пузырёк' onChange={onOptionChange} ></RadioInput>
            {console.log(radioSelect)}
          </div>
          <div className={styles.typeSortContainer}>
            <Button text="По возрастанию" sorting={Direction.Ascending} extraClass={styles.btn}></Button>
            <Button text='По убыванию' sorting={Direction.Descending} extraClass={styles.btn}></Button>
          </div>
          <div>
            <Button text="Новый массив" extraClass={styles.btn}></Button>
          </div>
        </div>
      </main>
    </SolutionLayout>
  );
};
