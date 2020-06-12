$(document).ready(function(){

		// сохранение логина

		function InitialState(){
			if (localStorage.getItem('login') == null) {
				$('.header__login').show();
			} else {
				$('.header__login').hide();
				$('.header__auth').html(localStorage.getItem('login'));
			};
		};

		InitialState();

		function addToStorage(){
			let content = $('.header__auth').html();
			localStorage.setItem('login', content);
		};

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
			};
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

				localStorage.setItem('nickname', userName);

				userName = $('.modal__input_login').val('');
				userPassword = $('.modal__input_password').val('');

				addToStorage();
			};
		};

		$('.modal__login').click(auth);

		// возможность разлогиниться по клику

		$('body').on('click', '.header__logout', function(){
			$('.header__userbar').remove();
			$('.header__login').show();

			localStorage.removeItem('login');
			localStorage.removeItem('nickname');
		});

		// возможность ренейма

		$('body').on('click', '.header__user', function(){

			$('.header__user').remove();
			$('.header__userbar').prepend(`
				<input type="text" class="header__login_input input" maxlength="20">
			`);

			$('.header__login_input').val(localStorage.getItem('nickname'));

		});

		function rename() {

			let userNewName = 0;
			userNewName = $('.header__login_input').val();

			if (undefined !== userNewName) {
				if (userNewName.length !== 0) {
					$('.header__login_input').remove();
					$('.header__userbar').prepend(`
						<div class="header__user">${userNewName}</div>
					`);

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
