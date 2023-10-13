import {db} from '../config/firebase.js'

class userController{
    async createSurvey(req, res){
        try{
        const surveyConfig = req.body;
        if(!surveyConfig.waitTimeInSeconds || !surveyConfig.maxPopupDisplays || !surveyConfig.popupIntervalInMinutes || !surveyConfig.firstPopupTitle || !surveyConfig.greaterThanFiveTitle || !surveyConfig.lessThanOrEqualFiveTitle || !surveyConfig.popupName){
            return res.send({status: 'fail', message: 'Please fill all fields'})
        }
        surveyConfig.ownerID = req.user.user_id;
        const response = db.collection('Surveys').add(surveyConfig);
        res.send({status: 'success', message: 'Survey created successfully'});
        }
        catch(err){
            console.log(err);
            res.status(500).send({message: 'Something went wrong'});
        }
    }

    async getMySurveys(req,res){
        const useRef = db.collection('Surveys').where('ownerID','==',req.user.user_id);
        const response = await useRef.get();
        if(response){
            const responseArr = []
            response.forEach(doc=>{
                responseArr.push({'id': doc.id,...doc.data()});
            })
            res.send({data:responseArr.reverse()});
        }
        else{
            res.send({message: 'No surveys found'});
        }
    }
    async deleteMySurvey(req,res){
        try{
        const userRef = db.collection('Surveys').doc(req.params.id);
        const doc = (await userRef.get()).data();
        if(doc){
            if(doc.ownerID!=req.user.user_id){
                return res.send({status: 'fail', message: 'Unauthorized'});
            }
            const response = await userRef.delete(); 
            if(response)
                return res.send({status: 'success', message: 'Survey Deleted'});
        }
        return res.send({status: 'fail', message: 'Survey not found'})
        }
        catch(err){
            console.log(err);
            res.send({status: 'error', message: 'Something went wrong'});
        }
    }

    async getMySurveyByID(req,res){
        try{
        const userRef = db.collection('Surveys').doc(req.params.id);
        const doc = (await userRef.get()).data();
        if(doc){
            if(doc.ownerID!=req.user.user_id){
                return res.send({status: 'fail', message: 'Unauthorized'});
            }
            const response = await userRef.get();
            if(response)
                return res.send({status: 'success', 'survey': response.data()});
            }
        return res.send({status: 'fail', message: 'Survey not found'})
        }
        catch(err){
            console.log(err);
            res.send({status: 'error', message: 'Something went wrong'});
        }
    }

    async updateMySurveyByID(req,res){
        try {
            console.log(req.params.id)
            const userRef = db.collection('Surveys').doc(req.params.id);
            const doc = (await userRef.get()).data();
            for (const field in req.body) {
              doc[field] = req.body[field];
            }
            await userRef.update(doc);
            res.send({ message: 'Document successfully updated!' });
          } catch (error) {
            console.error('Error updating document: ', error);
            res.status(500).send({ error: 'Failed to update document' });
          }
          
    }

}

export default new userController();