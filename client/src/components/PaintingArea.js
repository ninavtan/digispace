import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Konva from "konva";
import { Image, Rect } from "react-konva";
import { Html } from 'react-konva-utils';
// import { initiateSocketConnection } from "./socketio.service";
// import { subscribeToChat } from "./socketio.service";

// Dev
// const ENDPOINT = "http://127.0.0.1:3001";

// Prod
const ENDPOINT = "https://digispace.herokuapp.com/";


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
    const { width, height, tool, color, erase} = this.props;
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

    this.state = {currentLines: []};
  }

  drawLine(p1, p2) {
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

  }

  // socket.emit('sendMessage', message, (response) => {
  //   setMessages([...messages, message]);
  //   console.log(response.status);
  //   messageInput.value = '';
  // });

  sendDrawing(point1, point2) {
    const data = {
      p1: {x: point1.x, y: point1.y},
      p2: {x: point2.x, y: point2.y}
    }
    
    this.socket.emit('drawing', data, (response) => {
      this.updateState(data);
    })
  }

  componentDidMount() {
    this.stage = this.image.getStage();

    console.log('stage', this.stage);
    console.log(`image`, this.image);

    this.image.on("mousedown touchstart", this.startPainting);
    this.stage.addEventListener("mouseup touchend", this.finishPainting);
    this.stage.addEventListener("mousemove touchmove", this.processPainting);
    let settings = document.querySelector('#drawing-settings');
    let btn = document.createElement("button");
    btn.innerHTML = "Clear Canvas";
    btn.onclick = () => this.clearCanvas();
    settings.appendChild(btn);
    
    this.socket = socketIOClient(ENDPOINT);

    // Updating the state forces a re-render which renders the drawing!
    this.socket.on('drawing', data => {
      this.drawLine(data.p1, data.p2);
      this.update();
      this.updateState(data);
      
    })

  }

  updateState(data) {
    this.setState((state) => {
      let copyOfState = {...state};
      copyOfState.currentLines.push(data);
      return copyOfState;
    })
  }

  update() {
    this.image.getLayer().batchDraw();
  }

  render() {
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