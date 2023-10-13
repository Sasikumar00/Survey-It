import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import SurveyCard from '../components/SurveyCard';
import { useAuth } from '../context/authContext';
import DashboardSkeleton from '../components/DashboardSkeleton';


const Dashboard = () => {
    const {token,logout} = useAuth();
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const getSurvey = async(token)=>{
        try{
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/MySurveys`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        if(response.data.message==='auth/id-token-expired'){
           logout();
        }
        if(response?.data){
            setSurveys(response.data.data);
            setLoading(false);
        }
    }
    catch(err){
        console.log(err);
    }
    }
    useEffect(()=>{
        if(token)
            getSurvey(token);
        //eslint-disable-next-line
    }, [token])
  return (
    <Layout>
        <h1 className='text-5xl text-center font-semibold'>Dashboard</h1>
        <div className='min-h-[80vh]'>
            {loading? <DashboardSkeleton/>
            :
            (surveys && surveys.length>=1 ? 
            <div className='grid lg:grid-cols-2 gap-4 mt-10'>
            {surveys.map((survey, index)=>(
                <SurveyCard token={token} survey={survey} key={index}/>
            ))}
            </div>
            :
            <div className='min-h-[80vh] flex items-center justify-center'>
                <p>No surveys found</p>
            </div>
            )
        }
        </div>
    </Layout>
  )
}

export default Dashboard