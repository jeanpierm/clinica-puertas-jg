import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import Notification from './components/Notification';

function App() {
  const content = useRoutes(routes);

  return (
    <>
      <Notification />
      {content}
    </>
  );
}

export default App;
