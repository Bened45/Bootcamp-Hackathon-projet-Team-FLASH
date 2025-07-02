document.getElementById('vaccineForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    vaccin: this.vaccin.value,
    date: this.date.value,
    expiredate: this.expiredate.value,
    npi: this.npi.value,
  };

  
  try {
    const response = await fetch('http://127.0.0.1:8000/add_vaccine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.qrData) {
      afficherCertificat(result);
    } else {
      alert('Erreur : ' + (result.message || 'Signature manquante'));
    }
  } catch (error) {
    alert('Erreur de connexion au serveur.');
  }
});

function afficherCertificat(result) {
  const form = document.getElementById('vaccineForm');
  form.style.display = 'none';

  const container = document.createElement('div');
  container.className = 'card';
  container.innerHTML = `
    <h2>Certificat signé</h2>
    <canvas id="qrCode"></canvas>
    <p style="font-size: 0.85rem; word-wrap: break-word;">
      <strong>Signature :</strong><br>${result.signature}
    </p>
    <button class="btn" onclick="window.print()">Imprimer</button>
  `;
  document.body.querySelector('main').appendChild(container);

  QRCode.toCanvas(document.getElementById('qrCode'), result.qrData, { width: 200 }, function (error) {
    if (error) console.error(error);
  });
}
async function enregistrerPatient(data) {
  try {
    const response = await fetch('http://127.0.0.1:8000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token') // si authentification
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Erreur lors de l’enregistrement');
    }

    return result; // contient probablement l'ID ou les infos du patient
  } catch (err) {
    console.error(err);
    alert('Erreur : ' + err.message);
    return null;
  }
}