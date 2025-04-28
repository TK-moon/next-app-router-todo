import { FC } from "react";
import { getTaskClient } from "@/lib/tasks";

const Main: FC = async () => {
  const tasks = await getTaskClient();
  const list = await tasks.tasklists.list();

  console.log(list.data.items);

  return <div></div>;
};

export { Main };
