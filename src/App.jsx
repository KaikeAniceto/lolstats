import { useState } from 'react'
import './App.css'

function App() {
  // Lembrar o que o usuário digitou
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  
  // Estados para controlar o resultado da busca
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Função de comunicação com o Spring Boot (Java)
  const buscarDadosDaRiot = async () => {
    if (!gameName || !tagLine) {
      setErro("Por favor, preencha o Nome e a Tag!");
      return;
    }

    // Limpa a tela e avisa que está carregando
    setErro('');
    setResultado(null);
    setCarregando(true);

    try {
      const url = `http://localhost:8080/games/import/${gameName}/${tagLine}`;
      const resposta = await fetch(url, { method: 'POST' });

      if (resposta.ok) {
        const dados = await resposta.json();
        setResultado(dados); // Guarda o JSON da Riot
      } else {
        setErro("Erro ao buscar. O jogador existe mesmo?");
      }
    } catch (error) {
      setErro("Falha na conexão! O seu botão de Play lá no IntelliJ tá ligado?");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container">
      <h1>LoL Stats Tracker</h1>
      <p>Busque os dados direto da Riot Games</p>
      
      
      <input 
        type="text" 
        placeholder="Nome do Jogador" 
        value={gameName}
        onChange={(e) => setGameName(e.target.value)} 
      />
      
      <input 
        type="text" 
        placeholder="Tag" 
        value={tagLine}
        onChange={(e) => setTagLine(e.target.value)}
      />
      
      <button onClick={buscarDadosDaRiot} disabled={carregando}>
        {carregando ? "Viajando até a Riot... ✈️" : "Importar Partida"}
      </button>

      {erro && <p style={{ color: '#e84118', fontWeight: 'bold' }}>{erro}</p>}

     
      {resultado && (
        <div className={`card-partida ${
          (resultado.kills === 0 && resultado.deaths === 0 && resultado.assists === 0) 
          ? 'remake' 
          : resultado.win ? 'vitoria' : 'derrota'
        }`}>
          
          <img 
            className="img-campeao"
            src={`https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/${resultado.champion}.png`} 
            alt={resultado.champion}
          />

          <div className="info-stats">
            <div className="win-status">
              {(resultado.kills === 0 && resultado.deaths === 0 && resultado.assists === 0) 
                ? <span className="remake-status">Recriação</span> 
                : resultado.win ? "Vitória" : "Derrota"}
            </div>
            
            <h2>{resultado.champion}</h2>
            
            <div className="kda">
              {resultado.kills} / {resultado.deaths} / {resultado.assists}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default App