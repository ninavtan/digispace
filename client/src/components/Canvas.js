import React, {useState, useRef, useEffect} from 'react';
import Konva from 'konva';
import { Stage, Layer, Line, Text, Rect } from 'react-konva';
import PaintingArea from './PaintingArea';
import { POST_GALLERY_IMAGE } from '../redux/actions/types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGalleryImages, postGalleryImage } from '../redux/actions';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Canvas = (props) => {
  const dispatch = useDispatch();

  const [tool, setTool] = useState('brush');
  const [color, setColor] = useState('#e66465');
  const [erase, setErase] = useState(false);

  const drawingRef = useRef(null);

  let sceneHeight = window.innerHeight;
  let sceneWidth = window.innerWidth;

  let sketchWidth = window.innerWidth / 2;
  let sketchHeight = window.innerHeight / 2;

  const handleChangeTool = event => {
    setTool(event.target.value);
  }

  const handleChangeColor = event => {
    setColor(event.target.value);
  }

  const handleSaveClick = (e) => {
    e.preventDefault();
    const guestName = e.target[0].value;
    let stage = drawingRef.current.children[0];
    let base64image = stage.toDataURL();
    dispatch(postGalleryImage(props.roomId, base64image, guestName))
    dispatch(fetchGalleryImages(props.roomId));
  }

  const resizeCanvas = () => {
    sceneWidth = window.innerWidth / 2;
    sceneHeight = window.innerHeight / 2;

    sketchWidth = window.innerWidth / 2;
    sketchHeight = window.innerHeight / 2;
  }

  window.addEventListener('resize', resizeCanvas(), false);
 
 

  return (
    <div className="canvas-container">
      <DrawingSettingsContainer id="drawing-settings">
        <Form.Select value={tool} onChange={handleChangeTool} className="form-select">
        <option value="felt-tip">Felt-Tip</option>
        <option value="brush">Brush</option>
        <option value="pencil">Pencil</option>
        <option value="eraser">Eraser</option>
        </Form.Select>
        <br />
      <input type="color" value={color} onChange={handleChangeColor} />
      
      </DrawingSettingsContainer>

    <div id="stage-parent">
     <Stage height = {sceneHeight} width = {sceneWidth} ref={drawingRef} className="konva-stage">
      <Layer>
        {/* Holds image background */}
        <Rect
        x={0}
        y={0}
        fill={"white"}
        width={sketchWidth}
        height={sketchHeight}>
        </Rect>

        {/* User-interactive canvas */}
        <PaintingArea
          x={0}
          y={0}
          width={sketchWidth}
          height={sketchHeight}
          tool={tool}
          color={color}
          erase={erase}
          
        />
        </Layer>
    </Stage>
    </div>

    <Form noValidate onSubmit={handleSaveClick}>
      <Form.Control
        required
        type="text"
        className="form-control"
        placeholder="guest name"
      />
       <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
        <br/>
        <br/>
      <Button type="submit" variant="outline-success">Save</Button>
      </Form>
    </div>
  )
};

export default Canvas;

const DrawingSettingsContainer = styled.div`
//  margin-top: 2em;
//  padding-top: 2em;
 text-align: center;
`
