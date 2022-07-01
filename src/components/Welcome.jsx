import React from 'react';
import styled from 'styled-components';
import Robot from '../assets/rorbot.gif';

const Welcome = ({ currentUser }) => {
	return (
		<Container>
			<img src={Robot} alt='robot' />
			<h1>
				Welcome, <span>{currentUser.username}</span>
			</h1>
			<h3>Please select a chat to Start conversation</h3>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
  color: white;
	img {
		width: 10rem;
	}
  span {
    color: #4e00ff;
  }
`;

export default Welcome;
