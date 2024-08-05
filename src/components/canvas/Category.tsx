import { useEffect, useRef, useState } from "react";
import { Group, Rect, Text } from "react-konva";

import type Konva from "konva";

type CategoryProps = {
  name: string;
  centerX: number;
  centerY: number;
  ref: (el: Konva.Rect | null) => void;
};

const Category = ({
  name,
  centerX,
  centerY,
  ref,
}: CategoryProps): JSX.Element => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [textX, setTextX] = useState(0);
  const [textY, setTextY] = useState(0);
  const [groupX, setGroupX] = useState(0);
  const [groupY, setGroupY] = useState(0);

  const padX = 20;
  const padY = 20;

  const textRef = useRef<Konva.Text>(null);
  const textWidth = textRef.current?.width() ?? 0;
  const textHeight = textRef.current?.height() ?? 0;

  useEffect(() => {
    setWidth(textWidth + padX * 2);
    setHeight(textHeight + padY * 2);
    setTextX(padX);
    setTextY(padY);
  }, [textWidth, textHeight]);

  useEffect(() => {
    setGroupX(centerX - width / 2);
    setGroupY(centerY - height / 2);
  }, [centerX, centerY, width, height]);

  return (
    <Group x={groupX} y={groupY} draggable>
      <Rect
        width={width}
        height={height}
        fill={"#AAAAAA"}
        cornerRadius={10}
        ref={ref}
      />
      <Text
        x={textX}
        y={textY}
        text={name}
        fontSize={20}
        fill={"#000000"}
        align={"center"}
        verticalAlign={"middle"}
        ref={textRef}
      />
    </Group>
  );
};

export default Category;
