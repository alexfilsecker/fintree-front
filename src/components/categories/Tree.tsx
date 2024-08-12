// import { type ReactNode } from "react";

import { useEffect, useState, type MutableRefObject } from "react";

import Arrow from "./Arrow";
import CategoryBox from "./CategoryBox";

export type TreeProps = {
  id: number;
  name: string;
  refs: MutableRefObject<Map<number, HTMLDivElement>>;
  treeChildren?: TreeProps[];
};

const Tree = ({ name, treeChildren, refs, id }: TreeProps): JSX.Element => {
  const [parentRef, setParentRef] = useState<HTMLDivElement | undefined>(
    undefined
  );

  useEffect(() => {
    const parentRef = refs.current.get(id);
    setParentRef(parentRef);
  }, [parentRef, setParentRef, refs, id]);

  return (
    <div
      className="flex flex-col"
      ref={(el) => {
        if (el !== null) {
          refs.current.set(id, el);
        }
      }}
    >
      <CategoryBox name={name} />

      {treeChildren !== undefined && (
        <>
          <div className="flex">
            {treeChildren.map((child, index) => {
              const childRef = refs.current.get(child.id);
              return (
                <Arrow parentRef={parentRef} key={index} childRef={childRef} />
              );
            })}
          </div>
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
