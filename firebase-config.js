// ============================================================
//  FIREBASE KONFIGURATION
//  Ersetze die Werte unten mit deinen eigenen Firebase-Daten.
//  Wie du diese findest: siehe ANLEITUNG.md Schritt 2
// ============================================================

const firebaseConfig = {
    apiKey: "AIzaSyA840tD9x2Hk8-8sdmDv9NPcaOoa_wsaGs",
    authDomain: "pokemon-tracker-d5ab4.firebaseapp.com",
    projectId: "pokemon-tracker-d5ab4",
    storageBucket: "pokemon-tracker-d5ab4.firebasestorage.app",
    messagingSenderId: "434353639424",
    appId: "1:434353639424:web:ffcd6416a97e3bf7ec88e5"
};

// ============================================================
//  BENUTZER-KONFIGURATION
//  Trage hier die E-Mail-Adressen und Passwörter ein,
//  die du in Firebase Auth angelegt hast (Schritt 3).
//  Diese Datei ist NUR auf deinem Computer – niemals
//  öffentlich machen! (steht auch in .gitignore)
// ============================================================

// Welche Edition hat welcher Account?
const PLAYER_EDITIONS = {
  "gian@pokechamp.ch": "feuerrot",
  "luca@pokechamp.ch": "blattgruen"
};
