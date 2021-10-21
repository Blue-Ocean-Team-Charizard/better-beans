/* eslint-disable jsx-quotes */
import Head from 'next/head';

const Meta = ({ title, keywords, description }) => (
  <Head>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='keywords' content={keywords} />
    <meta name='description' content={description} />
    <meta charSet='utf-8' />
    <link rel='icon' href='/favicon.ico' />
    <title>{title}</title>
  </Head>
);

Meta.defaultProps = {
  title: 'BetterBeans',
  keywords: 'coffee reviews',
  description: 'Find local coffee shops now and start drinking better beans!',
};

export default Meta;
