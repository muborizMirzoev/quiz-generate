import {$} from './helper.js'

export default class Indicator {
   constructor(options) {
      this.$el = options.el;
      this.answers = options.answers;
      this.percent = 0;
      this.levelDegree = 0;
      this.level = null;
      this.levelClass = null;
      this.percentTopPeople = 0

      this.init()
   }


   init() {
      this.findPercent();
      this.findLevelDegree();
      this.findPercentTopPeople();

      $(this.$el).innerHTML = `
         <div class="quiz-result__left">
          <dl class="quiz-percents">
            <dt class="quiz-percents__text">Ваш результат:</dt>
            <dd class="quiz-percents__percents">${this.percent}%</dd>
          </dl>
        </div>
        <div class="quiz-result__center">
          <div class="quiz-result-indicator">
            <div class="quiz-result-indicator__indicator">
              <div class="quiz-result-indicator__arrow" style="transform: rotate(${this.levelDegree}deg)"></div>
            </div>
            <div class="quiz-result-indicator__text">
              Ваш предположительный уровень — <span
              class="quiz-result-indicator__level ${this.levelClass}">${this.level}</span>
            </div>
          </div>
        </div>
        <div class="quiz-result__right">
          <dl class="quiz-percents">
            <dt class="quiz-percents__text">Вы прошли тест лучше, чем</dt>
            <dd>
              <p class="quiz-percents__percents">${this.percentTopPeople}%</p>
              <p class="quiz-percents__text">респондентов</p>
            </dd>
          </dl>
        </div>
      `

   }

   findPercent() {
      const totalScore = Object.values(this.answers).length
      const yourScore = Object.values(this.answers).reduce((acc, curr) => curr.status === 'true' ? acc + 1 : acc, 0);
      this.percent = (yourScore * 100) / totalScore;
   }

   findLevelDegree() {
      const totalDegree = 180;
      this.levelDegree = Math.floor((this.percent * totalDegree) / 100);


      if (this.levelDegree <= 40) {
         this.level = 'Новичок'
         this.levelClass = 'quiz-result-indicator__level-junior';
      } else if (this.levelDegree > 40 &&  this.levelDegree < 90) {
         this.level = 'Средний'
         this.levelClass = 'quiz-result-indicator__level-middle'
      } else {
         this.level = 'Профи'
         this.levelClass = 'quiz-result-indicator__level-senior'
      }

   }

   findPercentTopPeople() {
      // Результат остальных негде сохранять, поэтому пусть пока будет рандомно-e число от 1 до 100;
      this.percentTopPeople = Math.floor(Math.random() * 100) + 1;
   }
}


