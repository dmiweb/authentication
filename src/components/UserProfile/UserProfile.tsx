import { TUser } from '../../models';
import { useState, useEffect } from 'react';
import { useFetchWithLocalStorage } from '../../hooks/useFetchWithLocalStorage';
import Button from "../Button/Button";
import './UserProfile.css';

type UserProps = {
  handlerLogout: () => void
}

const UserProfile = ({ handlerLogout }: UserProps): JSX.Element => {
  const [user, setUser] = useState<TUser | null>(null);

  const saveToken = localStorage.getItem('site_access_token');
  const { token } = saveToken && JSON.parse(saveToken);
  const saveUser = localStorage.getItem('site_user_profile');

  useFetchWithLocalStorage(
    !user ? import.meta.env.VITE_USER_URL : null,
    { 
      method: "GET",
      headers: { Authorization: `Bearer ${token}` } 
    },
    'site_user_profile'
  );

  useEffect(() => {
    if(saveUser) setUser(JSON.parse(saveUser));
  }, [saveUser]);

  return (
    <>
      {user &&
        <div id={user.id} className="user-profile">
          <span className="user-profile-name">Hello, {user.name}</span>
          <div className='user-profile-wrap-avatar'>
            <img src={user.avatar} className="user-profile-avatar" alt='user avatar' />
          </div>
          <Button type='button' className='profile-logout-btn' name='Logout' handler={handlerLogout} />
        </div>}
    </>
  );
}

export default UserProfile;