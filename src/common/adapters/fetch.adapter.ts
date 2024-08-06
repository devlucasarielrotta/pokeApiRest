import { HttpAdapter } from "../interfaces/http-adapter.interface";

export class FetchAdapter implements HttpAdapter {
   async get<T>(url: string): Promise<T> {
      try {
        const response = await fetch(url);
        const data:T   = await response.json();
        return data;
      } catch(error){
        throw new Error('Thisss is an error- check logs');
      } 
    }
}