import Link from 'next/link';
import Search from './Search';

export default function Header() {
  return (
    <header>
      <div className="navbar navbar-dark shadow-sm">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/">Shops</Link></li>
          <li><Link href="login">Login</Link></li>
          <li><Link href="profile">Profile</Link></li>
        </ul>
        <Search />
      </div>
    </header>
  );
}
