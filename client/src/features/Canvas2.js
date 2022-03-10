import React, {useState, useRef} from 'react';
import Konva from 'konva';
import { Stage, Layer, Line, Text, Rect } from 'react-konva';
import PaintingArea from './PaintingArea';
import RedoPaintingArea from './RedoPaintingArea';
import { POST_GALLERY_IMAGE } from '../redux/actions/types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGalleryImages, postGalleryImage } from '../redux/actions';
import Gallery from './Gallery';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Canvas = (props) => {
  const dispatch = useDispatch();

  const [tool, setTool] = useState('brush');
  const [color, setColor] = useState('#e66465');
  const [erase, setErase] = useState(false);
  const [images, setImages] = useState([]);

  
  const drawingRef = useRef(null);


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
    dispatch(fetchGalleryImages(props.roomId, props.userId, props.token))
  }

  const handleSave = () => {
    alert('saved');
  }


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

      
    <Stage width={800} height={500} ref={drawingRef} className="konva-stage">
      <Layer>
        {/* Will hold image background */}
        <Rect
        x={225}
        y={55}
        fill={"white"}
        width={400}
        height={400}>
        </Rect>

        {/* User-interactive canvas */}
        <PaintingArea
          x={225}
          y={55}
          width={400}
          height={400}
          tool={tool}
          color={color}
          erase={erase}
          
        />
        </Layer>
    </Stage>

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