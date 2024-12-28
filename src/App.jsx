import './App.css'
import { useState } from 'react'
import Background from "./assets/background.png"
import Header from './components/header/Header'
import Lists from './components/lists/Lists'

function App() {

  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const HandleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    
    if (newUser.name){
      const {avatar_url, name, bio, login} = newUser
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
          setRepos(newRepos);
      }

    }
  }

  return (
    <>
      <Header />
      <div className="conteudo">
        <img src={Background} alt="" className="background" />
        <div className="info">
          <div>
            <input name="usuario" value={user} 
           onChange={event => setUser(event.target.value)} placeholder="@username" />
            <button onClick={HandleGetData}>buscar</button>
          </div>

<br />
            {currentUser?.name ? (               
            <div className="perfil">
                <img src={currentUser.avatar_url} alt="" className="profile"/>
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              
            ): null}

          
          <hr />
          {repos?.length ? (
          <div>
            <h4 className="repositorio">Repositorios</h4>
           {repos.map(repo => (
            <Lists title={repo.name} description={repo.description} />
           ))}
          </div>
          ): null}
        </div>
      </div>
    </>
  )
}

export default App
