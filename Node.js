const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('votre_clé_secrète_stripe'); // Remplacez par votre clé secrète Stripe

const app = express();
app.use(bodyParser.json());

app.post('/charge', async (req, res) => {
    const { token, amount } = req.body;

    try {
        // Créer un paiement avec Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convertir en centimes
            currency: 'eur',
            payment_method: token,
            confirm: true,
        });

        // Envoyer l'image en cas de succès
        res.sendFile('/chemin/vers/votre_image.png'); 
    } catch (error) {
        console.error('Erreur lors du traitement du paiement:', error);
        res.status(500).send('Erreur lors du traitement du paiement');
    }
});

app.listen(3000, () => console.log('Serveur en écoute sur le port 3000'));
