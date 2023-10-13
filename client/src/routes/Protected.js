import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Protected = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!props.isLoggedIn) {
          navigate('/', { replace: true });
        }
      }, [props.isLoggedIn, navigate]);
    return props.children;
}

export default Protected
