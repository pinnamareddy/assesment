import './App.css'
import Home from './components/Dashboard/dashboard.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/reducers';
import RoutesNames from './routes/routes.js'

function App() {
  const storedData = localStorage.getItem('LoginDetails');
  return (
    <Provider store={store}>
    <BrowserRouter> 
    {storedData ? <Home /> : null}
    <Routes>
      {RoutesNames.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Routes>
  </BrowserRouter>
  </Provider>
  );
}

export default App;
