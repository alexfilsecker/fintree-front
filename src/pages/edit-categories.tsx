"use-client";
import dynamic from "next/dynamic";

const Canvas = dynamic(async () => await import("@/components/Canvas"), {
  ssr: false,
});

const EditCategories = (): JSX.Element => {
  return <Canvas />;
};

export default EditCategories;
