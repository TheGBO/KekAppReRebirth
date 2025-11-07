import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import kekapp from './assets/kekapp.png'
import { useState } from 'react';

function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('login'); // 'login' ou 'register'

	const handleSubmit = async (e) => {
		e.preventDefault();  // esses e.preventDefault servem pra pagina nao recarregar no submit do formulario :3
		console.log('Username:', username);
		console.log('Email:', email);
		console.log('Password:', password);

		try {
			const endpoint = mode === 'login' ? 'login' : 'register';
			const dataToGet = mode === 'login' ? 'login feito com sucesso' : 'register feito com sucesso';
			// Porra seon kkkkkkkkk onde fica localhost:3000 ????????
			const response = await fetch('http://localhost:3000/' + endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, email, password })
			});

			const data = await response.json();
			console.log('Resposta do backend:', data);

			if (data.success) {
				alert(dataToGet);
			} else {
				alert('Erro no login!');
			}
		} catch (error) {
			console.error('Erro na requisição:', error);
			alert('Erro ao conectar com o servidor!');
		}
	};

	const toggle = () => {
		setMode(mode === 'login' ? 'register' : 'login');
	};

	return (
		<>
			{mode === 'login' ? (
				<div className='formulario'>
					<h1>Faça login pra usar nosso aplicativo daoro xD</h1>
					<form onSubmit={handleSubmit} className="borda">
						<h2>Login</h2>
						<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
						<input type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
						<input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
						<button type="submit">Login</button>
						<p>Não tem conta? <span onClick={toggle} className='spann'>Criar conta</span></p>
					</form>
				</div>
			) : (
				<div className='formulario'>
					<h1>Faça registro ae :3</h1>
					<form onSubmit={handleSubmit} className="borda">
						<h2>Login</h2>
						<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
						<input type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
						<input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
						<button type="submit">Registrar-se</button>
						<p>Já tem uma conta? <span onClick={toggle} className='spann'>Faça login!</span></p>
					</form>
				</div>
			)}
		</>
	);
};

function Feed() {
	return (
		<div>xd</div>
	);
}

function Profile() {
	return (
		<div>xd</div>
	);
}

function Post() {
	return (
		<div>xd</div>
	);
}

function Home() {
	return (
		<div className='main'>
			<h1>uou chega mais no kekapp</h1>
		</div>
	);
}

function App() {

	return (
		<BrowserRouter>
			<div className='header'>
				<header>
					<NavLink to="/"><img src={kekapp} alt="logo" className='logo' /></NavLink>
					<NavLink className={({ isActive }) => isActive ? "selecionado" : "botao"} to="/">Home</NavLink>
					<NavLink className={({ isActive }) => isActive ? "selecionado" : "botao"} to="/register">Login/Register</NavLink>
					<NavLink className={({ isActive }) => isActive ? "selecionado" : "botao"} to="/feed">Feed</NavLink>
					<NavLink className={({ isActive }) => isActive ? "selecionado" : "botao"} to="/profile">Profile</NavLink>
					<NavLink className={({ isActive }) => isActive ? "selecionado" : "botao"} to="/post">Post</NavLink>
				</header>
			</div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/feed" element={<Feed />} />
				<Route path="/perfil" element={<Profile />} />
				<Route path="/post" element={<Post />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App
