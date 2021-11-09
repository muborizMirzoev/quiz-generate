import {$} from './helper.js'
import TopBar from './topBar.js'
import Indicator from "./indicator.js";
import ResultQuestions from "./resultQuestions.js";

export default class Quiz {
   constructor(options) {
      this.$el = options.el;
      this.data = options.data;
      this.nextBtn = options.nextBtn;
      this.currentQuiz = 0;
      this.answers = {};


      this.topBar = new TopBar({el: options.topBarEl, data: this.data,});

      this.shuffle(this.data);
      this.init();
      this.nextQuiz();
   }

   init() {

      if (this.data.length <= this.currentQuiz) return;
      this.topBar.checkCurrent(this.currentQuiz);

      const current = this.data[this.currentQuiz]
      const question = `<p class="quiz-question-body__title">${current.question}</p>`;

      const answers = current.answer.map((answer, index) => {
         return `
                  <li class="quiz-question__answer">
                    <label class="quiz-question__label">
                      <input class="quiz-question__input" 
                              type="radio" 
                             name="${current.id}" 
                             value="${answer.value}" 
                             data-answer="${answer.status}"
                             data-id="${answer.id}">
                      <span class="quiz-question__input-text">${answer.value}</span>
                    </label>
                  </li>
            `
      }).join('');

      $(this.$el).innerHTML = `
            ${question}
            <ul class="quiz-question__answers">${answers}<ul>
      `;
      this.checkAnswer();
   }

   shuffle(array) {
      array.sort(() => Math.random() - 0.5)
   }

   checkAnswer() {
      document.querySelectorAll('.quiz-question__input').forEach(input => {
         input.addEventListener('change', (e) => {
            const id = e.target.name;
            this.answers[id] = {status: e.target.dataset.answer,  id: e.target.dataset.id}
            console.log(this.answers)
            $(this.nextBtn).disabled = false;
         })
      })
   }

   nextQuiz() {

      $(this.nextBtn).addEventListener('click', () => {

         this.currentQuiz++;
         if (this.currentQuiz >= this.data.length) {
            $('.quiz').classList.add('hidden');
            $('.result').classList.remove('hidden');
            new Indicator({el: '#quiz-result__layout', answers: this.answers})
         } else {

            this.init();
         }
      });

   }
}
