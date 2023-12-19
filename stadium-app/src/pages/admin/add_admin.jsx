import React, { useState } from 'react';
import './add_admin.scss';
import Header from '../../components/Header/Header.jsx';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import AdminFooter from '../../components/FooterBar/AdminFooter.jsx';
import { useNavigate } from 'react-router-dom';
import { createStadium } from '../../api.js';

const FormField = ({ label, value, onChange, multiline = false, rows = 1 }) => (
  <div className='form-field'>
    <div className="label">{label}</div>
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id={`field-${label}`}
        label={label}
        variant="standard"
        value={value}
        onChange={onChange}
        multiline={multiline}
        rows={rows}
      />
    </Box>
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className='select-field'>
    <div className="label">{label}</div>
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id={`select-${label}-label`}>{label}</InputLabel>
        <Select
          labelId={`select-${label}-label`}
          id={`select-${label}`}
          value={value}
          label={label}
          onChange={onChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  </div>
);

const ImageUploadField = ({ onChange }) => (
  <div className='form-field'>
    <div className="label">球場圖片</div>
    <input type="file" onChange={onChange} accept="image/*" />
  </div>
);


const Add_Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    max_capacity: 0,
    address: '',
    rule: '',
    price: 0,
    image: null,
  });

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    console.log(event.target.value);
  };

  const sportOptions = [
    { value: 'badminton', label: '羽毛球' },
    { value: 'basketball', label: '籃球' },
    { value: 'baseball', label: '棒球' },
    { value: 'volleyball', label: '排球' },
    { value: 'tabletennis', label: '桌球' },
    { value: 'tennis', label: '網球' },
    { value: 'swimming', label: '游泳' },
    { value: 'gym', label: '健身房' },
  ];

  const handleSubmit = async () => {
    console.log(formData); // Replace with API call
    const data = new FormData();

    // Append each field in formData to the FormData object
    for (const [key, value] of Object.entries(formData)) {
      data.append(key, value);
    }
    
    for (let [key, value] of data.entries()) {
      console.log(`${key}: `, value);
    }

    await createStadium(data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    // navigate('../admin/success'); // Navigate on successful submission
  };

  return (
    <div className="admin-container">
      <Header title="場地上架" showSortIcon={false} />
      <div  className="form-container">
        <FormField 
          label="球場名稱"
          value={formData.name}
          onChange={handleInputChange('name')}
        />
        <SelectField
          label="球場種類"
          value={formData.category}
          onChange={handleInputChange('category')}
          options={sportOptions}
        />
        <FormField
          label="請輸入地址"
          value={formData.address}
          onChange={handleInputChange('address')}
        />
        <FormField
          label="球場規則"
          value={formData.rule}
          onChange={handleInputChange('rule')}
          multiline
          // rows={4}
        />
        <FormField
          label="球場收費"
          value={formData.price}
          onChange={handleInputChange('price')}
        />
        <ImageUploadField
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        />
        <Button variant="contained" onClick={handleSubmit}>上架場地</Button>
      </div>
      <AdminFooter />
    </div>
  );
}

export default Add_Admin;
