import { connect } from 'react-redux';
import { postGalleryImage } from './actions';
import Canvas from './Canvas';

const mapDispatchToProps = {
  postGalleryImage,
 };

 export default connect(null, mapDispatchToProps)(Canvas);

 