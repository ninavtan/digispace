import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchGalleryImages } from '../redux/actions';
import { Link, useParams } from "react-router-dom";
import Image from './Image';


/////////////////// React-Boostrap ////////////////
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useEffect } from 'react';
import { current } from '@reduxjs/toolkit';

function Gallery(props) {

//   let image = '';
//   function setBlobImages() { 
//     if (props.gallery[0] === undefined) {
//     image = undefined;
//   } else {
//     var binaryData = [];
//     // binaryData.push(props.gallery[0]);
//     let blob = new Blob(props.gallery[0]);
//     // console.log(blob);
//     // let blob = new Blob(props.gallery[0], {type : 'image/png'});
// let image = '';
// var reader = new FileReader();
// // console.log(props.images);
// let blob = new Blob(props.images[0]);
// reader.readAsDataURL(blob);
// reader.onloadend = function () {
//   var base64String = reader.result;
//   image =  base64String.replace('application/octet-stream', 'image/png');
//   console.log(image);
//   }
  
// }
//   }
// console.log(setBlobImages());
// console.log(image);
  

  return (
   
    <div className="gallery-container">
      <img alt='hi' src='data:image/png;base64,W29iamVjdCBPYmplY3Rd' />

      <h1>hi!</h1>
    </div>
    )
}

export default Gallery;