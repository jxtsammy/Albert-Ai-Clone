import { useState, useEffect, useRef } from "react";
import { MessageSquarePlus, History, Menu, Paperclip, ArrowUp, ArrowDown, Atom, Globe, User, X, Settings, Trash2, Mail, LogOut,} from "lucide-react";
import "./Ai.css";

const Albert = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [messageSent, setMessageSent] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const chatBoxRef = useRef(null);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("Samuel Sallo");
  const [email, setEmail] = useState("rober****@gmail.com");
  const [phone, setPhone] = useState("");
  const [edited, setEdited] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSendMessage = () => {
    if (message.trim() === "" && imagePreviews.length === 0) return;

    let newMessages = [];
    if (message.trim()) {
      newMessages.push({ sender: "user", text: message });
    }
    if (imagePreviews.length > 0) {
      newMessages.push({ sender: "user", images: [...imagePreviews] });
    }

    const updatedChat = [...chat, ...newMessages, { sender: "ai", text: "This is a dummy AI response." }];
    setChat(updatedChat);
    setMessage("");
    setImagePreviews([]);
    setMessageSent(true);

    // ✅ Update chat history instead of adding a new entry
    if (activeChat) {
      // Find and update the existing chat
      const updatedHistory = chatHistory.map((chatItem) =>
        chatItem.id === activeChat.id ? { ...chatItem, messages: updatedChat } : chatItem
      );
      setChatHistory(updatedHistory);
      setActiveChat({ ...activeChat, messages: updatedChat });
    } else {
      // ✅ Create a new chat if it's a fresh conversation
      const newChat = { id: Date.now(), title: updatedChat[0].text || "New Chat", messages: updatedChat };
      setChatHistory([...chatHistory, newChat]);
      setActiveChat(newChat);
    }

    setTimeout(() => {
      scrollToBottom();
    }, 100);
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
  };




  return (
    <div className="albert-container">
      {/* Sidebar */}
      <div className="albert-sidebar">
        <Menu className="albert-sidebar-menu-icon" />
        <div className="albert-sidebar-icons">
          <MessageSquarePlus onClick={handleNewChat} style={{ cursor: "pointer" }} />
          <History onClick={() => setShowHistory(true)} style={{ cursor: "pointer" }} />
        </div>
        <div className="albert-profile-section" ref={profileRef}>
          <User className="albert-profile-icon" onClick={toggleProfileMenu} />
          {showProfileMenu && (
            <div className="profile-menu">
              <p>{name}</p>
              <div className="profile-menu-item"  onClick={toggleSettings}><Settings /> Settings</div>
              <div className="profile-menu-item" onClick={() => setShowModal(true)}><Trash2 /> Delete all chats</div>
              <div className="profile-menu-item"><Mail /> Contact us</div>
              <div className="profile-menu-item"><LogOut /> Log out</div>
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
                Confirm deletion
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
                  <button className="Al-delete-button">Delete</button>
                </div>
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
            {/* Scrollable Chat List */}
            <div className="history-body">
              {chatHistory.length === 0 ? (
                <p className="no-history">No previous chats</p>
              ) : (
                chatHistory.map((chatItem) => (
                  <div
                    key={chatItem.id}
                    className="history-item"
                    onClick={() => loadChat(chatItem)}
                  >
                    <p>{chatItem.title}</p>
                    <Trash2 className="delete-chat" onClick={(e) => deleteChat(e, chatItem.id)} />
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
            <h1 className="AlHeader">Hi, I&apos;m Albert.</h1>
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
              placeholder="Message Albert"
              className="albert-textarea"
              value={message}
              rows="1"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}

            ></textarea>

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

            <ArrowUp
              className="albert-send-icon"
              style={{ backgroundColor: message.trim() || imagePreviews.length > 0 ? "#2d44f0" : "#ccc" }}
              onClick={handleSendMessage}
            />
          </div>
          <div className="albert-buttons">
            <button className="albert-deepthink-btn"><Atom />DeepThink (R1)</button>
            <button className="albert-search-btn"><Globe />Search</button>
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
