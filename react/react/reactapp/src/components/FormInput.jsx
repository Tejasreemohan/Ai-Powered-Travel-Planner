export default function FormInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div style={{ marginBottom: "15px" }}>
      {label && (
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-input"
      />
    </div>
  );
}
