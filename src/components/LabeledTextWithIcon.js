import "./LabeledTextWithIcon.css";

const LabeledTextWithIcon = ({ icon, label, text }) => {
  return (
    <div className="labeled-text">
      {icon && <div className="icon">{icon}</div>}
      <h4>{label}:</h4>
      <p>{text}</p>
    </div>
  );
};

export default LabeledTextWithIcon;
