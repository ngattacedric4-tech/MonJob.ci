-- Création de la table 'offres' pour stocker les offres d'emploi scrapées
CREATE TABLE offres (
    id SERIAL PRIMARY KEY,
    titre TEXT NOT NULL,
    lien TEXT NOT NULL,
    source TEXT NOT NULL,
    date_scraping TIMESTAMP DEFAULT NOW(),
    est_verifie BOOLEAN DEFAULT FALSE
);

-- Index pour améliorer les performances des requêtes
CREATE INDEX idx_offres_source ON offres(source);
CREATE INDEX idx_offres_est_verifie ON offres(est_verifie);