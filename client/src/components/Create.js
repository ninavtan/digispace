import { useAuth0 } from '@auth0/auth0-react';
import styled from "styled-components"
import { Form } from 'react-bootstrap';
export const Create = (props) => {
  const { user } = useAuth0();

  console.log(user.email);

  const submitCreateDigiSpace = (e) => {
    e.preventDefault();
    console.log(e.target[0].checked);
    // dispatch createNewDigiSpace(email, collabCanvas, gallery, chat)
  }
  return (
    <CreatePageDiv>
      <h2>Personalize your DigiSpace.</h2>
      <br></br>
      <Form onSubmit={submitCreateDigiSpace}>
      
      <h2>Which features would you like to include?</h2>

      <FeatureSelection>

        <CanvasSelect>
          <input className="form-check-input" type="checkbox" name="canvas" value="true">
          </input>
          
          <label className="form-check-label">
          Collaborative Canvas        
          </label>
        </CanvasSelect>

        <GallerySelect >
          <input className="form-check-input" type="checkbox" name="gallery" value="true">
          </input>

          <label className="form-check-label">
          Gallery       
          </label>
        </GallerySelect>


        <ChatSelect >
          <input className="form-check-input" type="checkbox" name="chat" value="true">
          </input>

          <label className="form-check-label">
          Chat        
          </label>
        </ChatSelect>
       
      </FeatureSelection>
       
    
      <br></br>
      <SubmitButton type='submit'>Submit</SubmitButton>
      </Form>
    </CreatePageDiv>
  )
}

const CreatePageDiv = styled.div`
background-color: pink;
padding: 1em;
`

const SubmitButton = styled.button`
margin-top: 2em;
`

const FeatureSelection = styled.div`
display: flex;
justify-content: space-around;
margin: 1em 1em;

`

const CanvasSelect = styled.div`
display: block;
`

const ChatSelect = styled.div`
display: block;
`

const GallerySelect = styled.div`
display: block;
`