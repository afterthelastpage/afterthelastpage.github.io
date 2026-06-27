// ============================================================
//  MAIN.JS — bookshelf interactions
// ============================================================

let currentBook = null;

// Set today's date on the signup card
document.getElementById('today-date').textContent =
  new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

// ---- Render books onto the shelf ----
function renderBooks() {
  const row = document.getElementById('books-row');
  row.innerHTML = '';
  BOOKS.forEach((book, i) => {
    const el = document.createElement('div');
    el.className = 'book';
    el.style.cssText = `
      width:${book.width}px;
      height:${book.height}px;
      background:${book.color};
    `;
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `Open ${book.title}`);
    el.innerHTML = `<span class="book-spine-title">${book.title}</span>`;
    el.addEventListener('click', () => openCover(book));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openCover(book); });
    row.appendChild(el);
  });
}

// ---- Step 1: show front cover ----
function openCover(book) {
  currentBook = book;
  document.getElementById('cover-category').textContent = `${book.category} · ${book.number}`;
  document.getElementById('cover-title').textContent = book.title;
  const overlay = document.getElementById('cover-overlay');
  // tint cover with book color
  document.querySelector('.book-cover').style.background =
    `linear-gradient(160deg, ${book.color} 0%, ${darken(book.color, 30)} 100%)`;
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function handleOverlayClick() {
  closeCover();
}

function closeCover() {
  document.getElementById('cover-overlay').style.display = 'none';
  document.body.style.overflow = '';
  currentBook = null;
}

// ---- Step 2: show blurb ----
function showBlurb() {
  document.getElementById('cover-overlay').style.display = 'none';
  document.getElementById('blurb-text').textContent = currentBook.blurb;
  document.getElementById('blurb-read-link').href = currentBook.file;
  document.getElementById('blurb-overlay').style.display = 'flex';
}

function handleBlurbClick() {
  closeBlurb();
}

function closeBlurb() {
  document.getElementById('blurb-overlay').style.display = 'none';
  document.body.style.overflow = '';
  currentBook = null;
}

// ---- Email join ----
function handleJoin() {
  const val = document.getElementById('email-input').value;
  if (!val || !val.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }
  document.getElementById('join-confirm').style.display = 'block';
  document.getElementById('email-input').style.display = 'none';
  document.querySelector('.card-input-row button').style.display = 'none';
}

// ---- Utility ----
function darken(hex, amount) {
  let r = parseInt(hex.slice(1,3),16);
  let g = parseInt(hex.slice(3,5),16);
  let b = parseInt(hex.slice(5,7),16);
  r = Math.max(0, r - amount);
  g = Math.max(0, g - amount);
  b = Math.max(0, b - amount);
  return `rgb(${r},${g},${b})`;
}

// ---- Init ----
renderBooks();
