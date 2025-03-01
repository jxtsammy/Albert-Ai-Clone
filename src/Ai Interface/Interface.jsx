import { useState, useEffect, useRef } from "react";
import { MessageSquarePlus, Smartphone, Menu, Paperclip, ArrowUp, ArrowDown, Atom, Globe, User, X, Settings, Trash2, Mail, LogOut } from "lucide-react";
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

  const handleSendMessage = () => {
    if (message.trim() === "" && imagePreviews.length === 0) return;

    let newMessages = [];
    if (message.trim()) {
      newMessages.push({ sender: "user", text: message });
    }
    if (imagePreviews.length > 0) {
      newMessages.push({ sender: "user", images: [...imagePreviews] });
    }

    setChat([...chat, ...newMessages, { sender: "ai", text: "This is a dummy AI response." }]);
    setMessage("");
    setImagePreviews([]);
    setMessageSent(true);

    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const handleNewChat = () => {
    setChat([]);
    setMessage("");
    setImagePreviews([]);
    setMessageSent(false);
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


  return (
    <div className="albert-container">
      {/* Sidebar */}
      <div className="albert-sidebar">
        <Menu className="albert-sidebar-menu-icon" />
        <div className="albert-sidebar-icons">
          <MessageSquarePlus onClick={handleNewChat} style={{ cursor: "pointer" }} />
          <Smartphone />
        </div>
        <div className="albert-profile-section" ref={profileRef}>
          <User className="albert-profile-icon" onClick={toggleProfileMenu} />
          {showProfileMenu && (
            <div className="profile-menu">
              <p>Samuel Sallo</p>
              <div className="profile-menu-item"><Settings /> Settings</div>
              <div className="profile-menu-item"><Trash2 /> Delete all chats</div>
              <div className="profile-menu-item"><Mail /> Contact us</div>
              <div className="profile-menu-item"><LogOut /> Log out</div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="albert-main-content">
        {!messageSent && chat.length === 0 && (
          <>
            <h1>Hi, I&apos;m Albert.</h1>
            <p>How can I help you today?</p>
          </>
        )}

        {/* Chat Box */}
        {messageSent && (
          <div className="albert-chat-box" ref={chatBoxRef} onScroll={handleScroll}>
            {chat.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text && <p>{msg.text}</p>}
                {msg.images &&
                  msg.images.map((img, i) => <img key={i} src={img} alt="Uploaded" className="sent-image" />)}
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
      <div className="floating-squares-container">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="floating-square"></div>
        ))}
      </div>
    </div>
  );
};

export default Albert;
