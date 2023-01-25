import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import { Loader } from 'components/Loader/Loader'
import { ImageGalleryList, Wrapper } from './ImageGallery.styled'
import { Modal } from 'components/Modal/Modal'
import { PropTypes } from 'prop-types';
import { useState } from 'react';

export function ImageGallery({ gallery, loading }) {

    const [showModal, setShowModal] = useState(false)
    const [largeImage, setLargeImage] = useState('')
    
    const openModal = (largeImageURL) => {
        setShowModal(true)
        setLargeImage(largeImageURL)                       
    }

     const  closeModal = () => {
    setShowModal(false)
    }

    return (
            <Wrapper>
                <ImageGalleryList >
                    {gallery.map(({ id, webformatURL, largeImageURL }) => (
                        <ImageGalleryItem key={id} id={id} webformatURL={webformatURL} value={largeImageURL} modalShow={openModal}/>))}
            </ImageGalleryList>
                   { loading && <Loader />}               
                {showModal && <Modal OnClose={closeModal}><img src={largeImage} alt="" />
                </Modal>}
            </Wrapper>
        )
}
ImageGallery.propTypes = {
        gallery: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        showModal: PropTypes.bool,
        largeImage: PropTypes.string,
         }





