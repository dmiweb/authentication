import './Input.css'

const Input = ({ type, name, placeholder, value }): JSX.Element => {
  return (
    <input
      type={type}
      className='input'
      name={name}
      placeholder={placeholder}
      required
      defaultValue={value}
    />
  );
};

export default Input;