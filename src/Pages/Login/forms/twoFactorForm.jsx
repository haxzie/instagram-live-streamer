import React from "react";
import styles from "../styles.module.scss";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { useState } from "react";

export default function TwoFactorForm({ handle2FA, onCancel }) {
  const [code, setCode] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    handle2FA({ code });
  };
  return (
    <form className={styles.contents} onSubmit={handleSubmit}>
      <h4 className={styles.formTitle}>2FA Verification </h4>
      <p className={styles.formDescription}>Enter the 6 digit 2FA Code</p>
      <TextInput
        placeholder="6 digit code"
        value={code}
        style={{
          textAlign: "center",
        }}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;
          if (e.target.value.length === 0 || re.test(e.target.value)) {
            setCode(e.target.value);
          }
        }}
      />
      <Button
        onClick={() => handle2FA({ code })}
        type="submit"
        disabled={!(code && code.length >= 6)}
      >
        Submit
      </Button>
      <Button onClick={onCancel} buttontype="clear">
        Cancel
      </Button>
    </form>
  );
}
