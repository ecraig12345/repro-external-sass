import styles from './index.module.scss';

function start() {
  const div = document.createElement('div');

  div.className = styles.app;
  div.innerHTML = 'Hello World!';

  document.body.appendChild(div);
}

window.onload = start;
