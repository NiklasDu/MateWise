import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * ChatBox-Komponente
 *
 * Komplette Funktion für das Chatfenster, um mit anderen Nutzern zu chatten.
 *
 * - Lädt den Chat-Verlauf zwischen zwei Nutzern.
 * - Erstellt eine Live Verbindung mit Websocket
 * - Sendet Nachrichten
 *
 * @returns Den HTML Code zu der ChatBox.
 */
function ChatBox({ selectedUser, onClose }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Beim laden der Komponente wird der Chatverlauf geladen und der Token für die Live-Verbindung
  // erstellt.
  useEffect(() => {
    if (!user || !selectedUser) return;

    // Chatverlauf laden
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
          setMessages([]);
        }
      });

    let socket;

    // Token holen und dann WebSocket verbinden
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

  // Beim Aufruf der Komponente wird direkt nach unten gescrollt.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Sendet eine Nachricht an den Nutzer.
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
      <h2 className="text-lg font-bold mb-2 dark:text-white">
        Chat mit {selectedUser.username}
      </h2>
      <div className="h-64 overflow-y-auto border rounded-sm p-2 mb-2">
        {/* Lädt alle Nachrichten. */}
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
        {/* Gibt das Ende des Chats an, damit dorthin gescrollt werden kann. */}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded dark:text-white"
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
