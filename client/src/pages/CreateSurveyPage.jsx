import React, {useState} from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import '../css/createsurvey.css';

const CreateSurveyPage = () => {
    const navigate = useNavigate();
    const [surveyConfig, setSurveyConfig] = useState({})
    const {token} = useAuth();
    const handleSubmit = async(token,e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/createSurvey`,surveyConfig,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            if(response?.data.status==='success'){
                window.alert(response.data.message);
                navigate('/dashboard', {replace: true});
                
            }
            else if(response?.data.status==='fail'){
                window.alert(response.data.message);
            }
        }
        catch(err){
            console.log(err)
            window.alert(JSON.stringify(err))
        }
    }
  return (
    <Layout>
    <div>
        <h1 className='text-5xl text-center font-semibold'>Create a survey</h1>
        <form onSubmit={(e)=>handleSubmit(token,e)} method="post" className='create-form flex flex-col items-center h-full'>
            <label htmlFor="popupName" className='create-label'>
                Popup Name
                <input type="text" name="popupName" id="" className='border-2 create-input' onChange={(e)=>{
                    setSurveyConfig({...surveyConfig, 'popupName':e.target.value})
                }}/>
            </label>
            <label htmlFor="firstPopupTitle" className='create-label'>
                First popup title
                <input type="text" name="firstPopupTitle" id="" className='border-2 create-input' onChange={(e)=>{
                    setSurveyConfig({...surveyConfig, 'firstPopupTitle':e.target.value})
                }}/>
            </label>
            <label htmlFor="greaterThanFiveTitle" className='create-label'>
                Greater then 5 popup title
                <input type="text" name="greaterThanFiveTitle" id="" className='border-2 create-input' onChange={(e)=>{
                    setSurveyConfig({...surveyConfig, 'greaterThanFiveTitle':e.target.value})
                }}/>
            </label>
            <label htmlFor="lessThanOrEqualFiveTitle" className='create-label'>
                Less then 5 popup title
                <input type="text" name="lessThanOrEqualFiveTitle" id="" className='border-2 create-input' onChange={(e)=>{
                    setSurveyConfig({...surveyConfig, 'lessThanOrEqualFiveTitle':e.target.value})
                }}/>
            </label>
            <label htmlFor="waitTimeInSeconds" className='create-label'>
                Wait x second before showing popup
                <input type="number" name="waitTimeInSeconds" id="" className='border-2 create-input' onChange={(e)=>{
                    setSurveyConfig({...surveyConfig, 'waitTimeInSeconds':e.target.value})
                }}/>
            </label>
            <label htmlFor="maxPopupDisplays" className='create-label'>
                Maximum number of times to show popup
                <input type="number" name="maxPopupDisplays" id="" className='border-2 create-input' onChange={(e)=>{
                    setSurveyConfig({...surveyConfig, 'maxPopupDisplays':e.target.value})
                }}/>
            </label>
            <label htmlFor="popupIntervalInMinutes" className='create-label'>
                Interval between multiple popups
                <input type="number" name="popupIntervalInMinutes" id="" className='border-2 create-input' onChange={(e)=>{
                    setSurveyConfig({...surveyConfig, 'popupIntervalInMinutes':e.target.value})
                }}/>
            </label>
            <button type='submit' className='bg-yellow-500 px-5 py-1 rounded-md text-xl mt-5'>Create</button>
        </form>
    </div>  
    </Layout>
  )
}

export default CreateSurveyPage