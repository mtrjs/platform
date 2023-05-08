import { getUser } from '@api/user';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import user from '@slices/user';
import { fetchApplicationList } from '@slices/application';
import { AppDispatch } from './store';
import Router from './router';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  const fetchUserInfo = async () => {
    const { data: userInfo } = await getUser();
    dispatch(user.actions.setUserInfo(userInfo));
    dispatch(fetchApplicationList());
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return <Router />;
}
