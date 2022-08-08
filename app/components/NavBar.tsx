import { Link } from '@remix-run/react';

const NavBar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/create-event">Create Event</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default NavBar;
