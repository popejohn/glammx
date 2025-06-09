import React from"react"
 import { motion } from "motion/react";
import { IoChatbox } from "react-icons/io5";
import { Link } from "react-router-dom";


export default function Chaticon({showChat, setShowChat}) {
  const token = localStorage.getItem("token");

  if (!token) {
    return
  }
  
  return (
    <>
<motion.div className="rounded-circle bg-danger-subtle fs-3"
    onClick={() => setShowChat(!showChat)}
    style={divStyle}
  animate={{ opacity: [1, 0, 1] }}
  transition={{
    duration: 3,
    repeat: 5,
    easing: "ease-in-out"
  }}
>
  <IoChatbox />
</motion.div>
    </>
  )
}

// Variants
const divStyle = {
    width: "50px",
    height: "50px",
    display: "flex",
    zIndex: "1001",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: "10%",
    right: "10px", 
}