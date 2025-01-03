import './Header.css'

const Header = (props): JSX.Element => {
  const {children} = props;

  return (
    <header className="header">
      {children}
    </header>
  );
};

export default Header;
