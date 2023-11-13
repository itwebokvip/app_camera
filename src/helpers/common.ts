export const Sleep = (second: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, second * 1000));

export const IMAGE_DOMAIN = 'https://api-camera.okvip.dev/upload';
export const GOOGLE_MAP_API_KEY = 'AIzaSyDA-w7c1k3WnMEdKT_5VhnPc7qXb7rCoZc';
