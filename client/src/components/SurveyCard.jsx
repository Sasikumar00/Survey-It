import React, {useState} from 'react'
import axios from 'axios';
import '../css/dashboardCSS.css';
import {BiCopy} from 'react-icons/bi'
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';

const SurveyCard = (props) => {
  const navigate = useNavigate();
  const {token} = useAuth();
  const [edit,setEdit] = useState(false);
  const [popupData, setPopupData]=useState({});
  const [copied, setCopied] = useState(false);
  const handleDelete = async(sid)=>{
    try{
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/MySurveys/${sid}`,{
        headers:{
          Authorization: `Bearer ${props.token}`
        }
      });
      if(response?.data?.status==='success'){
        window.alert(response?.data?.message);
        window.location.reload();
      }
      else{
        window.alert(response?.data.message);
      }
    }
    catch(err){
      console.log(err);
    }
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setEdit(false);
    if(Object.keys(popupData).length<1){
      return
    }
    const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/MySurveys/${props.survey.id}`,popupData,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    setEdit(false);
    setPopupData({});
    window.alert(response?.data?.message);
    window.location.reload();
  }
  const handleCopyClick = async (script) => {
    try {
      await clipboardCopy(script);
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  };
  return (
    <div className='border-4 border-red-900 p-3 rounded-md'>
      <form method='post' onSubmit={(e)=>handleSubmit(e)}>
        <label className='text-3xl'><input type='text' disabled={!edit} className={edit?'border border-black outline-none px-2 py-1 rounded-md':''} value={edit ? popupData.popupName : props.survey.popupName} onChange={(e)=>setPopupData({...popupData, 'popupName': e.target.value})}/></label>
        <label className='grid grid-cols-2 justify-between text-start my-2'><span className='font-semibold'>First popup title:</span><input type='text' value={edit ? popupData.firstPopupTitle : props.survey.firstPopupTitle} disabled={!edit} className={edit?'border border-black outline-none px-2 py-1 rounded-md':''} onChange={(e)=>setPopupData({...popupData, 'firstPopupTitle': e.target.value})}/></label>
        <label className='grid grid-cols-2 justify-between text-start my-2'><span className='font-semibold'>Greater than 5 rating title:</span><input type='text' value={edit ? popupData.greaterThanFiveTitle : props.survey.greaterThanFiveTitle} disabled={!edit} className={edit?'border border-black outline-none px-2 py-1 rounded-md':''} onChange={(e)=>setPopupData({...popupData, 'greaterThanFiveTitle': e.target.value})}/></label>
        <label className='grid grid-cols-2 justify-between text-start my-2'><span className='font-semibold'>Less than 5 rating title:</span><input type='text' value={edit ? popupData.lessThanOrEqualFiveTitle : props.survey.lessThanOrEqualFiveTitle} disabled={!edit} className={edit?'border border-black outline-none px-2 py-1 rounded-md':''} onChange={(e)=>setPopupData({...popupData, 'lessThanOrEqualFiveTitle': e.target.value})}/></label>
        <label className='grid grid-cols-2 justify-between text-start my-2'><span className='font-semibold'>Wait for x seconds:</span> <input type='text' value={edit ? popupData.waitTimeInSeconds : props.survey.waitTimeInSeconds} disabled={!edit} className={edit?'border border-black outline-none px-2 py-1 rounded-md':''} onChange={(e)=>setPopupData({...popupData, 'waitTimeInSeconds': e.target.value})}/></label>
        <label className='grid grid-cols-2 justify-between text-start my-2'><span className='font-semibold'>Max displays:</span> <input type='text' value={edit ? popupData.maxPopupDisplays : props.survey.maxPopupDisplays} disabled={!edit} className={edit?'border border-black outline-none px-2 py-1 rounded-md':''} onChange={(e)=>setPopupData({...popupData, 'maxPopupDisplays': e.target.value})}/></label>
        <label className='grid grid-cols-2 justify-between text-start my-2'><span className='font-semibold'>Interval:</span> <input type='text' value={edit ? popupData.popupIntervalInMinutes : props.survey.popupIntervalInMinutes} disabled={!edit} className={edit?'border border-black outline-none px-2 py-1 rounded-md':''} onChange={(e)=>setPopupData({...popupData, 'popupIntervalInMinutes': e.target.value})}/></label>
        {edit && <button type='submit' className='bg-yellow-500 px-2 py-1 rounded-md'>Submit</button>}
      </form>
        <div className='flex gap-4 mt-5'>
          <div className='flex flex-col gap-3'>
          <button className='bg-gray-600 text-white px-2 py-1 rounded-md' onClick={()=>setEdit(!edit)}>{!edit?'Edit':'Cancel'}</button>
          <button className='bg-red-600 text-white px-2 py-1 rounded-md' onClick={()=>handleDelete(props.survey.id)}>Delete</button>
          <button className='bg-green-600 text-white px-2 py-1 rounded-md' onClick={()=>navigate(`/survey/${props.survey.ownerID}/${props.survey.id}`, {replace: true})}>Demo</button>
          </div>
          <div className="code-snippet">
            <div>
              {copied && <h3 className='absolute top-2 left-7 text-sm px-2 py-1 rounded-tl-md rounded-tr-md rounded-br-md bg-yellow-500 text-white'>Copied to clipboard</h3>}
            </div>
            <pre className='flex flex-col'>
            <button><BiCopy className={copied && 'text-yellow-500'} onClick={() => {
              handleCopyClick(document.getElementById('scriptCode').textContent);
              setTimeout(()=>setCopied(false), 2000);
            }}/></button>
              <code id="scriptCode">
                &lt;script src={`${process.env.REACT_APP_SERVER_URL}/survey/${props.survey.ownerID}/${props.survey.id}`}&gt;&lt;/script&gt;
              </code>
            </pre>
          </div>
        </div>
    </div>
  )
}

export default SurveyCard