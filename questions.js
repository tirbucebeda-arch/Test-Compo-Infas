/**
 * Banque de questions
 * - Tu peux ajouter/supprimer des objets dans ce tableau.
 * - Format QCM:
 *   { id, level, subject, topic?, type:"mcq", question, choices:[...], answerIndex:0..n-1, explanation? }
 * - Format Vrai/Faux:
 *   { id, level, subject, topic?, type:"tf", question, answer:true/false, explanation? }
 * - topic (optionnel) : doit correspondre à un sujet défini dans sujets.js pour la matière (ex: "Sujet 1", "Sujet 2", "Sujet examen")
 */

window.QUIZ_QUESTIONS = [
  // --- Gabarit INFAS (à compléter) ---
  {
    id: "infas-a1-ped-1",
    level: "Auxiliaire 1 année",
    subject: "Pédiatrie",
    type: "mcq",
    question: "Exemple (à remplacer) : Quel est l’objectif principal de la prise en charge en pédiatrie ?",
    choices: [
      "Option A (à compléter)",
      "Option B (à compléter)",
      "Option C (à compléter)",
      "Option D (à compléter)",
    ],
    answerIndex: 0,
    explanation:
      "Remplace cet exemple par une vraie question/correction de votre cours (vous pouvez aussi supprimer cet item).",
  },
  {
    id: "infas-a1-sp-1",
    level: "Auxiliaire 1 année",
    subject: "Santé Publique",
    type: "tf",
    question: "Exemple (à remplacer) : La prévention primaire vise à éviter l’apparition d’une maladie.",
    answer: true,
    explanation: "Remplace/ajuste selon votre cours (ici c’est un exemple de format Vrai/Faux).",
  },
  {
    id: "infas-a1-chir-1",
    level: "Auxiliaire 1 année",
    subject: "Chirurgie",
    type: "mcq",
    question: "Exemple (à remplacer) : Avant un geste chirurgical, quel document est indispensable ?",
    choices: ["Option A (à compléter)", "Option B (à compléter)", "Option C (à compléter)"],
    answerIndex: 0,
  },
  {
    id: "infas-a1-med-1",
    level: "Auxiliaire 1 année",
    subject: "Médecine",
    type: "tf",
    question: "Exemple (à remplacer) : La fièvre est toujours un signe d’infection bactérienne.",
    answer: true,
    explanation: "Exemple uniquement (à corriger/remplacer selon vos cours).",
  },
  {
    id: "infas-l1-ide-sfm-ped-1",
    level: "Licence 1 IDE/SFM",
    subject: "Pédiatrie",
    type: "mcq",
    question: "Exemple (à remplacer) : En pédiatrie, quel paramètre est prioritaire à surveiller ?",
    choices: ["Option A (à compléter)", "Option B (à compléter)", "Option C (à compléter)"],
    answerIndex: 0,
  },

  {
    id: "infas-l2-ide-sfm-sp-1",
    level: "Licence 2 IDE/SFM",
    subject: "Santé Publique",
    type: "mcq",
    question: "Exemple (à remplacer) : Quel indicateur est le plus utilisé pour suivre la mortalité ?",
    choices: ["Option A (à compléter)", "Option B (à compléter)", "Option C (à compléter)"],
    answerIndex: 0,
  },
  {
    id: "infas-l3-chir-2024-1",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    topic: "Sujet 1",
    type: "tf",
    question: "L'hématome sous-dural est un épanchement de sang dans l'espace sous-dural.",
    answer: true,
    explanation:
      "L'hématome sous-dural est une collection de sang située entre la dure-mère et l'arachnoïde, dans l'espace sous-dural.",
  },
  {
    id: "infas-l3-chir-2024-2",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    topic: "Sujet 1",
    type: "tf",
    question:
      "Une lésion du nerf récurrent entraînant un trouble phonique peut s'intégrer dans un tableau de souffrance respiratoire.",
    answer: true,
    explanation:
      "Le nerf récurrent innerve les muscles du larynx. Sa lésion entraîne une paralysie des cordes vocales (trouble phonique) pouvant provoquer une détresse respiratoire par obstruction.",
  },
  {
    id: "infas-l3-chir-2024-3",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question: "L'attitude de DESSAULT est celle de tout blessé présentant une impotence fonctionnelle absolue.",
    answer: false,
    explanation:
      "L'attitude de DESSAULT est une position caractéristique du blessé présentant une fracture du fémur : membre inférieur en rotation externe, raccourci et impotent.",
  },
  {
    id: "infas-l3-chir-2024-4",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    topic: "Sujet 2",
    type: "tf",
    question:
      "Le phlegmon est l'infection des étuis digitaux de la main par des germes pathogènes.",
    answer: false,
    explanation:
      "Le phlegmon est une infection diffusée des gaines synoviales des tendons fléchisseurs de la main. L'infection localisée des étuis digitaux correspond au panaris.",
  },
  {
    id: "infas-l3-chir-2024-5",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question:
      "La cryptorchidie est l'épanchement liquidien séreux entre les deux feuillets de la vaginale.",
    answer: false,
    explanation:
      "La cryptorchidie est l'absence d'un ou des deux testicules dans les bourses (testicule non descendu). L'épanchement liquidien dans la vaginale est l'hydrocèle.",
  },
  {
    id: "infas-l3-chir-2024-6",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question:
      "La radiographie de la tête osseuse est l'examen de confirmation de l'hématome sous-dural.",
    answer: false,
    explanation:
      "L'examen de confirmation de l'hématome sous-dural est le scanner cérébral (TDM) ou l'IRM. La radiographie standard ne visualise pas directement les hématomes.",
  },
  {
    id: "infas-l3-chir-2024-7",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question:
      "L'hémoculture pratiquée en cas de septicémie montre une hyperleucocytose à polynucléaires éosinophiles.",
    answer: false,
    explanation:
      "L'hémoculture recherche la présence de germes dans le sang. L'hyperleucocytose (NFS) est habituellement à polynucléaires neutrophiles, non éosinophiles.",
  },
  {
    id: "infas-l3-chir-2024-8",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question:
      "L'embarrure est une fracture complète de la voûte crânienne par enfoncement.",
    answer: true,
    explanation:
      "L'embarrure est une fracture du crâne avec enfoncement d'un fragment osseux vers l'intérieur de la boîte crânienne.",
  },
  {
    id: "infas-l3-chir-2024-9",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question: "La tétraplégie est la paralysie des seuls membres inférieurs.",
    answer: false,
    explanation:
      "La tétraplégie est la paralysie des quatre membres (supérieurs et inférieurs). La paralysie des seuls membres inférieurs correspond à la paraplégie.",
  },
  {
    id: "infas-l3-chir-2024-10",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question: "La paraplégie est la paralysie des deux membres inférieurs.",
    answer: true,
    explanation:
      "La paraplégie est la paralysie des deux membres inférieurs, intéressant la partie inférieure du corps.",
  },
  {
    id: "infas-l3-chir-2024-11",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question: "La moelle épinière se termine au niveau du bord supérieur de L2.",
    answer: false,
    explanation:
      "Chez l'adulte, la moelle épinière se termine au niveau du bord inférieur de L1 ou du disque L1-L2 (cône médullaire).",
  },
  {
    id: "infas-l3-chir-2024-12",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question: "Le myosis correspond à la dilatation du diamètre de la pupille.",
    answer: false,
    explanation:
      "Le myosis est la contraction (diminution du diamètre) de la pupille. La dilatation de la pupille est la mydriase.",
  },
  {
    id: "infas-l3-chir-2024-13",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question:
      "L'infection au bacille de Koch est une cause fréquente de l'abcès froid.",
    answer: true,
    explanation:
      "L'abcès froid est caractéristique de la tuberculose (bacille de Koch) et évolue sans les signes inflammatoires classiques.",
  },
  {
    id: "infas-l3-chir-2024-14",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question:
      "L'autoclave est utilisé pour la stérilisation des tenues et champs opératoires.",
    answer: true,
    explanation:
      "L'autoclave utilise la vapeur d'eau sous pression pour stériliser le matériel thermorésistant, notamment les champs et blouses opératoires.",
  },
  {
    id: "infas-l3-chir-2024-15",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question:
      "La pie-mère fait partie des trois enveloppes qui recouvrent le parenchyme cérébral.",
    answer: true,
    explanation:
      "Les trois méninges sont la dure-mère (externe), l'arachnoïde (moyenne) et la pie-mère (interne, adhérente au cerveau).",
  },
  {
    id: "infas-l3-chir-2024-16",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question:
      "La stérilisation des champs opératoires et des blouses opératoires se fait à l'aide d'une Poupinel.",
    answer: false,
    explanation:
      "Le Poupinel (four Pasteur) est un stérilisateur à chaleur sèche pour le matériel métallique. Les champs et blouses se stérilisent à l'autoclave.",
  },
  {
    id: "infas-l3-chir-2024-17",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question:
      "La fracture de Pouteau-Colles est une fracture de l'extrémité distale ou juxta-articulaire du radius.",
    answer: true,
    explanation:
      "La fracture de Pouteau-Colles est une fracture de l'extrémité inférieure du radius, à 2–3 cm de l'articulation du poignet, avec déplacement postérieur.",
  },
  {
    id: "infas-l3-chir-2024-18",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question:
      "En cas de plastron appendiculaire, il faut réaliser un drainage chirurgical immédiat.",
    answer: false,
    explanation:
      "Le plastron appendiculaire se traite en première intention médicalement (antibiotiques, surveillance) sans drainage immédiat, contrairement à l'abcès appendiculaire.",
  },
  {
    id: "infas-l3-chir-2024-19",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question:
      "Le rachis dorsal et le sacrum totalisent 19 vertèbres.",
    answer: false,
    explanation:
      "Le rachis dorsal comprend 12 vertèbres et le sacrum 5 vertèbres soudées, soit 17 au total, et non 19.",
  },
  {
    id: "infas-l3-chir-2024-20",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "tf",
    question:
      "Un abcès froid se constitue sans les signes cardinaux de l'inflammation (douleur, chaleur, rougeur, tuméfaction).",
    answer: true,
    explanation:
      "L'abcès froid, typiquement tuberculeux, évolue sans les signes inflammatoires classiques, d'où son nom.",
  },
  {
    id: "infas-l3-chir-2024-21",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    topic: "Sujet 1",
    type: "mcq",
    question:
      "Dans un syndrome abdominal avec hyperleucocytose très élevée, quelle pathologie doit être fortement suspectée ?",
    choices: [
      "Une appendicite",
      "Une occlusion",
      "Une péritonite",
      "Une gastro-entérite",
    ],
    answerIndex: 2,
    explanation:
      "Une hyperleucocytose importante oriente vers une infection sévère comme la péritonite.",
  },
  {
    id: "infas-l3-chir-2024-22",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq",
    question:
      "Une tuméfaction indolente du scrotum de taille moyenne avec épreuve de la lampe torche positive évoque en premier lieu :",
    choices: [
      "Une hernie inguino-scrotale",
      "Une tumeur du scrotum",
      "Une hydrocèle vaginale",
    ],
    answerIndex: 2,
    explanation:
      "L'hydrocèle est une collection liquidienne dans la vaginale. La transillumination (lampe torche) est positive, contrairement à la hernie ou la tumeur.",
  },
  {
    id: "infas-l3-chir-2024-23",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq",
    question:
      "Les fractures du tiers moyen de la clavicule peuvent entraîner les complications suivantes, sauf une. Laquelle ?",
    choices: [
      "Une lésion du plexus brachial",
      "Une lésion des vaisseaux axillaires",
      "Une lésion de l'œsophage",
    ],
    answerIndex: 2,
    explanation:
      "Les fractures de la clavicule peuvent léser le plexus brachial et les vaisseaux axillaires, mais l'œsophage est trop profond et médian pour être atteint.",
  },
  {
    id: "infas-l3-chir-2024-24",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq",
    question:
      "La notion d'« intervalle libre » correspond à :",
    choices: [
      "Le temps écoulé depuis le traumatisme jusqu'au début des premiers soins",
      "Le temps écoulé entre l'heure exacte du traumatisme et l'apparition des signes",
      "Le temps passé pendant l'hospitalisation du patient",
      "Le temps mis par les secours pour arriver sur les lieux de l'accident",
      "L'heure du décès",
    ],
    answerIndex: 1,
    explanation:
      "L'intervalle libre est la période asymptomatique entre un traumatisme crânien et l'apparition des signes neurologiques (évoquant un hématome extra-dural).",
  },
  {
    id: "infas-l3-chir-2024-25",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq",
    question:
      "À quel niveau lésionnel peut-on retrouver une paralysie diaphragmatique ?",
    choices: ["C3 - C4", "C5 - C6", "C6 - C7", "Aucun", "ABC sont vraies"],
    answerIndex: 0,
    explanation:
      "Le nerf phrénique, qui innerve le diaphragme, naît principalement de C3 et C4 (et C5). Une lésion à ce niveau peut entraîner une paralysie diaphragmatique.",
  },
  {
    id: "infas-l3-chir-2024-26",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq",
    question:
      "Selon la table de LUND et BROWDER, la surface corporelle brûlée dans la situation décrite est :",
    choices: ["12%", "15,5%", "12,5%", "15%"],
    answerIndex: 1,
    explanation:
      "Dans l'énoncé de référence, la réponse attendue est 15,5 % (même si le calcul détaillé peut sembler discutable).",
  },
  {
    id: "infas-l3-chir-2024-27",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq",
    question:
      "Selon la règle de Baxter (4 ml × poids × % surface brûlée), la quantité de soluté à perfuser en 24 heures pour un patient de 70 kg brûlé à 12 % est :",
    choices: ["1680 ml", "3500 ml", "3360 ml", "1750 ml"],
    answerIndex: 2,
    explanation:
      "4 × 70 × 12 = 3360 ml sur 24 heures selon la règle de Baxter.",
  },
  {
    id: "infas-l3-chir-2024-28",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq",
    question:
      "Les complications suivantes sont des complications secondaires des fractures, sauf une. Laquelle ?",
    choices: [
      "Retard de consolidation",
      "Déplacements secondaires locaux",
      "Lésions nerveuses",
    ],
    answerIndex: 2,
    explanation:
      "Les lésions nerveuses sont des complications immédiates (précoces) de la fracture, alors que le retard de consolidation et les déplacements secondaires sont des complications secondaires.",
  },
  {
    id: "infas-l3-chir-2024-29",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq",
    question:
      "Le délai habituel de consolidation d'une fracture des deux os de l'avant-bras chez l'adulte est de :",
    choices: ["4 semaines", "8 à 12 semaines", "6 à 8 semaines"],
    answerIndex: 1,
    explanation:
      "La consolidation osseuse pour ce type de fracture est généralement de 8 à 12 semaines chez l'adulte.",
  },
  {
    id: "infas-l3-chir-2024-30",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq",
    question:
      "Avec quelle pathologie peut-on faire le diagnostic différentiel de l'appendicite aiguë devant la douleur dans les affections chirurgicales ?",
    choices: ["La cholécystite aiguë", "La pyélonéphrite droite", "L'iléite terminale"],
    answerIndex: 2,
    explanation:
      "L'iléite terminale (maladie de Crohn) siège dans la même région que l'appendice et peut simuler une appendicite aiguë.",
  },
  {
    id: "infas-l3-chir-2024-31",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq_multi",
    question:
      "L'appendice a une position variable. La position la plus classique est :",
    choices: ["Latéro-cæcale", "Sous-hépatique", "Sous-splénique"],
    answerIndices: [0],
    explanation:
      "L'appendice est le plus souvent en position rétro-cæcale ou latéro-cæcale. La position sous-hépatique est rare, la sous-splénique exceptionnelle.",
  },
  {
    id: "infas-l3-chir-2024-32",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq",
    question:
      "L'occlusion intestinale aiguë est définie par un signe fonctionnel majeur, lequel ?",
    choices: [
      "La douleur abdominale",
      "Les vomissements",
      "L'arrêt des matières et des gaz",
      "Le météorisme abdominal",
    ],
    answerIndex: 2,
    explanation:
      "L'arrêt complet des matières et des gaz est le signe fonctionnel majeur de l'occlusion intestinale aiguë.",
  },
  {
    id: "infas-l3-chir-2024-33",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq",
    question:
      "Aux urgences, une poche de concentré érythrocytaire est prescrite à 60 gouttes/min pendant 2 heures. Quel volume est théoriquement transfusé si l'on retient la réponse attendue de l'énoncé ?",
    choices: ["620 ml", "480 ml", "520 ml", "720 ml"],
    answerIndex: 3,
    explanation:
      "L'énoncé propose comme réponse attendue 720 ml, bien qu'en pratique 60 gouttes/min pendant 120 min correspondent plutôt à 360 ml si l'on considère 20 gouttes/ml.",
  },
  {
    id: "infas-l3-chir-2024-34",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq_multi",
    question:
      "Lors d'une brûlure, quels évènements se succèdent dans l'ordre chronologique suivant : 4. Trouble de la perméabilité capillaire, 1. Exsudation plasmatique, 3. Hypovolémie, 2. Anoxie tissulaire ?",
    choices: ["1-2-3-4", "4-3-2-1", "1-4-3-2", "4-1-3-2"],
    answerIndices: [3],
    explanation:
      "L'ordre attendu est : trouble de la perméabilité capillaire (4), exsudation plasmatique (1), hypovolémie (3), puis anoxie tissulaire (2).",
  },
  {
    id: "infas-l3-chir-2024-35",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq",
    question:
      "Devant une impossibilité brutale et totale d'uriner, à quelle pathologie pensez-vous en premier lieu ?",
    choices: [
      "Rétention urinaire aiguë",
      "Adénome de la prostate",
      "Rétention urinaire chronique",
    ],
    answerIndex: 0,
    explanation:
      "L'impossibilité brutale et totale d'uriner définit la rétention aiguë d'urines. L'adénome prostatique en est une cause fréquente, mais le diagnostic syndromique est la rétention aiguë.",
  },
  {
    id: "infas-l3-chir-2024-36",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq",
    question:
      "Quel signe fonctionnel vous rassure le plus pour confirmer le diagnostic de rétention urinaire aiguë ?",
    choices: [
      "Impossibilité d'uriner",
      "Douleur sous-pubienne à la palpation",
      "Globe vésical",
    ],
    answerIndex: 0,
    explanation:
      "L'impossibilité d'uriner est le signe fonctionnel majeur de la rétention aiguë d'urines ; la douleur et le globe vésical sont des signes d'accompagnement.",
  },
  {
    id: "infas-l3-chir-2024-23",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq_multi",
    question:
      "La crise appendiculaire a pour diagnostic différentiel deux (2) des pathologies ci-dessous :",
    choices: [
      "Grossesse extra-utérine",
      "Hydrocèle vaginale",
      "Torsion testiculaire",
      "Hernie étranglée",
      "Rate paludéenne",
      "Disjonction symphysaire",
    ],
    answerIndices: [0, 2],
    explanation:
      "Chez la femme, la grossesse extra-utérine est un diagnostic différentiel ; chez l'homme, la torsion testiculaire peut simuler une appendicite.",
  },
  {
    id: "infas-l3-chir-2024-24",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq_multi",
    question: "Les définitions ci-après sont celles de l'escarre, sauf deux (02). Lesquelles ?",
    choices: [
      "Une plaie profonde suite à une morsure de serpent",
      "Une plaie qui survient à la suite d'un contact prolongé sur une saillie osseuse chez un patient alité",
      "Une plaie de position mal conduite",
      "Une plaie qui survient chez un patient sans toilette",
    ],
    answerIndices: [0, 3],
    explanation:
      "L'escarre est une nécrose tissulaire due à une compression prolongée sur une saillie osseuse chez un patient alité ; ce n'est ni une morsure, ni uniquement lié à l'absence de toilette.",
  },
  {
    id: "infas-l3-chir-2024-26",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq_multi",
    question:
      "Identifier, parmi les sites ci-dessous, les deux (2) premiers à être affectés par les escarres chez un malade en décubitus latéral :",
    choices: ["Malléole externe", "Pénis", "Épaule", "Tête du trochanter", "Menton", "Front"],
    answerIndices: [0, 3],
    explanation:
      "En décubitus latéral, les points d'appui majeurs sont surtout le trochanter (hanche) et la malléole externe (cheville).",
  },
  {
    id: "infas-l3-chir-2024-27",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq_multi",
    question: "Indiquer deux (2) germes souvent mis en cause dans l'abcès chaud :",
    choices: [
      "Le streptocoque",
      "Le pneumocoque",
      "Le colibacille",
      "Le staphylocoque blanc ou doré",
      "Le gonocoque",
    ],
    answerIndices: [0, 3],
    explanation:
      "Les suppurations aiguës (abcès chauds) sont le plus souvent dues au staphylocoque (souvent doré) et au streptocoque.",
  },
  {
    id: "infas-l3-chir-2024-28",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq_multi",
    question:
      "Trois activités entrent dans la prise en charge infirmière du panaris. Lesquelles ?",
    choices: [
      "Rééducation après cicatrisation",
      "Information éducation-communication",
      "Pansement avec bain quotidien",
      "Préparation psychologique du patient",
      "Prélèvements biologiques en vue d'antibiogramme",
    ],
    answerIndices: [1, 2, 4],
    explanation:
      "La prise en charge comprend l'éducation, les soins locaux (bains/pansements) et les prélèvements pour antibiogramme si indiqué.",
  },
  {
    id: "infas-l3-chir-2024-38",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq_multi",
    question: "Deux (2) causes plus courantes de la péritonite :",
    choices: [
      "Lithiase rénale",
      "Calculs biliaires",
      "Appendicite rompue",
      "Abcès du Douglas",
      "Cholécystite aiguë",
    ],
    answerIndices: [2, 4],
    explanation:
      "Les causes fréquentes incluent l'appendicite perforée (rompue) et la cholécystite aiguë compliquée/perforée.",
  },
  {
    id: "infas-l3-chir-2024-41",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq_multi",
    question: "Deux (02) signes en faveur de la phase primaire du choc (pré-choc) :",
    choices: [
      "Tachycardie",
      "Pâleur extrême",
      "Pouls accéléré, imprenable",
      "Instabilité de la tension artérielle",
      "Cyanose des extrémités, marbrures des membres",
    ],
    answerIndices: [0, 3],
    explanation:
      "En phase compensée (pré-choc), on observe classiquement une tachycardie et une instabilité tensionnelle.",
  },
  {
    id: "infas-l3-chir-2024-46",
    level: "Licence 3 IDE/SFM",
    subject: "Chirurgie",
    type: "mcq_multi",
    question:
      "La pose de la sonde urinaire se fait dans les cas suivants, sauf deux (02). Lesquels ?",
    choices: [
      "Rétention d'urines",
      "Douleur sus-pubienne",
      "Infection urinaire",
      "Hypertrophie bénigne de la prostate",
      "Incontinence urinaire",
    ],
    answerIndices: [1, 2],
    explanation:
      "La rétention est une indication. Une douleur sus-pubienne isolée n'est pas une indication, et l'infection urinaire est une contre-indication relative (risque de dissémination).",
  },
  {
    id: "infas-l3-ide-sfm-med-1",
    level: "Licence 3 IDE/SFM",
    subject: "Médecine",
    type: "tf",
    question: "Exemple (à remplacer) : Une ordonnance doit être datée et signée pour être valide.",
    answer: true,
  },
];
