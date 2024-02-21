"use client";
import Head from "next/head";

const Home = () => {
  return (
    <Head>
      <title>Gym Manager</title>
      <meta
        name="Your gym manager"
        content="Get your gym managed quick and easy"
      />
      <link rel="icon" href="/muscle.png" />
    </Head>
  );
};

export default Home;

Home.getLayout = function (page) {
  return page;
};
