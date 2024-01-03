import { menu } from './data.js';

const header = document.getElementById('header');

const renderHeader = () => {
  const headerHtml = `
        <div class="header-background">
            <h1 class="title">Delish donuts</h1>
            <h3 class="subtitle">The best donuts in town.</h3>
        </div>
    `;

  header.innerHTML = headerHtml;
};

renderHeader();
