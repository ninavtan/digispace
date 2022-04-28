import React from 'react';
import styled from 'styled-components';


const RoomHeader = (props) => {
  return (
    <StyledDiv>
      <h1>{props.name}</h1>

    </StyledDiv>
  )
}

export default RoomHeader;

const StyledDiv = styled.div`
  text-align: center;
`
