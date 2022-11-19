import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  return (
    <header className="header mt-2" onClick={() => navigate("/", {replace: true})} style={{cursor: "pointer"}}>
      <h1 className="header-title">To-do List App</h1>
    </header>
  );
};

export default Header;
