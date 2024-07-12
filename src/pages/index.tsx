import { useRouter } from "next/router";
import { useEffect } from "react";

import Login from "@/components/login/login";
import { useAppSelector } from "@/hooks/state";

const Index = (): JSX.Element => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (userInfo !== null) {
      void router.push("/home");
    }
  }, [userInfo, router]);

  return <Login />;
};

export default Index;
