import React from 'react';

class LoginPageID extends React.Component {
  componentDidMount() {
    document.getElementById('__next').classList.add('login-page');
  }

  componentWillUnmount() {
    document.getElementById('__next').classList.remove('login-page');
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default LoginPageID;
