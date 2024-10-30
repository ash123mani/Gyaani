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
      getQuizGameCards: () => this.get("/cms"),
      // delete: (id) => this.delete(`/users/${id}`),
      // create: (user) => this.post("/users", user),
      // update: (user) => this.put(`/users/${user.id}`, user),
    };
  }
}

const apiClient = new ApiClient("http://localhost:3001");

export default apiClient;
