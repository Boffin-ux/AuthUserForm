'use strict';
const userName = document.querySelector('.user-name'),
   registerUser = document.querySelector('.register-user'),
   loginUser = document.querySelector('.login'),
   listUser = document.querySelector('.list');

let userData = {
   user: [],
   // Получаем дату регистрации пользователя
   getDate: () => {
      const fMonth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
         'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

      const data = new Date(),
         years = data.getFullYear(),
         date = data.getDate(),
         months = data.getMonth(),
         hours = data.getHours(),
         minutes = data.getMinutes(),
         seconds = data.getSeconds();

      const addZero = (num) => {
         if (num >= 0 && num <= 9) {
            return '0' + num;
         } else {
            return num;
         }
      };
      return `${addZero(date)} ${fMonth[months]} ${years} г., ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`
   },
   // Отобразить результаты из базы данных
   render: () => {
      listUser.textContent = '';

      userData.user.forEach((item, index) => {
         const li = document.createElement('li');
         li.classList.add('user-item');
         li.innerHTML = `<span>Имя: ${item.firstName}, Фамилия: ${item.lastName}, Зарегистрирован: ${item.regDate}</span>
				<button class="user-remove">Удалить</button>`;

         listUser.append(li);
         const userRemove = li.querySelector('.user-remove');
         userRemove.addEventListener('click', () => {
            userData.user.splice(index, 1);
            userData.render();
            userName.textContent = 'Аноним';
         });
      });
      if (userData.user.length !== 0) {
         localStorage.user = JSON.stringify(userData.user);
      } else {
         delete localStorage.user;
         userName.textContent = 'Аноним';
      }
   },
   // Получаем данные от пользователя и заносим в базу
   asking: () => {
      const addUserName = prompt('Введите через пробел Имя и Фамилию пользователя', 'Петр Петров');
      if (addUserName) {
         let addUser = addUserName.trim().toLowerCase().split(' ');
         let addLoginUser, addPasswordUser;
         if (addUser.length !== 2 || !isNaN(addUser)) {
            alert('Ошибка ввода');
         } else {
            addLoginUser = prompt('Введите логин', 'Petr123'),
               addPasswordUser = prompt('Введите пароль', '123456');
            let newUser = {};
            newUser.firstName = `${addUser[0].slice(0, 1).toUpperCase()}${addUser[0].slice(1)}`;
            newUser.lastName = `${addUser[1].slice(0, 1).toUpperCase()}${addUser[1].slice(1)}`;
            newUser.login = addLoginUser;
            newUser.password = addPasswordUser;
            newUser.regDate = userData.getDate();
            userData.user.push(newUser);
         }
      }
      userData.render();
   },
   // Проходим авторизацию
   authUser: () => {
      let complite = true;
      let getLoginUser = prompt('Введите логин', 'Petr123'),
         getPasswordUser = prompt('Введите пароль', '123456');
      if (userData.user.length > 0) {
         userData.user.some(item => {
            if (item.login === getLoginUser && getPasswordUser === item.password) {
               userName.textContent = item.firstName;
               complite = true;
               return true;
            } else {
               complite = false;
               return false;
            }
         });
         if (!complite) {
            alert('Пользователь не найден');
         }
      } else {
         alert('Пользователь не найден');
      }
   },
};

if (localStorage.user) {
   userData.user = JSON.parse(localStorage.user);
   userData.render();
} else {
   userData.user = [];
}

registerUser.addEventListener('click', userData.asking);
loginUser.addEventListener('click', userData.authUser);



