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
        <div className="container">
          <Link to="/"><h1 className="jumbotron-heading">⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿</h1></Link>
        </div>
      </div>
      <div className='container'>
        {props.children}
      </div>
    </div>
  )
};

export default Header;