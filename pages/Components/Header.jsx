import Search from '../Components/Search';

export default function Header() {
  return (
    <header>
      <div className="navbar navbar-dark shadow-sm">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="shops">Shops</a></li>
          <li><a href="shopname">Shopname</a></li>
          <li><a href="login">Login</a></li>
          <li><a href="profile">Profile</a></li>
        </ul>
        <Search />
      </div>
    </header>
  );
}
