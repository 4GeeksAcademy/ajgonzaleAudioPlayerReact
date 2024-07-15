import React, { act, useEffect, useState } from "react";

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
		} else {
			console.log('error: ', response.status, response.statusText);
			/* Handle the error returned by the HTTP request */
			return {error: {status: response.status, statusText: response.statusText}};
		};
	};

	function currentSong(data) {
		setCSong(data);
		actionsSong('play', data);
	}	

	function actionsSong(action, data){

		console.log(action, data);
		if (data == null) data = cSong;
		if (cSong != null) {
			let audio = document.getElementById('audioPlayer');
			audio.src = 'https://playground.4geeks.com'+data.url;
			setCSong(data);
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
					if (index > songsList.length) 
						index = 1;
					audio.src = 'https://playground.4geeks.com'+songsList[index-1].url
					audio.play();
					setCSong(songsList[index-1]);
					setIsPlaying(true);
					break;
				case 'previous' :
					index = cSong.id - 1;
					if (index == 0) 
						index = songsList.length;
					audio.src = 'https://playground.4geeks.com'+songsList[index-1].url
					audio.play();
					setCSong(songsList[index-1]);
					setIsPlaying(true);
					break;
			}
		}
    }

	return (
		<div className="text-center">
	
			{songsList.length > 0 && songsList.map((row, i) => (				
				<Song key={i} song={row} actionsSong={actionsSong} cSong={cSong} />
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
				<audio id="audioPlayer" ></audio>				
			</div>
		</div>
	);
};

export default Home;
