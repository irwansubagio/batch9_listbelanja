// tangkap beberapa element html
let modal = document.getElementById('modal');
let floating_button = document.getElementById('floating_button');
let modal_bg = document.getElementById('modal_bg');
let addlist_form = document.getElementById('addlist_form');
let subtittle = document.getElementById('subtittle');

// tambahkan date ke subtittle
if (subtittle) {
  subtittle.innerHTML = new Date().toLocaleDateString();
}

// data list belanja
let data_list_belanja = [];

// tambahakan event listerer submit ke element absensi_form
if (floating_button) {
  floating_button.addEventListener('click', () => {
    // munculkan
    if (modal.style.display == 'none') {
      showModal();
      return;
    }
    // sembunyikan kembali
    hideModal();
  });
}

// menambahkan event listener ke modal bg
if (modal_bg) {
  modal_bg.addEventListener('click', () => {
    hideModal();
  });
}

// tambahkan event listener submit di addlist_form
if (addlist_form) {
  addlist_form.addEventListener('submit', (event) => {
    // stop form dari reload page
    event.preventDefault();

    // tangkap value dari masing-masing input form
    let barang = event.target.barang.value;
    let harga = event.target.harga.value;

    // push data ke data list belanja
    data_list_belanja.push({
      nama_barang: barang,
      harga_barang: harga,
      tanggal: new Date().toLocaleDateString(),
    });

    //clear input field
    event.target.barang.value = '';
    event.target.harga.value = '';

    hideModal();
    renderToHtml();
  });
}

// show modal
function showModal() {
  modal.style.display = 'flex';
  floating_button.style.backgroundColor = 'gray';
  floating_button.style.transform = 'rotate(45deg)';
}

// hide modal
function hideModal() {
  modal.style.display = 'none';
  floating_button.style.backgroundColor = '#F28086';
  floating_button.style.transform = 'rotate(0deg)';
}

// render function
function renderToHtml() {
  // clear elemen div
  root.innerHTML = '';

  // perulangan
  data_list_belanja.forEach((e, i) => {
    root.innerHTML += `
    <div class="card">
    <small>${e.tanggal}</small>
    <div>
    ${e.nama_barang}<span>Rp.${e.harga_barang}</span>
    </div>
    <button onclick="handleDelete(${i})">Selesai</button>
    </div>
    `;
  });
}

// function untuk delete item pada arah datalistbelanja
function handleDelete(index) {
  data_list_belanja.splice(index, 1);
  renderToHtml();
}
