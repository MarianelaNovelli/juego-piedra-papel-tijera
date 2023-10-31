import { useState } from 'react';
import '/src/Juego.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { List } from 'antd';
import { 
    MinusSmallIcon,
} from '@heroicons/react/24/outline';

const instrucciones = [
    'Por turno, cada jugador presionará "Piedra", "Papel" o "Tijera" según lo que desee.',
    'Una vez que ambos seleccionan alguno de los tres elementos, se evalúa el resultado de la ronda.',
    'La piedra aplasta a la tijera.',
    'La tijera corta el papel.',
    'El papel envuelve a la piedra.',
    'En caso de elegir el mismo elemento, los jugadores empatarán la ronda y no sumarán puntos.',
    'Ganará el juego aquel jugador que sume 5 puntos. Si ambos suman 5 puntos, habrá empate.'
];

function Juego() {
    const [jugadorSeleccion, setJugadorSeleccion] = useState('');
    const [RivalSeleccion, setRivalSeleccion] = useState('');
    const [puntajeRival, setPuntajeRival] = useState(0);
    const [puntajeJugador, setPuntajeJugador] = useState(0);

    const [resultado, setResultado] = useState('');
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const opciones = ['Piedra','Papel','Tijera'];

    const [juegoTerminado, setJuegoTerminado] = useState(false);

    const eleccionUsuario = (e) => {
        setMostrarResultado(false);
        setJugadorSeleccion(e.target.value);
        eleccionRival();
    }

    const jugar = () => {

        if (puntajeJugador < 5 && puntajeRival < 5) {
            if (RivalSeleccion === jugadorSeleccion) {
                setResultado("Empate");
            } else if (RivalSeleccion === 'Piedra' && jugadorSeleccion === 'Tijera') {
                setResultado("Perdiste");
                setPuntajeRival(puntajeRival + 1);
            } else if (RivalSeleccion === 'Tijera' && jugadorSeleccion === 'Papel') {
                setResultado("Perdiste");
                setPuntajeRival(puntajeRival + 1);
            } else if (RivalSeleccion === 'Papel' && jugadorSeleccion === 'Piedra') {
                setResultado("Perdiste");
                setPuntajeRival(puntajeRival + 1);
            } else {
                setResultado("Ganaste");
                setPuntajeJugador(puntajeJugador + 1);
            }
        }
        
        setMostrarResultado(true);

        if (puntajeJugador === 5 || puntajeRival === 5) {
            if (puntajeJugador === puntajeRival) {
              setResultado("Empate");
            } else if (puntajeJugador > puntajeRival) {
              setResultado("¡Ganaste!");
            } else {
              setResultado("Perdiste");
            }
        
            endGame(); 
        }
    }

    const eleccionRival = () => {
        const numeroRandom = Math.floor(Math.random() * 3);
        setRivalSeleccion(opciones[numeroRandom]);
    }

    const convierteEmoji = (opcion) => {
        switch (opcion) {
            case 'Piedra':
                return '🌑';
            case 'Papel':
                return '📄';
            case 'Tijera':
                return '✂️';
            default:
                return '';
        }
    }

    const endGame = () => {
        alert(`FIN DEL JUEGO: ${resultado}`);
      
        setJuegoTerminado(true);
    };

    return (
        <div className="juego-container container">
            <h1 className="tittle">¡A JUGAR!</h1>
            <h2 className="subtitle"> Piedra, papel o tijera </h2>

            <div className="row">
                <div className="col-md-4">
                <List
                    size="large"
                    header={<div className="instructions">Instrucciones</div>}
                    bordered
                    dataSource={instrucciones}
                    renderItem={(item) => (
                        <List.Item>
                            <MinusSmallIcon className="instruction-icon"/>{item}
                        </List.Item>
                    )}
                    className="bg-white"
                />                 
                </div>

                <div className="col-md-8">
                    <div className="points">
                        <h5 className="puntaje">Contador</h5> 
                        <table className="table table table-striped table-light text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Jugador</th>
                                    <th>Puntos</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                <tr>
                                    <td>Rival</td>
                                    <td>{puntajeRival}</td>
                                </tr>
                                <tr>
                                    <td>Yo</td>
                                    <td>{puntajeJugador}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div className="buttons-container">
                            {opciones.map((item) => (
                                <button 
                                    value={item} 
                                    onClick={eleccionUsuario} 
                                    disabled={juegoTerminado} 
                                    className={`juego-button button-${item.toLowerCase()}`}
                                    key={item}>
                                        {item}
                                </button>
                            ))}
                        </div>
                
                        <button onClick={jugar} disabled={mostrarResultado || juegoTerminado} className="jugar-button">
                            Jugar
                        </button> 
                    </div>
                    
                    {mostrarResultado && (
                    <div className="col-md-12 resultado-parcial">
                        <div className="row">
                            <div className="col col-md-6">
                                <h4>Rival: {convierteEmoji(RivalSeleccion)}</h4>
                            </div>
                            <div className="col col-md-6">
                                <h4>Yo: {convierteEmoji(jugadorSeleccion)}</h4>
                            </div>
                        
                            <div className="col col-md-12 text-center">
                                <br/>
                                {juegoTerminado ? (
                                    <h3>FIN DEL JUEGO: {resultado}</h3>
                                ) : (
                                    <h3>Resultado parcial: {resultado}</h3>
                                )}
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
    );
}

export default Juego;