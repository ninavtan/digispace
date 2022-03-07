import React, {useState, useRef} from 'react';
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
  console.log(props);
  const dispatch = useDispatch();

  const [tool, setTool] = useState('brush');
  const [color, setColor] = useState('#e66465');
  const [canvasClear, setCanvasClear] = useState(false);
  const [images, setImages] = useState([]);

  
  const drawingRef = useRef(null);


  const handleChangeTool = event => {
    setTool(event.target.value);
  }

  const handleChangeColor = event => {
    setColor(event.target.value);
  }

  const clearCanvas = () => {
    debugger;
    setCanvasClear(true);
    // let stage = drawingRef.current.children[0];
    let stage = drawingRef.current.children[1];
  // stage.canvas.context.clear();

   
  //  layer.find('Circle').destroy();
  //  layer.draw();
   

  }

  const handleSaveClick = () => {
    console.log('~saved');
    let stage = drawingRef.current.children[1];
    let base64image = stage.toDataURL();
    console.log(base64image);
    dispatch(postGalleryImage(props.roomId, props.userId, base64image));
    dispatch(fetchGalleryImages(props.roomId, props.userId));
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

      <input type="color" value={color} onChange={handleChangeColor} />
      <Button onClick={handleSaveClick} variant="outline-success">Save</Button>
      <Button onClick={clearCanvas} variant="outline-success">Clear Canvas</Button>

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
        </Layer>

        <Layer id="canvas-layer">
        {/* User-interactive canvas */}
        <PaintingArea className="painting-area"
          x={70}
          y={50}
          width={400}
          height={400}
          tool={tool}
          color={color}
          canvasClear={canvasClear}
          
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