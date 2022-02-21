import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Line, Text, Rect } from 'react-konva';
import PaintingArea from './PaintingArea';




class App extends Component {
  constructor(props) {
    super(props);
    this.drawingRef = React.createRef();
    this.state = {image: 'poop!'};
    console.log(props);

  }

  state = {
    tool: "brush",
    color: "#e66465",
    // image: '',
    // doneImage: '',
  };

  handleChangeTool = event => {
    this.setState({ tool: event.target.value });
  };

  handleChangeColor = event => {
    this.setState({ color: event.target.value });
  };

  handlePaletteColorChanged = color => {
    this.setState({ color });
  };

  handlePaintingAreaChanged = value => {
    // console.log("handlePaintingAreaChanged", value);
  };

  handleSaveClick = () => {
    console.log('saved~');
    let stage = this.drawingRef.current.children[0];
    console.log(stage);
    let image = '';
    var dataURL = stage.toImage({
        callback(img) {
        console.log(img);
      }
    })
      console.log(image);
    
    
  }



  render() {
    

    const { tool, color } = this.state;

    return (
      <div>
        <select value={tool} onChange={this.handleChangeTool}>
          <option value="felt-tip">Felt-Tip</option>
          <option value="brush">Brush</option>
          <option value="pencil">Pencil</option>
          <option value="eraser">Eraser</option>
        </select>
        <input type="color" value={color} onChange={this.handleChangeColor} />
        <button onClick={this.handleSaveClick}>Save</button>
        

        <Stage width={window.innerWidth} height={window.innerHeight} ref={this.drawingRef}
>
          <Layer>
            {/* Will hold image background */}
            <Rect
            x={50}
            y={50}
            // fill={"blue"}
            width={500}
            height={500}>
            </Rect>

            {/* User-interactive canvas */}
            <PaintingArea
              x={50}
              y={50}
              width={500}
              height={500}
              tool={tool}
              color={color}
              onChange={this.handlePaintingAreaChanged}
              image={this.state.image}
            />
          </Layer>
        </Stage>
        
      </div>
    );
  }
}

export default App;

