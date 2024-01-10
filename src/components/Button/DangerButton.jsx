const DangerButton = ({ children, onClick }) => {
  return (
    <button className="hover:text-red-600" onClick={onClick}>
      {children}
    </button>
  );
};

export default DangerButton;
