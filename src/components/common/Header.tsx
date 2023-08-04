import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header__navigation">
        <div>Header Component</div>
        <ul>
          <NavLink
            to="/"
            className={({ isActive }) =>
               isActive ? "active" : "inactive"
            }
          >
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) =>
              isActive ? "active" : "inactive"
            }>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) =>
               isActive ? "active" : "inactive"
            }>
            Contact
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default Header;
