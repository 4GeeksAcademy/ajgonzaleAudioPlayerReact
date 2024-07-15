import React from "react";

const Song = ({song, actionsSong, cSong}) => {

    function playSong(){
        actionsSong('play', song);
    }

    return (
        <div className="song text-start d-flex" onClick={playSong} >
           <p className="number">{song.id}</p> <p className="name">{song.name}</p>           
        </div>
    )
};
export default Song;