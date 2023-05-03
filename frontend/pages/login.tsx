import CustomNavbar from "../components/navbar/navbar";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import SignUpOrLogIn from "../components/signUpOrLogin/signUpOrLogin";

export default function Login() {

    return (
        <>
            <Head>
                <title>Project Forum Log in</title>
                <meta name="description" content="Log in page for project forum app" />
                <link rel="icon" href="/assets/favicon.ico" />
            </Head>
            <div className={styles.container}>
                {/* <CustomNavbar /> */}
                <SignUpOrLogIn />
            </div>
        </>
    );
}