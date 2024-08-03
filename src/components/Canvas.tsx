import { Stage, Layer, Circle } from "react-konva";

const Canvas = (): JSX.Element => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Circle x={200} y={100} radius={50} fill="green" />
      </Layer>
    </Stage>
  );
};

export default Canvas;
