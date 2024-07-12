import React from "react";

const Song = ({song, currentSong, cSong}) => {

    function playSong(){
        
        if (cSong.id != null) {
            document.getElementById(cSong.id).pause();
        }

        let audio = document.getElementById(song.id);
        audio.src = 'https://playground.4geeks.com'+song.url;
        audio.play();
        currentSong(song);
    }

    return (
        <div className="song text-start d-flex" onClick={playSong} >
           <p className="number">{song.id}</p> <p className="name">{song.name}</p>
           <audio id={song.id}
                src={`https://playground.4geeks.com${song.url}`}
            ></audio>
        </div>

    )
};
export default Song;