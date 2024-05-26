import '../dashboard.css'
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Modal, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {updateSupplierDetails} from '../../../store/reducers/suppliers'





const Dashboard = () => {
  const suppliers = useSelector((store) => store.suppliers.supplierData);
  const dispatch = useDispatch()
  // let [rows,setRow] = useState(suppliers)
  let [supplierData, setSupplierData] = useState({})
  const [popup, setPopup] = useState(false)
  const columns  = [
    { field: 'name', headerName: 'Supplier Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone Number', width: 150 },
    {
      field: 'address',
      headerName: 'Address', 
      width: 250, 
      valueGetter: (props) => `${props.row.pincode} - ${props.row.street}, ${props.row.city}`,
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
     setSupplierData(data)
     setPopup(true)
  }

  const handleDelete = (index) =>{

    const updatedRows = [...suppliers];
    updatedRows.splice(index - 1, 1);
    dispatch(updateSupplierDetails(updatedRows))
    // setRow(updatedRows);

  }
  
  

  const handleChange = (key, value) =>{
    setSupplierData({...supplierData, [key] : value})
  }

  
  const handleSubmit= (event) =>{
    event.preventDefault()
    event.stopPropagation()

    
        if(supplierData.id){
          
          const updatedRows = [...suppliers];
          updatedRows[supplierData.id - 1] = supplierData;
          dispatch(updateSupplierDetails(updatedRows))
        }else{
          let sample = [...suppliers]
          supplierData.id = sample.length + 1
          sample.push(supplierData)
          dispatch(updateSupplierDetails(sample))
        } 
    setPopup(false)
    setSupplierData({})

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
            <DataGrid rows={suppliers} columns={columns} />
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
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={supplierData.name}
                  onChange={(event) => handleChange(event.target.name,event.target.value)}
                  sx={{margin:'10px'}}
                  required // Marks the field as required
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  sx={{margin:'10px'}}
                  value={supplierData.email}
                  onChange={(event) => handleChange(event.target.name,event.target.value)}
                  type="email" // Set type for email validation
                  required // Marks the field as required
                />
                <TextField
                  label="Phone"
                  variant="outlined"
                  name="phone"
                  sx={{margin:'10px'}}
                  value={supplierData.phone}
                  onChange={(event) => handleChange(event.target.name,event.target.value)}
                  required // Marks the field as required
                />
                <TextField
                  label="Street"
                  variant="outlined"
                  sx={{margin:'10px'}}
                  name="street"
                  value={supplierData.street}
                  onChange={(event) => handleChange(event.target.name,event.target.value)}
                  required // Marks the field as required
                />
                <TextField
                  label="City"
                  variant="outlined"
                  name="city"
                  sx={{margin:'10px'}}
                  value={supplierData.city}
                  onChange={(event) => handleChange(event.target.name,event.target.value)}
                  required // Marks the field as required
                />
                <TextField
                  label="Pincode"
                  variant="outlined"
                  name="pincode"
                  sx={{margin:'10px'}}
                  value={supplierData.pincode}
                  onChange={(event) => handleChange(event.target.name,event.target.value)}
                  required // Marks the field as required
                />
                
                </div>
                <div  className='submitButton'>
      <Button type="submit" sx={{marginRight:'10px'}} variant="contained">
       {supplierData.id ? 'Edit' : 'Add'} 
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
