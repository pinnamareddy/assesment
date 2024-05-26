
import './dashboard.css'
import logo from '../../logo.svg'
import { Link } from 'react-router-dom';


const Dashboard = () => {

  return (
    <>
      <div className="dashboard-sidebar">
        <div className='logo'>
          <img src={logo} className='width-30px' alt="dashboard Icon" />
          signalX
        </div>
        <nav className='dashboard-sidebar-nav'>
          <Link to="/" className='dashboard-sidebar-nav-link'>Dashboard</Link>
          <Link to="/Orders" className='dashboard-sidebar-nav-link'>Orders</Link>
          <Link to="/Inventory" className='dashboard-sidebar-nav-link'>Inventory</Link>
          <Link to="/Suppliers" className='dashboard-sidebar-nav-link'>Suppliers</Link>

        </nav>
      </div>
    </>
  )
}

export default Dashboard
