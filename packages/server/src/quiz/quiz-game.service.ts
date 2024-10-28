import { QuizRoomService } from '@/src/quiz/quiz-room.service';
import { QuizQues } from '@qj/shared';

export class QuizGame {
  public hasStarted: boolean = false;
  public hasFinished: boolean = false;
  public quizQues: QuizQues[] = [];
  public answers: Map<string, number> = new Map();
  public currentQuestionIndex: number = -1;

  constructor(private readonly quizRoom: QuizRoomService) {
    this.initializeQuizGame();
  }

  public startGame() {
    if (this.hasStarted) return;
    this.hasStarted = true;
    this.currentQuestionIndex = 0;
  }

  public endGame() {
    if (this.hasFinished || !this.hasStarted) return;
    this.hasFinished = true;
    this.currentQuestionIndex = -1;
  }

  public get currentQues(): QuizQues {
    return this.quizQues[this.currentQuestionIndex];
  }

  public get isLastQues() {
    return this.currentQuestionIndex === this.quizQues.length - 1;
  }

  public get hasNextQues() {
    return this.currentQuestionIndex < this.quizQues.length - 1;
  }

  public moveToNextQues() {
    if (this.isLastQues) return;
    this.currentQuestionIndex = this.currentQuestionIndex + 1;
  }

  private initializeQuizGame() {
    this.quizQues = [
      {
        ques: 'Who is PM of India?',
        options: ['Modi', 'Lodi', 'Shodi', 'Fodi'],
        id: '20',
      },
      {
        ques: "What's his pet name",
        options: ['jatiely', 'Waah', 'Amit Shah', 'Dogla'],
        id: '21',
      },
      {
        ques: "Who is enemy of Pm's pet?",
        options: ['Nitin', 'Yogi', 'Akhilesh', 'PM'],
        id: '22',
      },
    ];
    this.answers = new Map([
      ['20', 0],
      ['21', 2],
      ['22', 1],
    ]);
  }
}
