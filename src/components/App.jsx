import { Searchbar } from "./Searchbar/Searchbar";
import { Wrapper } from './App.styled'
import { useEffect, useState } from "react";
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button'
import { requestApi } from 'components/servicis/api'
import toast, { Toaster } from 'react-hot-toast';
import { PropTypes } from 'prop-types';


export function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(false)
  const [isLoadmore, setIsLoadmore] = useState(false)

  const  handelFormSbmit = (searchQuery) => {
    searchQuery.searchQuery.length > 0 ? setSearchQuery( searchQuery ):toast("Enter something")
  }

  useEffect(() => { 
 (async function () {
   try {
     if (searchQuery !== '') {
            const response = await requestApi(1, searchQuery);
            if (response.hits.length > 0) {
            setGallery([...response.hits])
            setLoading(false)
            setIsLoadmore(true)
            setTotalPages(response.totalHits)
          } else {
            setGallery([])
            setLoading(false)
            setSearchQuery('')
            setIsLoadmore(false)
            toast('Sorry, there are no images matching your search query. Please try again.')
            return
       }
           
        }
      
    } catch (e) {
      console.log(e);
      }
    })()
 
  }, [searchQuery])


    useEffect(() => { 
 (async function () {
   try {
     if (searchQuery !== '') {
          const response = await requestApi(page, searchQuery);
          setLoading(true)
          setGallery(state =>[...state, ...response.hits])
          setLoading(false)
          setIsLoadmore(true)           
        }
      
    } catch (e) {
      console.log(e);
      }
    })()
 
  }, [searchQuery, page])

  
 const LoadMore = () => {
   if (page < totalPages) { setPage(state => state + 1)} else {toast('Sorry, images are over')}
  }
  
   return (
    <Wrapper>
            <Searchbar onSubmit={handelFormSbmit} />
            <Toaster  position="top-right" reverseOrder={false} />
            <ImageGallery gallery={gallery} loading={loading} />
            {isLoadmore && (<Button onClick={LoadMore}/>)} 
    </Wrapper>)
  }

App.propTypes = {
     searchQuery: PropTypes.string,
     page: PropTypes.number,
     totalPages: PropTypes.number,
     gallery: PropTypes.array,
    loading: PropTypes.bool,
    isLoadmore: PropTypes.bool,
     
  }





