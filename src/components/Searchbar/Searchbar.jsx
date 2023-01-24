import { Header, SearchForm, SearchFormButton, SearchFormInput } from './Searchbar.styled'
import { AiOutlineSearch } from "react-icons/ai";
import { PropTypes } from 'prop-types';
import { useState } from "react";


export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handelInputChange = (e) => {
     setSearchQuery(e.currentTarget.value.trim())
     }

  const handelFormSbmit = (e) => {
    e.preventDefault()
    onSubmit(searchQuery);
    reset()
  }
  
 const reset = () => {
    setSearchQuery('')
  }
 return (
    <Header >
      <SearchForm onSubmit={handelFormSbmit} >
          
          <SearchFormButton type="submit" className="button">
            <AiOutlineSearch size={20} />
          </SearchFormButton>
             

    <SearchFormInput
            className="input"
            type="text"
             autoComplete="off"
             name="searchQuery"
             autoFocus
             placeholder="Search images and photos"
            value={searchQuery}
            onChange={handelInputChange}
    />
    </SearchForm>
  </Header>)

}
Searchbar.propTypes = {
        searchQuery: PropTypes.string,
          };


