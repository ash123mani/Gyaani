class HttpClient {
  _baseURL: string;
  _headers: Record<string, string>;

  constructor(options: { baseURL: string; headers?: Record<string, string> }) {
    this._baseURL = options.baseURL;
    this._headers = options.headers || {};
  }

  async _fetchJSON<T = object>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T | undefined> {
    const res = await fetch(this._baseURL + endpoint, {
      ...options,
      headers: this._headers,
    });

    if (!res.ok) throw new Error(res.statusText);

    if (res.status !== 204) return res.json();

    return undefined;
  }

  setHeader(key: string, value: string) {
    this._headers[key] = value;
    return this;
  }

  getHeader(key: string) {
    return this._headers[key];
  }

  // setBasicAuth(username: string, password: string) {
  //   this._headers.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
  //   return this;
  // }

  setBearerAuth(token: string) {
    this._headers.Authorization = `Bearer ${token}`;
    return this;
  }

  get<Resp>(endpoint: string, options = {}): Promise<Resp | undefined> {
    return this._fetchJSON(endpoint, {
      ...options,
      method: "GET",
    });
  }

  post<Req, Resp>(
    endpoint: string,
    body: Req,
    options = {},
  ): Promise<Resp | undefined> {
    return this._fetchJSON(endpoint, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
      method: "POST",
    });
  }

  put<Req, Resp>(
    endpoint: string,
    body: Req,
    options = {},
  ): Promise<Resp | undefined> {
    return this._fetchJSON(endpoint, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
      method: "PUT",
    });
  }

  patch<Req, Resp>(
    endpoint: string,
    operations: Req,
    options = {},
  ): Promise<Resp | undefined> {
    return this._fetchJSON(endpoint, {
      ...options,
      body: JSON.stringify(operations),
      method: "PATCH",
    });
  }

  delete<Resp>(endpoint: string, options = {}): Promise<Resp | undefined> {
    return this._fetchJSON(endpoint, {
      ...options,
      method: "DELETE",
    });
  }
}

export default HttpClient;
