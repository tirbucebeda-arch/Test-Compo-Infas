# Quiz Révision (site web simple)

Un petit site de quiz **hors-ligne** (HTML/CSS/JavaScript) pour réviser entre étudiants.

## Lancer le site

1. Ouvre le dossier `quiz-revision`
2. Double-clique sur `index.html` (ou clic droit → Ouvrir avec → Chrome/Firefox/Edge)

## Ajouter / modifier des questions

Ouvre `questions.js` et modifie le tableau `window.QUIZ_QUESTIONS`.

### Exemple QCM

```js
{
  id: "mon-id-1",
  category: "Ma matière",
  type: "mcq",
  question: "Ma question ?",
  choices: ["A", "B", "C", "D"],
  answerIndex: 2,
  explanation: "Pourquoi la réponse est C (optionnel).",
}
```

### Exemple Vrai/Faux

```js
{
  id: "mon-id-2",
  category: "Ma matière",
  type: "tf",
  question: "Vrai ou faux : ...",
  answer: true,
  explanation: "Explication (optionnel).",
}
```

## Fichiers

- `index.html` : page du site
- `style.css` : design
- `questions.js` : banque de questions
- `app.js` : logique du quiz

