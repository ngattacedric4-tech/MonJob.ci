#!/usr/bin/env python3
"""
Script pour scraper les offres d'emploi depuis les sites mentionnés.
"""

import requests
from bs4 import BeautifulSoup
import os
from supabase import create_client, Client

# Initialiser le client Supabase
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def scrape_emploi_ci():
    """Scrape les offres depuis emploi.ci"""
    url = "https://www.emploi.ci"
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        offres = []
        
        # Exemple : Extraire les titres et liens des offres
        for offre in soup.find_all('div', class_='offre'):
            titre = offre.find('h2').text.strip()
            lien = offre.find('a')['href']
            offres.append({
                "titre": titre,
                "lien": lien,
                "source": "emploi.ci",
                "est_verifie": False
            })
        
        return offres
    except Exception as e:
        print(f"Erreur lors du scraping de emploi.ci : {e}")
        return []


def scrape_stage_ci():
    """Scrape les offres depuis stage.ci"""
    url = "https://www.stage.ci"
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        offres = []
        
        # Exemple : Extraire les titres et liens des offres
        for offre in soup.find_all('div', class_='stage'):
            titre = offre.find('h2').text.strip()
            lien = offre.find('a')['href']
            offres.append({
                "titre": titre,
                "lien": lien,
                "source": "stage.ci",
                "est_verifie": False
            })
        
        return offres
    except Exception as e:
        print(f"Erreur lors du scraping de stage.ci : {e}")
        return []


def inserer_offres_dans_supabase(offres):
    """Insérer les offres dans la table Supabase"""
    for offre in offres:
        supabase.table("offres").insert(offre).execute()


def main():
    """Exécuter le scraping et insérer les offres dans Supabase"""
    offres_emploi_ci = scrape_emploi_ci()
    offres_stage_ci = scrape_stage_ci()
    
    toutes_offres = offres_emploi_ci + offres_stage_ci
    
    if toutes_offres:
        inserer_offres_dans_supabase(toutes_offres)
        print(f"{len(toutes_offres)} offres ont été insérées dans Supabase.")
    else:
        print("Aucune offre trouvée.")


if __name__ == "__main__":
    main()