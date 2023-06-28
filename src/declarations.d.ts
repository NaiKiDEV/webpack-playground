declare module '*.png';
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'event-bus/*';
declare module 'exchange/*';
declare module 'rates/*';
declare module 'converter/*';

declare global {
  interface Window {
    eventBus?: unknown;
  }
}
