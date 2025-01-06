import './Input.css'

type InputProps = {
  type: string, 
  name: string, 
  placeholder: string, 
  value: string
}

const Input = ({ type, name, placeholder, value }: InputProps): JSX.Element => {
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