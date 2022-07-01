import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

const Chat = () => {
	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [isLoaded, setIsLoaded] = useState(false);
	 

	useEffect(() => {
		const checkUser = async () => {
			//if user session dont exist
			if (!localStorage.getItem('chat-app-user')) {
				navigate('/login');
			} else {
				// if user exist in the localStorage we take they info
				setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
				setIsLoaded(true);
			}
		};
		checkUser();
	}, []);

	useEffect(() => {
		const checkAvatar = async () => {
			if (currentUser) {
				if (currentUser.isAvatarImageSet) {
					//first we check if user has an avatar image
					const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
					setContacts(data.data);
				} else {
					//if not, he must go to take an avatar
					navigate('/setAvatar');
				}
			}
		};
		checkAvatar();
	}, [currentUser]);

	const handlerChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<Container>
			<div className='container'>
				<Contacts
					contacts={contacts}
					currentUser={currentUser}
					changeChat={handlerChatChange}
				/>
				{isLoaded && currentChat === undefined ? (
					<Welcome currentUser={currentUser} />
				) : ( 
					<ChatContainer currentChat={currentChat} />
				)}
			</div>
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #131324;
	.container {
		height: 85vh;
		width: 85vw;
		background-color: #00000076;
		display: grid;
		grid-template-columns: 25% 75%;
		@media screen and (min-width: 720px) and (max-width: 1200px) {
			grid-template-columns: 35% 65%;
		}
	}
`;
export default Chat;
