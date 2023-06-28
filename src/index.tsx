import { createRoot } from 'react-dom/client';
import { App } from './app';

const rootNode = document.getElementById('root');
if (!rootNode) {
  throw new Error('Root node not found.');
}

const appRoot = createRoot(rootNode);
appRoot.render(<App />);
