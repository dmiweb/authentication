import { TUser } from "../models";
import { useState, useEffect } from "react";

export const useGetUser = (trigger = false): TUser | null => {
  const [storedUser, setStoredUser] = useState<TUser | null>(null);

  useEffect(() => {
    const saveUser = localStorage.getItem('site_user_profile');
    if (saveUser) setStoredUser(JSON.parse(saveUser));
  }, [trigger]);

  return storedUser;
};