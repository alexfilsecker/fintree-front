import { useRouter } from "next/router";
import { useEffect } from "react";

import Home from "@/components/Home";
import { useAppSelector } from "@/hooks/state";

const HomePage = (): JSX.Element => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (userInfo === null) {
      void router.push("/");
    }
  }, [userInfo, router]);

  return <Home />;
};

export default HomePage;
