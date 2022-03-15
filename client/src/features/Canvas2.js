<<<<<<< HEAD
import React, {useState, useRef, useEffect} from 'react';
import Konva from 'konva';
=======
import React, {useState, useRef} from 'react';
>>>>>>> master
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
<<<<<<< HEAD
  const [erase, setErase] = useState(false);
=======
  const [images, setImages] = useState([]);
>>>>>>> master

  
  const drawingRef = useRef(null);


  const handleChangeTool = event => {
    setTool(event.target.value);
  }

  const handleChangeColor = event => {
    setColor(event.target.value);
  }

  const handleSaveClick = () => {
    console.log('~saved');
    let stage = drawingRef.current.children[0];
    let base64image = stage.toDataURL();
<<<<<<< HEAD
    dispatch(postGalleryImage(props.roomId, base64image, guestName))
    dispatch(fetchGalleryImages(props.roomId));
    // props.history.push(`/room/${props.roomId}`);

=======
    dispatch(postGalleryImage(props.roomId, props.userId, base64image))
    dispatch(fetchGalleryImages(props.roomId, props.userId, props.token))
    
  
>>>>>>> master
  }


  return (
    <div className="canvas-container">
      <DrawingSettingsContainer>
        <Form.Select value={tool} onChange={handleChangeTool} className="form-select">
        <option value="felt-tip">Felt-Tip</option>
        <option value="brush">Brush</option>
        <option value="pencil">Pencil</option>
        <option value="eraser">Eraser</option>
        </Form.Select>
      {/* <select value={tool} onChange={handleChangeTool}>
        <option value="felt-tip">Felt-Tip</option>
        <option value="brush">Brush</option>
        <option value="pencil">Pencil</option>
        <option value="eraser">Eraser</option>
      </select>       */}

      <input type="color" value={color} onChange={handleChangeColor} />
      <Button onClick={handleSaveClick} variant="outline-success">Save</Button>
      </DrawingSettingsContainer>

      
    <Stage width={500} height={500} ref={drawingRef} className="konva-stage">
      <Layer>
        {/* Will hold image background */}
        <Rect
        x={70}
        y={50}
        // fill={"blue"}
        width={400}
        height={400}>
        </Rect>

        {/* User-interactive canvas */}
        <PaintingArea
          x={70}
          y={50}
          width={400}
          height={400}
          tool={tool}
          color={color}
          
        />
        </Layer>
    </Stage>
    </div>

    
  )
};

export default Canvas;

const DrawingSettingsContainer = styled.div`
//  margin-top: 2em;
//  padding-top: 2em;
 text-align: center;

`