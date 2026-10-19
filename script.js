/*
============================================================
THEME
============================================================

true  = dark theme
false = light theme
*/

const DARK_THEME = true;

/*
============================================================
MCQ DATA
============================================================

Only ONE MCQ is displayed.

Change CURRENT_MCQ_INDEX to select the question.

------------------------------------------------------------
NORMAL MCQ
------------------------------------------------------------

{
  mcq: "What is 2 + 2?",

  choices: [
    "3",
    "4",
    "5",
    "6"
  ],

  answer: "4"
}


------------------------------------------------------------
QUESTION WITH CODE
------------------------------------------------------------

The `code` property is OPTIONAL.

If `code` is not provided,
no code UI will be displayed.

------------------------------------------------------------

{
  mcq: "What is the output of this JavaScript?",

  code:
`const x = 10;
console.log(x * 2);`,

  language: "javascript",

  choices: [
    "10",
    "20",
    "30",
    "Error"
  ],

  answer: "20"
}


------------------------------------------------------------
SQL QUESTION
------------------------------------------------------------

{
  mcq: "What does this SQL query return?",

  code:
`SELECT name
FROM users
WHERE age > 18;`,

  language: "sql",

  choices: [
    "Users younger than 18",
    "Users older than 18",
    "All users",
    "Only one user"
  ],

  answer: "Users older than 18"
}


------------------------------------------------------------
CODE CHOICES
------------------------------------------------------------

A choice can also have its own code.

Example:

{
  mcq: "Which query returns all users?",

  choices: [

    {
      code: "SELECT * FROM users;",
      language: "sql"
    },

    {
      code: "GET * FROM users;",
      language: "sql"
    },

    {
      code: "FETCH users;",
      language: "sql"
    }

  ],

  answer: 0
}


------------------------------------------------------------
CHOICE WITH TEXT + CODE
------------------------------------------------------------

A choice can contain BOTH text and code.

Example:

{
  text: "This query returns every row.",

  code:
`SELECT *
FROM users;`,

  language: "sql"
}


------------------------------------------------------------
MIXED CHOICES
------------------------------------------------------------

Normal and code choices can be mixed.

------------------------------------------------------------
*/

const mcqs = [
  /*
  ============================================================
  EXAMPLE 1
  QUESTION + JAVASCRIPT CODE
  ============================================================
  */

  {
    mcq: 'What is the output of the following JavaScript expression?',

    code: `const x = 10;
console.log(x * 2);`,

    language: 'javascript',

    choices: ['10', '20', '30', 'Error'],

    answer: '20',
  },

  /*
  ============================================================
  EXAMPLE 2
  SQL QUESTION + SQL CHOICES
  ============================================================
  */

  {
    mcq: 'Which SQL query returns every row from the users table?',

    choices: [
      {
        code: `SELECT *
FROM users;`,

        language: 'sql',
      },

      {
        code: `SELECT ALL users;`,

        language: 'sql',
      },

      {
        code: `GET *
FROM users;`,

        language: 'sql',
      },

      {
        code: `FETCH users;`,

        language: 'sql',
      },
    ],

    answer: 0,
  },

  /*
  ============================================================
  EXAMPLE 3
  EXPRESSION CHOICES
  ============================================================
  */

  {
    mcq: 'Which expression evaluates to 25?',

    choices: [
      {
        code: '5 × 5',

        language: 'expression',
      },

      {
        code: '5 + 5',

        language: 'expression',
      },

      {
        code: '10 + 10',

        language: 'expression',
      },

      {
        code: '100 ÷ 5',

        language: 'expression',
      },
    ],

    answer: 0,
  },

  /*
  ============================================================
  EXAMPLE 4
  MIXED CHOICES
  ============================================================
  */

  {
    mcq: 'Which option correctly selects active users?',

    choices: [
      'Get active users',
      'Get active users 1',

      {
        text: 'JavaScript solution',

        code: `users.filter(
  user => user.active
);`,

        language: 'javascript',
      },

      {
        text: 'SQL solution',

        code: `SELECT *
FROM users
WHERE active = true;`,

        language: 'sql',
      },

      'None of the above',
    ],

    answer: 2,
  },
];

/*
============================================================
SELECT SINGLE MCQ
============================================================
*/

const CURRENT_MCQ_INDEX = 1;

/*
============================================================
TIMING
============================================================
*/

const COUNTDOWN_SECONDS = 3;

/*
How long to wait after choices have appeared
before automatically showing the correct answer.
*/

const ANSWER_REVEAL_DELAY = 2000;

const QUESTION_TO_CHOICES_DELAY = 5000;

const CHOICE_REVEAL_DELAY = 1500;

/*
============================================================
DOM
============================================================
*/

const countdownScreen = document.getElementById('countdownScreen');

const quizScreen = document.getElementById('quizScreen');

const finishedScreen = document.getElementById('finishedScreen');

const countdownEl = document.getElementById('countdown');

const questionTextEl = document.getElementById('questionText');

const questionCodeEl = document.getElementById('questionCode');

const choicesEl = document.getElementById('choices');

let countdownTimer = null;

let answerTimer = null;

let answerShown = false;

/*
============================================================
THEME
============================================================
*/

function applyTheme() {
  document.documentElement.dataset.theme = DARK_THEME ? 'dark' : 'light';

  /*
  Light theme overrides.

  Dark theme is already defined
  in CSS :root.
  */

  if (!DARK_THEME) {
    document.documentElement.style.setProperty('--bg', '#f8fafc');

    document.documentElement.style.setProperty('--card', '#ffffff');

    document.documentElement.style.setProperty('--card-hover', '#f8fafc');

    document.documentElement.style.setProperty('--code-bg', '#0f172a');

    document.documentElement.style.setProperty('--text', '#0f172a');

    document.documentElement.style.setProperty('--muted', '#64748b');

    document.documentElement.style.setProperty('--border', '#e2e8f0');

    document.documentElement.style.setProperty('--code-border', '#334155');

    document.documentElement.style.setProperty('--shadow', '0 18px 50px rgba(15, 23, 42, 0.10)');
  }
}

/*
============================================================
CHOICE NORMALIZATION
============================================================

Allows:

"normal text"

OR:

{
  text: "...",
  code: "...",
  language: "sql"
}
*/

function normalizeChoice(choice) {
  /*
  Normal string choice
  */

  if (typeof choice === 'string') {
    return {
      text: choice,

      code: null,

      language: null,
    };
  }

  /*
  Object choice
  */

  return {
    text: choice?.text ?? '',

    code: choice?.code ?? null,

    language: choice?.language ?? null,
  };
}

/*
============================================================
ANSWER VALUE
============================================================
*/

function getChoiceAnswerValue(choice) {
  const normalized = normalizeChoice(choice);

  /*
  For code-only choices,
  use the code as the answer value.
  */

  if (normalized.code !== null && normalized.text === '') {
    return normalized.code;
  }

  return normalized.text;
}

/*
============================================================
GET CORRECT ANSWER INDEX
============================================================
*/

function getCorrectIndex(item) {
  /*
  Answer can be a number.

  0 = first choice
  1 = second choice
  etc.
  */

  if (Number.isInteger(item.answer)) {
    return item.answer;
  }

  /*
  Or answer can be the
  exact text/code value.
  */

  return item.choices.findIndex((choice) => {
    return getChoiceAnswerValue(choice) === item.answer;
  });
}

/*
============================================================
RENDER CODE BLOCK
============================================================
*/

function renderCodeBlock(preElement, code, language) {
  /*
  No code?

  Hide component.
  */

  if (!code) {
    preElement.classList.add('hidden');

    return;
  }

  /*
  Show component.
  */

  preElement.classList.remove('hidden');

  /*
  Store language.

  This makes it easy to add
  syntax highlighting later.
  */

  preElement.dataset.language = language || 'text';

  const codeElement = preElement.querySelector('code');

  /*
  IMPORTANT:

  textContent is used instead of
  innerHTML.

  This safely displays code
  without executing HTML/JS.
  */

  codeElement.textContent = code;
}

/*
============================================================
RENDER QUESTION
============================================================
*/

function renderQuestion(item) {
  /*
  Question text
  */

  questionTextEl.textContent = item.mcq || '';

  /*
  Optional question code
  */

  renderCodeBlock(
    questionCodeEl,

    item.code,

    item.language
  );
}

/*
============================================================
CREATE CHOICE
============================================================
*/

function createChoice(choiceData, index) {
  const choice = normalizeChoice(choiceData);

  const button = document.createElement('button');

  button.className = 'choice';

  /*
  Stagger animation.
  */

  button.style.animationDelay = `${QUESTION_TO_CHOICES_DELAY + index * CHOICE_REVEAL_DELAY}ms`;

  /*
  ----------------------------------------------------------
  TEXT
  ----------------------------------------------------------
  */

  if (choice.text) {
    const text = document.createElement('span');

    text.className = 'choice-text';

    text.textContent = choice.text;

    button.appendChild(text);
  }

  /*
  ----------------------------------------------------------
  CODE
  ----------------------------------------------------------
  */

  if (choice.code) {
    const codeBlock = document.createElement('pre');

    codeBlock.className = 'code-block choice-code';

    codeBlock.dataset.language = choice.language || 'text';

    const codeElement = document.createElement('code');

    /*
    Safely render code.
    */

    codeElement.textContent = choice.code;

    codeBlock.appendChild(codeElement);

    button.appendChild(codeBlock);
  }

  return button;
}

/*
============================================================
COUNTDOWN
============================================================
*/

function startCountdown() {
  clearInterval(countdownTimer);

  clearTimeout(answerTimer);

  countdownScreen.classList.remove('hidden');

  quizScreen.classList.add('hidden');

  finishedScreen.classList.add('hidden');

  let remaining = COUNTDOWN_SECONDS;

  countdownEl.textContent = remaining;

  countdownTimer = setInterval(() => {
    remaining--;

    if (remaining <= 0) {
      clearInterval(countdownTimer);

      showQuestion();

      return;
    }

    countdownEl.textContent = remaining;

  }, 1000);
}

/*
============================================================
SHOW QUESTION
============================================================
*/

function showQuestion() {
  const item = mcqs[CURRENT_MCQ_INDEX];

  if (!item) {
    showFinished();

    return;
  }

  const correctIndex = getCorrectIndex(item);

  /*
  Validate answer.
  */

  if (correctIndex < 0 || correctIndex >= item.choices.length) {
    console.error('Invalid answer configured for this MCQ.');

    return;
  }

  answerShown = false;

  countdownScreen.classList.add('hidden');

  finishedScreen.classList.add('hidden');

  quizScreen.classList.remove('hidden');

  /*
  Render question.
  */

  renderQuestion(item);

  /*
  Clear previous choices.
  */

  choicesEl.innerHTML = '';

  /*
  Create choices.
  */

  item.choices.forEach((choice, index) => {
    const button = createChoice(choice, index);

    button.addEventListener('click', () => {
      revealAnswer(index, correctIndex);
    });

    choicesEl.appendChild(button);
  });

  /*
  Automatically reveal answer.

  The delay also accounts for
  the staggered choice animations.
  */

  answerTimer = setTimeout(
    () => {
      revealAnswer(null, correctIndex);
    },

    ANSWER_REVEAL_DELAY +
    QUESTION_TO_CHOICES_DELAY +
    (item.choices.length - 1) * CHOICE_REVEAL_DELAY +
    400
  );
}

/*
============================================================
REVEAL ANSWER
============================================================
*/

function revealAnswer(selectedIndex, correctIndex) {
  /*
  Prevent multiple reveals.
  */

  if (answerShown) {
    return;
  }

  answerShown = true;

  clearTimeout(answerTimer);

  const buttons = [...choicesEl.querySelectorAll('.choice')];

  buttons.forEach((button, index) => {
    /*
      Disable all choices.
      */

    button.disabled = true;

    /*
      Highlight correct answer.
      */

    if (index === correctIndex) {
      button.style.animationDelay = '0ms';

      button.classList.add('correct');
    }

    /*
      If the user selected
      an incorrect answer,
      show it as wrong.
      */

    if (selectedIndex !== null && index === selectedIndex && index !== correctIndex) {
      button.classList.add('wrong');
    }
  });
}

/*
============================================================
FINISHED
============================================================
*/

function showFinished() {
  clearInterval(countdownTimer);

  clearTimeout(answerTimer);

  quizScreen.classList.add('hidden');

  countdownScreen.classList.add('hidden');

  finishedScreen.classList.remove('hidden');
}

/*
============================================================
START APP
============================================================
*/

applyTheme();

startCountdown();
