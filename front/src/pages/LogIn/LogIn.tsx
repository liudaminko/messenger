import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "../../firebase.config";
import styles from "./LogIn.module.css";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../lib/userService";

function LogIn() {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState<any>(null);
  const [otp, setOtp] = useState("");
  const [waitingOtp, setWaitingOtp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/chat");
    }
  }, [navigate]);

  const sendOtp = async () => {
    try {
      await fetchUser(phone).catch(() => {
        console.log("user does not exist, redirect to /onboarding");
        navigate("/onboarding");
        return;
      });
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setWaitingOtp(true);

      setUser(confirmation);
    } catch (err) {
      console.log(err);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp);
      console.log(data);
      const verifiedPhoneNumber = data.user.phoneNumber;
      if (verifiedPhoneNumber) {
        fetchUser(verifiedPhoneNumber)
          .then((data: any) => saveUserIdAndNavigate(data))
          .catch(() => {
            console.log(
              "creating a new user because couldn't fetch existing one"
            );
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveUserIdAndNavigate = (user: { id: string }) => {
    localStorage.setItem("userId", user.id);
    navigate("/chat");
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.header}>Welcome to MESSENGER</h1>
        <h1>Log in into your account using your phone number</h1>
      </div>
      {waitingOtp ? (
        <div className={styles.otpContainer}>
          <input
            placeholder="Enter Otp"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className={styles.verifyOtpButton} onClick={verifyOtp}>
            Verify Otp
          </button>
        </div>
      ) : (
        <div>
          <div className={styles.phoneContent}>
            <PhoneInput
              country={"us"}
              value={phone}
              onChange={(phone) => setPhone("+" + phone)}
            />
            <button className={styles.sendOtpButton} onClick={sendOtp}>
              Send Otp
            </button>
          </div>
          <div id="recaptcha"></div>
        </div>
      )}
    </div>
  );
}

export default LogIn;
