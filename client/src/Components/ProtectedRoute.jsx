import React, { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

const ProtectedRoute = ({ element, ...rest }) => {



  if (localStorage.getItem("token")) {
    return <>{element}</>;
  }

  // If the user is not logged in, display a message or redirect to login
  
  return (
    <>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        margin: "60px 0",
      }}
    >
      <div
        style={{
          backgroundColor: "#f8d7da",
          color: "#721c24",
          padding: "30px 40px",
          borderRadius: "10px",
          border: "2px solid #f5c6cb",
          fontWeight: "bold",
          fontSize: "24px", // Larger text size
          textAlign: "center",
          boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
          width: "100%", // Ensures the alert fills its container
          maxWidth: "600px", // Maximum width to prevent it from becoming too large
        }}
      >
        <FaExclamationCircle
          style={{
            marginRight: "10px",
            fontSize: "20px",
          }}
        />
        <span>Your are not logged in, Sign in to use this feature</span>
      </div>
    </div>
    </>
  );



};

export default ProtectedRoute;
