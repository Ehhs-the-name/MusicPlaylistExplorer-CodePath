// Playlist things - playlist Iniitalization + button set up inside
let playlists = data.playlists;

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
		likeCountBtn.id = "likeCountBtn";
		likeCountBtn.innerHTML = "♥";
		buttonHolder.appendChild(likeCountBtn);

		playlistImage.onclick = function() {
			openModal(playlist.songs, playlist);
		}

		likeCountBtn.onclick = function() {
			if (likeCountBtn.classList.contains("button-clicked")) {
				likeCountBtn.classList.remove("button-clicked");
				decreaseLikeCount(playlist);
				likeCounter.innerText = playlist.likeCount;
			} else {
				likeCountBtn.classList.add("button-clicked");
				increaseLikeCount(playlist);
				likeCounter.innerText = playlist.likeCount;
			}
		}
	}
}

playlistsShower();


// Modal things - Code for opening and closing the modal
var modal = document.getElementById("songModal");
var span = document.getElementsByClassName("close")[0];
let mSongList = document.getElementById("modal-songlist");

function openModal(songList, currentPlaylist) {
	// console.log(`SONG LIST: ${songList} \n CURRENT PLAYLIST LIST ${currentPlaylist}`);

	for (let i = 0; i < songList.length; i++) {
		let song = songList[i];
		let shuffleToggle = false;

		document.getElementById('playlistName').innerText = currentPlaylist.playlist_name;
		document.getElementById('playlistImageM').src = currentPlaylist.playlist_art;
		document.getElementById('playlistCreator').innerText = `Playlist by: ${currentPlaylist.playlist_creator}`;

		let songHolder = document.createElement("div");
		songHolder.classList.add("modal-song");
		songHolder.id = `${song.songID}`;
		songHolder.innerHTML = `
				<img id="albumImage" src="${song.cover_art}" alt="Album Image">
				<div class="modal-song-text">
						<p id="songName">${song.title}</p>
						<p id="albumName">${song.album}</p>
						<p id="songArtist">By: ${song.artist}</p>
				</div>
				<div id="songDuration">${song.duration}</div>
			`;
				 // <div id="">ID# ${song.songID}</div>

		let suffleBtn = document.getElementById("shuffleBtn");

		suffleBtn.onclick = function() {
			//whatever i'm getting this to work some other day ( -A-) =3

			
			// Wikipedia plz help me out with this Fisher–Yates shuffle...
			// -- To shuffle an array a of n elements (indices 0..n-1):
			// for i from 0 to n−2 do
			// 		 j ← random integer such that i ≤ j < n
			// 		 exchange a[i] and a[j]

			// for (let i = 0; i < songList.length - 1; i++) {
			// 	let j = Math.floor(Math.random() * (songList.length - i)) + i;
			// 	let temp = songList[i];
			// 	songList[i] = songList[j];
			// 	songList[j] = temp;
			// console.log(temp);
			// }
			
			shuffleToggle = true;
		}

		if (shuffleToggle === true) {
			removeSongs();
			mSongList.appendChild(songHolder);
		} else {
			mSongList.appendChild(songHolder);
		}
	}


	modal.style.display = "block";
	// console.log("mSongList: ", mSongList);
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

//Suffle thing - randomization of ids?
// function shuffleToggle(playlist) {
// 	randomNumber = Math.floor(Math.random() * 18);

// 	return false, randomNumber;	
// }



// BUTTON THINGS - Code for the like button
function increaseLikeCount(playlist) {
	let currentCount = playlist.likeCount;
	currentCount = currentCount + 1;
	playlist.likeCount = currentCount;
}

function decreaseLikeCount(playlist) {
	let currentCount = playlist.likeCount;
	currentCount = currentCount - 1;
	playlist.likeCount = currentCount;
}