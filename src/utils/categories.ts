export type DBCategory = {
  id: number;
  name: string;
  parentId?: number;
};

export type CategoryWithPosition = DBCategory & {
  position: number[];
  childrenIds: number[];
};

const addPosition = (
  categories: DBCategory[]
): Map<number, CategoryWithPosition> => {
  const categoryMap = new Map<number, CategoryWithPosition>();

  // Create a map for quick lookup by id
  categories.forEach((category) => {
    const categoryWithPosition: CategoryWithPosition = {
      ...category,
      position: [],
      childrenIds: [],
    };
    categoryMap.set(category.id, categoryWithPosition);
  });

  const buildPosition = (
    category: CategoryWithPosition,
    parentPosition: number[],
    index: number
  ): void => {
    category.position = [...parentPosition, index];
    const children = categories.filter(
      (child) => child.parentId === category.id
    );
    category.childrenIds = children.map((child) => child.id);
    children.forEach((child, childIndex) => {
      const childWithPosition = categoryMap.get(child.id);
      if (childWithPosition === undefined) {
        console.error(`Category with id ${child.id} not found`);
        return;
      }
      buildPosition(childWithPosition, category.position, childIndex);
    });
  };

  // Process base categories
  categories
    .filter((category) => category.parentId === undefined)
    .forEach((category, index) => {
      const categoryWithPosition = categoryMap.get(category.id);
      if (categoryWithPosition === undefined) {
        console.error(`Category with id ${category.id} not found`);
        return;
      }
      buildPosition(categoryWithPosition, [], index);
    });

  return categoryMap;
};

const categories: DBCategory[] = [
  { id: 1, name: "Category A" },
  { id: 2, name: "Category B" },
  { id: 3, name: "Category C", parentId: 1 },
  { id: 8, name: "Category I", parentId: 1 },
  { id: 4, name: "Category D", parentId: 1 },
  { id: 5, name: "Category E", parentId: 4 },
  { id: 6, name: "Category F", parentId: 4 },
  { id: 7, name: "Category G", parentId: 2 },
];

const categoriesWithPosition = addPosition(categories);
// categoriesWithPosition.forEach((category) => {
//   console.log("name", category.name, "position", category.position);
// });

export { categoriesWithPosition };
