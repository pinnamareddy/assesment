import '../dashboard.css'
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const suppliers = useSelector((store) => store.suppliers.supplierData);
  const orders = useSelector((store) => store.orders.orderData);
  const inventory = useSelector((store) => store.inventory.inventoryData);
  console.log(suppliers, orders, inventory)
    return (
        <>
            <div className='main-content'>
<div style={{display:'flex',flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <Box
              height={100}
              width={100}
              display="flex"
              alignItems="center"
              gap={4}
              p={2}
              sx={{ border: '2px solid grey' ,borderRadius:'10px', margin: '90px 90px 0px 35px' }}
            >  
            Suppliers : {suppliers.length}
            </Box>
            <Box
              height={100}
              width={100}
              display="flex"
              alignItems="center"
              gap={4}
              p={2}
              sx={{ border: '2px solid grey' ,  borderRadius:'10px', margin: '90px 90px 0px 35px' }}
            >  
            Inventory:  {inventory.length}
            </Box>
            <Box
              height={100}
              width={100}
              display="flex"
              alignItems="center"
              gap={4}
              p={2}
              sx={{ border: '2px solid grey' , borderRadius:'10px', margin: '90px 90px 0px 35px' }}
            >  
            Orders :{orders.length}
            </Box>
            </div>
           
            </div>
        </>
    )
}

export default Dashboard
