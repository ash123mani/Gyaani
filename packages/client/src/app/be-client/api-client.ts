import { QuizGameCardsSuccessResponseType } from "@qj/shared";

import HttpClient from "../utils/http-client";

class ApiClient extends HttpClient {
  constructor(baseURL: string, headers?: Record<string, string>) {
    super({
      baseURL,
      headers: headers,
    });
  }

  get quizGameCms() {
    return {
      getQuizGameCards: () =>
        this.get<QuizGameCardsSuccessResponseType>("/api/cms/allQuizCards"),
    };
  }
}

const apiClient = new ApiClient("http://localhost:3001");

export default apiClient;
