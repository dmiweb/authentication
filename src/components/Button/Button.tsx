import './Button.css'

type ButtonProps = {
  type: 'submit' | 'button',
  className: string,
  name: string,
  handler?: () => void
}

const Button = ({ type, className, name, handler = undefined }: ButtonProps): JSX.Element => {
  return (
    <button type={type} className={`button ${className}`} onClick={handler}>
      {name}
    </button>
  );
};

export default Button;