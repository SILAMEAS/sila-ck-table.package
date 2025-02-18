import React from "react"; 
import './App.css'
import CTableExample from './CTableExample'
import {Box, Stack, Typography} from '@mui/material'

function App() {
 
  return <Stack height={'80vh'} width={"100%"} justifyContent={'space-between'}>
    <Typography> Testing Table Custom</Typography>
    <CTableExample/>
  </Stack>
}

export default App
