export const Sleep = (second: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, second * 1000));

export const IMAGE_DOMAIN = 'https://api-camera.okvip.dev/upload';
export const GOOGLE_MAP_API_KEY = 'AIzaSyA21JwqECJSJuIoHQ4nDZEaKI8Ol9KoDbg';
