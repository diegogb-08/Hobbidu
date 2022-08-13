import { Link } from '@remix-run/react';

const LoginButton = () => {
  return (
    <Link
      to="/login"
      rel="preload"
      className="bg-transparent hover:bg-primary text-label font-semibold hover:text-fontcolor-white py-2 px-4 border hover:border-transparent rounded"
    >
      Login
    </Link>
  );
};

export default LoginButton;
