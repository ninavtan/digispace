import React, { Component, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Konva from "konva";
import { Image, Rect } from "react-konva";
import { Html } from 'react-konva-utils';
// const io = require('socket.io');
// const ENDPOINT = "http://127.0.0.1:3001";
// const socket = socketIOClient(ENDPOINT);

const RedoPaintingArea = (props) => {
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

  const drawLine = (canvasContext, p1, p2, emit) => {
    // console.log(canvasContext);
    canvasContext.beginPath();
    canvasContext.moveTo(p1.x, p1.y);
    canvasContext.lineTo(p2.x, p2.y);
    canvasContext.closePath();
    canvasContext.stroke();
  
    if (!emit) {return};
    
    // socket.emit('drawing', {
    //   x0: p1.x,
    //   y0: p1.y,
    //   x1: p2.x,
    //   y1: p2.y,
    // })
  };

//   const onDrawingEvent = (data) => {
//   var w = 500;
//   var h = 500;
//   drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
// }

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
}

const { width, height, tool, color } = this.props;

const { canvas, canvasContext } = initCanvas(width, height);

updatePaintingStyle(canvasContext, { tool, color });

var isPaint = false;

this.socketRef = React.createRef();

const startPainting = () => {
  isPaint = true;
  this.lastPointerPosition = this.stage.getPointerPosition();
}

const finishPainting = () => {
  this.isPaint = false;
}

const processPainting = () => {
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

  update();
}

useEffect(() => {
  // socket.on('drawing', onDrawingEvent);
    let stage = this.image.getStage();

    image.on("mousedown touchstart", startPainting());
    stage.addEventListener("mouseup touchend", finishPainting());
    stage.addEventListener("mousemove touchmove", processPainting());
});

const update = () => {
  this.image.getLayer().batchDraw();
}

const { x, y, image } = this.props;

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

export default RedoPaintingArea;