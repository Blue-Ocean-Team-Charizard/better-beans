import { createContext, Component } from 'react';

export const SearchContext = createContext();

class SearchContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopList: [],
    };

    this.updateList = this.updateList.bind(this);
  }

  updateList(list) {
    this.setState({ shopList: list });
    // window.location.href = "http://localhost:3000/search";
  }

  render() {
    return (
      <SearchContext.Provider value={{ ...this.state, updateList: this.updateList }}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export default SearchContextProvider;
