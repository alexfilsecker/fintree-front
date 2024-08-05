// import { type ReactNode } from "react";

import { type MutableRefObject } from "react";

import CategoryBox from "./CategoryBox";

export type TreeProps = {
  id: number;
  name: string;
  refs: MutableRefObject<Map<number, HTMLDivElement>>;
  treeChildren?: TreeProps[];
};

const Tree = ({ name, treeChildren, refs, id }: TreeProps): JSX.Element => {
  return (
    <div
      className="flex flex-col gap-5"
      ref={(el) => {
        if (el !== null) {
          refs.current.set(id, el);
        }
      }}
    >
      <CategoryBox name={name} />
      {treeChildren !== undefined && (
        <>
          <div className="flex gap-3">
            {treeChildren.map((child, index) => {
              return (
                <Tree
                  id={child.id}
                  key={index}
                  name={child.name}
                  treeChildren={child.treeChildren}
                  refs={refs}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Tree;
