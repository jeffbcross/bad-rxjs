import {InjectionToken} from '@angular/core';

export const POST_ENDPOINT_TOKEN = new InjectionToken('[Posts] GetAll Endpoint');

export const POST_ENDPOINT_PROVIDER = {
  provide : POST_ENDPOINT_TOKEN,
  useValue : 'https://jsonplaceholder.typicode.com/posts'
};
