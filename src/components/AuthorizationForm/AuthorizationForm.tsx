import { AuthForm } from "../../models";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import Button from '../Button/Button';
import './AuthorizationForm.css';

type AuthFormProps = {
  getDataForm: (form: AuthForm | null) => void
}

const AuthorizationForm = ({ getDataForm }: AuthFormProps): JSX.Element => {
  const [form, setForm] = useState<AuthForm | null>(null);

  const handlerForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setForm({
      login: (event.currentTarget.login.value).trim(),
      password: event.currentTarget.password.value
    });

    event.currentTarget.reset()
  }

  useEffect(() => {
    getDataForm(form)
  }, [form, getDataForm])



  return (
    <form className="authorization-form" onSubmit={handlerForm}>
      <Input type='text' name='login' placeholder='Username' value='vasya' />
      <Input type='password' name='password' placeholder='Password' value='password' />
      <Button type='submit' className='submit-btn' name='Login' />
    </form>
  );
};

export default AuthorizationForm;