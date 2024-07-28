// console.log(data.playlists[0]);

let playlists = data.playlists;
// console.log(playlists);

let playlistCards = document.getElementById("playlistCards");


function playlistsShower() {
	for (let i = 0; i < playlists.length; i++) {
		let playlist = playlists[i];

		let playlistCard = document.createElement("div");
		playlistCard.classList.add("playlist-card");
		playlistCards.appendChild(playlistCard);

		let playlistImage = document.createElement("img");
		playlistImage.src = playlist.playlist_art;
		playlistCard.appendChild(playlistImage);

		let playlistTitle = document.createElement("p");
		playlistTitle.classList.add("playlist-title");
		playlistTitle.innerText = playlist.playlist_name;
		playlistCard.appendChild(playlistTitle);

		let playlistCreator = document.createElement("p");
		playlistCreator.classList.add("playlist-artist");
		playlistCreator.innerText = playlist.playlist_creator;
		playlistCard.appendChild(playlistCreator);

		let buttonHolder = document.createElement("div");
		buttonHolder.classList.add("button-holder");
		playlistCard.appendChild(buttonHolder);

		let likeCounter = document.createElement("span");
		likeCounter.id = "likeCount";
		likeCounter.innerText = playlist.likeCount;
		buttonHolder.appendChild(likeCounter);

		let likeCountBtn = document.createElement("button");
		likeCountBtn.id = likeCountBtn;
		likeCountBtn.innerHTML = "&lt;3";
		buttonHolder.appendChild(likeCountBtn);

		playlistImage.onclick = function() {
			openModal(playlist.songs, playlist);
			
		}
	}

}

playlistsShower();


// Modal things - Code for opening and closing the modal
var modal = document.getElementById("songModal");
var span = document.getElementsByClassName("close")[0];
let mSongList = document.getElementById("modal-songlist");
console.log("mSongList: ", mSongList);

function openModal(songList, currentPlaylist) {
	// console.log(`SONG LIST: ${songList} \n CURRENT PLAYLIST LIST ${currentPlaylist}`);

	for (let i = 0; i < songList.length; i++) {
		let song = songList[i];

		let songHolder = document.createElement("div");
		songHolder.classList.add("modal-song");
		songHolder.innerHTML = `
				<img id="albumImage" src="${song.cover_art}" alt="Album Image">
				<div class="modal-song-text">
						<p id="songName">${song.title}</p>
						<p id="albumName">${song.album}</p>
						<p id="songArtist">By: ${song.artist}</p>
				</div>
				<div id="songDuration">${song.duration}</div>
			`;
		mSongList.appendChild(songHolder);

		document.getElementById('playlistName').innerText = currentPlaylist.playlist_name;
		document.getElementById('playlistImageM').src = currentPlaylist.playlist_art;
		document.getElementById('playlistCreator').innerText = `Playlist by: ${currentPlaylist.playlist_creator}`;
	}

	modal.style.display = "block";
	console.log("mSongList: ", mSongList);
}

function removeSongs() {
	while (mSongList.firstChild) { 
		mSongList.firstChild.remove(); 
	}
}

span.onclick = function() {
	modal.style.display = "none";
	removeSongs()
}

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
		removeSongs()
	}
}


// BUTTON THINGS - Code for the like button
let button = document.getElementById("likeCountBtn");
let count = document.getElementById("likeCount");

function counter() {
	let currentCount = parseInt(count.innerText);
	count.innerText = currentCount + 1;
}

// button.addEventListener("click", counter);