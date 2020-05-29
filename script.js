$(document).ready(function(){

// сохранение логина

function InitialState(){
	if (localStorage.getItem('login') == null) {
		$('.header__login').show();
	} else {
		$('.header__login').hide();
		$('.header__auth').html(localStorage.getItem('login'));
	}
};

InitialState();

function addToStorage(){
	let content = $('.header__auth').html();
	console.log(content);

	localStorage.setItem('login', content);
}

// переключение между табами

const latestSection = $('.latest');
const	genreSection  = $('.genre');
const channelSection = $('.channel');

$('.header__tvprogram').click(function selectTvProgram(a){
	a.preventDefault();

	$('.header__films').removeClass('header__link_active');
	$('.header__tvprogram').addClass('header__link_active');
	latestSection.hide();
	genreSection.hide();
	channelSection.show();

});

$('.header__films').click(function selectFilms(b){
	b.preventDefault();

	$('.header__tvprogram').removeClass('header__link_active');
	$('.header__films').addClass('header__link_active');
	latestSection.show();
	genreSection.show();
	channelSection.hide();

});

// вызов модального окна

$('.header__login').click(function(){
	$('.modal').show();
	$('body').addClass('no__scroll');
});

$('.modal').click(function(event){
	if(event.target == this) {
		$(this).hide();
		$('body').removeClass('no__scroll');
	}
});

// функция авторизации

function auth(c){
	c.preventDefault();

	let userName = $('.modal__input_login').val();
	let userPassword = $('.modal__input_password').val();

	if (userName.length !== 0 && userPassword.length !== 0) {
		$('.modal').hide();
		$('body').removeClass('no__scroll');

		$('.header__login').hide();

		$('.header__auth').append(`
			<div class="header__userbar">
				<div class="header__user">${userName}</div>
				<button class="header__logout">Выйти</button>
			</div>
		`);

		userName = $('.modal__input_login').val('');
		userPassword = $('.modal__input_password').val('');

		addToStorage();
	};
};

$('.modal__login').click(auth);

// вохможность разлогиниться по клику

$('body').on('click', '.header__logout', function(){
	$('.header__userbar').remove();
	$('.header__login').show();

	localStorage.removeItem('login');
});


// возможность ренейма

$('body').on('click', '.header__user', function(){

	let userNewName;

	$('.header__user').remove();
	$('.header__userbar').prepend(`
		<input type="text" class="header__login_input input">
	`);

	$('header').click(function(event){
		if (event.target == this) {

		 userNewName = $('.header__login_input').val();

			$('.header__login_input').remove();
			$('.header__userbar').prepend(`
				<div class="header__user">${userNewName}</div>
			`);

			localStorage.removeItem('login');
			addToStorage();

			userNewName = $('.header__login_input').val('');

		};
	});
});






















})
