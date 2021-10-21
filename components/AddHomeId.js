import React from 'react';

class HomePageID extends React.Component {
  componentDidMount() {
    document.getElementById('__next').classList.add('Home-page');
  }

  componentWillUnmount() {
    document.getElementById('__next').classList.remove('Home-page');
  }

  render() {
    return (
      <div />
    );
  }
}

export default HomePageID;
