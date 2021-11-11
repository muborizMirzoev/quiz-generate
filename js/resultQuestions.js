import {$} from "./helper.js";

export default class ResultQuestions {
   constructor(options) {
      this.$el = options.el;
      this.answers = options.answers;
      this.data = options.data;

      this.init()
   }

   init() {
      const questions = this.data.map((question, index) => {
         const id = index + 1;
         const userCorrect = this.answers[id].status;
         const userAnswerVariant = +this.answers[id].id;

         const answers = question.answer.map((answer, idx) => {
            return `
                  <li class="quiz-question__answer">
                    <label class="quiz-question__label
                          ${(answer.status === true && answer.id === userAnswerVariant) ? 'quiz-answer-correct' : '' }
                          ${(answer.status === false && answer.id === userAnswerVariant) ? 'quiz-answer-incorrect' : '' }
                          ${answer.status === true ? 'quiz-answer-correct': ''}">
                      <input class="quiz-question__input"             
                            ${userAnswerVariant === answer.id ? "checked" : ""}
                             type="radio"
                             disabled="disabled"
                             name="${id}"
                             value="${answer.value}"
                             data-answer="${answer.status}"
                             data-id="${answer.id}">
                      <span class="quiz-question__input-text">${answer.value}</span>
                    </label>
                  </li>
            `
         }).join('');

         return `
         <div class="result__question quiz-question-body ${userCorrect === 'true' ? 'quiz-question__correct' : 'quiz-question__incorrect'}">
            <p class="quiz-question-body__title">${question.question}</p>
            <ul class="quiz-question__answer">
              ${answers}
             </ul>
          </div>`
      }).join('');

      $(this.$el).innerHTML += questions;
   }
}




