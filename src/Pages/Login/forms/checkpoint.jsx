import React from "react";
import styles from "../styles.module.scss";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { useState } from "react";

export default function CheckpointForm({ handleCheckpoint, onCancel }) {
  const [code, setCode] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCheckpoint({ code });
  };
  return (
    <form className={styles.contents} onSubmit={handleSubmit}>
      <h4 className={styles.formTitle}>Security Checkpoint</h4>
      <p className={styles.formDescription}>Enter the 6 digit code sent to you</p>
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
        onClick={() => handleCheckpoint({ code })}
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
