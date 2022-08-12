import { Layout } from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { AddPostPage } from './pages/AddPost/AddPostPage';
import { EditPostPage } from './pages/EditPostPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { FullPost } from './pages/FullPost';
import React from "react";
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path=':id/edit' element={<EditPostPage />} />
        <Route path='spune' element={<AddPostPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='posts/:id' element={<FullPost />} />
      </Routes>
    </Layout>
  );
}

export default App;

