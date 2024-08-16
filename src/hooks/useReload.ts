import { useEffect, useState } from "react";

const useReload = (categoriesEditHash: string): boolean => {
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(true);
  }, [categoriesEditHash]);

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);

  return reload;
};

export default useReload;
