// ============================================================
//  app.js – Gemeinsame Hilfsfunktionen für alle Seiten
// ============================================================

let db, auth, currentUser, currentUserData;

function initFirebase() {
  firebase.initializeApp(FIREBASE_CONFIG);
  db   = firebase.firestore();
  auth = firebase.auth();
}

function requireAuth(callback) {
  initFirebase();
  auth.onAuthStateChanged(async (user) => {
    hideLoading();
    if (!user) { window.location.href = 'index.html'; return; }
    currentUser = user;
    const snap = await db.collection('players').doc(user.uid).get();
    if (snap.exists) {
      currentUserData = snap.data();
    } else {
      if (!window.location.pathname.includes('setup.html')) {
        window.location.href = 'setup.html'; return;
      }
    }
    renderNav();
    if (callback) callback(user, currentUserData);
  });
}

function renderNav() {
  const nav = document.getElementById('main-nav');
  if (!nav || !currentUser) return;
  const edition = currentUserData?.edition || '';
  const name    = currentUserData?.characterName || currentUser.email;
  const page    = window.location.pathname.split('/').pop();

  nav.innerHTML = `
    <a href="dashboard.html" class="navbar-brand" title="Zurück zum Dashboard">
      <span class="home-icon">🏠</span>
      <span class="brand-text">POKÉMON TRACKER</span>
    </a>
    <ul class="navbar-nav" id="navbar-nav-list">
      <li><a href="dashboard.html"   ${page==='dashboard.html'   ?'class="active"':''}>📊 Dashboard</a></li>
      <li><a href="pokedex.html"     ${page==='pokedex.html'     ?'class="active"':''}>📖 Pokédex</a></li>
      <li><a href="progress.html"    ${page==='progress.html'    ?'class="active"':''}>🗺️ Fortschritt</a></li>
      <li><a href="duels.html"       ${page==='duels.html'       ?'class="active"':''}>⚔️ Duelle</a></li>
      <li><a href="trade.html"       ${page==='trade.html'       ?'class="active"':''}>🔄 Tausch</a></li>
      <li><a href="goals.html"       ${page==='goals.html'       ?'class="active"':''}>🎯 Ziele</a></li>
    </ul>
    <div class="navbar-user">
      <span class="edition-badge ${edition}">${edition==='feuerrot'?'🔴 Feuerrot':'🟢 Blattgrün'}</span>
      <span class="navbar-username">${name}</span>
      <button class="btn-logout" onclick="logout()">Abmelden</button>
      <button class="hamburger-btn" onclick="toggleMobileMenu()" id="hamburger-btn">
        <span id="hamburger-icon">☰</span>
        <span class="hb-label">Menü</span>
      </button>
    </div>`;
}

async function logout() {
  await auth.signOut();
  window.location.href = 'index.html';
}

function toggleMobileMenu() {
  const nav = document.getElementById('navbar-nav-list');
  const icon = document.getElementById('hamburger-icon');
  if (!nav) return;
  nav.classList.toggle('open');
  icon.textContent = nav.classList.contains('open') ? '✕' : '☰';
}

function showLoading() {
  const el = document.getElementById('loading-screen');
  if (el) el.classList.remove('hidden');
}
function hideLoading() {
  const el = document.getElementById('loading-screen');
  if (el) el.classList.add('hidden');
}

function showToast(msg, isError = false) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast' + (isError ? ' error' : '');
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ── Pokémon-Liste Gen 1 (151) ────────────────────────────────
const POKEMON_LIST = [
  {id:1,name:"Bisasam"},{id:2,name:"Bisaknosp"},{id:3,name:"Bisaflor"},
  {id:4,name:"Glumanda"},{id:5,name:"Glutexo"},{id:6,name:"Glurak"},
  {id:7,name:"Schiggy"},{id:8,name:"Schillok"},{id:9,name:"Turtok"},
  {id:10,name:"Raupi"},{id:11,name:"Safcon"},{id:12,name:"Smettbo"},
  {id:13,name:"Hornliu"},{id:14,name:"Kokuna"},{id:15,name:"Bibor"},
  {id:16,name:"Taubsi"},{id:17,name:"Tauboga"},{id:18,name:"Tauboss"},
  {id:19,name:"Rattfratz"},{id:20,name:"Rattikarl"},
  {id:21,name:"Habitak"},{id:22,name:"Ibitak"},
  {id:23,name:"Ekans"},{id:24,name:"Arbok"},
  {id:25,name:"Pikachu"},{id:26,name:"Raichu"},
  {id:27,name:"Sandan"},{id:28,name:"Sandamer"},
  {id:29,name:"Nidoran♀"},{id:30,name:"Nidorina"},{id:31,name:"Nidoqueen"},
  {id:32,name:"Nidoran♂"},{id:33,name:"Nidorino"},{id:34,name:"Nidoking"},
  {id:35,name:"Piepi"},{id:36,name:"Pixi"},
  {id:37,name:"Vulpix"},{id:38,name:"Vulnona"},
  {id:39,name:"Pummeluff"},{id:40,name:"Knuddeluff"},
  {id:41,name:"Zubat"},{id:42,name:"Golbat"},
  {id:43,name:"Myrapla"},{id:44,name:"Duflor"},{id:45,name:"Giflor"},
  {id:46,name:"Paras"},{id:47,name:"Parasek"},
  {id:48,name:"Bluzuk"},{id:49,name:"Omot"},
  {id:50,name:"Digda"},{id:51,name:"Digdri"},
  {id:52,name:"Mauzi"},{id:53,name:"Snobilikat"},
  {id:54,name:"Enton"},{id:55,name:"Entoron"},
  {id:56,name:"Menki"},{id:57,name:"Rasaff"},
  {id:58,name:"Fukano"},{id:59,name:"Arkani"},
  {id:60,name:"Quapsel"},{id:61,name:"Quaputzi"},{id:62,name:"Quappo"},
  {id:63,name:"Abra"},{id:64,name:"Kadabra"},{id:65,name:"Simsala"},
  {id:66,name:"Machollo"},{id:67,name:"Maschock"},{id:68,name:"Machomei"},
  {id:69,name:"Knofensa"},{id:70,name:"Ultrigaria"},{id:71,name:"Sarzenia"},
  {id:72,name:"Tentacha"},{id:73,name:"Tentoxa"},
  {id:74,name:"Kleinstein"},{id:75,name:"Georok"},{id:76,name:"Geowaz"},
  {id:77,name:"Ponita"},{id:78,name:"Gallopa"},
  {id:79,name:"Flegmon"},{id:80,name:"Lahmus"},
  {id:81,name:"Magnetilo"},{id:82,name:"Magneton"},
  {id:83,name:"Porenta"},{id:84,name:"Doduo"},{id:85,name:"Dodri"},
  {id:86,name:"Jurob"},{id:87,name:"Jugong"},
  {id:88,name:"Smogon"},{id:89,name:"Smogmog"},
  {id:90,name:"Muschas"},{id:91,name:"Austos"},
  {id:92,name:"Gastly"},{id:93,name:"Haunter"},{id:94,name:"Gengar"},
  {id:95,name:"Onix"},{id:96,name:"Traumato"},{id:97,name:"Hypno"},
  {id:98,name:"Krabby"},{id:99,name:"Kingler"},
  {id:100,name:"Voltobal"},{id:101,name:"Lektrobal"},
  {id:102,name:"Owei"},{id:103,name:"Kokowei"},
  {id:104,name:"Tragosso"},{id:105,name:"Knogga"},
  {id:106,name:"Kicklee"},{id:107,name:"Nockchan"},
  {id:108,name:"Schlurp"},{id:109,name:"Smogleo"},{id:110,name:"Smogmog"},
  {id:111,name:"Rihorn"},{id:112,name:"Rizeros"},
  {id:113,name:"Chaneira"},{id:114,name:"Tangela"},
  {id:115,name:"Kangama"},{id:116,name:"Seeper"},{id:117,name:"Seemon"},
  {id:118,name:"Goldini"},{id:119,name:"Golking"},
  {id:120,name:"Sterndu"},{id:121,name:"Starmie"},
  {id:122,name:"Pantimos"},{id:123,name:"Sichlor"},
  {id:124,name:"Rossana"},{id:125,name:"Elektek"},{id:126,name:"Magmar"},
  {id:127,name:"Pinsir"},{id:128,name:"Tauros"},
  {id:129,name:"Karpador"},{id:130,name:"Garados"},
  {id:131,name:"Lapras"},{id:132,name:"Ditto"},
  {id:133,name:"Evoli"},{id:134,name:"Aquana"},{id:135,name:"Blitza"},
  {id:136,name:"Flamara"},{id:137,name:"Porygon"},
  {id:138,name:"Amonitas"},{id:139,name:"Amoroso"},
  {id:140,name:"Kabuto"},{id:141,name:"Kabutops"},
  {id:142,name:"Aerodactyl"},{id:143,name:"Relaxo"},
  {id:144,name:"Arktos"},{id:145,name:"Zapdos"},{id:146,name:"Lavados"},
  {id:147,name:"Dratini"},{id:148,name:"Dragonir"},{id:149,name:"Dragoran"},
  {id:150,name:"Mewtu"},{id:151,name:"Mew"}
];

// ── Post-Game Pokémon (nur nach allen 8 Orden sichtbar) ───────
const POSTGAME_POKEMON = [
  {id:152,name:"Endivie",    note:"Eiland 2 / Tausch"},
  {id:153,name:"Lorblatt",   note:"Eiland 2 / Tausch – Entwicklung"},
  {id:154,name:"Meganie",    note:"Eiland 2 / Tausch – Entwicklung"},
  {id:155,name:"Feurigel",   note:"Eiland 2 / Tausch"},
  {id:156,name:"Igelavar",   note:"Eiland 2 / Tausch – Entwicklung"},
  {id:157,name:"Tornupto",   note:"Eiland 2 / Tausch – Entwicklung"},
  {id:158,name:"Karnimani",  note:"Eiland 2 / Tausch"},
  {id:159,name:"Tyracroc",   note:"Eiland 2 / Tausch – Entwicklung"},
  {id:160,name:"Impergator", note:"Eiland 2 / Tausch – Entwicklung"},
  {id:163,name:"Hoothoot",   note:"Eiland 5"},
  {id:164,name:"Noctuh",     note:"Eiland 5"},
  {id:165,name:"Ledyba",     note:"Eiland 1 (Blattgrün)"},
  {id:166,name:"Ledian",     note:"Eiland 1 (Blattgrün)"},
  {id:167,name:"Spinarak",   note:"Eiland 1 (Feuerrot)"},
  {id:168,name:"Ariados",    note:"Eiland 1 (Feuerrot)"},
  {id:169,name:"Iksbat",     note:"Zucht/Tausch"},
  {id:172,name:"Pichu",      note:"Eiland 4 – Zucht"},
  {id:173,name:"Fluffeluff", note:"Eiland 4 – Zucht"},
  {id:174,name:"Mogelbaum",  note:"Eiland 4 – Zucht"},
  {id:175,name:"Togepi",     note:"Eiland 4 – Ei"},
  {id:176,name:"Togetic",    note:"Eiland 4"},
  {id:179,name:"Voltilamm",  note:"Eiland 4"},
  {id:180,name:"Lektroross", note:"Eiland 4"},
  {id:181,name:"Ampharos",   note:"Eiland 4"},
  {id:182,name:"Blubberus",  note:"Eiland 5"},
  {id:183,name:"Marill",     note:"Eiland 4"},
  {id:184,name:"Azumarill",  note:"Eiland 4"},
  {id:185,name:"Mogelbaum",  note:"Eiland 4"},
  {id:186,name:"Quaxo",      note:"Eiland 4 – Zucht"},
  {id:187,name:"Hoppspross", note:"Eiland 5"},
  {id:188,name:"Hubelupf",   note:"Eiland 5"},
  {id:189,name:"Papungha",   note:"Eiland 5"},
  {id:190,name:"Griffel",    note:"Eiland 5"},
  {id:191,name:"Sonnkern",   note:"Eiland 5"},
  {id:192,name:"Sonnflora",  note:"Eiland 5"},
  {id:193,name:"Yanma",      note:"Eiland 5"},
  {id:194,name:"Felino",     note:"Eiland 3"},
  {id:195,name:"Morlord",    note:"Eiland 3"},
  {id:196,name:"Psiana",     note:"Tausch (Evoli)"},
  {id:197,name:"Nachtara",   note:"Tausch (Evoli)"},
  {id:198,name:"Kramurx",    note:"Eiland 6"},
  {id:199,name:"Laschoking", note:"Tausch"},
  {id:200,name:"Traunfugil", note:"Eiland 6"},
  {id:201,name:"Icognito",   note:"Eiland 6"},
  {id:202,name:"Woingenau",  note:"Eiland 4"},
  {id:203,name:"Girafarig",  note:"Eiland 4"},
  {id:204,name:"Scaphatit",  note:"Eiland 5"},
  {id:205,name:"Forstellka", note:"Eiland 5"},
  {id:206,name:"Dummisel",   note:"Eiland 5"},
  {id:207,name:"Skorgla",    note:"Eiland 5"},
  {id:209,name:"Snubbull",   note:"Eiland 5"},
  {id:210,name:"Granbull",   note:"Eiland 5"},
  {id:211,name:"Baldorfish", note:"Eiland 3 – Angeln"},
  {id:212,name:"Scherox",    note:"Eiland 6 – Zucht"},
  {id:213,name:"Pottrott",   note:"Eiland 5"},
  {id:214,name:"Skaraborn",  note:"Eiland 5"},
  {id:215,name:"Sniebel",    note:"Eiland 4"},
  {id:216,name:"Teddiursa",  note:"Eiland 4"},
  {id:217,name:"Ursaring",   note:"Eiland 4"},
  {id:218,name:"Schneckmag", note:"Eiland 1 (Feuerrot)"},
  {id:219,name:"Magcargo",   note:"Eiland 1 (Feuerrot)"},
  {id:220,name:"Quiekel",    note:"Eiland 4"},
  {id:221,name:"Keifel",     note:"Eiland 4"},
  {id:222,name:"Corasonn",   note:"Eiland 1 – Angeln"},
  {id:223,name:"Remoraid",   note:"Eiland 4 – Angeln"},
  {id:224,name:"Oktillery",  note:"Eiland 4 – Angeln"},
  {id:225,name:"Botogel",    note:"Eiland 4"},
  {id:226,name:"Mantax",     note:"Eiland 4 – Surfen"},
  {id:227,name:"Panzaeron",  note:"Eiland 4"},
  {id:228,name:"Hunduster",  note:"Eiland 6"},
  {id:229,name:"Hundemon",   note:"Eiland 6"},
  {id:230,name:"Seedraking", note:"Tausch"},
  {id:231,name:"Phanpy",     note:"Eiland 4 (Blattgrün)"},
  {id:232,name:"Donphan",    note:"Eiland 4 (Blattgrün)"},
  {id:233,name:"Porygon2",   note:"Tausch"},
  {id:234,name:"Damhirplex", note:"Eiland 4"},
  {id:235,name:"Farbeagle",  note:"Eiland 5"},
  {id:236,name:"Rabauz",     note:"Eiland 4"},
  {id:237,name:"Kapoera",    note:"Eiland 4"},
  {id:238,name:"Kussilla",   note:"Eiland 4 – Zucht"},
  {id:239,name:"Elekid",     note:"Eiland 4 – Zucht (Feuerrot)"},
  {id:240,name:"Magby",      note:"Eiland 4 – Zucht (Blattgrün)"},
  {id:241,name:"Miltank",    note:"Eiland 5"},
  {id:242,name:"Heiteira",   note:"Eiland 5 – Zucht"},
  {id:243,name:"Raikou",     note:"Wanderpokémon (Festland)"},
  {id:244,name:"Entei",      note:"Wanderpokémon (Festland)"},
  {id:245,name:"Suicune",    note:"Wanderpokémon (Festland)"},
  {id:249,name:"Lugia",      note:"Eiland 8 – Navel Rock (Event)"},
  {id:250,name:"Ho-Oh",      note:"Eiland 8 – Navel Rock (Event)"},
  {id:386,name:"Deoxys",     note:"Eiland 9 – Birth Island (Event)"},
];

const STARTERS = [
  {name:"Bisasam",  type:"Pflanze", id:1},
  {name:"Glumanda", type:"Feuer",   id:4},
  {name:"Schiggy",  type:"Wasser",  id:7}
];

function formatDate(ts) {
  if (!ts) return '–';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('de-CH', {day:'2-digit', month:'2-digit', year:'numeric'});
}
