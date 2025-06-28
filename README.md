# Bootcamp-Hackathon-projet-Team-FLASH
 Carnet de Vaccination Numérique - Prototype Web

Un projet innovant qui utilise des **signatures cryptographiques vérifiables** pour prouver l’authenticité des vaccins sans base de données centrale, en s’appuyant sur une infrastructure légère, privée et sécurisée.

---

 Objectif du Projet

Permettre à chaque patient de présenter une **preuve infalsifiable de vaccination** (par exemple contre le COVID-19) via un **QR code numérique** stocké localement, vérifiable instantanément à l’aide d’un simple appareil connecté (ordinateur ou smartphone) **sans identifiant ni connexion**.

---

 Architecture du Prototype

 1. 🧕‍♂️ Interface Patient (`mon-carnet.html` à venir)

* Affiche un **QR code personnel**
* Données stockées en local (dans le navigateur)
* QR mis à jour après vaccination par le centre de santé (via scan)
* Animation de chargement + bouton de rafraîchissement

 2. 🕵️ Interface Vérificateur (`verificateur.html`)

* Scan automatique de QR via webcam
* Vérification cryptographique via `bitcoinjs-lib`
* Support d’entrée manuelle JSON (en cas de problème de scan)
* Historique local (avec couleurs ✅/❌)
* Export en **PDF** ou **JSON**
* Sauvegarde automatique + effacement possible

---

 Sécurité et Vie Privée

*  Aucun identifiant requis
*  Pas de base de données centrale
*  QR code signé uniquement par des **centres de santé autorisés**
*  Les données restent **locales** sur le téléphone de l’utilisateur

---

 Technologies utilisées

* **Frontend** : HTML, CSS, Vanilla JS
* **Librairies** :

  * `bitcoinjs-lib` pour la signature/verif ECDSA
  * `html5-qrcode` pour le scan caméra
  * `jspdf` pour l’export PDF
* **Backend (par l’autre équipe)** : Python (signature et génération des QR)

---

## 🔧 Installation locale

Pas besoin de serveur complexe, un simple serveur statique suffit :

```bash
# Exemples :
npx serve .
# ou
python3 -m http.server
```

Puis ouvrir :

* `http://localhost:8000/mon-carnet.html`
* `http://localhost:8000/verificateur.html`

---

## 📄 Exemple de QR code JSON

```json
{
  "patient_key": "02abc123...",
  "vaccin": "Covid-19",
  "date": "2025-06-27",
  "centre_signature": "3045abcd...",
  "centre_key": "03def456..."
}
```

---

##  Prochaines étapes

* Déploiement sur `https://vaccin.bj`
* Intégration backend (signature, gestion des centres)
* UX mobile et accessibilité
* QR code dynamique après signature
