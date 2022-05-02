import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from "styled-components"
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createNewDigiSpace } from '../redux/actions';



export const Create = (props) => {

  const dispatch = useDispatch();
  const [spaceName, setSpaceName] = useState(null);
  const { user } = useAuth0();

  const submitCreateDigiSpace = async (e) => {
    e.preventDefault();
    await dispatch(createNewDigiSpace(user.email, spaceName, e.target[0].checked, e.target[1].checked, e.target[2].checked));
    loadIndex();

  }

  const loadIndex = () => {
    props.history.replace('/allrooms');
  }
  

  return (
    <CreatePageDiv>
       <NameInput>
        <h5>Name your space.</h5>
        <input type="text" name="space-name" placeholder="My New DigiSpace" onChange={e => setSpaceName(e.target.value)}></input>
       </NameInput>
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

const NameInput = styled.div`
display: block;
margin-bottom: 2em;
`