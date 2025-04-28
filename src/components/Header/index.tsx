"use client";

import clsx from "clsx";
import { ComponentProps, FC } from "react";
import styles from "./index.module.css";
import { signOut } from "next-auth/react";

interface Props extends ComponentProps<"header"> {
  user_name: string | undefined;
  authenticated: boolean;
}

const Header: FC<Props> = (props) => {
  const { user_name, authenticated, className, ...rest } = props;

  return (
    <header className={clsx(styles.container, className)} {...rest}>
      <div>{user_name}</div>
      {authenticated && (
        <div>
          <button onClick={() => signOut()}>Signout</button>
        </div>
      )}
    </header>
  );
};

export { Header };
