import { Link } from "react-router-dom";

function Navbar() {
  return (
   <nav>
      <Link to="/profile">
        Profile
      </Link>

      <Link to="/settings">
        Settings
      </Link>
    </nav>
  );
}

export default Navbar;