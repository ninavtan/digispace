import React, {useState, useRef} from 'react';
import { Stage, Layer, Line, Text, Rect } from 'react-konva';
import PaintingArea from './PaintingArea';
import RedoPaintingArea from './RedoPaintingArea';
import { POST_GALLERY_IMAGE } from '../redux/actions/types';
import { useSelector, useDispatch } from 'react-redux';
import { postGalleryImage } from '../redux/actions';
import Gallery from './Gallery';


const Canvas = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  const [tool, setTool] = useState('brush');
  const [color, setColor] = useState('#e66465');
  const [images, setImages] = useState([]);

  
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
    dispatch(postGalleryImage(props.roomId, base64image));
    console.log(base64image);
  
  }


  return (
    <div className="canvas-container">
      <select value={tool} onChange={handleChangeTool}>
        <option value="felt-tip">Felt-Tip</option>
        <option value="brush">Brush</option>
        <option value="pencil">Pencil</option>
        <option value="eraser">Eraser</option>
      </select>      

      <input type="color" value={color} onChange={handleChangeColor} />
      <button onClick={handleSaveClick}>Save</button>
      
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

    {/* <img alt="hey" src={image[0]}></img> */}
    {/* Add Gallery */}

    <Gallery images={images}/>

    </div>

    
  )
};

export default Canvas;