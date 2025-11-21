"use client";

import { trpc } from "@/utils/trpc";

const TopPage = () => {
  const { data } = trpc.userRouter.getUser.useQuery(undefined, {
    retry: false,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ fontSize: "4rem" }}>Hello, {data?.userName}!</h1>
    </div>
  );
};

export default TopPage;
