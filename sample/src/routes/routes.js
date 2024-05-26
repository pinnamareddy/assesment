import Orders from '../components/Dashboard/orders/orders';
import Inventory from '../components/Dashboard/inventory/inventory';
import Home from '../components/Dashboard/dashboard_graph/dashboard'
import Login from '../login';
import Suppliers from '../components/Dashboard/Suppliers/suppliers';
const storedData = localStorage.getItem('LoginDetails');
const Routes = [
    { path: '/', element: (!storedData ? <Login /> : <Home />) },
    { path: '/Suppliers', element: <Suppliers /> },
    { path: '/Orders', element: <Orders /> },
    { path: '/Inventory', element: <Inventory /> },
];

export default Routes;