import { createRoot } from 'react-dom/client';

function render() {
  const container = document.getElementById('root');
  if (!container) return;
  
  const root = createRoot(container);
  root.render(<h2>Hello from React!</h2>);
}

render();