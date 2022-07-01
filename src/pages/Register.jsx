import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const toastOptions = {
		position: 'bottom-right',
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: 'dark',
	};

	//session
	useEffect(() => {
		if (localStorage.getItem('chat-app-user')) {
			navigate('/');
		}
	}, []);
	//when form is submitted
	const handlerSubmit = async (e) => {
		e.preventDefault();
		if (handleValidation()) {
			//if validate
			const { password, username, email } = values;
			//we send a post request to add user
			const { data } = await axios.post(registerRoute, {
				username,
				email,
				password,
			});
			// if register dont work on the server
			if (data.status === false) {
				toast.error(data.msg, toastOptions);
			}

			//if already is fun, user is created
			if (data.status === true) {
				localStorage.setItem('chat-app-user', JSON.stringify(data.user));
				navigate('/setAvatar');
			}
		}
	};

	const handleValidation = () => {
		const { password, confirmPassword, username, email } = values;

		if (password !== confirmPassword) {
			toast.error('password and confirm password should be same', toastOptions);
			return false;
		} else if (username.length < 3) {
			toast.error('username should be greater than 3 char', toastOptions);
			return false;
		} else if (password.length < 6) {
			toast.error('password should be greater than 6 char', toastOptions);
			return false;
		} else if (email === '') {
			toast.error('email is require', toastOptions);
		}
		return true;
	};

	//when input is changed
	const handlerChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	return (
		<>
			<FormContainer>
				<form onSubmit={(e) => handlerSubmit(e)}>
					<div className='brand'>
						<img src='' alt='Logo' />
						<h1>Vb's chat</h1>
					</div>
					<input
						type='text'
						placeholder='Username'
						name='username'
						onChange={(e) => handlerChange(e)}
					/>
					<input
						type='text'
						placeholder='Email'
						name='email'
						onChange={(e) => handlerChange(e)}
					/>
					<input
						type='password'
						placeholder='password'
						name='password'
						onChange={(e) => handlerChange(e)}
					/>
					<input
						type='password'
						placeholder='Confirm password'
						name='confirmPassword'
						onChange={(e) => handlerChange(e)}
					/>
					<button type='submit'>Create User</button>
					<span>
						already have an account? <Link to='/login'>Login</Link>
					</span>
				</form>
			</FormContainer>
			<ToastContainer />
		</>
	);
};

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #131324;
	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: center;
		img {
			height: 5rem;
		}
		h1 {
			color: white;
			text-transform: uppercase;
		}
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #00000076;
		border-radius: 2rem;
		padding: 3rem 5rem;
		input {
			background-color: transparent;
			padding: 1rem;
			border: 0.1rem solid #4e0eff;
			border-radius: 0.4rem;
			width: 100%;
			color: white;
			font-size: 1rem;
			&:focus {
				border: 0.1rem solid #997af0;
				outline: none;
			}
		}
		button {
			background-color: #997af0;
			color: white;
			padding: 1rem 2rem;
			border: none;
			font-weight: bold;
			cursor: pointer;
			border-radius: 0.4rem;
			font-size: 1rem;
			text-transform: uppercase;
			transition: 0.5s ease-in-out;
			&:hover {
				background-color: #4e0eff;
			}
		}
		span {
			color: white;
			text-transform: uppercase;
			a {
				color: #4e0eff;
				font-weight: bold;
				text-decoration: none;
			}
		}
	}
`;

export default Register;
