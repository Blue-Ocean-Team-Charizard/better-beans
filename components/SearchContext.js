import { createContext, Component } from 'react';

export const SearchContext = createContext();

class SearchContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopList: [],
    };
  }

  render() {
    return (
      <SearchContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export default SearchContextProvider;