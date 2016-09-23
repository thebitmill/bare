import './morph'

fetch('/img/cloud.svg')
  .then((res) => res.text())
  .then((text) => {
    console.log(text);
  });
