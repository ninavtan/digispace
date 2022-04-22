import { Link, useHistory } from "react-router-dom";
import NavBar from "./nav-bar";
import AuthNav from './auth-nav';
import { useAuth0 } from '@auth0/auth0-react';



const Header = (props) => {
  const history = useHistory();

  const handleBackClick = () => {
    console.log('hi?');
    history.goBack();
  }


  return (
    <div id="jumbotron-navbar-container">
      <NavBar/>
      <div className='jumbotron text-center'>
          <Link to="/" style={{ textDecoration: 'none' }}><h1 className="jumbotron-heading">DigiSpace</h1></Link>
            <h5>Welcome to DigiSpace. A corner of cyberspace that empowers collaboration and connection.</h5>
            <h2>⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿</h2>
            
        {props.children}
      </div>
    </div>

  )
};

export default Header;