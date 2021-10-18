import Head from "next/head";
import Shop from "../../components/Shop";

export default function Shops() {
  return (
    <div>
      <Head>
        <title>Blue Ocean</title>
        <meta name="keywords" content="Blue Ocean" />
      </Head>
      <Shop />
    </div>
  );
}
