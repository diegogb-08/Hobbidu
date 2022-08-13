import { Link } from '@remix-run/react';

const NavBar = () => {
  return (
    <div className="flex w-80 justify-between">
      <Link to="/">Home</Link>
      <Link to="/create-event">Create Event</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default NavBar;
