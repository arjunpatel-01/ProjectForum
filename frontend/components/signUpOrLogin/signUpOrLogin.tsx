
import { getRefreshToken } from "@descope/react-sdk";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback } from "react";
import styles from "../../styles/Login.module.css";
import User from "../../utils/models";
import { addUser } from "../../utils/user";

// Descope component interacts with browser API and should render only in Client Side Render
const DescopeWC = dynamic(
    async () => {
        const { Descope } = await import("@descope/react-sdk");
        // eslint-disable-next-line react/display-name
        return (props: React.ComponentProps<typeof Descope>) => (
            <Descope {...props} />
        );
    },
    {
        ssr: false,
    }
);
// DescopeWC.displayName = "DescopeWC"


export default function SignUpOrLogIn() {
    const router = useRouter();

    const onSuccess = useCallback(async (e: any) => {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            // Set refresh token on cookie so it can be used in getServerSideProps
            // This is only requires for when Descope tokens do NOT managed already in cookies.
            // In production, prefer managing Descope tokens in cookies.
            document.cookie = `DSR=${refreshToken}`;
        }
        const user = e.detail.user;
        const userToAdd: User = {
            name: user.name ?? "",
            email: user.email ?? "",
            userId: user.userId
        }
        addUser(userToAdd).then(() => {
            router.push("/");
        });
    }, [router]);

    const onError = useCallback(
        (e: any) => {
            console.log("Descope got error", e);
            router.push("/");
        },
        [router]
    );
    return (<>
        <main className={styles.main}>
            <div className={styles.login}>
                <DescopeWC
                    flowId={"sign-up-or-in"}
                    onSuccess={onSuccess}
                    onError={onError}
                />
            </div>
        </main>
    </>);
}