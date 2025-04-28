"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  session: Session | null;
}

const Providers: FC<Props> = (props) => {
  const { session, children } = props;

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export { Providers };
