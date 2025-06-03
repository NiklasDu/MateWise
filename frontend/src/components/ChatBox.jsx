import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

function ChatBox({ selectedUser }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user || !selectedUser) return;

    const socket = new WebSocket(`${API_URL}/ws/chat`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket verbunden");
      socket.send(JSON.stringify({ type: "init" }));
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

    // JWT anhängen
    socketRef.current._send = socket.send;
    socket.send = (data) =>
      socketRef.current._send.call(
        socketRef.current,
        new Blob([data], {
          type: "application/json",
        })
      );

    return () => socket.close();
  }, [selectedUser]);

  const sendMessage = () => {
    if (input.trim()) {
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
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-lg font-bold mb-2">
        Chat mit {selectedUser.username}
      </h2>
      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-1 ${msg.fromThem ? "text-left" : "text-right"}`}
          >
            <span
              className={`inline-block px-3 py-1 rounded ${
                msg.fromThem
                  ? "bg-gray-200 text-black"
                  : "bg-blue-500 text-white"
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Senden
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
