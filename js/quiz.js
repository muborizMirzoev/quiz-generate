import {$} from './helper.js'
import TopBar from './topBar.js'

export default class Quiz {
   constructor(options) {
      this.$el = options.el;
      this.data = options.data;
      this.nextBtn = options.nextBtn;
      this.currentQuiz = 0;

      this.topBar = new TopBar({el: options.topBarEl, data: this.data,});


      this.shuffle(this.data);
      this.init();
      this.checkAnswer();
      this.nextQuiz();
   }

   init() {
      if (this.data.length <= this.currentQuiz) return;
      this.topBar.checkCurrent(this.currentQuiz);

      $(this.$el).innerHTML = ''
      const current = this.data[this.currentQuiz]
      const question = `<p class="quiz-question-body__title">${current.question}</p>`;

      const answers = current.answer.map((answer, index) => {
         return `
                  <li class="quiz-question__answer">
                    <label class="quiz-question__label">
                      <input class="quiz-question__input" type="radio" name="answer-${this.currentQuiz}" value="${answer.value}" data-answer="${answer.status}">
                      <span class="quiz-question__input-text">${answer.value}</span>
                    </label>
                  </li>
            `
      }).join('');

      $(this.$el).innerHTML += `
            ${question}
            <ul class="quiz-question__answers">${answers}<ul>
      `;
   }

   shuffle(array) {
      array.sort(() => Math.random() - 0.5)
   }

   checkAnswer() {
      document.querySelectorAll('.quiz-question__input').forEach(input => {
         input.addEventListener('change', (e) => {
            $(this.nextBtn).disabled = false;
         })
      })
   }

   nextQuiz() {
      $(this.nextBtn).addEventListener('click', () => {
         this.currentQuiz++;
         if (this.currentQuiz >= this.data.length) {
            console.log('finish', this.currentQuiz, this.data.length)
         } else {
            this.init();
         }
      });

   }
}
