import React, { useState, useRef } from 'react';
import p5 from 'p5';


class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.bgImage = this.bgImage.bind(this);
    console.log('Props!', props);
    if (props.image !== null) {  
      this.bgImage = props.image;
    } else {
      this.bgImage = '';
    }

  }
 
  Sketch = (p) => {
    let bgColor;
    let penColor;
    let penWidth;
    // let bgImage;

      p.preload = () => {
        this.bgImage = p.loadImage(this.props.imgLink);
      }
  
    
    let lines = [];

  // This class will be created every time user draws a line on the canvas
    class myLine {
      constructor(penColor, penWidth) {
        this.px = p.mouseX
        this.py = p.mouseY
        this.x = p.pmouseX
        this.y = p.pmouseY
    
        this.penColor = penColor
        this.penWidth = penWidth
      }

    // Create a method that shows the line
      show() {
        p.stroke(this.penColor)
        p.strokeWeight(this.penWidth)
        p.fill(this.penColor)
    
        p.line(this.px, this.py, this.x, this.y)
      }
    };

    p.setup = () => {
      const cnv = p.createCanvas(500,500);

      var options = p.createDiv().style('display:flex').class('options');

      var optionsTitles = p.createDiv().parent(options);

      p.createP('Pen Color').parent(optionsTitles);
      p.createP('Background Color').parent(optionsTitles);
      p.createP('Pen Width').parent(optionsTitles);

      var optionsValues = p.createDiv().parent(options).style('margin: 10px; width: 50px');

      penColor = p.createColorPicker('#ffffff').parent(optionsValues)
      bgColor = p.createColorPicker('#1e1e1e').parent(optionsValues)

      // createSelect(false) means that you can only select one value from list
      penWidth = p.createSelect(false).parent(optionsValues).style('margin-top: 10px')
      penWidth.option('5')
      penWidth.option('15')
      penWidth.option('20')
      penWidth.option('25')
      penWidth.selected('15')

      // Create clear button
      p.clearBut = p.createButton('Clear').parent(options).style('width: 100px')
      // Create save button
      p.saveBut = p.createButton('Save').parent(options).style('width:100px');
     }
     p.draw = () => {
      // p.background(bgImage);
      p.background(bgColor.value());

    
      p.clearBut.mousePressed(function() {
        lines = [];
      });

      // Saves current drawing
      p.saveBut.mousePressed(function() {
        console.log('save');
      });

      if (p.mouseIsPressed) {
        var line = new myLine(penColor.value(), penWidth.value())
        lines.push(line)
      }

      for (var line of lines) {
        line.show();
      }
     }
}

componentDidMount() {
  this.myP5 = new p5(this.Sketch, this.myRef.current)
}

render() {
  return (
    <div className="container">
      <div ref={this.myRef}>
      </div>
    </div>
    
  )
}
}
export default Canvas;