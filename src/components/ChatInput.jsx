import React from 'react';

import styled from 'styled-components';
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'

const ChatInput = () => {
    return <Container>
        <div className="button-container">
            <div className="emoji">
            <BsEmojiSmileFill />
            </div>
        </div>
        <form action="" className='input-container'>
            <input type="text" placeholder='type your message here' />
            <button className="submit">
                <IoMdSend />   
            </button>
        </form>
    </Container>;
};

const Container = styled.div`
`;

export default ChatInput;
