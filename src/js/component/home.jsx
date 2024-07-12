import React, { useEffect, useState } from "react";

import Song from "./song";

//create your first component
const Home = () => {

	const [songsList, setSongsList] = useState([]);
	const [cSong, setCSong] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		getData();
	}, [])

	const getData = async () => {
		const response = await fetch('https://playground.4geeks.com/sound/songs');
		if (response.ok) {
			const data = await response.json();
			setSongsList([...data.songs]);
			setCSong([...data.songs][0]);
			console.log('again');
		} else {
			console.log('error: ', response.status, response.statusText);
			/* Handle the error returned by the HTTP request */
			return {error: {status: response.status, statusText: response.statusText}};
		};
	};

	function currentSong(data) {
		setCSong(data);
	}	

	function actionsSong(action){

		console.log(cSong);
		if (cSong != null && action != null) {
        let audio = document.getElementById(cSong.id);
        audio.src = 'https://playground.4geeks.com'+cSong.url;
		let index;

		switch (action) {
			case 'play' :
				audio.play();
				setIsPlaying(true);
				break;
			case 'pause' :
				audio.pause();
				setIsPlaying(false);
				break;
			case 'next' :
				index = cSong.id + 1;
				console.log(index);	
				if (index > songsList.length) 
					index = 1;			
				audio = document.getElementById(index);
				audio.play();
				setCSong(songsList[index-1]);
				setIsPlaying(true);
				break;
			case 'previous' :
				index = cSong.id - 1;
				if (index == 0) 
					index = songsList.length;
				audio = document.getElementById(index);
				audio.play();
				setCSong(songsList[index-1]);
				setIsPlaying(true);
				break;
		}}
    }

	return (
		<div className="text-center">
	
			{songsList.length > 0 && songsList.map((row, i) => (				
				<Song key={i} song={row} currentSong={currentSong} cSong={cSong} />
            ))}
			<div className="height"></div>			
			<div className="fixed-bottom d-flex justify-content-center footer">
				<div className="col-2">	
					<i className="fas fa-caret-square-left" onClick={e => {actionsSong('previous')}}></i>
				</div>
				<div className="col-2">	
					{!isPlaying ? <i className="fas fa-play" onClick={e => {actionsSong('play')}}></i> 
					 : <i className="fas fa-pause-circle" onClick={e => {actionsSong('pause')}}></i>}
				</div>
				<div className="col-2">	
					<i className="fas fa-caret-square-right" onClick={e => {actionsSong('next')}}></i>
				</div>				
			</div>
		</div>
	);
};

export default Home;
