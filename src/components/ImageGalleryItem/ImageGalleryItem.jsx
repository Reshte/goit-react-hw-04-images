import { ItemGallery, ImgGallery } from "./ImageGalleryItem.styled";
import { PropTypes } from 'prop-types';


export const ImageGalleryItem = ({ id, webformatURL, modalShow, value }) => {
   return (  
      <ItemGallery key={id} onClick={() => modalShow(value)}  >
      <ImgGallery src={webformatURL} alt="" />
</ItemGallery>)  
}
    
ImageGalleryItem.propTypes = {
   id: PropTypes.number.isRequired,
   webformatURL: PropTypes.string,
   modalShow: PropTypes.func.isRequired,
   value:PropTypes.string,
}