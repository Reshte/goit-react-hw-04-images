import { Component } from "react";
import { Header, SearchForm, SearchFormButton, SearchFormInput } from './Searchbar.styled'
import { AiOutlineSearch } from "react-icons/ai";
import { PropTypes } from 'prop-types';

export class Searchbar extends Component {
    state = {
        searchQuery: '',
  }
  
 static propTypes = {
        searchQuery: PropTypes.string,
          };

  handelInputChange = (e) => {
    this.setState({searchQuery: e.currentTarget.value.trim()})  
  }

  handelFormSbmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state);
    this.reset()
  }
  
  reset = () => {
    this.setState({searchQuery: ''})
  }

  render() {
      return (
    <Header >
      <SearchForm onSubmit={this.handelFormSbmit} >
          
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
            value={this.state.searchQuery}
            onChange={this.handelInputChange}
    />
    </SearchForm>
  </Header>)
        
    }
}