import React, { Component, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Konva from "konva";
import { Image, Rect } from "react-konva";
import { Html } from 'react-konva-utils';

const ENDPOINT = "http://127.0.0.1:3001";

export default function PaintingArea(props) {

  console.log(props);

  const { canvas, canvasContext } = initCanvas(props.width, props.height);

  let image = props.image;

  console.log(image);

  useEffect(() => {


  }, []);

  function initCanvas(width, height) {
    const canvas = document.createElement("canvas");
    const canvasContext = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;    

    return { canvas, canvasContext };
  }

  function drawLine(p1, p2) {
    canvasContext.beginPath();
    canvasContext.moveTo(p1.x, p1.y);
    canvasContext.lineTo(p1.x, p1.y);
    canvasContext.closePath();
    canvasContext.stroke();




  }

  
  function update() {
    image.getLayer().batchDraw();
  }

  function render() {

  }

  function drawLine(p1, p2) {
    canvasContext.beginPath();
    canvasContext.moveTo(p1.x, p1.y);
    canvasContext.lineTo(p2.x, p2.y);
    canvasContext.closePath();
    canvasContext.stroke();
  }

  function clearCanvas() {
    canvasContext.fillStyle = '#FFFFFF';
    canvasContext.fillRect(0, 0, canvas.width,canvas.height);
    canvasContext.beginPath();
    update();
  }

  function startPainting() {

  }

  function processPainting() {

  }




  return (
    <div className="painting-container">
      <Image
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        // image={canvas}
        stroke={"green"}
        ref={node => {
          image = node;
        }}
        erase={() => clearCanvas()}
      />
    </div>
  )
};

