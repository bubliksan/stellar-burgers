import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredientsAll } from '../../services/ingredients/actions';
import { getFeedsAll } from '../../services/feed/feedSlice';
import { checkUserAuth } from '../../services/user/actions';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredientsAll());
    dispatch(getFeedsAll());
  }, []);
  console.log('App rendered'); // Сколько раз рендерится?
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title='Детали заказа' onClose={() => window.history.back()}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title='Детали заказа'
                  onClose={() => window.history.back()}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингридиента'
              onClose={() => window.history.back()}
            >
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>
      <Routes location={backgroundLocation || location}>
        <Route path='/ingredients/:id' element={<ConstructorPage />} />
        <Route path='/feed/:number' element={<Feed />} />
        <Route path='/profile/orders/:number' element={<ProfileOrders />} />
      </Routes>
    </div>
  );
};

export default App;
