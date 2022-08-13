import useAuth from '~/hooks/useAuth';
import logo from '../../public/img/logo.png';
import LoginButton from './Buttons/LoginButton';
import NavBar from './NavBar';

const Header = () => {
  const isAuthenticated = useAuth();
  return (
    <div className="box-border h-16 flex-1 flex justify-center items-center bg-white border-b-[0.5px] border-b-lable6">
      <img className="h-4/5" src={logo} alt="logo" />
      <div className="absolute inset-x-3/4">
        {isAuthenticated ? <NavBar /> : <LoginButton />}
      </div>
    </div>
  );
};

export default Header;
