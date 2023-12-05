import React, { Fragment, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/FooterBar/FooterBar'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import './IssueReport.scss'

const IssueReport = () => {
  const stadiumName = localStorage.getItem('stadiumName')
  const [issueType, setIssueType] = useState('')

  const handleChange = (e) => {
    setAge(e.target.value)
  }

  return (
    <div>
      <Header title='問題回報' />
      <h1 className='stadium-name'>羽球場A</h1>
      <div className=''>
        <h3>問題類型</h3>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={issueType}
              label="問題類型"
              onChange={handleChange}
            >
              <MenuItem value='A'>A</MenuItem>
              <MenuItem value='B'>B</MenuItem>
              <MenuItem value='C'>C</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <h3>問題說明</h3>
        <textarea className='description'></textarea>
        <div className='button-group'>
          <div className='button'>送出</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default IssueReport
