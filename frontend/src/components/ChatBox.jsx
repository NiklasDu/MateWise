import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

function ChatBox({ selectedUser, onClose }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user || !selectedUser) return;

    // 1. Nachrichtenverlauf laden
    fetch(`${API_URL}/messages/${selectedUser.id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(
            data.map((msg) => ({
              fromThem: msg.sender_id === selectedUser.id,
              text: msg.content,
            }))
          );
        } else {
          setMessages([]); // Falls Fehlerobjekt kommt
        }
      });

    let socket;

    // 2. Token holen und dann WebSocket verbinden
    fetch(`${API_URL}/auth/ws-token`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const wsToken = data.ws_token;
        // 2. WebSocket mit Token als Query-Parameter öffnen
        socket = new WebSocket(
          `${API_URL.replace(/^http/, "ws")}/ws/chat?token=${wsToken}`
        );
        socketRef.current = socket;

        socket.onopen = () => {
          console.log("WebSocket verbunden");
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.sender_id === selectedUser.id) {
            setMessages((prev) => [
              ...prev,
              { fromThem: true, text: data.content },
            ]);
          }
        };

        socket.onclose = () => {
          console.log("WebSocket getrennt");
        };
      });

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, [user, selectedUser, API_URL]);

  const sendMessage = () => {
    if (
      input.trim() &&
      socketRef.current &&
      socketRef.current.readyState === 1
    ) {
      const payload = {
        receiver_id: selectedUser.id,
        content: input,
      };
      socketRef.current.send(JSON.stringify(payload));
      setMessages((prev) => [...prev, { fromThem: false, text: input }]);
      setInput("");
    }
  };

  return (
    <div className="p-4 relative border rounded-xl bg-white dark:bg-gray-800">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
        aria-label="Close chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 className="text-lg font-bold mb-2">
        Chat mit {selectedUser.username}
      </h2>
      <div className="h-64 overflow-y-auto border rounded-sm p-2 mb-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-1 ${msg.fromThem ? "text-left" : "text-right"}`}
          >
            <span
              className={`inline-block px-3 py-1 rounded ${
                msg.fromThem
                  ? "bg-gray-200 text-black"
                  : "bg-emerald-500 text-white"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-emerald-600 hover:bg-emerald-800 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Senden
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
