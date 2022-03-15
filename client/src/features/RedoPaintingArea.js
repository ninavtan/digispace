import React, {useEffect} from "react";
import Konva from "konva";
import { Image, Rect } from "react-konva";


const initCanvas = (width, height) => {
  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  return { canvas, canvasContext };
};

const RedoPaintingArea = (props) => {
  const { canvas, canvasContext } = initCanvas(props.width, props.height);

  const width = '500px';
  const height = '500px';

  // let stage;
  // stage = this.image.getStage();
  // console.log(stage);

  const startPainting = () => {
    console.log('painting');
  }

  useEffect(() => {
    this.image.on("mousedown touchstart", startPainting);

  }, []);

  return (
    <div className="painting-container">
      <Image
       width={width}
       height={height}
       image={canvas}
       stroke={"green"}
       ref={node => {
        this.image = node;
      }}
      />



    </div>
  )
}

export default RedoPaintingArea;
