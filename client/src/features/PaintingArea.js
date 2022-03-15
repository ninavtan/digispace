import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Konva from "konva";
import { Image, Rect } from "react-konva";
import { Html } from 'react-konva-utils';
// import { initiateSocketConnection } from "./socketio.service";
// import { subscribeToChat } from "./socketio.service";

const ENDPOINT = "http://127.0.0.1:3001";


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

const onDrawingEvent = (data) => {
  console.log(data);
}

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
    console.log(props);
    const { width, height, tool, color, erase } = this.props;
    const { canvas, canvasContext } = initCanvas(width, height);

    updatePaintingStyle(canvasContext, { tool, color });

    this.canvas = canvas;
    this.canvasContext = canvasContext;

    this.isPaint = false;
    this.lastPointerPosition = null;
    this.erase = erase;

    this.startPainting = this.startPainting.bind(this);
    this.finishPainting = this.finishPainting.bind(this);
    this.processPainting = this.processPainting.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.socketRef = React.createRef();

    // this.socket = socketIOClient(ENDPOINT);

    this.state = {currentLines: []};
    console.log(this.state);


    // this.socket.on('drawing', data => {
    //   debugger;
    //   console.log(data);
    //   this.drawLine(data.p1, data.p2);
    // })

  }

  drawLine(p1, p2) {
    // debugger;
      console.log(p1, p2);
    
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(p1.x, p1.y);
      this.canvasContext.lineTo(p2.x, p2.y);
      this.canvasContext.closePath();
      this.canvasContext.stroke();

  };

 clearCanvas() {
    this.canvasContext.fillStyle = '#FFFFFF';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.beginPath();
    this.update();
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

    this.sendDrawing(point1, point2);

    this.drawLine(point1, point2);

    
    this.lastPointerPosition = pointerPosition;
    this.update();

    // this.sendDrawing(point1, point2);

  }

  sendDrawing(point1, point2) {
    console.log('sent!');
    const data = {
      p1: {x: point1.x, y: point1.y},
      p2: {x: point2.x, y: point2.y}
    }
    // state:
    // [{p1, p2}]
    this.socket.emit('drawing', data)
    // this.setState((prevState) => {
    //   return {
    //     lines: [...prevState, {data}]
    //   };
    // })
  }

  componentDidMount() {
    this.stage = this.image.getStage();
    console.log(this.stage);
    this.image.on("mousedown touchstart", this.startPainting);
    this.stage.addEventListener("mouseup touchend", this.finishPainting);
    this.stage.addEventListener("mousemove touchmove", this.processPainting);
    let settings = document.querySelector('#drawing-settings');
    let btn = document.createElement("button");
    btn.innerHTML = "Clear Canvas";
    btn.onclick = () => this.clearCanvas();
    settings.appendChild(btn);

    this.socket = socketIOClient(ENDPOINT);

    // This is working! But is late. 
    // Previous drawing renders after clicking on canvas.
    this.socket.on('drawing', data => {
      console.log(data);
      this.drawLine(data.p1, data.p2);
      // this.setState((prevState) => {lines: [...prevState, {data}]})
    })

  }

  update() {
    this.image.getLayer().batchDraw();

    // This doesn't work.
    // Heavy -- wrong
    // this.socket.on('drawing', data => {
    //   this.drawLine(this.canvasContext, data.p1, data.p2);
    // })
   
  }

  render() {
   
    // This does not work -- is really heavy.
    // this.socket.on('drawing', data => {
    //   console.log('socketina!')
    //   this.drawLine(data.p1, data.p2);
    // })

    const { x, y, width, height, tool, color, image } = this.props;
    const { canvas, canvasContext } = this;   

    updatePaintingStyle(canvasContext, { tool, color });

    return (

      <div className="painting-container">
        <Image
            x={x}
            y={y}
            width={width}
            height={height}
            image={canvas}
            stroke={"green"}
            erase={(erase) => this.clearCanvas()}
            ref={node => {
              this.image = node;
            }}
        />
        
      </div>
      
      
      
    );
  }
}