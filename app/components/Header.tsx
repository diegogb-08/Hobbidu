import logo from '../../public/images/website_logo_transparent_background.png';
import NavBar from './NavBar';

interface Props {
  isAuthenticated: boolean;
}

const Header = ({ isAuthenticated }: Props) => {
  return (
    <div className="box-border h-16 flex-1 flex justify-center items-center">
      <img className="h-4/5" src={logo} alt="logo" />
      {isAuthenticated && (
        <div className="navbar">
          <NavBar />
        </div>
      )}
    </div>
  );
};

export default Header;
