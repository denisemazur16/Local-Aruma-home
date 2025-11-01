document.addEventListener('DOMContentLoaded', () => {
    const PRECIOS = { funda: 8500, toalla: 6200, mantel: 19900, velas: 4800 };
  
    const box    = document.querySelector('.items');
    const addBtn = document.getElementById('addItem');
  
    const subtotalEl = document.getElementById('subtotal');
    const descAEl    = document.getElementById('desc-promo-a');
    const totalAEl   = document.getElementById('total-promo-a');
    const descBEl    = document.getElementById('desc-promo-b');
    const totalBEl   = document.getElementById('total-promo-b');
    const descCEl    = document.getElementById('desc-promo-c');
    const totalCEl   = document.getElementById('total-promo-c');
  
    const nuevaFila = () => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML =
        '<select>' +
          '<option value="funda">Funda de almohadón — $8500</option>' +
          '<option value="toalla">Toalla de mano — $6200</option>' +
          '<option value="mantel">Mantel 6 sillas — $19900</option>' +
          '<option value="velas">Set de velas — $4800</option>' +
        '</select>' +
        '<input type="number" min="1" value="1">' +
        '<button type="button" class="btn-del">X</button>' +
        '<span class="item-precio"></span>' +
        '<span class="item-subtotal"></span>';
      return div;
    };
  
    const recalcular = () => {
      const filas = box.querySelectorAll('.item');
      let subTotal = 0;
      let dA = 0, dB = 0, dC = 0;
  
      filas.forEach(f => {
        const id  = f.querySelector('select').value;
        const qty = Number(f.querySelector('input[type="number"]').value);
        const precio = PRECIOS[id];
        const sub = precio * qty; // <-- CORREGIDO (antes usabas "price")
  
        f.querySelector('.item-precio').textContent   = 'Precio: $' + precio;
        f.querySelector('.item-subtotal').textContent = 'Subtotal: $' + sub;
  
        subTotal += sub;
        dA += Math.floor(qty / 2) * (precio / 2); // 2º al 50%
        dB += Math.floor(qty / 3) * precio;       // 3x2
      });
  
      if (subTotal > 30000) dC = subTotal * 0.10; // 10%
  
      subtotalEl.textContent = '$' + subTotal;
      descAEl.textContent = '-$' + dA;   totalAEl.textContent = '$' + (subTotal - dA);
      descBEl.textContent = '-$' + dB;   totalBEl.textContent = '$' + (subTotal - dB);
      descCEl.textContent = '-$' + dC;   totalCEl.textContent = '$' + (subTotal - dC);
    };
  
    box.addEventListener('input', e => {
      if (e.target.tagName === 'SELECT' || e.target.type === 'number') recalcular();
    });
  
    box.addEventListener('click', e => {
      if (e.target.className === 'btn-del') {
        e.target.parentNode.remove();
        if (box.children.length === 0) box.appendChild(nuevaFila());
        recalcular();
      }
    });
  
    addBtn.addEventListener('click', () => {
      box.appendChild(nuevaFila());
      recalcular();
    });
  
    box.appendChild(nuevaFila());
    recalcular();
  });
  