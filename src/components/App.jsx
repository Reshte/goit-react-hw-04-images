// import PropTypes from 'prop-types'
import { Searchbar } from "./Searchbar/Searchbar";
import { Wrapper } from './App.styled'
import { Component } from "react";
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button'
import { requestApi } from 'components/servicis/api'
import toast, { Toaster } from 'react-hot-toast';
import { PropTypes } from 'prop-types';




export class App extends Component{

  state = {
    searchQuery: '',
    page: 1,
    totalPages:0,
    gallery: [],
    loading: false,
    isLoadmore: false,
  }
  
   static propTypes = {
     searchQuery: PropTypes.string,
     page: PropTypes.number,
     totalPages: PropTypes.number,
     gallery: PropTypes.array,
    loading: PropTypes.bool,
    isLoadmore: PropTypes.bool,
     
  };
  

  handelFormSbmit = (searchQuery) => {
    if(searchQuery.searchQuery.length>0){this.setState({ searchQuery })}else{toast("Enter something")}
  }
  
  async componentDidUpdate(prevProps, prevState) {
    const {page,searchQuery} =this.state
     
        if (prevState.searchQuery !== searchQuery & searchQuery !== '') {
          this.setState({ loading: true})
          const response = await requestApi(page, searchQuery)
                   
          if (response.hits.length > 0)
             {this.setState(prevState => { return { gallery: [...response.hits], loading: false, isLoadmore: true, totalPages: response.totalHits } }) } 
          else {this.setState(prevState => { return { gallery: [], loading: false, searchQuery: '', isLoadmore: false  } })
              toast('Sorry, there are no images matching your search query. Please try again.')
              return
            }
        }

            if (prevState.page !== page) {
                this.setState({ loading: true })
                const response = await requestApi(page, searchQuery)
                this.setState(prevState => { return { gallery: [...prevState.gallery, ...response.hits], loading: false, isLoadmore: true } })
            }
       
    }

  LoadMore = () => {
       if(this.state.page < this.state.totalPages){this.setState(prevState => { return { page: prevState.page + 1 } 
     })} else {toast('Sorry, images are over')}
   }
 
  render() {
       const { isLoadmore, gallery, loading } = this.state
       return (
    <Wrapper>
            <Searchbar onSubmit={this.handelFormSbmit} />
            <Toaster  position="top-right" reverseOrder={false} />
            <ImageGallery gallery={gallery} loading={loading} />
            {isLoadmore && (<Button onClick={this.LoadMore}/>)} 
    </Wrapper>)
  }

}





