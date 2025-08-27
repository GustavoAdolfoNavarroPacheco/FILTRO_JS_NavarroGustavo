// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');
allDropdown.forEach(item => {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if (!this.classList.contains('active')) {
			allDropdown.forEach(i => {
				const aLink = i.parentElement.querySelector('a:first-child');

				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}

		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})
// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');
if (sidebar.classList.contains('hide')) {
	allSideDivider.forEach(item => {
		item.textContent = '-'
	})
	allDropdown.forEach(item => {
		const a = item.parentElement.querySelector('a:first-child');
		a.classList.remove('active');
		item.classList.remove('show');
	})
} else {
	allSideDivider.forEach(item => {
		item.textContent = item.dataset.text;
	})
}
toggleSidebar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');

	if (sidebar.classList.contains('hide')) {
		allSideDivider.forEach(item => {
			item.textContent = '-'
		})

		allDropdown.forEach(item => {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
	} else {
		allSideDivider.forEach(item => {
			item.textContent = item.dataset.text;
		})
	}
})
sidebar.addEventListener('mouseleave', function () {
	if (this.classList.contains('hide')) {
		allDropdown.forEach(item => {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item => {
			item.textContent = '-'
		})
	}
})
sidebar.addEventListener('mouseenter', function () {
	if (this.classList.contains('hide')) {
		allDropdown.forEach(item => {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item => {
			item.textContent = item.dataset.text;
		})
	}
})
// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');
imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
})
// MENU
const allMenu = document.querySelectorAll('main .content-data .head .menu');
allMenu.forEach(item => {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
	})
})
window.addEventListener('click', function (e) {
	if (e.target !== imgProfile) {
		if (e.target !== dropdownProfile) {
			if (dropdownProfile.classList.contains('show')) {
				dropdownProfile.classList.remove('show');
			}
		}
	}

	allMenu.forEach(item => {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if (e.target !== icon) {
			if (e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})
// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress');
allProgress.forEach(item => {
	item.style.setProperty('--value', item.dataset.value)
})

function buscarPersonaje() {
	document.getElementById("searchInput").innerHTML = ``;

	const findMovie = document.getElementById("searchInput").value.trim();
	console.log(findMovie);
	const xhr = new XMLHttpRequest();
	const url = `https://imdb.iamidiotareyoutoo.com/search?q=${findMovie}`;
	console.log(url);
	xhr.open("GET", url, true);

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 3) {

			console.log("Cargando...");
		}
		else if (xhr.readyState === 4 && xhr.status === 200) {
			const data = JSON.parse(xhr.responseText);

			for (let i = 0; i < data.description.length; i++) {
				console.log(data["description"][i]["#TITLE"]);
				let division = document.getElementById("resultados");
				division.innerHTML += `
						<div class="cardShow">
			<img src="${data["description"][i]["#IMG_POSTER"]}" alt="">
			<h3>${data["description"][i]["#TITLE"]}</h3>

		</div>`
			}

		}
	};
	xhr.send();
}


function buscarPersonajeByYear() {
	document.getElementById("yearInput").innerHTML = ``;

	const findYear = document.getElementById("yearInput").value.trim();
	console.log(findYear);
	const xhr = new XMLHttpRequest();
	const url = `https://imdb.iamidiotareyoutoo.com/search?q=${findYear}`;
	console.log(url);
	xhr.open("GET", url, true);

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 3) {

			console.log("Cargando...");
		}
		else if (xhr.readyState === 4 && xhr.status === 200) {
			const data = JSON.parse(xhr.responseText);

			for (let i = 0; i < data.description.length; i++) {
				if (findYear === data["description"][i]["#YEAR"]) {
					console.log(data["description"][i]["#TITLE"]);
					let division = document.getElementById("resultados");
					division.innerHTML += `
							<div class="cardShow">
				<img src="${data["description"][i]["#IMG_POSTER"]}" alt="">
				<h3>${data["description"][i]["#TITLE"]}</h3>
				<p>${data["description"][i]["#YEAR"]}</p>

			</div>`
				}
				else {
					console.log('No Encontrado')
				}
			}

		}
	};
	xhr.send();
}


