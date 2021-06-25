//import toast from 'react-hot-toast';
//import { FormEvent, useState } from 'react';
//import { database } from '../services/firebase';
//import { useAuth } from '../hooks/useAuth';


import { useHistory, useParams} from 'react-router-dom'

import deleteImg from'../assets/images/delete.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import '../styles/room.scss';

import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams ={
    id:string;
}




export function AdminRoom(){
    //const { user }= useAuth();
    const history = useHistory();
    
    const params = useParams<RoomParams>();
 
    const roomId = params.id;
    const {questions, title} = useRoom(roomId);

    async function handleEndRoom() {
        database.ref(`room/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/')
    }

    async function handleDeletePost(postsId:string){
       if( window.confirm('Are you share that you want to delete this massage?')) {
           await database.ref(`rooms/${roomId}/questions/${postsId}`).remove();
       }    }

    return(
        <div id= "page-room">
            <header>
                <div className="content">
                    <img id="imgroom" src={logoImg} alt="Letmeask" />
                    
                    <div>
                    <RoomCode code={roomId}/>
                    <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length >0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <div className="question-list">    
                    {questions.map(posts =>{
                        return(
                            <Question
                                key ={posts.id}
                                content = {posts.content}
                                author = {posts.author}    
                            >
                                <button
                                    type ="button"
                                    onClick={() => handleDeletePost(posts.id)}
                                >
                                    <img src = {deleteImg} alt="Remove"/>
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}
