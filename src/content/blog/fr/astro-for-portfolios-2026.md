---
title: "Pourquoi ce portfolio utilise Astro"
description: "Des pages statiques, du Markdown et un peu de JavaScript : les choix derrière ce site."
date: 2026-02-15
updated: 2026-10-08
locale: fr
translationKey: astro-for-portfolios-2026
tags: ["Astro", "Web"]
draft: false
---

Ce site a un rôle simple : présenter mon travail, montrer quelques projets et permettre de me joindre. Son contenu est surtout du texte. Un site statique convient donc bien à ce besoin.

## Les pages d'abord

Astro génère les pages à l'avance. Le navigateur reçoit le contenu en HTML, le CSS pour la mise en page et un peu de JavaScript pour les interactions, comme le choix du thème et la navigation.

La distinction utile est celle entre lire et interagir. Lire un article ou suivre le lien d'un projet devrait fonctionner sans attendre le démarrage d'une application. Les éléments interactifs peuvent rester légers.

## Le contenu à côté du code

Les articles et les descriptions de projets sont conservés dans des fichiers Markdown. Chacun contient des champs structurés pour le titre, la description, la langue et les autres métadonnées. Les collections de contenu d'Astro vérifient ces champs à la compilation.

Pour un site de cette taille, modifier un fichier suffit. Il n'y a ni interface de publication distincte ni base de données à entretenir. Une équipe de rédaction plus importante aurait d'autres besoins.

## Trois langues, des pages distinctes

L'anglais, le français et l'arabe ont chacun leurs propres pages. Le sélecteur de langue mène à la page équivalente, et la version arabe se lit de droite à gauche. Conserver les traductions dans les fichiers de contenu permet de réviser les textes avec le reste du site.

Traduire ne se limite pas aux libellés de navigation. Les titres, les descriptions, les dates, les libellés d'accessibilité et l'ordre de lecture demandent aussi de l'attention.

## Une structure volontairement simple

Astro convient à ce site parce que le contenu change occasionnellement et que les visiteurs viennent surtout pour lire. Je n'ai pas besoin de la même architecture que pour une application avec authentification et données en temps réel.

L'objectif est simple : un site agréable à lire, facile à mettre à jour et rapide à ouvrir. Le framework y contribue, mais le contenu et les détails restent à soigner.
