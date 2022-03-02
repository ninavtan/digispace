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

function Gallery(props) {

  return (
   
    <div className="gallery-container">
      <img alt='hi!' src={props.gallery} />

    </div>
    )
}

export default Gallery;