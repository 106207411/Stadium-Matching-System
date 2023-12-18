import * as React from 'react';
import Header from '../../components/Header/Header.jsx'; 
import FooterBar from "../../components/FooterBar/FooterBar";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


export default function Success() {
    const navigate = useNavigate();
  return (
    <div>
    <Header title="預約成功" showSortIcon={true}/>
    <div style={{ marginTop: "100px" }}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert>
      </div>
      <div className='back_to_home'>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: "100px",
      }}>
        <Button variant="contained" onClick={() => navigate('../home')}>返回主頁</Button>
      </div>
    </div> 
    <FooterBar />
    </div>
  );
}