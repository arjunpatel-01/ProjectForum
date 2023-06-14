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
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, PaletteColorOptions, createTheme, ThemeProvider } from '@mui/material'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

declare module '@mui/material/styles' {
  interface CustomPalette {
      post: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });
const themeView = createTheme({
    palette: {
        post: createColor('#DF9090'),
        primary: createColor('#DF9090')
    }
});

export default function Home({ data }: { data: string }) {
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user, isUserLoading } = useUser();

  //might not need this
  // const router = useRouter();

  //might not need this
  // const handleSubmit = async (event: SyntheticEvent) => {
  //   event.preventDefault();

  //   const response = await fetch("/api/form", { method: "POST" });

  //   const result = await response.json();
  //   alert(`Result: ${result.data}`);
  // };
  // useEffect(() => {
  //   console.log(user)
  // })

  if (isSessionLoading || isUserLoading) {
		return (
      <React.Fragment>
        <ThemeProvider theme={themeView}>
          <Grid 
            container 
            direction="row" 
            justifyContent="center" 
            alignItems="center" 
            spacing={0} 
            width={"100vw"} 
            height={"100vh"}>
              <CircularProgress color='primary'/>
          </Grid>
        </ThemeProvider>
      </React.Fragment>
    );
	}

  if (isAuthenticated) {
    return (
      <>
        <Head>
          <title>Name: TBD</title>
          <meta name="description" content="Forum for posting project ideas" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CustomNavbar />
        
        <main className={styles.main}>
  
          {/* {isAuthenticated && ( */}
            <>
              <Dashboard />
            </>
          {/* )} */}
          
        </main>
      </>
    )
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={themeView}>
        <Grid 
          container 
          direction="row" 
          justifyContent="center" 
          alignItems="center" 
          spacing={0} 
          width={"100vw"} 
          height={"100vh"}>
            <CircularProgress color='primary'/>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
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