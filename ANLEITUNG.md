# 📖 ANLEITUNG – Pokémon Tracker einrichten

Folge diesen Schritten **in dieser Reihenfolge**. Das dauert insgesamt ca. 30–45 Minuten.

---

## SCHRITT 1 – Firebase Projekt erstellen

1. Gehe zu **https://console.firebase.google.com**
2. Klicke auf **„Projekt hinzufügen"**
3. Gib einen Namen ein, z.B. `pokemon-tracker`
4. Google Analytics: **deaktivieren** (brauchst du nicht)
5. Klicke **„Projekt erstellen"** und warte bis es fertig ist

---

## SCHRITT 2 – Web-App registrieren & Credentials holen

> **Was sind Credentials?**  
> Firebase ist ein Online-Dienst von Google. Damit deine Website weiß, *welches* Firebase-Projekt sie benutzen soll, braucht sie einen „Ausweis" – das sind die Credentials (API-Key, Project-ID usw.). Stell sie dir vor wie ein Benutzername+Passwort für deine App.

1. Im Firebase-Dashboard: Klicke auf das **`</>`** Symbol (Web-App hinzufügen)
2. App-Name eingeben: `pokemon-tracker-web`
3. **„Firebase Hosting"** NICHT ankreuzen
4. Klicke **„App registrieren"**
5. Du siehst jetzt einen Code-Block mit `firebaseConfig = { ... }` – **diese Seite offen lassen!**

---

## SCHRITT 3 – Zwei Benutzer anlegen

1. Im Firebase-Dashboard links: **Authentication** → **„Jetzt loslegen"**
2. Tab **„Sign-in-Methode"** → **E-Mail/Passwort** → Aktivieren → Speichern
3. Tab **„Benutzer"** → **„Benutzer hinzufügen"**
4. **Ersten Benutzer** anlegen (du selbst):
   - E-Mail: z.B. `spieler1@pokemon.local` (oder deine echte E-Mail)
   - Passwort: mind. 6 Zeichen, z.B. `Pikachu25`
5. **Zweiten Benutzer** anlegen (dein Bruder):
   - E-Mail: z.B. `spieler2@pokemon.local`
   - Passwort: z.B. `Glumanda99`

> **Wichtig:** Merke dir diese Login-Daten gut – ihr braucht sie zum Einloggen auf der Website.

---

## SCHRITT 4 – Firestore Datenbank erstellen

> **Was ist Firestore?**  
> Das ist die Datenbank wo alle eure Spielstände, Pokédex-Einträge usw. gespeichert werden. Stell dir vor es ist wie eine riesige Excel-Tabelle in der Cloud.

1. Im Firebase-Dashboard links: **Firestore Database** → **„Datenbank erstellen"**
2. Wähle **„In Produktionsmodus starten"**
3. Serverstandort: Wähle **`eur3 (europe-west)`** (für Schweiz am nächsten)
4. Klicke **„Aktivieren"** und warte kurz

---

## SCHRITT 5 – Sicherheitsregeln einstellen

> Das ist der **wichtigste Schritt** damit keine Fremden auf eure Daten zugreifen können!

1. In Firestore: Klicke auf Tab **„Regeln"**
2. Du siehst bereits Text im Editor – **alles löschen**
3. Öffne die Datei `firestore.rules` aus dem Projekt-Ordner
4. Kopiere den **gesamten Inhalt** und füge ihn in den Firebase-Editor ein
5. Klicke **„Veröffentlichen"**

**Was machen diese Regeln?**
- Nur eingeloggte Benutzer (ihr zwei) können überhaupt Daten lesen/schreiben
- Deine Ziele kann nur du selbst sehen
- Dein Profil kann nur du selbst bearbeiten
- Duelle und Tauschbörse sehen beide

---

## SCHRITT 6 – Credentials in die Datei eintragen

1. Öffne die Datei `firebase-config.js` in einem Texteditor (z.B. VS Code, Notepad++)
2. Gehe zurück zum Firebase-Dashboard Tab aus **Schritt 2**
3. Kopiere jeden Wert in die richtige Zeile:

```
apiKey:            → apiKey im Firebase-Code
authDomain:        → authDomain im Firebase-Code
projectId:         → projectId im Firebase-Code
storageBucket:     → storageBucket im Firebase-Code
messagingSenderId: → messagingSenderId im Firebase-Code
appId:             → appId im Firebase-Code
```

4. Trage deine E-Mail-Adressen bei `PLAYER_EDITIONS` ein:
```js
const PLAYER_EDITIONS = {
  "spieler1@pokemon.local": "feuerrot",   // deine E-Mail → deine Edition
  "spieler2@pokemon.local": "blattgruen"  // E-Mail deines Bruders → seine Edition
};
```

5. Datei **speichern**

---

## SCHRITT 7 – Auf GitHub hochladen

> **Was ist GitHub Pages?**  
> GitHub ist eine Plattform zum Speichern von Code. GitHub Pages ist ein kostenloser Hosting-Service – deine HTML-Dateien werden direkt aus GitHub als Website zugänglich gemacht.

### 7a – Repository erstellen
1. Gehe zu **https://github.com** und melde dich an
2. Klicke oben rechts auf **„+"** → **„New repository"**
3. Name: `pokemon-tracker`
4. Sichtbarkeit: **Private** (wichtig – so sieht niemand deinen Code!)
5. Klicke **„Create repository"**

### 7b – Dateien hochladen
1. Im neuen Repository: Klicke **„uploading an existing file"**
2. Ziehe **alle** Dateien aus dem `pokemon-tracker` Ordner hinein, **AUSSER:**
   - `firebase-config.js` ❌ (enthält geheime Keys!)
3. Commit-Nachricht: `Erster Upload`
4. Klicke **„Commit changes"**

> **Warum firebase-config.js nicht hochladen?**  
> Diese Datei enthält deinen API-Key. Wer diesen Key kennt, könnte theoretisch auf deine Datenbank zugreifen. Deshalb bleibt sie NUR auf deinem Computer. Wenn du den Tracker auf einem anderen Gerät nutzen willst, musst du die Datei manuell kopieren.

### 7c – GitHub Pages aktivieren
1. Im Repository: Klicke auf **„Settings"** (Zahnrad oben)
2. Links im Menü: **„Pages"**
3. Unter „Source": Wähle **„Deploy from a branch"**
4. Branch: **`main`** / Folder: **`/ (root)`**
5. Klicke **„Save"**
6. Warte 1–2 Minuten, dann erscheint eine URL wie:  
   `https://dein-username.github.io/pokemon-tracker/`

### 7d – firebase-config.js direkt auf GitHub hochladen
Da die Datei mit deinen Credentials NICHT per normalen Upload hochgeladen wird, hast du zwei Optionen:

**Option A (empfohlen):** Direkt im Browser auf GitHub
1. Gehe in dein Repository
2. Klicke **„Add file"** → **„Create new file"**
3. Dateiname: `firebase-config.js`
4. Füge den Inhalt deiner lokalen `firebase-config.js` ein
5. Klicke **„Commit changes"** – wähle dabei **„Commit directly to main branch"**

**Option B:** Falls du Git installiert hast, kannst du auch git verwenden – aber Option A ist einfacher.

---

## SCHRITT 8 – Erste Anmeldung

1. Öffne deine GitHub Pages URL im Browser
2. Melde dich mit deiner E-Mail + Passwort (aus Schritt 3) an
3. Du wirst zur **Einrichtungsseite** weitergeleitet
4. Wähle: Edition, Trainer-Name, Starter-Pokémon
5. Fertig! Das Dashboard öffnet sich automatisch

Schicke deinem Bruder die URL + seinen Login (E-Mail + Passwort) per Nachricht.

---

## SCHRITT 9 – Firestore Indizes einrichten (wichtig!)

Wenn ihr anfangt, Duelle und Ziele einzutragen, braucht Firestore sog. **Indizes** für komplexere Abfragen. Firebase erstellt diese automatisch wenn du den Link aus der Browser-Konsole folgst.

So gehts:
1. Öffne die Website und gehe auf die **Duelle**-Seite
2. Öffne die Browser-Entwicklerkonsole (Taste `F12` → Tab „Konsole")
3. Falls ein roter Fehler mit einem Link erscheint → klicke den Link
4. Bestätige den Index in Firebase
5. Warte 1–2 Minuten, dann neu laden

Das gleiche ggf. für **Ziele** und **Tauschbörse**.

---

## Zusammenfassung – Sicherheit

| Was | Wer kann es sehen? |
|-----|-------------------|
| Dashboard (Stats beider Spieler) | Beide (ihr zwei) |
| Pokédex-Einträge | Nur du selbst |
| Spielnotizen | Nur du selbst |
| Duelle | Beide |
| Tauschbörse | Beide |
| Ziele | Nur du selbst |
| firebase-config.js | Nur du (auf deinem Computer) |
| Repository | Privat – niemand außer euch |

---

## Häufige Probleme

**„Permission denied" Fehler:**  
→ Sicherheitsregeln (Schritt 5) nochmal kopieren und veröffentlichen

**Login funktioniert nicht:**  
→ Credentials in firebase-config.js prüfen (kein Copy-Fehler?)

**Seite lädt, aber nichts erscheint:**  
→ Browser-Konsole (F12) auf rote Fehler prüfen

**GitHub Pages zeigt 404:**  
→ Warte 5 Minuten, dann neu laden. Manchmal dauert die erste Aktivierung etwas länger.
