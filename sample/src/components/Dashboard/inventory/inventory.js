import '../dashboard.css'
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Modal, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import {updateInventoryDetails} from '../../../store/reducers/inventory'





const Dashboard = () => {

  // let [rows,setRow] = useState([{ id: 1, item: 'goods', sku: '9951696649', quantity:'sairajesh@gmail.com' ,location:'534211' }])
  let [inventoryData, setInventoryData] = useState({})
  let [index, setIndex] = useState(null)
  const dispatch = useDispatch()
  const inventory = useSelector((store) => store.inventory.inventoryData);
  const [popup, setPopup] = useState(false)
  const columns  = [
    { field: 'item', headerName: 'Item Name', width: 150 },
    { field: 'sku', headerName: 'SKU', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    {
      field: 'location',
      headerName: 'Location', 
      width: 250, 
    },
    { field: 'actions',
      headerName: 'Actions', 
      width: 150, 
      renderCell: (props) => <>
      <Button type="submit" sx={{marginRight:'10px'}} onClick={()=>handleEdit(props.row , props.id)} variant="contained">Edit</Button>
      <Button type="submit"  variant="contained" onClick={()=>handleDelete(props.id)}>Delete</Button>
      </>,
    }
  ];

  const handleEdit = (data,index) =>{
     setInventoryData(data)
     setPopup(true)
     setIndex(index)
  }

  const handleDelete = (index) =>{

    const updatedRows = [...inventory];
    updatedRows.splice(index - 1, 1);
    dispatch(updateInventoryDetails(updatedRows));

  }
  
  

  const handleChange = (key, value) =>{
    setInventoryData({...inventoryData, [key] : value})
  }

  
  const handleSubmit= (event) =>{
    event.preventDefault()
    event.stopPropagation()
    
        if(inventoryData.id){
          
          const updatedRows = [...inventory];
          updatedRows[inventoryData.id - 1] = inventoryData;
          dispatch(updateInventoryDetails(updatedRows))
        }else{
          let sample = [...inventory]
          inventoryData.id = sample.length + 1
          sample.push(inventoryData)
          dispatch(updateInventoryDetails(sample))
        } 
    setPopup(false)
    setInventoryData({})

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
            <DataGrid rows={inventory} columns={columns} />
            </Box>
            {popup ? 
            <Modal
              open={popup}
              onClose={() => setPopup(false)}
            > 
              <Paper sx={{ position:'absolute', border:'none', display: 'grid', placeItems: 'center', minHeight: '76vh', width:'80vw' ,top:'70px' , left:'163px' }}>
              <div className='close' onClick={() => setPopup(false)}> <span className='rotate'>+</span></div>
              <form onSubmit={(event)=>handleSubmit(event)}>
                <div className='inputFeilds'>
                <TextField
                  label="Inventory Item"
                  variant="outlined"
                  name="item"
                  value={inventoryData.item}
                  onChange={(event) => handleChange(event.target.name,event.target.value)}
                  sx={{margin:'10px'}}
                  required // Marks the field as required
                />
                <TextField
                  label="SKU"
                  variant="outlined"
                  name="sku"
                  sx={{margin:'10px'}}
                  value={inventoryData.sku}
                  onChange={(event) => handleChange(event.target.name,event.target.value)}
                  required // Marks the field as required
                />
                <TextField
                  label="Quantity"
                  variant="outlined"
                  name="quantity"
                  sx={{margin:'10px'}}
                  value={inventoryData.quantity}
                  onChange={(event) => handleChange(event.target.name,event.target.value)}
                  required // Marks the field as required
                />
                <TextField
                  label="Location"
                  variant="outlined"
                  sx={{margin:'10px'}}
                  name="location"
                  value={inventoryData.location}
                  onChange={(event) => handleChange(event.target.name,event.target.value)}
                  required // Marks the field as required
                />
               
                
                </div>
                <div  className='submitButton'>
      <Button type="submit" sx={{marginRight:'10px'}} variant="contained">
      {inventoryData.id ? 'Edit' :   'Add'}
      </Button>
      <Button type="submit" variant="contained">
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
