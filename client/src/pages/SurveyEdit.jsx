import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import axios from 'axios';
import Layout from '../components/Layout';

const SurveyEdit = () => {
    const params = useParams();
  const [survey, setSurvey] = useState({});
  const [loading,setLoading] = useState(true);
  const {token} = useAuth();
  const getSurvey = async(authtoken,sid)=>{
    try{
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/MySurveys/${sid}`,{
            headers:{
                Authorization: `Bearer ${authtoken}`
            }
        });
        if(response?.data.status==='success'){
            setSurvey(response?.data.survey);
            setLoading(false);
        }
        else if(response?.data.status==='fail'){
            window.alert(response?.data.message)
            window.location.replace('/dashboard')
        }
    }
    catch(err){
        console.log(err)
    }
  }
  useEffect(()=>{
    if(token){
        const id = params.id;
        getSurvey(token, id);
    }
    //eslint-disable-next-line
  },[token])
  return (
    <Layout>
        {loading 
        ?
        <div className='w-full flex items-center justify-center min-h-[80vh]'>
        <img src='/180-ring.svg' alt='spinner'/>
        </div> 
        :
        <div>
            {survey && 
            <div>
                <form action="">
                    <label htmlFor="popupName">
                        Popup Name
                        <input type="text" name="popupName" id="" value={survey.popupName} className='border border-black'/>
                    </label>
                </form>
            </div>
            }
        </div>
    }
    </Layout>
  )
}

export default SurveyEdit