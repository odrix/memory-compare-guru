import React from 'react';

const WelcomePart = () => {
  return (
    <div className="p-4 text-left bg-gray-100 rounded-md shadow-md mt-4 max-w-4xl mx-auto">
      <p className="text-xl font-bold mb-2">
        Bienvenue sur TopDisks.eu : Votre Guide Ultime pour Choisir le Meilleur Disque Dur
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-3">
        Pourquoi Choisir le Bon Disque Dur Est Crucial ?
      </h2>
      <p className="text-sm mb-2">
        Dans le monde numérique d'aujourd'hui, le stockage de données est essentiel pour tout le monde, des professionnels aux amateurs de jeux vidéo. Que vous ayez besoin de sauvegarder des fichiers importants, d'améliorer les performances de votre PC, ou de stocker des médias volumineux, choisir le bon disque dur peut faire toute la différence.
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-3">
        Types de Disques Durs : SSD, HDD, et Plus
      </h2>
      <ul className="text-sm mb-2 list-disc list-inside">
        <li>
          <strong>SSD (Solid State Drive)</strong> : Idéal pour des vitesses de lecture et d'écriture rapides, parfait pour les jeux vidéo et le montage vidéo.
        </li>
        <li>
          <strong>HDD (Hard Disk Drive)</strong> : Offre une grande capacité de stockage à un coût abordable, adapté pour les sauvegardes et le stockage de masse.
        </li>
        <li>
          <strong>Disques Durs Hybrides (SSHD)</strong> : Combine les avantages des SSD et des HDD pour un équilibre entre performance et capacité.
        </li>
      </ul>
      <h2 className="text-lg font-semibold mt-6 mb-3">
        Comment Utiliser Notre Comparateur de Disques Durs
      </h2>
      <p className="text-sm mb-2">
        Notre tableau comparatif interactif vous permet de filtrer et de comparer les meilleurs disques durs disponibles sur le marché. Voici comment l'utiliser :
      </p>
      <ul className="text-sm mb-2 list-disc list-inside">
        <li>
          <strong>Filtres de Recherche</strong> : Utilisez les filtres pour affiner votre recherche par type de disque dur (SSD, HDD, SSHD), capacité de stockage, vitesse de lecture/écriture, et plus encore.
        </li>
        <li>
          <strong>Comparaison Directe</strong> : Comparez les spécifications côte à côte pour trouver le disque dur qui répond le mieux à vos besoins.
        </li>
        <li>
          <strong>Avis et Évaluations</strong> : Consultez les avis des utilisateurs et les évaluations pour faire un choix éclairé.
        </li>
      </ul>
      <h2 className="text-lg font-semibold mt-6 mb-3">
        Articles et Guides pour Vous Aider
      </h2>
      <p className="text-sm mb-2">
        En plus de notre comparateur, nous proposons une série d'articles et de guides pour vous aider à mieux comprendre les différents types de disques durs et à faire le meilleur choix :
      </p>
      <ul className="text-sm mb-2 list-disc list-inside">
        <li>
          <strong>Guide d'achat</strong> : Comment choisir le meilleur disque dur externe en 2025
        </li>
        <li>
          <strong>SSD vs HDD</strong> : Quelle est la différence et lequel choisir ?
        </li>
        <li>
          <strong>Les meilleurs disques durs internes</strong> pour améliorer les performances de votre PC
        </li>
      </ul>
      <h2 className="text-lg font-semibold mt-6 mb-3">
        Pourquoi Nous Faire Confiance ?
      </h2>
      <p className="text-sm mb-2">
        Nous sommes passionnés par la technologie et nous nous engageons à fournir des informations précises et à jour. Notre équipe d'experts teste et évalue chaque produit pour vous offrir des recommandations fiables.
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-3">
        Commencez Votre Recherche Dès Maintenant !
      </h2>
      <p className="text-sm">
        Utilisez notre comparateur de disques durs pour trouver le modèle parfait pour vos besoins. Que vous soyez un professionnel, un gamer, ou un utilisateur occasionnel, nous avons ce qu'il vous faut.
      </p>
    </div>
  );
};

export default WelcomePart;