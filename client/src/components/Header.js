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
          <Link to="/"><h1 className="jumbotron-heading">⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿</h1></Link>
        {props.children}
      </div>
    </div>

  )
};

export default Header;