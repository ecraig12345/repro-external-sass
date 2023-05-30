// import styles from './index.module.scss';
import { foo } from '@repro/foo';

// const styles = { app: 'app' };

function start() {
  const div = document.createElement('div');

  console.log(foo);

  // div.className = styles.app;
  div.innerHTML = 'Hello World!';

  document.body.appendChild(div);
}

window.onload = start;
