import React, { useState, useEffect, useRef } from 'react';
import { ImEnlarge2 } from "react-icons/im";
import { IoIosSend } from "react-icons/io";
import { Link } from 'react-router-dom';
import { LuMinimize2 } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';




// Replace with your actual backend URL

const Chatpage = ({ userId, enlarged, setEnlarged, message, setMessage, messages, setMessages, socket }) => {

    const messagesRef = useRef(null)

    useEffect(() => {
        setEnlarged(true)
    }, [])

    // Activate user
    useEffect(() => {
     socket.emit('user_chats', (userId))
    }, [userId])

     // get all messages belonging to the user
    useEffect(() => {
      socket.on('chats', (userChats) => {
        
        setMessages(userChats)
        })
       return () => {
            socket.off('receive_message');
        };
    }, [])
    
    // get live response from support.
    useEffect(() => {
     socket.on('response', (supportResponse) =>{
        if (supportResponse.recipient === userId.email) {
            setMessages((prev) => [...prev, supportResponse])
        }
        
     })

     return () => {
    socket.off('response');
  };
    }, [socket, userId])
    

    const navigate = useNavigate()
    
    useEffect(() => {
        // Auto-scroll to bottom
        messagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

     const minimize = () => {
            setEnlarged(false)
        }
    
const sendMessage = () => {
            if (message.trim() === '') return;
    
            const msgData = {
                sender: userId.email,
                recipient: 'support',
                message,
            };
           
            
            socket.emit('send_message', msgData);
            setMessages((prev) => [...prev, msgData]);
            setMessage('');
        };
    

    return (
        <div style={!enlarged ?styles.chatContainer :styles.echatContainer}>
            <div style={styles.chatHeader}>Customer Support <Link to='/customercare/chat' className='text-white'>{!enlarged ?<ImEnlarge2 onClick={() => setEnlarged(true)}/> :<LuMinimize2 onClick={minimize}/>}</Link></div>
            <div style={styles.chatMessages}>
                {messages && messages.map((msg, idx) => (
                    <div
                        key={idx}
                        style={{
                            ...styles.message,
                            alignSelf: msg.sender === userId.email ? 'flex-end' : 'flex-start',
                            background: msg.sender === userId.email ? '#d1e7dd' : '#f8d7da',
                        }}
                    >
                        {msg.message}
                    </div>
                ))}
                <div ref={messagesRef} />
            </div>
            <div style={styles.chatInput}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={styles.input}
                />
                <button onClick={sendMessage} style={styles.sendButton}><IoIosSend /></button>
            </div>
        </div>
    );
};

export default Chatpage;

// ===== 🎨 Styles =====
const styles = {
    chatContainer: {
        width: 300,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        borderRadius: 8,
        position: 'fixed',
        bottom: 20,
        zIndex: 1000,
        right: 20,
        backgroundColor: '#fff',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    echatContainer: {
        width: '80%',
        margin: '100px auto',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'between',
        border: '1px solid #ccc',
        borderRadius: 8,
        overflow: 'hidden',
        minHeight: '72vh',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    chatHeader: {
        padding: '10px 15px',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    messageDisplay: {
        minHeight: '400px',
    },
    chatMessages: {
        flex: 1,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        gap: 8,
        backgroundColor: '#f9f9f9',
    },
    message: {
        padding: 10,
        borderRadius: 12,
        maxWidth: '80%',
    },
    chatInput: {
        display: 'flex',
        padding: 10,
        borderTop: '1px solid #ccc',
        background: '#fff',
    },
    input: {
        flex: 1,
        padding: 8,
        border: '1px solid #ccc',
        borderRadius: 4,
    },
    sendButton: {
        marginLeft: 8,
        padding: '8px 12px',
        border: 'none',
        backgroundColor: 'black',
        color: '#fff',
        borderRadius: 4,
        cursor: 'pointer',
    },
};
