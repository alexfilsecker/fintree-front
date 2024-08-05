// "use-client";
// import dynamic from "next/dynamic";

import EditCategories from "@/components/categories/EditCategories";

// const Canvas = dynamic(async () => await import("@/components/canvas/Canvas"), {
//   ssr: false,
// });

const EditCategoriesPage = (): JSX.Element => {
  return <EditCategories />;
};

export default EditCategoriesPage;
