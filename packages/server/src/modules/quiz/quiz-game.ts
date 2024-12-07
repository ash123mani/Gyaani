import { ContentfulQuizGameContentModelType, ContentfulQuizQuestionContentModelType } from '../../../../shared';

export class QuizGame {
  public hasStarted: boolean = false;
  public hasFinished: boolean = false;
  public answers: Map<string, number> = new Map();
  public currentQuestionIndex: number = -1;
  public newQuizRoomConfig: ContentfulQuizGameContentModelType;
  public newQuizQuestions: ContentfulQuizQuestionContentModelType[] = [];

  constructor(
    private readonly quizRoomConfig: ContentfulQuizGameContentModelType,
    public readonly quizQuestions: ContentfulQuizQuestionContentModelType[],
  ) {
    this.newQuizRoomConfig = quizRoomConfig;
    this.newQuizQuestions = quizQuestions;
    if (this.newQuizQuestions && this.newQuizQuestions.length) {
      this.initializeAnswers();
    }
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

  public get currentQues() {
    return this.newQuizQuestions[this.currentQuestionIndex];
  }

  public get isLastQues() {
    return this.currentQuestionIndex === this.newQuizQuestions.length - 1;
  }

  public get hasNextQues() {
    return this.currentQuestionIndex < this.newQuizQuestions.length - 1;
  }

  public moveToNextQues() {
    if (this.isLastQues) return;
    this.currentQuestionIndex = this.currentQuestionIndex + 1;
  }

  private initializeAnswers(): void {
    this.newQuizQuestions.forEach((ques) => {
      this.answers.set(ques.sys.id, ques.fields.correctAnswer);
    });
  }
}
