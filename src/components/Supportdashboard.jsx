import { useEffect, useState, useRef } from "react";


const SupportDashboard = ({ socket }) => {
  const [activeusers, setActiveUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const messageRef = useRef(null)

// Set all active users
useEffect(() => {
  if (!socket) return;

    socket.on('active_users', (activeUsers) => {
        setActiveUsers(activeUsers);
    })
    return () => {
    socket.off("active_users");
  };
    
  }, [socket]); //works

  // Select a user to chat and get the user's previous chats with support from the server
  const chatSelectedUser = (user) => {
    setSelectedUser(user)
    socket.emit("selected_user", user);
    socket.on('user_support_chat', (userSupportChats) => {
      setMessages(userSupportChats);      
    }) //Works
  }

// This fnx sends a msg which is a rspns to the user's query
const sendMessage = () => {
    if (!message || !selectedUser) return;
    const supportResponse = {
      sender: "support",
      recipient: selectedUser.email,
      message
    }
    socket.emit("support_response", (supportResponse)); //emits support's response to display live to selected user
    setMessages(prev => [...prev, supportResponse]); //display the msg on support the screen
    setMessage("");
  }; //Works

  // Listen for any response from the user
 useEffect(() => {
  if (!socket) return;
   socket.on("user_response", (usermessage) =>{
        if (usermessage.sender == selectedUser.email) {
          setMessages((prev) => [...prev, usermessage]);
        }
        
   })
 }, [socket, activeusers])
  

  useEffect(() => {
          // Auto-scroll to bottom
          if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: 'smooth' })
          }
      }, [messages]);

 

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside style={{ width: "250px", borderRight: "1px solid #ccc" }}>
        <h3>Active Users</h3>
        {activeusers.length && activeusers.map((user, idx) => (
          <div key={idx} onClick={() => chatSelectedUser(user)} style={{ padding: "10px", cursor: "pointer" }} className="d-flex justify-content-start align-items-center gap-2 fw-semibold">
            <img src={user.profilepic} alt="" style={{width: '35px', height: '35px'}} className="rounded-circle"/>
            <div> {user.firstname || user.email}</div>
           
          </div>
        ))}
      </aside>
      <main style={{ flex: 1, padding: "20px" }}>
        {selectedUser && activeusers.length ? (
          <>
            <h3>Chat with {selectedUser && selectedUser.firstname || selectedUser.email}</h3>
            <div style={{...styles.chatMessages, height: "70%", overflowY: "scroll", border: "1px solid #ddd", padding: "10px" }}>
              {messages && messages.map((msg, idx) => (
                <div key={idx} style={{...styles.message, alignSelf: msg.sender === "support" ? "flex-start" : "flex-end", background: msg.sender === "support" ? '#d1e7dd' : '#f8d7da', width: "fit-content"}}>
                  {msg.message}
                </div>
              ))}
              <div ref={messageRef}></div>
            </div>
            <div style={styles.chatInput}>
            <input
              type="text"
              style={styles.input}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={sendMessage} style={styles.sendButton}>Send</button>
            </div>
          </>
        ) : (
          <h3>Select a user to start chatting</h3>
        )}
      </main>
    </div>
  );
};

export default SupportDashboard;

const styles = {
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
  }