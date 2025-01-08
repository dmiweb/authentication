import { TUser } from '../../models';
import { useState, useEffect } from 'react';
import { useFetchWithLocalStorage } from '../../hooks/useFetchWithLocalStorage';
import Button from "../Button/Button";
import './UserProfile.css';

type UserProps = {
  token: string | null,
  handlerLogout: () => void
}

const UserProfile = ({ token, handlerLogout }: UserProps): JSX.Element => {
  const [user, setUser] = useState<TUser | null>(null);

  const [{ loading }] = useFetchWithLocalStorage(
    !user && token ? import.meta.env.VITE_USER_URL : null,
    { headers: { Authorization: `Bearer ${token}` } },
    'site_user_profile'
  );

  useEffect(() => {
    const saveUser = localStorage.getItem('site_user_profile');
    if (saveUser) setUser(JSON.parse(saveUser));
  }, [loading]);

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