import './Header.css'

type HeaderProps = {
  children: JSX.Element | JSX.Element[]
}

const Header = (props: HeaderProps): JSX.Element => {
  const {children} = props;

  return (
    <header className="header">
      {children}
    </header>
  );
};

export default Header;
