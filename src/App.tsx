import { AuthForm } from './models';
import { useState, useEffect, useCallback } from 'react'
import { useFetchWithLocalStorage } from './hooks/useFetchWithLocalStorage';
import Header from './components/Header/Header'
import Logo from './components/Logo/Logo';
import AuthorizationForm from './components/AuthorizationForm/AuthorizationForm';
import UserProfile from './components/UserProfile/UserProfile';
import Main from './components/Main/Main';
import GuestPage from './components/GuestPage/GuestPage';
import NewsFeed from './components/NewsFeed/NewsFeed';
import './App.css';

function App(): JSX.Element {
  const [authData, setAuthData] = useState<{ login: string, password: string } | null>(null);
  const [access, setAccess] = useState<boolean>(false)
  const [fetchTrigger, setFetchTrigger] = useState<number>(0)

  const token: string | null = localStorage.getItem('site_access_token');

  const [{ error }] = useFetchWithLocalStorage(
    authData && import.meta.env.VITE_AUTH_URL,
    { method: 'POST', body: JSON.stringify(authData) },
    'site_access_token',
    fetchTrigger
  );

  useEffect(() => {
    if (token && 'token' in JSON.parse(token)) {
      setAccess(true)
    } else {
      localStorage.removeItem('site_access_token')
    }
  }, [token])

  const getDataForm = useCallback(async (form: AuthForm | null): Promise<void> => {
    setAuthData(form)
    setFetchTrigger((prev) => prev + 1);
  }, []);

  const handlerLogout = () => {
    setAccess(false)
    localStorage.removeItem('site_access_token');
    localStorage.removeItem('site_user_profile');
  }

  return (
    <>
      <Header>
        <Logo />
        {!access && <AuthorizationForm getDataForm={getDataForm} />}
        {access && <UserProfile handlerLogout={handlerLogout} />}
        {error && <div className='error-message'>{error}</div>}
      </Header>
      <Main>
        {!access && <GuestPage />}
        {access && <NewsFeed />}
      </Main>
    </>
  )
}

export default App;