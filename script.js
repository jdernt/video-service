document.addEventListener('DOMContentLoaded', function(){

const headerLogin = document.querySelector('.header__login');
const latestSection = document.querySelector('.latest');
const	genreSection  = document.querySelector('.genre');
const channelSection = document.querySelector('.channel');
const filmsLink = document.querySelector('.header__films');
const tvprogramLink = document.querySelector('.header__tvprogram');
const headerAuth = document.querySelector('.header__auth');
const loginInput = document.querySelector('.header__login_input');

// сохранение логина

function InitialState(){
	if (localStorage.getItem('login') == null) {
		headerLogin.style.display = 'block';
	} else {
		headerLogin.style.display = 'none';
		headerAuth.innerHTML = localStorage.getItem('login');
	};
};

InitialState();

function addToStorage(){
	let content = headerAuth.innerHTML;
	localStorage.setItem('login', content);
};

// переключение между табами

tvprogramLink.addEventListener('click', function(a){
	a.preventDefault();

	filmsLink.classList.remove('header__link_active');
	tvprogramLink.classList.add('header__link_active');
	latestSection.style.display = 'none';
	genreSection.style.display = 'none';
	channelSection.style.display = 'block';
});

filmsLink.addEventListener('click', function(b){
	b.preventDefault();

	filmsLink.classList.add('header__link_active');
	tvprogramLink.classList.remove('header__link_active');
	latestSection.style.display = 'block';
	genreSection.style.display = 'block';
	channelSection.style.display = 'none';
});

// вызов модального окна

const modalWindow = document.querySelector('.modal');

headerLogin.addEventListener('click', function(){
	modalWindow.style.display = 'block';
	document.body.classList.add('no__scroll');
});

$('.modal').click(function(event){
	if(event.target == this) {
		$(this).hide();
		$('body').removeClass('no__scroll');
	};
});

// функция авторизации

function auth(c) {
	c.preventDefault();

	let userName = document.querySelector('.modal__input_login').value;
	let userPassword = document.querySelector('.modal__input_password').value;

	if (userName.length !== 0 && userPassword.length !== 0) {
		modalWindow.style.display = 'none';
		document.body.classList.remove('no__scroll');

		headerLogin.style.display = 'none';

		headerAuth.insertAdjacentHTML('beforeend', '<div class="header__userbar"><div class="header__user"></div><button class="header__logout">Выйти</button></div>');
		document.querySelector('.header__user').textContent = userName;

		localStorage.setItem('nickname', userName);

		userName = $('.modal__input_login').val('');
		userPassword = $('.modal__input_password').val('');

		addToStorage();
	};
};

document.querySelector('.modal__login').addEventListener('click', auth);

// возможность разлогиниться по клику

document.body.addEventListener('click', function(){
	if (event.target == document.querySelector('.header__logout')) {
		document.querySelector('.header__userbar').remove();

		headerLogin.style.display = 'block';

		localStorage.removeItem('login');
		localStorage.removeItem('nickname');
	};
});

// возможность ренейма

// document.body.addEventListener('click', function(){
// 	if (event.target.closest('.header__user')) {
// 		document.querySelector('.header__user').remove();

// 		document.querySelector('.header__userbar').insertAdjacentHTML('afterbegin', '<input type="text" class="header__login_input input" maxlength="20">');

// 		// loginInput.value = localStorage.getItem('nickname');
// 	};
// });

// function rename() {
// 	// if (loginInput !== null) {
// 		let userNewName = loginInput.value;

// 		if (userNewName.length !== 0) {
// 			loginInput.remove();

// 			document.querySelector('.header__userbar').insertAdjacentHTML('afterbegin', '<div class="header__user"></div>');
// 			document.querySelector('.header__user').textContent = userNewName;

// 			localStorage.removeItem('login');
// 			addToStorage();

// 			localStorage.setItem('nickname', userNewName);

// 			userNewName = $('.header__login_input').val('');

// 		} else {
// 			loginInput.remove();
// 			headerAuth.innerHTML = localStorage.getItem('login');
// 		};
// 	// };
// };

// $(document).mouseup(function (e){
// 	let div = $('.header__login_input');
// 	if (!div.is(e.target)) rename();
// });

$('body').on('click', '.header__user', function(){

	$('.header__user').remove();
	document.querySelector('.header__userbar').insertAdjacentHTML('afterbegin', '<input type="text" class="header__login_input input" maxlength="20">');


	$('.header__login_input').val(localStorage.getItem('nickname'));

});

function rename() {

	let userNewName = 0;
	userNewName = $('.header__login_input').val();

	if (undefined !== userNewName) {
		if (userNewName.length !== 0) {
			$('.header__login_input').remove();
			document.querySelector('.header__userbar').insertAdjacentHTML('afterbegin', '<div class="header__user">${userNewName}</div>');
			document.querySelector('.header__user').textContent = userNewName;

			localStorage.removeItem('login');
			addToStorage();

			localStorage.setItem('nickname', userNewName);

			userNewName = $('.header__login_input').val('');

		} else {
			$('.header__login_input').remove();
			$('.header__auth').html(localStorage.getItem('login'));
		};
	};
};

$(document).mouseup(function (e){
	let div = $('.header__login_input');
	if (!div.is(e.target)) rename();
});

})
