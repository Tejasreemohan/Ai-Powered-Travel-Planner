// export default function Button({ text, onClick, style }) {
//   return (
//     <button
//       onClick={onClick}
//       style={style}
//       className="btn-primary"
//     >
//       {text}
//     </button>
//   );
// }

export default function Button({ text, onClick, style, type = "button" }) {
  return (
    <button
      type={type}          // ✅ CRITICAL FIX
      onClick={onClick}
      style={style}
      className="btn-primary"
    >
      {text}
    </button>
  );
}
