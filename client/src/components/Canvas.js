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

  console.log(props);
  const drawingRef = useRef(null);

  React.useEffect(() => {
    function handleResize() {
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
  })


  const handleChangeTool = event => {
    setTool(event.target.value);
  }

  const handleChangeColor = event => {
    setColor(event.target.value);
  }

  const handleSaveClick = (e) => {
    e.preventDefault();
    console.log('~saved');
    const guestName = e.target[0].value;
    let stage = drawingRef.current.children[0];
    let base64image = stage.toDataURL();
    dispatch(postGalleryImage(props.roomId, base64image, guestName))
    dispatch(fetchGalleryImages(props.roomId));
    // props.history.push(`/room/${props.roomId}`);
  }

  const sceneWidth = 500;
  const sceneHeight = 500;
 

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
     <Stage height = {600} width = {600} ref={drawingRef} className="konva-stage">
      <Layer>
        {/* Will hold image background */}
        <Rect
        x={75}
        y={50}
        fill={"white"}
        width={500}
        height={500}>
        </Rect>

        {/* User-interactive canvas */}
        <PaintingArea
          x={75}
          y={50}
          width={500}
          height={500}
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
