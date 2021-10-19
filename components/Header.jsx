import Link from "next/link";
import Search from "./Search";

export default function Header() {
  return (
    <header>
      <div className="navbar navbar-dark shadow-sm">
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/shop">
              <a>Shop</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href="profile">
              <a>Profile</a>
            </Link>
          </li>
        </ul>
        <Search />
      </div>
    </header>
  );
}
