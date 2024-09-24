import { Test, TestingModule } from '@nestjs/testing';
import { QuizRoomService } from './quiz-room.service';

describe('QuizRoomService', () => {
  let service: QuizRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizRoomService],
    }).compile();

    service = module.get<QuizRoomService>(QuizRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
