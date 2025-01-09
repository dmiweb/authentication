import { TUser } from '../../models';
import { useState, useEffect } from 'react';
import { useFetchWithLocalStorage } from '../../hooks/useFetchWithLocalStorage';
import { useGetToken } from '../../hooks/useGetToken';
import { useGetUser } from '../../hooks/useGetUser';
import Button from "../Button/Button";
import './UserProfile.css';

type UserProps = {
  handlerLogout: () => void
}

const UserProfile = ({ handlerLogout }: UserProps): JSX.Element => {
  const [loadUser, setLoadUser] = useState<boolean>(false);
  const token = useGetToken();
  const localStorageKey = 'site_user_profile';

  const [{ loading }] = useFetchWithLocalStorage(
    token && loadUser ? import.meta.env.VITE_USER_URL : null,
    { headers: { Authorization: `Bearer ${token}` } },
    localStorageKey
  );

  const saveUser: TUser | null = useGetUser(loading);

  useEffect(() => {
    const storedUser = localStorage.getItem(localStorageKey);
    if (storedUser) {
      setLoadUser(false);
    } else {
      setLoadUser(true);
    }
  }, [saveUser])

  return (
    <>
      {saveUser &&
        <div id={saveUser.id} className="user-profile">
          <span className="user-profile-name">Hello, {saveUser.name}</span>
          <div className='user-profile-wrap-avatar'>
            <img src={saveUser.avatar} className="user-profile-avatar" alt='user avatar' />
          </div>
          <Button type='button' className='profile-logout-btn' name='Logout' handler={handlerLogout} />
        </div>}
    </>
  );
}

export default UserProfile;