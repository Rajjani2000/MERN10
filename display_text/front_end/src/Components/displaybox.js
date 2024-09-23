import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const Displaybox = () => {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handlePost = () => {
    // You can handle the post action here
    console.log("Posted Text:", inputText);
    const doc = new jsPDF();
    doc.text(inputText, 10, 10);
    
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    window.open(url,"_blabk");

    // Reset the input field after posting
    setInputText("");

  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/"); // Redirect to the login page (or any other route)
  };

  return (
    <div style={styles.container}>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
      <h1 style={styles.header}>Welcome to Text to PDF !</h1>
      <textarea
        value={inputText}
        onChange={handleChange}
        style={styles.textArea}
        placeholder="Type your message here..."
      />
      <button onClick={handlePost} style={styles.button}>
        Generate PDF
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: "20px",
  },
  textArea: {
    width: "80%",
    height: "150px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
};

export default Displaybox;
