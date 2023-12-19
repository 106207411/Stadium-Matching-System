import React, { useState } from 'react';
import './add_admin.scss';
import FooterBar from "../../components/FooterBar/FooterBar";
import Header from '../../components/Header/Header.jsx';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const StadiumName = () => (
  <div className='addname'>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: "100px"
    }}>
      <div className="label">球場名稱</div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="standard-basic" label="請輸入球場名稱" variant="standard" />
      </Box>
    </div>
  </div>
);


const SelectSport = ({ value, handleChange, label, options, Test_label }) => (
  <div className='selectsport'>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: "30px"
    }}>
      <div className="label">{Test_label}</div>
      <br></br>
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label={label}
              onChange={handleChange}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  </div>
);

// Separate functional component for the TextField section
const PlaceSection = () => (
  <div className='place'>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: "30px"
    }}>
      <div className="label">球場位置</div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="standard-basic" label="請輸入球場位置" variant="standard" />
      </Box>
    </div>
  </div>
);

const PlaceInfo = () => (
    <div className='Info'>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: "30px"
      }}>
        <div className="label">球場介紹</div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          rows={4}
        >
          <TextField id="standard-basic" label="請輸入球場介紹" variant="standard" />
        </Box>
      </div>
    </div>
  );

  const PlacePrice = () => (
    <div className='Price'>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: "30px"
      }}>
        <div className="label">球場收費</div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="請輸入球場每小時價格" variant="standard" />
        </Box>
      </div>
    </div>
  );

const Add_Admin = () => {
  const [type, setType] = useState('');
  const [number, setNumber] = useState('');

  const navigate = useNavigate();

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const sportOptions = [
    { value: 10, label: '羽球' },
    { value: 20, label: '籃球' },
    { value: 30, label: '足球' },
  ];

  const numberOptions = [1, 2, 3];




  const Rules = () => (
    <div className='Rules'>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: "30px"
      }}>
        <div className="label">球場規則</div>
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
          label="請輸入規則"
          multiline
          rows={4}
        />
        </div>
        </Box>
      </div>
      </div>

  )

  const Upload_place = () => (
    <div className='Upload'>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            marginBottom: '80px',
        }}>
        <Button variant="contained" onClick={() => navigate('../admin/success')}>上架场地</Button>
        </div>
    </div>

  )

// 暫時不需要的上傳圖片按鈕
  // const VisuallyHiddenInput = styled('input')({
  //   clip: 'rect(0 0 0 0)',
  //   clipPath: 'inset(50%)',
  //   height: 1,
  //   overflow: 'hidden',
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: 'nowrap',
  //   width: 1,
  // });

  // const InputFileUpload = () => (
  //   <div>
  //     <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
  //       Upload file
  //       <VisuallyHiddenInput type="file" />
  //     </Button>
  //     </div>
  // )

  return (
    <div>
      <Header title="場地上架" showSortIcon={true} />
      <StadiumName />
      <SelectSport
        value={type}
        handleChange={handleTypeChange}
        Test_label="球場種類"
        label="選擇種類"
        options={sportOptions}
      />
      <div className='numberofpeople'>
      </div>
      <PlaceSection />
      <PlaceInfo/>
      <PlacePrice/>
      <Rules/>
      <Upload_place/>
      <FooterBar />
      

    </div>
  );
}

export default Add_Admin;
