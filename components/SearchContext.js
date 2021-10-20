import { createContext, Component } from 'react';

export const SearchContext = createContext();

class SearchContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopList: [],
      currentCoords: { lat: 35.1983, lng: -111.6513 },
      selectedShop: {},
    };

    this.updateList = this.updateList.bind(this);
    this.updateCoords = this.updateCoords.bind(this);
    this.selectShop = this.selectShop.bind(this);
  }

  updateList(list) {
    this.setState({ shopList: list });
  }

  updateCoords(coords) {
    this.setState({ currentCoords: coords });
  }

  selectShop(shop) {
    this.setState({ selectedShop: shop });
  }

  render() {
    return (
      <SearchContext.Provider value={{
        ...this.state,
        updateList: this.updateList,
        updateCoords: this.updateCoords,
        selectShop: this.selectShop,
      }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export default SearchContextProvider;
