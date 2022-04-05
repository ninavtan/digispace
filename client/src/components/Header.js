import { Link, useHistory } from "react-router-dom";

const Header = (props) => {
  const history = useHistory();

  const handleBackClick = () => {
    console.log('hi?');
    history.goBack();
  }

  return (
    <div>
      <div className='jumbotron text-center'>
          <Link to="/" style={{ textDecoration: 'none' }}><h1 className="jumbotron-heading">DigiSpace</h1></Link>
            <h2>⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿</h2>
            <h5>Welcome to DigiSpace. A collaborative cyberspace that empowers collaboration and connection.</h5>
            <h2>⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿</h2>
        {props.children}
      </div>
    </div>

  )
};

export default Header;