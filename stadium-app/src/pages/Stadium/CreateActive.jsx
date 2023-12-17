import React, { useState } from 'react';
import './StadiumInfo.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx';
import Header from '../../components/Header/Header.jsx';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const CreateActive = () => {
  const [eventName, setEventName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [description, setDescription] = useState('');

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const ActiveName = () => (
    <div className='activename'>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: "100px"
      }}>
        <div className="label">活動名稱</div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="請輸入活動名稱，至少2個字" variant="standard" />
        </Box>
      </div>
    </div>
  );

  const NumberLimit = () => (
    <div className='number'>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: "100px"
      }}>
        <div className="label">人數上限</div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="請輸入數字" variant="standard" />
        </Box>
      </div>
    </div>
  );


  const Details = () => (
    <div className='details'>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: "30px"
      }}>
        <div className="label">活動説明</div>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-static"
          label="簡介一下你想創建的活動~"
          multiline
          rows={4}
        />
        </div>
        </Box>
      </div>
      </div>

  )


  const Upload_Activity = () => (
    <div className='Upload'>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            marginBottom: '80px',
        }}>
        <Button variant="contained">發起活動</Button>
        </div>
    </div>

  )

  return (
    <div>
      <Header title="創建活動" showSortIcon={true} />
      <ActiveName/>
      <NumberLimit/>
      <Details/>
      <Upload_Activity/>

        <FooterBar />
      </div>
  );
};

export default CreateActive;
