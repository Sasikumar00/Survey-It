import { admin, db } from "../config/firebase.js";

class authMiddleware{
    async validateToken(req,res,next){
        const auth = admin.auth();
        if(!req.headers.authorization){
            return res.send({message: 'Unauthorized'});
        }
        const token = req.headers.authorization.split(' ')[1];
        try{
            const decodedValue = await auth.verifyIdToken(token);
            if(decodedValue){
                // console.log(decodedValue);
                req.user = decodedValue;
                return next();
            }
            return res.send({message: 'Unauthorized'})
        }
        catch(error){
            console.log(error);
            if(error.code==='auth/id-token-expired')
            return res.send({message: 'auth/id-token-expired'});
            }
            return res.send({message: 'Something went wrong'})
    }
};

export default new authMiddleware();