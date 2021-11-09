import {$} from './helper.js'


export default class TopBar {
   constructor(options) {
      this.$el = options.el;
      this.data = options.data;

      this.init();
   }

   init() {
      const spans = this.data.map((_, index) => {
         return `<span class="quiz-topbar__item ${index === 0 ? 'quiz-topbar__item-current': ''}">${index +1}</span>`
      }).join('');

      $(this.$el).innerHTML += spans;
   }

}
