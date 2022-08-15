import { useMatches } from '@remix-run/react';
import { Link } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import logo from '../../public/img/logo.png';
import LinkButton from './Buttons/LinkButton';
import NavBar from './NavBar';

const Header = () => {
  const isAuthenticated = useAuth();
  const matches = useMatches();
  return (
    <div className="box-border h-16 flex-1 flex justify-center items-center bg-white border-b-[0.5px] border-b-gray">
      <Link to="/" className="h-full flex items-center">
        <img className="h-4/5" src={logo} alt="logo" />
      </Link>
      <div className="absolute right-4">
        {isAuthenticated ? (
          <NavBar />
        ) : (
          !matches[1].pathname.includes('account') && (
            <>
              <LinkButton
                to="account/register"
                text="Register"
                className="rounded-3xl hover:bg-blue text-blue"
              />
              <LinkButton to="account/login" text="Login" />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Header;
