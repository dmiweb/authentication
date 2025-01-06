import { ReactNode } from 'react';
import './Header.css';

type HeaderProps = {
  children?: ReactNode
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
