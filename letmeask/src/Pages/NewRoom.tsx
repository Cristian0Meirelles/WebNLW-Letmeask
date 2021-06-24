//import userEvent from '@testing-library/user-event';
import { FormEvent, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import illustratonImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { database } from '../services/firebase';



import '../styles/auth.scss';

export function NewRoom(){
    const {user} = useAuth();
    const history= useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if(newRoom.trim() ===''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`)

    }


    return(
        <div id="page-auth">
            <aside>
                <img src={illustratonImg} alt="ilustração perguntas e respostas" />
                <strong>Crie Salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                
                <div className="main-content">
                        <img src={logoImg} alt="Letmeask" />
                        
                        <h2>Criar Uma Nova Sala</h2>
                        <form onSubmit={handleCreateRoom}>
                            <input 
                                type="text"
                                placeholder="Nome da Sala"
                                onChange={event => setNewRoom(event.target.value)}
                                value={newRoom}

                            /> 
                            <Button type="submit">
                                Criar Sala
                            </Button>
                        </form>
                        <p>
                            Quer entrar em uma Sala existente? <Link to="/">Clique aqui</Link>
                        </p>
                </div>
            </main>
        </div>
    )
}