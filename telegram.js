const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

console.log("Telegram WebApp запущен");

const user = tg.initDataUnsafe?.user;

if (user) {
  console.log("Пользователь:", user.username || user.id);
}
