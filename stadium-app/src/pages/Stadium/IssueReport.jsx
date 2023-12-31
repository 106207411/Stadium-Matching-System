import React, { Fragment, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/FooterBar/FooterBar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './IssueReport.scss';
import { createFeedbackForStadium } from '../../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const IssueReport = () => {
  const navigate = useNavigate();
  const stadiumName = localStorage.getItem('stadiumName');
  const [issueType, setIssueType] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  const handleIssueTypeChange = (e) => {
    setIssueType(e.target.value);
  }

  const handleDescriptionChange = (event) => {
    setIssueDescription(event.target.value);
  }

  // Handle API
  const handleConfirmIssueReport = async () => {
    console.log('issueType:', issueType);
    console.log('issueDescription:', issueDescription);
    const reportStadiumId = localStorage.getItem('stadiumId');

    const feedback = {
      type: issueType,
      problem: issueDescription
    }

    await createFeedbackForStadium(feedback, reportStadiumId)
      .then((res) => {
        console.log(res);
        localStorage.removeItem('stadiumId');
        toast.success('問題回報成功');
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <Header title='問題回報' />
      <h1 className='stadium-name'>羽球場A</h1>
      <div className='issue-info'>
        <h3>問題類型</h3>
        <Box className='issue-select'>
          <FormControl fullWidth>
            <InputLabel>問題類型</InputLabel>
            <Select
              label="問題類型"
              value={issueType}
              onChange={handleIssueTypeChange}
            >
              <MenuItem value='water'>飲水機</MenuItem>
              <MenuItem value='bathroom'>廁所</MenuItem>
              <MenuItem value='air-condition'>冷氣</MenuItem>
              <MenuItem value='vending'>販賣機</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <h3>問題說明</h3>
        <div className="input-group">
          <TextareaAutosize
            minRows={5}
            placeholder="問題說明"
            value={issueDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className='button-group' onClick={handleConfirmIssueReport}>
          <div className='button'>送出</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default IssueReport;
