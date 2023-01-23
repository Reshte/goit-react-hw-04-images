import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import { Loader } from 'components/Loader/Loader'
import { ImageGalleryList, Wrapper } from './ImageGallery.styled'
import { Component } from "react";
import { Modal } from 'components/Modal/Modal'
import { PropTypes } from 'prop-types';

export class ImageGallery extends Component {
    state = {
        showModal: false,
        largeImage:'',
    }
    static propTypes = {
        gallery: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        showModal: PropTypes.bool,
        largeImage: PropTypes.string,
         };

    openModal = (largeImageURL) => {
                  this.setState({
            showModal: !this.state.showModal, largeImage: largeImageURL,
        })
    }
    
    closeModal = () => {
    this.setState({showModal: false})
    }
  
    render() {
          const { gallery, loading }=this.props
          const {showModal,  largeImage} = this.state
        return (
            <Wrapper>
                <ImageGalleryList >
                    {gallery.map(({ id, webformatURL, largeImageURL }) => (
                        <ImageGalleryItem key={id} id={id} webformatURL={webformatURL} value={largeImageURL} modalShow={this.openModal}/>))}
                </ImageGalleryList>
                {loading && <Loader />}
                {showModal && <Modal OnClose={this.closeModal}><img src={largeImage} alt="" />
                </Modal>}
            </Wrapper>
        )
    }
    }


