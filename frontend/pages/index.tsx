import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Dashboard from '@/components/dashboard/dashboard'
import CustomNavbar from '@/components/navbar/navbar'
import { getUserDisplayName, validateRequestSession } from "../utils/auth";
import { SyntheticEvent, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { getSessionToken, useDescope, useSession, useUser } from "@descope/react-sdk";
import { GetServerSideProps } from "next";

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data }: { data: string }) {
  const { isAuthenticated } = useSession();
  const { user } = useUser();

  //might not need this
  const router = useRouter();

  //might not need this
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const response = await fetch("/api/form", { method: "POST" });

    const result = await response.json();
    alert(`Result: ${result.data}`);
  };
  useEffect(() => {
    console.log(user)
  })


  return (
    <>
      <Head>
        <title>Project Forum</title>
        <meta name="description" content="Forum for posting project ideas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CustomNavbar />
      
      <main className={styles.main}>

        {isAuthenticated && (
          <>
            <Dashboard />
          </>
        )}
        
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const validated = await validateRequestSession(context.req);
  if (!validated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {
      data: validated ? "Validated" : "Not Validated",
    },
  };
};