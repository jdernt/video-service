$(document).ready(function(){

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


function auth(c){
	c.preventDefault();

	let userName = $('.modal__input_login').val();
	let userPassword = $('.modal__input_password').val();

	if (userName.length !== 0 && userPassword.length !== 0) {
		$('.header__login').hide();

		$('.header__flex').append(`
		<div class="header__auth">
			<div class="header__user">${userName}</div>
			<button class="header__logout">Выйти</button>
		</div>
		`);

		$('.modal').hide();
		$('body').removeClass('no__scroll');

		userName = $('.modal__input_login').val('');
		userPassword = $('.modal__input_password').val('');
	};
};

$('.modal__login').click(auth);


function rename(){


};

$('body').on('click', '.header__user', rename);


$('body').on('click', '.header__logout', function(){
	$('.header__auth').hide();
	$('.header__login').show();
});





















})
