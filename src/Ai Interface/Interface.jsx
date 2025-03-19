import { useState, useEffect, useRef } from "react";
import { MessageSquarePlus, History, Menu, Paperclip, Send, ArrowDown, User, X, Settings, Trash2, Mail, LogOut, Square} from "lucide-react";
import "./Ai.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../index"; // Import Firebase auth
import { signOut, deleteUser } from "firebase/auth";
import axios from "axios"

const Albert = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [messageSent, setMessageSent] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const chatBoxRef = useRef(null);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("Sallo Samuel");
  const [email, setEmail] = useState("robert***@gmail.com");
  const [phone, setPhone] = useState("0257256751");
  const [edited, setEdited] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const abortControllerRef = useRef(null);
  //const [isLoading, setIsLoading] = useState(false);

  const DEEPSEEK_API_KEY = "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"; // Replace with your actual API key
  const DEEPSEEK_API_URL = "https://openrouter.ai/api/v1/chat/completions"; // Replace with the actual API endpoint

  const handelContactUs = () =>{
    navigate("/contact-us");
  }

  // Check if the user is authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // If the user is not authenticated, redirect to the login page
        navigate("/login");
      }
    });

    // Cleanup the subscription
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Sign out the user
      await signOut(auth);
  
      // Redirect to the home page
      navigate("/");
  
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  
  const handleSendMessage = async () => {
    if (message.trim() === "" && imagePreviews.length === 0) return;
  
    // Create a new user message
    const newUserMessage = {
      sender: "user",
      text: message.trim(),
      images: imagePreviews.length > 0 ? [...imagePreviews] : undefined,
    };
  
    // Immediately update the chat with the user's message
    setChat((prevChat) => [...prevChat, newUserMessage]);
    setMessage("");
    setImagePreviews([]);
    setMessageSent(true);
    setIsSending(true); // Set sending state
  
    // Add a temporary AI message with isLoading: true
    const tempAIMessage = {
      sender: "ai",
      text: "",
      isLoading: true,
    };
  
    setChat((prevChat) => [...prevChat, tempAIMessage]);
  
    // Create a new abort controller
    abortControllerRef.current = new AbortController();
    
    try {
      console.log("Sending request to DeepSeek API...");
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: message }],
        },
        {
          headers: {
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
            "Content-Type": "application/json",
          },
          signal: abortControllerRef.current.signal, // Pass the abort signal
        }
      );
  
      console.log("API Response:", response.data);
      const aiResponse = response.data.choices[0].message.content;
  
      // Replace the temporary AI message with the actual response
      setChat((prevChat) => {
        const updatedChat = [...prevChat];
        updatedChat[updatedChat.length - 1] = { sender: "ai", text: aiResponse, isLoading: false };
        return updatedChat;
      });
  
    } catch (error) {
      if (axios.isCancel(error)) { // Check if the request was canceled
        console.log("Message sending canceled.");
        setChat((prevChat) => {
          const updatedChat = [...prevChat];
          updatedChat[updatedChat.length - 1] = { 
            sender: "ai", 
            text: "Couldn't get your message.", 
            isLoading: false 
          };
          return updatedChat;
        });
      } else {
        console.error("Error calling DeepSeek API:", error);
        setChat((prevChat) => {
          const updatedChat = [...prevChat];
          updatedChat[updatedChat.length - 1] = {
            sender: "ai",
            text: "Sorry, I couldn't process your request. Please try again later.",
            isLoading: false,
          };
          return updatedChat;
        });
      }
    }
  
    setIsSending(false); // Reset sending state
  
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };
  
   const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to recalculate
    textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`; // Adjust dynamically
  };

  const groupChatsByDate = (chats) => {
    const groupedChats = {};
  
    chats.forEach((chat) => {
      const date = new Date(chat.timestamp).toDateString(); // Format: "Mon Mar 11 2024"
      
      if (!groupedChats[date]) {
        groupedChats[date] = [];
      }
      
      groupedChats[date].push(chat);
    });
  
    return groupedChats;
  };

 const handleNewChat = () => {
  if (chat.length > 0) {
    // ✅ Only save the chat if it wasn't already in history
    if (!activeChat) {
      const chatTitle = chat[0].text || "Untitled Chat";
      setChatHistory([...chatHistory, { id: Date.now(), title: chatTitle, messages: chat }]);
    }
  }

  setChat([]);
  setMessage("");
  setImagePreviews([]);
  setMessageSent(false);
  setActiveChat(null); // ✅ Reset active chat when starting a new one
  setShowScrollButton(false); // ✅ Reset the scroll button state
};


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (chatBoxRef.current) {
      const isAtBottom = chatBoxRef.current.scrollHeight - chatBoxRef.current.scrollTop <= chatBoxRef.current.clientHeight + 50;
      setShowScrollButton(!isAtBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  // Handle multiple file uploads
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    let validFiles = [];

    files.forEach((file) => {
      if (file.size > 100 * 1024 * 1024) {
        alert(`${file.name} exceeds 100MB. Please select a smaller file.`);
      } else if (file.type.startsWith("image/")) {
        validFiles.push(file);
      }
    });

    if (validFiles.length === 0) return;

    let newPreviews = [...imagePreviews];
    let newProgress = { ...uploadProgress };

    // eslint-disable-next-line no-unused-vars
    validFiles.forEach((file, index) => {
      newProgress[file.name] = 0;

      const reader = new FileReader();
      reader.onload = () => {
        let progress = 0;
        const fakeUpload = setInterval(() => {
          progress += 10;
          newProgress[file.name] = progress;
          setUploadProgress({ ...newProgress });

          if (progress >= 100) {
            clearInterval(fakeUpload);
            newPreviews.push(reader.result);
            setImagePreviews([...newPreviews]);
          }
        }, 100);
      };
      reader.readAsDataURL(file);
    });

    setUploadProgress(newProgress);
  };

  const removeImage = (index) => {
    const updatedImages = [...imagePreviews];
    updatedImages.splice(index, 1);
    setImagePreviews(updatedImages);
  };

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const closeProfileMenu = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setShowProfileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeProfileMenu);
    return () => document.removeEventListener("mousedown", closeProfileMenu);
  }, []);

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowProfileMenu(false); // Close profile menu when opening settings
  };

  const handleSave = () => {
    const maskedEmail =email.replace(/(.{5})(.{3})(@.*)/, "$1***$3");
    setEmail(maskedEmail);
    setEdited(false);
  };

  const deleteChat = (e, chatId) => {
    e.stopPropagation(); // Prevents triggering `loadChat`
    const updatedHistory = chatHistory.filter((chat) => chat.id !== chatId);
    setChatHistory(updatedHistory);
  
    // If the active chat is deleted, clear it
    if (activeChat?.id === chatId) {
      setActiveChat(null);
      setChat([]);
    }
  };
  

  const clearHistory = () => {
    setChatHistory([]);
  };

  const loadChat = (chatItem) => {
  setActiveChat(chatItem);  // ✅ Track which chat is active
  setChat(chatItem.messages);
  setMessageSent(true);
  setShowHistory(false);
  setShowScrollButton(false); // ✅ Reset the scroll button state
};

  const handleDeleteAccount = async () => {
    try {
      // Get the currently authenticated user
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error("No user is currently signed in.");
      }
  
      // Delete the user's account
      await deleteUser(user);
  
      // Redirect to the home page
      navigate("/");
  
      console.log("User account deleted successfully.");
      
    } catch (error) {
      console.error("Error deleting account:", error.message);
      setError(error.message);
    }
  };

  const handleCancelMessage = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Cancel the API request
      setIsSending(false);
    }
  };

  const handleCancelClick = () => {
    handleCancelMessage();
    setIsSending(false);
  };

  return (
    <div className="albert-container">
      {/* Sidebar */}
      <div className="albert-sidebar">
        <Menu className="albert-sidebar-menu-icon" />
        <div className="albert-sidebar-icons">
          <MessageSquarePlus className="messageI" onClick={handleNewChat} style={{ cursor: "pointer" }} />
          <History className="historyI" onClick={() => setShowHistory(true)} style={{ cursor: "pointer" }} />
        </div>
        <div className="albert-profile-section" ref={profileRef}>
          <User className="albert-profile-icon" onClick={toggleProfileMenu} />
          {showProfileMenu && (
            <div className="profile-menu">
              <p>{name}</p>
              <div className="profile-menu-item"  onClick={toggleSettings}><Settings /> Settings</div>
              <div className="profile-menu-item" onClick={() => setShowModal(true)}><Trash2 /> Delete all chats</div>
              <div className="profile-menu-item" onClick={handelContactUs}><Mail /> Contact us</div>
              <div className="profile-menu-item" onClick={handleLogout}><LogOut /> Log out</div>
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Delete all chats</h2>
            <p>
              If you confirm deletion, all chat history for this account will be
              permanently erased and cannot be recovered.
            </p>
            <p>Are you sure you want to delete all chat history?</p>

            <div className="clear-modal-buttons">
              <button onClick={() => setShowModal(false)} className="clear-modal-cancel-btn">
                Cancel
              </button>
              <button
                onClick={() => {
                  clearHistory();
                  setShowModal(false);
                }}
                className="clear-modal-confirm-btn"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      )}

       {/* Settings Modal */}
        {showSettings && (
          <div className="settings-modal">
            <div className="settings-content">
            <div className="settings-header">
              <h2>Settings</h2>
              <div className="btGroup">
                <button className={`save-settings ${edited ? 'active' : ''}`} onClick={edited ? handleSave : null}>Save</button>
                <X className="close-settings" onClick={toggleSettings} />
              </div>
            </div>

              <div className="settings-tabs">
                <p className="tab active">Profile</p>
              </div>

              <div className="settings-body">
              <div className="settings-item">
                <span>Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setEdited(true); }}
                />
              </div>
              <div className="settings-item">
                <span>Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEdited(true); }}
                />
              </div>
              <div className="settings-item">
                <span>Phone number</span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setEdited(true); }}
                />
              </div>
                <div className="settings-item">
                  <span>Terms of Use</span>
                  <span className="view-link">View</span>
                </div>
                <div className="settings-item">
                  <span>Privacy Policy</span>
                  <span className="view-link">View</span>
                </div>
                <div className="settings-item delete-section">
                  <span>Delete account</span>
                  <button className="Al-delete-button" onClick={handleDeleteAccount}>Delete</button>
                </div>
                {error && <p className="error-message">{error}</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat History Modal */}
      {showHistory && (
  <div className="history-modal">
    <div className="history-content">
      <div className="history-header">
        <h2>Chat History</h2>
        <X className="close-history" onClick={() => setShowHistory(false)} />
      </div>

      <div className="history-body">
        {chatHistory.length === 0 ? (
          <p className="no-history">No previous chats</p>
        ) : (
          Object.entries(groupChatsByDate(chatHistory)).map(([date, chats]) => (
            <div key={date} className="chat-date-group">
              <h3 className="history-date">{date}</h3>
              {chats.map((chatItem) => (
                <div
                  key={chatItem.id}
                  className="history-item"
                  onClick={() => loadChat(chatItem)}
                >
                  <p>{chatItem.title}</p>
                  <Trash2 className="delete-chat" onClick={(e) => deleteChat(e, chatItem.id)} />
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {chatHistory.length > 0 && (
        <button className="clear-history" onClick={() => setShowModal(true)}>Clear History</button>
      )}
    </div>
  </div>
      )}


      {/* Main Content */}
      <div className="albert-main-content">
        {!messageSent && chat.length === 0 && (
          <>
            <h1 className="AlHeader">Albert, your marketing Ally</h1>
            <p className="AlAsk">How can I help you today?</p>
          </>
        )}

        {/* Chat Box */}
        {messageSent && (
          <div className="albert-chat-box" ref={chatBoxRef} onScroll={handleScroll}>
          {(activeChat ? activeChat.messages : chat).map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text && <p>{msg.text}</p>}
              {msg.images &&
                msg.images.map((img, i) => (
                  <img key={i} src={img} alt="Uploaded" className="sent-image" />
                ))}
        
              {/* Show loading bubbles only for AI messages with isLoading true */}
              {msg.sender === "ai" && msg.isLoading && (
                <div className="loading-bubbles">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </div>
          ))}
        </div>
        )}

        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <button className="scroll-to-bottom" onClick={scrollToBottom}>
            <ArrowDown size={20} />
          </button>
        )}

        {/* Message Box */}
        <div className={`albert-message-box ${messageSent ? "expanded" : ""}`}>
          {/* Image Previews Inside Message Box (To the Left) */}
          {imagePreviews.length > 0 && (
            <div className="message-preview-container">
              {imagePreviews.map((img, index) => (
                <div key={index} className="image-preview-item">
                  {uploadProgress[img] < 100 && (
                    <div className="upload-progress">
                      <div className="progress-bar" style={{ width: `${uploadProgress[img]}%` }}></div>
                    </div>
                  )}
                  <img src={img} alt="Preview" className="message-preview" />
                  <X className="remove-image" onClick={() => removeImage(index)} />
                </div>
              ))}
            </div>
          )}

          <div className="inputs">
            <textarea
              ref={textareaRef}
              placeholder="Message Albert"
              className="albert-textarea"
              value={message}
              rows="1"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              style={{
                maxHeight: "300px",
                minHeight: "40px",
                overflowY: "auto",
                resize: "none",
              }}
            />

            {/* File Upload */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
              accept="image/*, .pdf, .doc, .docx"
              multiple
            />
            <Paperclip
              className="albert-attachment-icon"
              title="Upload docs or images (Max 100MB each)"
              onClick={() => fileInputRef.current.click()}
            />

            {isSending ? (
                    <Square
                      className="albert-stop-icon"
                      style={{
                        backgroundColor: "#088a6a",
                        color: "white",
                        padding: "5px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={handleCancelClick}
                      size={30}
                    />
                  ) : (
                    <Send
                      className="albert-send-icon"
                      style={{
                        backgroundColor: message.trim() || imagePreviews.length > 0 ? "#088a6a" : "#ccc",
                        color: message.trim() || imagePreviews.length > 0 ? "white" : "black",
                        padding: "5px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={handleSendMessage}
                      size={26}
                    />
                  )}
                      </div>
                    </div>
                  </div>
                  <div className="Al-floating-squares-container">
                    {[...Array(20)].map((_, index) => (
                      <div key={index} className="Al-floating-square"></div>
                    ))}
      </div>
    </div>
  );
};

export default Albert;
