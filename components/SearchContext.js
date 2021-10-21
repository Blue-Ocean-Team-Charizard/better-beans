import { createContext, Component } from 'react';

export const SearchContext = createContext();

class SearchContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopList: [],
      currentCoords: { lat: 55.755826, lng: 37.6172999 },
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
