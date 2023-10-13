import express from 'express'
import cors from 'cors'
import userRoutes from './Routes/userRoutes.js'
import authMiddleware from './middlewares/authMiddleware.js'
import {db} from './config/firebase.js'
import { fileURLToPath } from 'url';
import {dirname} from 'path';
import path from 'path';
import fs from 'fs';

const app = express();


app.use(express.json())

app.use(cors());

app.use(express.static('public'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', (req,res)=>{
    res.send('Server is running');
})
//OTHERS
//Submit Survey Response
app.post('/submitSurvey', async(req,res)=>{
  try{
  const surveyData = req.body;
  const response = await db.collection('Answers').add(surveyData);
  res.send({ok: true, message: 'Your review has been submitted'});
  }
  catch(err){
    res.send({ok: false, message: 'Something went wrong'});
  }
})
app.get('/survey/:ownerID/:sid', async(req,res)=>{
  const {ownerID, sid} = req.params;
  const collectionRef = db.collection('Surveys').doc(sid);
  try{
  const snapShot = await collectionRef.get();
  if(!snapShot){
    return res.send({message: 'No survey found'})
  }
  const response = snapShot.data();
  const imagePath = path.join(__dirname, 'public', 'close-icon.png');
  const imageBase64 = fs.readFileSync(imagePath, 'base64');
  res.type('application/javascript');
  res.send(`
    (function() {
      const surveyConfig = {
        firstPopTitle: '${response.firstPopupTitle}',
        greaterThanFiveTitle: '${response.greaterThanFiveTitle}',
        lessThenFiveTitle: '${response.lessThanOrEqualFiveTitle}',
        waitTimeInSeconds: '${response.waitTimeInSeconds}',
        maxPopupDisplays: '${response.maxPopupDisplays}',
        popupIntervalInMinutes: '${response.popupIntervalInMinutes}'
      };
      const surveyState = {
        rating: 0,
        message: '',
        ownerID: '${ownerID}',
      };
      let currentIndex = 0;
      let currentModal = null;
      let displayCount = 0;
      let ratingError = false;
      let messageError = false;

      function loadSecondSurvey(){
        //SURVEY MODAL
        const surveyModal = document.createElement('div');
        const errorText = document.createElement('h3');
        surveyModal.style.fontFamily = 'monospace';
        surveyModal.style.color = 'black';
        surveyModal.style.width = '35%';
        surveyModal.style.padding = '1.5rem 2rem';
        surveyModal.classList.add('survey-modal');
        surveyModal.style.position = 'fixed';
        surveyModal.style.zIndex = '1000';
        surveyModal.style.top = '50%';
        surveyModal.style.left = '50%';
        surveyModal.style.transform = 'translate(-50%, -50%)';
        surveyModal.style.border = '2px solid #000';
        surveyModal.style.borderRadius = '5px';
        surveyModal.style.backgroundColor = 'white';

        //BRANDING
        const brand = document.createElement('h4');
        brand.textContent = '🚀 Powered by Pivony';
        brand.style.color = '#A8A9AB';
        brand.style.position = 'absolute';
        brand.style.top = '0';
        brand.style.margin = '0';
        brand.style.marginTop = '5px';
        surveyModal.appendChild(brand);

        //BACKGROUND_BLUR
        const bgBlur = document.createElement('div');
        bgBlur.style.position = 'fixed';
        bgBlur.style.top = '0';
        bgBlur.style.left = '0';
        bgBlur.style.width = '100%';
        bgBlur.style.height = '110vh';
        bgBlur.style.zIndex = '999';
        bgBlur.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        bgBlur.style.backdropFilter = 'blur(2px)';
        document.body.appendChild(bgBlur);

        //CLOSE BUTTON
        const closeIcon = document.createElement('div');
        closeIcon.classList.add('close-icon');
        closeIcon.style.background = 'url(data:image/png;base64,${imageBase64})';
        closeIcon.style.backgroundPosition = 'center';
        closeIcon.style.backgroundSize = 'cover';
        closeIcon.style.width = '2rem';
        closeIcon.style.height = '2rem';
        closeIcon.style.position = 'absolute';
        closeIcon.style.top = '5px';
        closeIcon.style.right = '5px';
        closeIcon.style.cursor = 'pointer';
        closeIcon.addEventListener('click', function() {
          surveyModal.remove();
          bgBlur.remove();
          document.body.style.overflow = '';
          surveyState.rating = 0;
          surveyState.message = '';
        });
        surveyModal.appendChild(closeIcon);

        //MESSAGE FORM
        const messageForm = document.createElement('div');
        messageForm.style.height = '90%';
        const messageHeading = document.createElement('h1');
        messageHeading.style.fontSize = '1.5rem';
        messageHeading.style.marginTop = '2rem';
        if(surveyState.rating>5){
          messageHeading.textContent = surveyConfig.greaterThanFiveTitle;
        }
        else{
          messageHeading.textContent = surveyConfig.lessThenFiveTitle;
        }
        const messageTextArea = document.createElement('textArea');
        messageTextArea.style.border = '2px solid black';
        messageTextArea.style.width = '90%';
        messageTextArea.style.height = '10rem';
        messageTextArea.style.borderRadius = '5px';
        messageTextArea.style.resize = 'none';
        messageTextArea.style.padding = '3px 5px';
        messageTextArea.style.fontSize = '1.2rem';
        messageTextArea.addEventListener('change', function(e){
          surveyState.message = e.target.value;
          errorText.remove();
          messageError = false;
        })

        messageForm.appendChild(messageHeading);
        messageForm.appendChild(messageTextArea);

        //Submit BUTTON
        const submitBtn = document.createElement('button');
        submitBtn.innerText = 'Submit';
        submitBtn.style.fontSize = '1.2rem';
        submitBtn.style.backgroundColor = '#8112FF';
        submitBtn.style.padding = "2px 5px";
        submitBtn.style.color = 'white';
        submitBtn.style.fontWeight = 'bold';
        submitBtn.style.borderRadius = '5px';
        submitBtn.style.marginTop = '1rem';
        submitBtn.style.cursor = 'pointer';
        submitBtn.addEventListener('click', function(){
          if(surveyState.message.length<1){
            if(messageError){
              return
            }
            errorText.textContent = 'Please give us a message';
            errorText.style.color = 'red';
            errorText.style.position = 'absolute';
            errorText.style.right = '4.3rem';
            errorText.style.bottom = '1.5rem';
            errorText.style.marginLeft = '1rem';
            messageForm.append(errorText);
            messageError = true;
          }
          else{
            messageError = false;
            const url = 'http://localhost:8000/submitSurvey';
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', 
              },
              body: JSON.stringify(surveyState),
            };
            fetch(url,requestOptions).then((response)=>{
              if(!response?.ok){
                return alert('Something went wrong')
              }
              return response.json();
            }).then((data)=>{
              surveyModal.remove();
              bgBlur.remove();
              document.body.style.overflow = '';
              return alert(data?.message)
            }).catch((error)=>{
              return alert(error.message);
            });
          }
        })
        messageForm.appendChild(submitBtn);
        surveyModal.appendChild(messageForm);

        //ATTACHING MODAL TO BODY
        document.body.appendChild(surveyModal);
        currentModal = surveyModal;
      }

      function loadSurvey(){
        if (currentModal && displayCount<surveyConfig.maxPopupDisplays) {
          currentModal.remove();
        }
        if(displayCount<surveyConfig.maxPopupDisplays){
        //SURVEY MODAL
        const surveyModal = document.createElement('div');
        const errorText = document.createElement('h3');
        surveyModal.style.fontFamily = 'monospace';
        surveyModal.style.color = 'black';
        surveyModal.style.width = '35%';
        surveyModal.style.padding = '0px 2rem';
        surveyModal.classList.add('survey-modal');
        surveyModal.style.position = 'fixed';
        surveyModal.style.zIndex = '1000';
        surveyModal.style.top = '50%';
        surveyModal.style.left = '50%';
        surveyModal.style.transform = 'translate(-50%, -50%)';
        surveyModal.style.border = '2px solid #000';
        surveyModal.style.borderRadius = '5px';
        surveyModal.style.backgroundColor = 'white';

        //BRANDING
        const brand = document.createElement('h4');
        brand.textContent = '🚀 Powered by Pivony';
        brand.style.color = '#A8A9AB';
        brand.style.position = 'absolute';
        brand.style.top = '0';
        brand.style.margin = '0';
        brand.style.marginTop = '5px';
        surveyModal.appendChild(brand);

        //BACKGROUND_BLUR
        const bgBlur = document.createElement('div');
        bgBlur.style.position = 'fixed';
        bgBlur.style.top = '0';
        bgBlur.style.left = '0';
        bgBlur.style.width = '100%';
        bgBlur.style.height = '100%';
        bgBlur.style.zIndex = '999';
        bgBlur.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        bgBlur.style.backdropFilter = 'blur(2px)';
        document.body.appendChild(bgBlur);

        //CLOSE BUTTON
        const closeIcon = document.createElement('div');
        closeIcon.classList.add('close-icon');
        closeIcon.style.background = 'url(data:image/png;base64,${imageBase64})';
        closeIcon.style.backgroundPosition = 'center';
        closeIcon.style.backgroundSize = 'cover';
        closeIcon.style.width = '2rem';
        closeIcon.style.height = '2rem';
        closeIcon.style.position = 'absolute';
        closeIcon.style.top = '5px';
        closeIcon.style.right = '5px';
        closeIcon.style.cursor = 'pointer';
        closeIcon.addEventListener('click', function() {
          surveyModal.remove();
          bgBlur.remove();
          document.body.style.overflow = '';
          surveyState.rating = 0;
          surveyState.message = '';
        });
        surveyModal.appendChild(closeIcon);

        //RATING FORM
        const ratingForm = document.createElement('div');
        ratingForm.style.height = '11rem';
        const ratingHeading = document.createElement('h1');
        ratingHeading.style.fontSize = '1.5rem';
        // ratingHeading.style.marginLeft = '1rem';
        ratingHeading.style.marginTop = '2rem';
        ratingHeading.textContent = surveyConfig.firstPopTitle;
        ratingForm.appendChild(ratingHeading);
        const radioContainer = document.createElement('div');
        radioContainer.style.display = 'flex';
        for (let i = 1; i <= 10; i++) {
          const radioGroup = document.createElement('div');
          radioGroup.style.display = 'flex'; // Set it to flex display
          radioGroup.style.flexDirection = 'column';
          radioGroup.style.justifyItems = 'space-between';
          radioGroup.style.width = '100%';
          radioGroup.style.marginTop = '1rem';
          const radioLabel = document.createElement('label');
          radioLabel.textContent = i;
          radioLabel.style.fontSize = '1.2rem';
          radioLabel.style.display = 'flex';
          radioLabel.style.flexDirection = 'column';
          radioLabel.style.alignItems = 'center';
          const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = 'rating';
          radioInput.value = i;
          radioInput.style.width = '1.5rem';
          radioInput.style.cursor = 'pointer';
          radioInput.addEventListener('click', function(e){
            errorText.remove();
            surveyState.rating = e.target.value;
            ratingError = false;
          })
          radioLabel.appendChild(radioInput);
          radioGroup.appendChild(radioLabel);
          radioContainer.appendChild(radioGroup);
        }
        ratingForm.appendChild(radioContainer);
        surveyModal.appendChild(ratingForm);

        //NEXT BUTTON
        const nextBtn = document.createElement('button');
        nextBtn.innerText = 'Next';
        nextBtn.style.fontSize = '1.2rem';
        nextBtn.style.backgroundColor = '#8112FF';
        nextBtn.style.padding = "2px 5px";
        nextBtn.style.color = 'white';
        nextBtn.style.fontWeight = 'bold';
        nextBtn.style.borderRadius = '5px';
        nextBtn.style.marginBottom = '2rem';
        nextBtn.style.cursor = 'pointer';
        nextBtn.addEventListener('click', function(){
          if(surveyState.rating==0){
            if(ratingError){
              return
            }
            errorText.textContent = 'Please choose one option';
            errorText.style.color = 'red';
            errorText.style.marginLeft = '1rem';
            errorText.style.marginTop = '5px';
            ratingForm.append(errorText);
            ratingError = true;
          }
          else{
          surveyModal.remove();
          bgBlur.remove();
          loadSecondSurvey();
          }
        })
        surveyModal.appendChild(nextBtn);

        //ATTACHING MODAL TO BODY
        document.body.appendChild(surveyModal);
        document.body.style.overflow = 'hidden';
        currentModal = surveyModal;
        displayCount++;
      }
      //END of loadSurvey
      };
      setTimeout(loadSurvey, surveyConfig.waitTimeInSeconds*1000);

      setInterval(loadSurvey, surveyConfig.popupIntervalInMinutes * 60 * 1000);

    })()`);
  }
  catch(error){
    console.log(error);
    res.send({message: 'Something went wrong'})
  }
})

app.use(authMiddleware.validateToken, userRoutes);

app.listen(8000, () => {
  console.log('Running on port http://localhost:8000');
});
