import React, { Component } from "react";
import Konva from "konva";
import { Image, Rect } from "react-konva";
import { Html } from 'react-konva-utils';


const initCanvas = (width, height) => {
  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  return { canvas, canvasContext };
};

const getToolStyle = tool => {
  switch (tool) {
    case "felt-tip":
      return {
        lineCap: "round",
        lineJoin: "round",
        lineWidth: 5,
        shadowBlur: 1,
        globalCompositeOperation: "source-over"
      };
    case "brush":
      return {
        lineCap: "round",
        lineJoin: "round",
        lineWidth: 8,
        shadowBlur: 7,
        globalCompositeOperation: "source-over"
      };
    case "pencil":
      return {
        lineCap: "butt",
        lineJoin: "miter",
        lineWidth: 1,
        shadowBlur: 0,
        globalCompositeOperation: "source-over"
      };
    case "eraser":
      return {
        lineCap: "round",
        lineJoin: "round",
        lineWidth: 10,
        shadowBlur: 0,
        globalCompositeOperation: "destination-out"
      };
    default:
      return {};
  }
};

const getColorStyle = (color = "#323232") => {
  return {
    strokeStyle: color,
    shadowColor: color
  };
};

const updatePaintingStyle = (canvasContext, { tool, color }) => {
  Object.entries({
    ...getToolStyle(tool),
    ...getColorStyle(color)
  }).forEach(([key, value]) => {
    canvasContext[key] = value;
  });
};

const drawLine = (canvasContext, p1, p2) => {
  canvasContext.beginPath();
  canvasContext.moveTo(p1.x, p1.y);
  canvasContext.lineTo(p2.x, p2.y);
  canvasContext.closePath();
  canvasContext.stroke();
};

const getDrawPoints = (stage, image, lastPointerPosition) => {
  const imagePosition = {
    x: image.x(),
    y: image.y()
  };

  const point1 = {
    x: lastPointerPosition.x - imagePosition.x,
    y: lastPointerPosition.y - imagePosition.y
  };

  const pointerPosition = stage.getPointerPosition();
  const point2 = {
    x: pointerPosition.x - imagePosition.x,
    y: pointerPosition.y - imagePosition.y
  };

  return {
    point1,
    point2,
    pointerPosition
  };
};

export default class PaintingArea extends Component {
  constructor(props) {
    super(props);

    const { width, height, tool, color } = this.props;
    const { canvas, canvasContext } = initCanvas(width, height);

    updatePaintingStyle(canvasContext, { tool, color });

    this.canvas = canvas;
    this.canvasContext = canvasContext;

    this.isPaint = false;
    this.lastPointerPosition = null;

    this.startPainting = this.startPainting.bind(this);
    this.finishPainting = this.finishPainting.bind(this);
    this.processPainting = this.processPainting.bind(this);
  }

  startPainting() {
    this.isPaint = true;
    this.lastPointerPosition = this.stage.getPointerPosition();
  }

  finishPainting() {
    this.isPaint = false;
  }

  processPainting() {
    if (!this.isPaint) {
      return;
    }

    const { point1, point2, pointerPosition } = getDrawPoints(
      this.stage,
      this.image,
      this.lastPointerPosition
    );

    drawLine(this.canvasContext, point1, point2);

    this.lastPointerPosition = pointerPosition;

    this.update();
  }

  componentDidMount() {
    this.stage = this.image.getStage();

   
    this.image.on("mousedown touchstart", this.startPainting);
    this.stage.addEventListener("mouseup touchend", this.finishPainting);
    this.stage.addEventListener("mousemove touchmove", this.processPainting);


  }

  update() {
    this.image.getLayer().batchDraw();
  }

  render() {
    const { x, y, width, height, tool, color, image } = this.props;
    console.log(image);
    const { canvas, canvasContext } = this;

    updatePaintingStyle(canvasContext, { tool, color });

    return (

      <div className="container">
       
        <Image
          x={x}
            y={y}
            width={width}
            height={height}
            image={canvas}
            stroke={"green"}
            ref={node => {
              this.image = node;
            }}
        />
        
      </div>
      
      
    );
  }
}
