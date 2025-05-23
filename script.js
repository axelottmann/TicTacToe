'use strict';

    const Content = document.getElementById('Content');
    const messageEl = document.getElementById('message');
    const resetBtn = document.getElementById('reset');

    const cross = 'x';
    const circle = 'o';

    // Beispiel-Array mit aktuellem Spielfeldzustand
    let fields = [
      null, 
      null, 
      null,
      null, 
      null, 
      null,
      null,
      null,
      null
    ];

    let currentPlayer = cross;
    let gameOver = false;

    function init() {
      currentPlayer = cross;
      gameOver = false;
      render();
      Content.addEventListener('click', handleCellClick);
      resetBtn.addEventListener('click', () => {
        fields = Array(9).fill(null);
        init();
      });
    }

    function render() {
      let html = '<table>';
      for (let row = 0; row < 3; row++) {
        html += '<tr>';
        for (let col = 0; col < 3; col++) {
          const idx = row * 3 + col;
          const val = fields[idx];
          html += `<td data-index="${idx}">${val ? val : ''}</td>`;
        }
        html += '</tr>';
      }
      html += '</table>';
      Content.innerHTML = html;

      const winner = checkWinner();
      if (winner) {
        messageEl.textContent = 'Gewonnen: ' + winner;
        gameOver = true;
      } else if (!fields.includes(null)) {
        messageEl.textContent = 'Unentschieden!';
        gameOver = true;
      } else {
        messageEl.textContent = 'Spieler ' + currentPlayer + ' ist am Zug';
      }
    }

    function handleCellClick(event) {
      const td = event.target.closest('td');
      if (!td || gameOver) return;
      const idx = parseInt(td.dataset.index, 10);
      if (fields[idx]) return;
      fields[idx] = currentPlayer;
      currentPlayer = currentPlayer === cross ? circle : cross;
      render();
    }

    function checkWinner() {
      const lines = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];
      for (const [a,b,c] of lines) {
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
          return fields[a];
        }
      }
      return null;
    }

    init();

