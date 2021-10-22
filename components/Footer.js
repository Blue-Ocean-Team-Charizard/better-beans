import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="">
      <p> Copyright © by Team Charizard</p>
      <button
        style={
          {
            backgroundColor: "#0f0f2f",
            cursor: "pointer",
            position: "absolute",
            width: "3rem",
            left: "2%",
            borderRadius: ".8rem",
            border: "none",
            fontSize: ".5rem",
            fontFamily: "Bitter",
          }
        }
      >
        <Link href="easteregg">
          freesub
        </Link>
      </button>
    </footer>
  );
}
