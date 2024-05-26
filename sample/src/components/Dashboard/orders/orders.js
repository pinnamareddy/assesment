import '../dashboard.css'
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Modal, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {updateOrderDetails} from '../../../store/reducers/orders'

const Dashboard = () => {

  // let [rows,updateOrderDetails] = useState([{ id: 1, origin: 'Meghana', destination: '9951696649', status:'intransist', date:null }])
  let [orderData, setOrderData] = useState({})
  let [index, setIndex] = useState(null)
  const dispatch = useDispatch()
  const orders = useSelector((store) => store.orders.orderData);
  const [view, setView] = useState(false)
  const [popup, setPopup] = useState(false)
  const options = [
    { value: 'intransist', label: 'In Transist' },
    { value: 'inprogress', label: 'In Progress' },
    { value: 'deliveried', label: 'Deliveried' },
    { value: 'delayed', label: 'Delayed' },
  ];
  
  const [error, setError] = useState(false)
  const columns  = [
    { field: 'id', headerName: 'shipment ID', width: 150 },
    { field: 'origin', headerName: 'Origin', width: 150 },
    { field: 'destination', headerName: 'Destination', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'date', headerName: 'Delivered Date', width: 150 },
    { field: 'actions',
      headerName: 'Actions', 
      width: 250, 
      renderCell: (props) => <>
      <Button type="submit" sx={{marginRight:'10px'}} onClick={()=>handleView(props.row)} variant="contained">View</Button>
      <Button type="submit" sx={{marginRight:'10px'}} onClick={()=>handleEdit(props.row , props.id)} variant="contained">Edit</Button>
      <Button type="submit"  variant="contained" onClick={()=>handleDelete(props.id)}>Delete</Button>
      </>,
    }
  ];

  const handleEdit = (data,index) =>{
     setOrderData(data)
     setPopup(true)
     setIndex(index)
  }

  const handleView = (data) =>{
    setOrderData(data)
    setPopup(true)
    setView(true)
 }


  const handleDelete = (index) =>{

    const updatedRows = [...orders];
    updatedRows.splice(index - 1, 1);
    dispatch(updateOrderDetails(updatedRows));

  }
  
  

  const handleChange = (key, value) =>{
    setOrderData({...orderData, [key] : value})
  }

  
  const handleSubmit= (event) =>{
    event.preventDefault()
    event.stopPropagation()
    
        if(orderData.id){
          
          const updatedRows = [...orders];
          updatedRows[orderData.id - 1] = orderData;
          dispatch(updateOrderDetails(updatedRows))
        }else{
          let sample = [...orders]
          orderData.id = sample.length + 1
          sample.push(orderData)
          dispatch(updateOrderDetails(sample))
        } 
    setPopup(false)
    setOrderData({})

  }
  

    return (
        <>
            <div className='main-content'>
              <div className='button' onClick={() => setPopup(true)}> add</div>

            <Box
              height={300}
              width={900}
              display="flex"
              alignItems="center"
              gap={4}
              p={2}
              sx={{ border: '2px solid grey' , margin: '90px 0px 0px 35px' }}
            > 
            <DataGrid rows={orders} columns={columns} />
            </Box>
            {popup ? 
            <Modal
              open={popup}
              onClose={() => setPopup(false)}
            > 
              <Paper sx={{ position:'absolute', border:'none', display: 'grid', placeItems: 'center', minHeight: '76vh', width:'80vw' ,top:'70px' , left:'163px' }}>
              <div className='close' onClick={() => {setPopup(false); setView(false)}}> <span className='rotate'>+</span></div>
              <div className='tracking'><div className={orderData.status === 'intransist' || orderData.status === 'inprogress' || orderData.status === 'deliveried' || orderData.status === 'delayed' ?  'steps color': 'steps'}>1 <span style={{position:'absolute', top:'20px', width:'80px'}}>In Transist</span></div><div className='active'></div> <div className={orderData.status === 'deliveried' || orderData.status === 'inprogress' || orderData.status === 'delayed' ?  'steps color': 'steps'}>2 <span style={{position:'absolute', top:'20px', width:'80px'}}>In Progress</span></div> <div className='active'></div> {orderData.status === 'delayed' ? <> <div className={orderData.status === 'deliveried' || orderData.status === 'delayed'  ?  'steps color': 'steps'}>3<span style={{position:'absolute', top:'20px'}}>Delayed</span></div> <div className='active'></div> </> : null} <div className={orderData.status === 'deliveried'  ?  'steps color': 'steps'}>{orderData.status === 'delayed' ? 4 : 3}<span style={{position:'absolute', top:'20px'}}>Deliveried</span> <span style={{position:'absolute', top:'40px', width:'100px', left:'-22px'}}>{orderData.date}</span></div> </div> 
              <form onSubmit={(event)=>handleSubmit(event)}>
                <div className='inputFeilds'>
                <TextField
                  label="ID"
                  variant="outlined"
                  name="id"
                  value={orderData.id}
                  onChange={(event) => handleChange(event.target.name,event.target.value)}
                  sx={{margin:'10px'}}
                  required // Marks the field as required
                />
                <TextField
                  label="Origin"
                  variant="outlined"
                  name="origin"
                  sx={{margin:'10px'}}
                  value={orderData.origin}
                  onChange={(event) => handleChange(event.target.name,event.target.value)}
                  required // Marks the field as required
                />
                <TextField
                  label="Destination"
                  variant="outlined"
                  name="destination"
                  sx={{margin:'10px'}}
                  value={orderData.destination}
                  error={error} 
                  helperText={error ? "Minimum 10 characters required" : ""}
                  onChange={(event) => handleChange(event.target.name,event.target.value)}
                  required // Marks the field as required
                />
                <InputLabel id="demo-simple-select-label">Fruit</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={orderData.status}
                    sx={{ width:'250px'}}
                    label="Fruit"
                    name="status"
                    onChange={event => handleChange(event.target.name, event.target.value)}
                >
                    {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </Select>
                <input type='date' style={{marginLeft:'20px', padding:'20px'}} name='date' onChange={event => handleChange(event.target.name, event.target.value)} />
                </div>
                <div  className='submitButton'>
      <Button type="submit" sx={{marginRight:'10px'}} variant="contained">
      {orderData.id ? 'Edit' :  'Add'}
      </Button>
      <Button onClick={()=>{setView(false);setPopup(false)}} variant="contained">
        cancel
      </Button>
      </div>
              </form>
              
              </Paper>
            </Modal> :null}
            </div>
        </>
    )
}

export default Dashboard
