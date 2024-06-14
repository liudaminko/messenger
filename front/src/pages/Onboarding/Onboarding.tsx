import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./Onboarding.module.css";
import { useNavigate } from "react-router-dom";

export const Onboarding: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!firstName || !lastName || !phone) {
      setError("First name, last name, and phone number are required.");
      return;
    }

    try {
      await createUser().then((user) => navigate("/"));
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error submitting form. Please try again.");
    }
  };

  const createUser = async () => {
    return await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber: phone,
        profilePicture: file ? preview : null,
      }),
    })
      .then((response) => response.json())
      .catch((error) =>
        console.error(
          `Could not create user :( phone number: ${phone} | error: ${error}`
        )
      );
  };

  const saveUserIdAndNavigate = (user: { id: string }) => {
    localStorage.setItem("userId", user.id);
    navigate("/chat");
  };

  return (
    <div className={styles.container}>
      <div className={styles.headers}>
        <h1 className={styles.header}>Welcome to MESSENGER</h1>
        <h1>Enter your info to sign up</h1>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputsContainer}>
            <input
              type="text"
              placeholder="Enter your first name"
              className={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your last name"
              className={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <PhoneInput
            country={"us"}
            value={phone}
            onChange={(phone) => setPhone("+" + phone)}
          />
          <div className={styles.fileInputContainer}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <button
              type="button"
              className={styles.loadPhotoButton}
              onClick={() => {
                const fileInput = document.getElementById("fileInput");
                if (fileInput) {
                  (fileInput as HTMLInputElement).click();
                }
              }}
            >
              Upload profile picture
              <img
                src="/upload.png"
                alt="Upload"
                className={styles.uploadIcon}
                style={{ margin: "0" }}
              />
            </button>
            {preview && (
              <div className={styles.imagePreview}>
                <img src={preview} alt="Profile Preview" />
              </div>
            )}
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitButton}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
