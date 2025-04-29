"use client";

import { FC, useState } from "react";
import type { tasks_v1 } from "googleapis/build/src/apis/tasks/v1";
import styles from "./index.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  task_list: tasks_v1.Schema$TaskList[] | undefined;
}

const TaskListBar: FC<Props> = (props) => {
  const { task_list } = props;

  const search_params = useSearchParams();
  const [selected_tab, setSelectedTab] = useState(task_list?.at(0)?.id ?? null);

  const handleClickTab = (tab: string) => {
    setSelectedTab(tab);
  };

  console.log(selected_tab);

  return (
    <ul className={styles.container}>
      <li className={styles.list_item}>
        <Link
          href={{ query: { tab: "favorite" } }}
          replace
          className={styles.item}
          onClick={() => handleClickTab("favorite")}
        >
          ★
        </Link>
      </li>
      {task_list?.map((item) => (
        <li key={item.id} className={styles.list_item}>
          <Link
            href={{ query: { tab: item.id } }}
            replace
            className={styles.item}
            onClick={() => handleClickTab(item.id ?? "")}
          >
            {item.title}
          </Link>
        </li>
      ))}
      <li className={styles.list_item}>
        <button className={styles.item}>+ 새 목록</button>
      </li>
    </ul>
  );
};

export { TaskListBar };
