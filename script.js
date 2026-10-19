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

  /*
  ============================================================
  EXAMPLE 5
  HTML CODE CHOICES
  ============================================================
  */

  {
    mcq: 'Which HTML snippet creates a link that opens in a new tab safely?',

    choices: [
      {
        code: '<a href="https://example.com" target="_blank" rel="noopener">Visit</a>',

        language: 'html',
      },

      {
        code: '<link href="https://example.com">Visit</link>',

        language: 'html',
      },

      {
        code: '<a src="https://example.com">Visit</a>',

        language: 'html',
      },

      {
        code: '<a href="https://example.com" target="_blank">Visit</a>',

        language: 'html',
      },
    ],

    answer: 0,
  },

  /*
  ============================================================
  EXAMPLE 6
  CSS CODE CHOICES
  ============================================================
  */

  {
    mcq: 'Which CSS rule lays out items in a centered vertical column with 12px spacing?',

    choices: [
      {
        code: '.list { display: flex; flex-direction: column; align-items: center; gap: 12px; }',

        language: 'css',
      },

      {
        code: '.list { display: block; text-align: center; spacing: 12px; }',

        language: 'css',
      },

      {
        code: '.list { flex: column; justify: center; gap: 12px; }',

        language: 'css',
      },

      {
        code: '.list { display: grid; align: center; margin: 12px; }',

        language: 'css',
      },
    ],

    answer: 0,
  },

  /*
  ============================================================
  EXAMPLE 7
  JAVASCRIPT CODE CHOICES
  ============================================================
  */

  {
    mcq: 'Which JavaScript expression returns only active users?',

    choices: [
      {
        code: 'users.filter(user => user.active)',

        language: 'javascript',
      },

      {
        code: 'users.map(user => user.active)',

        language: 'javascript',
      },

      {
        code: 'users.find(user => user.active)',

        language: 'javascript',
      },

      {
        code: 'users.sort(user => user.active)',

        language: 'javascript',
      },
    ],

    answer: 0,
  },

  /*
  ============================================================
  EXAMPLE 8
  PYTHON CODE CHOICES
  ============================================================
  */

  {
    mcq: 'Which Python expression creates a list of squared numbers?',

    choices: [
      {
        code: '[number ** 2 for number in numbers]',

        language: 'python',
      },

      {
        code: '{number ** 2 for number in numbers}',

        language: 'python',
      },

      {
        code: 'numbers.map(number => number ** 2)',

        language: 'python',
      },

      {
        code: 'for number in numbers: number ** 2',

        language: 'python',
      },
    ],

    answer: 0,
  },

  /*
  ============================================================
  EXAMPLE 9
  JSON CODE CHOICES
  ============================================================
  */

  {
    mcq: 'Which JSON value correctly represents an active user named Ada?',

    choices: [
      {
        code: '{"name":"Ada","active":true}',

        language: 'json',
      },

      {
        code: "{'name':'Ada','active':true}",

        language: 'json',
      },

      {
        code: '{"name":"Ada","active":"true"}',

        language: 'json',
      },

      {
        code: '{name:"Ada",active:true}',

        language: 'json',
      },
    ],

    answer: 0,
  },

  /*
  ============================================================
  EXAMPLE 10
  SQL CODE CHOICES
  ============================================================
  */

  {
    mcq: 'Which SQL query counts active users?',

    choices: [
      {
        code: 'SELECT COUNT(*) FROM users WHERE active = TRUE;',

        language: 'sql',
      },

      {
        code: 'COUNT users WHEN active = TRUE;',

        language: 'sql',
      },

      {
        code: 'SELECT users FROM COUNT WHERE active;',

        language: 'sql',
      },

      {
        code: 'SELECT COUNT(active) FROM users = TRUE;',

        language: 'sql',
      },
    ],

    answer: 0,
  },
];

/*
============================================================
SELECT SINGLE MCQ
============================================================
*/

const CURRENT_MCQ_INDEX = 5;

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

const QUESTION_TYPING_SPEED = 60;

const QUESTION_MOVE_DELAY = 1000;

const QUESTION_TO_CHOICES_DELAY = 1000;

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

const questionAnnouncementEl = document.getElementById('questionAnnouncement');

const questionCodeEl = document.getElementById('questionCode');

const choicesEl = document.getElementById('choices');

let countdownTimer = null;

let answerTimer = null;

let questionTypingTimer = null;

let questionMoveTimer = null;

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

function validateMcqs(questions) {
  const errors = [];

  if (!Array.isArray(questions) || questions.length === 0) {
    return ['MCQ data must contain at least one question.'];
  }

  questions.forEach((item, questionIndex) => {
    const questionLabel = `Question ${questionIndex + 1}`;

    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      errors.push(`${questionLabel} must be an object.`);

      return;
    }

    if (typeof item.mcq !== 'string' || item.mcq.trim() === '') {
      errors.push(`${questionLabel} must have non-empty question text.`);
    }

    if (item.code != null && typeof item.code !== 'string') {
      errors.push(`${questionLabel} code must be a string.`);
    }

    if (item.language != null && typeof item.language !== 'string') {
      errors.push(`${questionLabel} language must be a string.`);
    }

    const hasChoices = Array.isArray(item.choices);

    if (!hasChoices || item.choices.length < 2) {
      errors.push(`${questionLabel} must have at least two choices.`);
    }

    if (hasChoices) {
      item.choices.forEach((choice, choiceIndex) => {
        const choiceLabel = `${questionLabel}, choice ${choiceIndex + 1}`;

        if (typeof choice === 'string') {
          if (choice.trim() === '') {
            errors.push(`${choiceLabel} must not be empty.`);
          }

          return;
        }

        if (!choice || typeof choice !== 'object' || Array.isArray(choice)) {
          errors.push(`${choiceLabel} must be text or a choice object.`);

          return;
        }

        if (choice.text != null && typeof choice.text !== 'string') {
          errors.push(`${choiceLabel} text must be a string.`);
        }

        if (choice.code != null && typeof choice.code !== 'string') {
          errors.push(`${choiceLabel} code must be a string.`);
        }

        if (choice.language != null && typeof choice.language !== 'string') {
          errors.push(`${choiceLabel} language must be a string.`);
        }

        const hasText = typeof choice.text === 'string' && choice.text.trim() !== '';
        const hasCode = typeof choice.code === 'string' && choice.code.trim() !== '';

        if (!hasText && !hasCode) {
          errors.push(`${choiceLabel} must have non-empty text or code.`);
        }
      });
    }

    if (Number.isInteger(item.answer)) {
      if (!hasChoices || item.answer < 0 || item.answer >= item.choices.length) {
        errors.push(`${questionLabel} answer index is outside its choices.`);
      }
    } else if (typeof item.answer === 'string') {
      if (!hasChoices || !item.choices.some((choice) => getChoiceAnswerValue(choice) === item.answer)) {
        errors.push(`${questionLabel} answer does not match any choice.`);
      }
    } else {
      errors.push(`${questionLabel} answer must be a choice index or exact choice text/code.`);
    }
  });

  return errors;
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

  const normalizedLanguage = (language || 'plaintext').toLowerCase();
  const languageAliases = {
    js: 'javascript',
    html: 'xml',
    expression: 'plaintext',
    text: 'plaintext',
  };

  codeElement.className = `language-${languageAliases[normalizedLanguage] || normalizedLanguage}`;
  codeElement.textContent = code;
  codeElement.removeAttribute('data-highlighted');

  if (window.hljs) {
    window.hljs.highlightElement(codeElement);
  }
}

/*
============================================================
RENDER QUESTION
============================================================
*/

function renderQuestion(item) {
  questionTextEl.textContent = '';

  /*
  Optional question code
  */

  renderCodeBlock(
    questionCodeEl,

    item.code,

    item.language
  );
}

function typeQuestion(text, onComplete) {
  const characters = Array.from(text);
  let characterIndex = 0;

  clearTimeout(questionTypingTimer);
  questionTextEl.classList.remove('is-typing');
  questionTextEl.textContent = '';
  questionAnnouncementEl.textContent = '';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || characters.length === 0) {
    questionTextEl.textContent = text;
    questionAnnouncementEl.textContent = text;
    onComplete();

    return;
  }

  questionTextEl.classList.add('is-typing');

  function typeNextCharacter() {
    if (characterIndex >= characters.length) {
      questionTextEl.classList.remove('is-typing');
      questionTypingTimer = null;
      questionAnnouncementEl.textContent = text;
      onComplete();

      return;
    }

    questionTextEl.textContent += characters[characterIndex];
    characterIndex++;
    questionTypingTimer = setTimeout(typeNextCharacter, QUESTION_TYPING_SPEED);
  }

  typeNextCharacter();
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

  button.disabled = true;

  button.addEventListener('animationend', (event) => {
    if (event.animationName === 'choiceIn') {
      button.disabled = false;
    }
  }, { once: true });

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

    const codeElement = document.createElement('code');

    codeBlock.appendChild(codeElement);

    renderCodeBlock(codeBlock, choice.code, choice.language);

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

  clearTimeout(questionTypingTimer);

  clearTimeout(questionMoveTimer);

  questionTextEl.classList.remove('is-typing');

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

  typeQuestion(item.mcq || '', () => {
    questionMoveTimer = setTimeout(() => {
      const questionCard = questionTextEl.closest('.question-card');
      const startingTop = questionCard.getBoundingClientRect().top;

      item.choices.forEach((choice, index) => {
        const button = createChoice(choice, index);

        button.addEventListener('click', () => {
          revealAnswer(index, correctIndex);
        });

        choicesEl.appendChild(button);
      });

      const verticalShift = startingTop - questionCard.getBoundingClientRect().top;

      if (verticalShift > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        questionCard.animate(
          [
            { transform: `translateY(${verticalShift}px)` },
            { transform: 'translateY(0)' },
          ],
          {
            duration: 750,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }
        );
      }

      answerTimer = setTimeout(
        () => {
          revealAnswer(null, correctIndex);
        },

        ANSWER_REVEAL_DELAY +
          QUESTION_TO_CHOICES_DELAY +
          (item.choices.length - 1) * CHOICE_REVEAL_DELAY +
          400
      );
    }, QUESTION_MOVE_DELAY);
  });
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

const mcqValidationErrors = validateMcqs(mcqs);

if (!Number.isInteger(CURRENT_MCQ_INDEX) || CURRENT_MCQ_INDEX < 0 || CURRENT_MCQ_INDEX >= mcqs.length) {
  mcqValidationErrors.push('CURRENT_MCQ_INDEX must point to an existing question.');
}

if (mcqValidationErrors.length > 0) {
  console.error('MCQ data validation failed:\n' + mcqValidationErrors.join('\n'));
} else {
  startCountdown();
}
