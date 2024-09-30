import { useState, useEffect } from "react";

// Fonction utilitaire pour obtenir une valeur depuis le localStorage
function getStorageValue(key, defaultValue) {
  // Récupère la valeur associée à la clé du localStorage
  let saved = localStorage.getItem(key) || "";

  // Si la valeur commence par { ou [, il s'agit probablement d'un JSON, donc on la parse
  if (saved.startsWith("{") || saved.startsWith("[")) saved = JSON.parse(saved);

  // Retourne la valeur trouvée ou la valeur par défaut
  return saved || defaultValue;
}

// Hook personnalisé pour gérer la persistance des données dans le localStorage
const useLocalStorage = (key, defaultValue) => {
  // Initialise l'état avec la valeur stockée dans le localStorage ou la valeur par défaut
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

  // Effet pour mettre à jour le localStorage lorsque l'état change
  useEffect(() => {
    // Convertit la valeur en chaîne JSON si c'est un objet, sinon laisse la valeur telle quelle
    const storedVal = typeof value === "object" ? JSON.stringify(value) : value;
    // Stocke la valeur dans le localStorage
    localStorage.setItem(key, storedVal);
  }, [value, key]); // Dépendances : l'effet s'exécute lorsque `value` ou `key` change

  // Retourne la valeur et la fonction pour la mettre à jour
  return [value, setValue];
};

export default useLocalStorage;
