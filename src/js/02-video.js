import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const currentTime = JSON.parse(
  localStorage.getItem('videoplayer-current-time')
);

if (currentTime !== null) {
  player.setCurrentTime(currentTime);
}

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(event) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(event.seconds)
  );
}
