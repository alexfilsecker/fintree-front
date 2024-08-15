// import { type ReactNode } from "react";

import { useEffect, useState, type MutableRefObject } from "react";

import Arrow from "./Arrows";
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

  const childrenRefs = treeChildren?.map((child) => refs.current.get(child.id));

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
      <Arrow parentRef={parentRef} childrenRefs={childrenRefs} />

      {treeChildren !== undefined && (
        <>
          <div className="flex gap-3 justify-center">
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
