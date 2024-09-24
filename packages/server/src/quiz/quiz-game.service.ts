import { QuizRoomService } from '@/src/quiz/quiz-room.service';

export class QuizGame {
  public hasStarted: boolean = false;
  public hasFinished: boolean = false;
  public quizQues: object[] = [];

  constructor(private readonly quizRoom: QuizRoomService) {
    this.initializeQuizGame();
  }

  public startQuizGame() {
    if (this.hasStarted) return;
    this.hasStarted = true;

    this.quizRoom.dispatchEventToQuizRoom<(typeof this.quizQues)[0]>('StartedQuizGame', {
      quiz: this.quizQues,
    });
  }

  private initializeQuizGame() {
    this.quizQues = [
      {
        ques: "What's Your name",
        options: ['Tel1', 'Tel2', 'Tel3', 'Tel4'],
      },
    ];
  }
}
