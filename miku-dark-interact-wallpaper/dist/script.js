document.addEventListener('DOMContentLoaded', () => {
    const spotlight = document.getElementById('spotlight');
    
    // Variables pour la position actuelle du spot (spotX, spotY)
    // et la position cible (sourisX, sourisY)
    let spotX = window.innerWidth / 2;
    let spotY = window.innerHeight / 2;
    let sourisX = spotX;
    let sourisY = spotY;

    // *** FACTEUR D'ÉLASTICITÉ (LISSAGE) ***
    // Plus le chiffre est petit (ex: 0.08), plus l'effet est élastique (lent à rattraper la souris).
    // Valeur par défaut : 0.15
    const lissage = 0.15; 

    // 1. Mise à jour de la position cible lors du mouvement de la souris
    document.addEventListener('mousemove', (e) => {
        sourisX = e.clientX;
        sourisY = e.clientY;
    });

    // 2. Fonction de mise à jour du mouvement lissé (l'effet élastique)
    function animerLampeTorche() {
        // --- Calcul de l'effet Élastique ---
        // On ne se déplace que d'une fraction (lissage) de la distance restante
        const dx = sourisX - spotX;
        const dy = sourisY - spotY;

        spotX += dx * lissage;
        spotY += dy * lissage;

        // --- Conversion en pourcentage pour les variables CSS (pour le 'left' et 'top') ---
        const spotPositionX = (spotX / window.innerWidth) * 100;
        const spotPositionY = (spotY / window.innerHeight) * 100;

        // Application de la nouvelle position aux variables CSS (pour mettre à jour le div #spotlight)
        spotlight.style.setProperty('--spot-x', `${spotPositionX}%`);
        spotlight.style.setProperty('--spot-y', `${spotPositionY}%`);

        // Demande au navigateur d'appeler cette fonction à la prochaine trame (frame)
        requestAnimationFrame(animerLampeTorche);
    }

    // Démarre l'animation
    animerLampeTorche();
});