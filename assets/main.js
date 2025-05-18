fetch('assets/heartsutra-data.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('sutra-container');
    container.innerHTML = '';
    data.forEach((item, idx) => {
      const block = document.createElement('div');
      block.className = 'sutra-block';

      block.innerHTML = `
        <p><strong>中文原文：</strong>${item.zh}</p>
        <p><strong>白話文：</strong>${item.zh_plain}</p>
        <p><strong>英文正式：</strong>${item.en.formal}</p>
        <p class="en-plain"><strong>Plain English：</strong>${item.en.plain}</p>
        <button onclick="toggleGrammar(${idx})">顯示語法說明</button>
        <div id="grammar-${idx}" class="grammar">
          ${item.grammar.map(g => `<p>${g.word}: ${g.pos}</p>`).join('')}
        </div>
      `;
      container.appendChild(block);
    });
  });

function toggleGrammar(index) {
  const el = document.getElementById(`grammar-${index}`);
  el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
}
