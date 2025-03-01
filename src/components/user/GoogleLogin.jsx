import { useEffect } from "react";

// import { signInWith } from "@/app/login/actions";
import { Button } from "@mui/material";

const GoogleLogin = () => {
  async function signInWith(provider) {
    console.log("hello,,, this is working?");
    const supabase = await createClient();
    console.log("create client: ", supabase);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/auth/callback`,
      },
    });

    console.log(data);

    if (error) {
      console.log(`error in signing in with ${provider}: `, error);
    }
  }
  useEffect(() => {
    window.handleGoogleLogin = () => {
      signInWith("google");
    };
  }, []);

  return (
    <>
      {/* <Button onClick={handleGoogleLogin}>Sign-In With Google!</Button> */}
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleGoogleLogin"
        data-auto_prompt="false"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  );
};

export default GoogleLogin;
