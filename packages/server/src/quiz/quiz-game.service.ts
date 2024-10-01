import { QuizRoomService } from '@/src/quiz/quiz-room.service';
import { QuizQues } from '@qj/shared';

export class QuizGame {
  public hasStarted: boolean = false;
  public hasFinished: boolean = false;
  public quizQues: QuizQues[] = [];
  private answers: Map<string, number> = new Map();
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
    if (this.hasFinished) return;
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
        options: ['Modi', 'PM Modi', 'Ek hi Modi', 'Feku Modi'],
        id: '20',
      },
      {
        ques: "What's?",
        options: ['Modi', 'Narendra', 'Namo', 'PM'],
        id: '21',
      },
      {
        ques: "What's his pet name",
        options: ['Shah', 'Amit', 'HM', 'Dogla'],
        id: '22',
      },
    ];
    this.answers = new Map([
      ['20', 0],
      ['21', 3],
      ['22', 3],
    ]);
  }
}
