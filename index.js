import Quiz from './js/quiz.js'
import {data} from './js/data.js'

const quiz = new Quiz({el: '#quiz-body', data: data, nextBtn: '#nextBtn', topBarEl: '#quiz-topbar'});
console.log(quiz);
