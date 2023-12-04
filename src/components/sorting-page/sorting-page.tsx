import React from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css'

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <main className={styles.main}>
        <div className={styles.settingsContainer}>
          <div className={styles.radioInput}>

            <RadioInput label="Выбор" checked={false}></RadioInput>
            <RadioInput label="Массив"></RadioInput>

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
