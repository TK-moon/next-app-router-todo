import { FC } from "react";
import { getTaskClient } from "@/lib/tasks";
import { TaskListBar } from "./TaskListBar";

const Main: FC = async () => {
  const tasks = await getTaskClient();
  const list = await tasks.tasklists.list();

  await tasks.tasks.list({ tasklist: list.data.items?.at(0)?.id ?? "" });

  return (
    <>
      <TaskListBar task_list={list.data.items} />
    </>
  );
};

export { Main };
