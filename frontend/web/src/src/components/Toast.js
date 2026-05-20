// src/components/Toast.js
export default function Toast({ message, type = "success", onClose }) {
  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div className={`fixed bottom-5 right-5 ${bgColor} text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-bounce z-50`}>
      <span className="font-bold">{message}</span>
      <button onClick={onClose} className="hover:text-gray-200 font-black">X</button>
    </div>
  );
}