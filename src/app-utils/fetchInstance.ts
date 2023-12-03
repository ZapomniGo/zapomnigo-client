
export default class FetchInstance {
    basePath: string = "https://zapomnigo-server-aaea6dc84a09.herokuapp.com/v1/"
  
    fetchInstance(
      path: string,
      useDefaultPath: boolean = true,
      body?: any,
      method: string = 'GET'
    ) {
      const url = useDefaultPath ? `${this.basePath}${path}` : path;
  
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
  
      return fetch(url, options)
        .then((response) => response.json())
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    }
  }

