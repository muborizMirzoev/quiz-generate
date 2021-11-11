import {$} from './helper.js'

export default class TopBar {
   constructor(options) {
      this.$el = options.el;
      this.data = options.data;
      this.$tabletCurrentEl = options.tabletCurrentEl;

      this.init();
   }

   init() {
      const spans = this.data.map((_, index) => {
         return `<span class="quiz-topbar__item">${index + 1}</span>`
      }).join('');

      $(this.$el).innerHTML += spans;
   }


   checkCurrent(current) {
      $(this.$el).children[current].classList.add('quiz-topbar__item-current');
      if (current === 0) return;
      $(this.$el).children[current - 1].classList.add('quiz-topbar__item-past');
      $(this.$el).children[current - 1].classList.remove('quiz-topbar__item-current');

      //render tablet topBar
      $(this.$tabletCurrentEl).innerText = current + 1;
   }

}
