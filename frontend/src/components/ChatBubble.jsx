export default function ChatBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        display:        "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom:   12,
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "#6c63ff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, marginRight: 8, flexShrink: 0,
          }}
        >
          🏛️
        </div>
      )}

      <div
        style={{
          maxWidth:     "72%",
          background:   isUser ? "#6c63ff" : "#1e1e24",
          color:        "#f0f0f0",
          padding:      "12px 16px",
          borderRadius: isUser
            ? "18px 18px 4px 18px"
            : "18px 18px 18px 4px",
          fontSize:   14,
          lineHeight:  1.6,
          whiteSpace: "pre-wrap",
        }}
      >
        {message.content}
      </div>
    </div>
  );
}