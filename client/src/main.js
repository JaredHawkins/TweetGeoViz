import { render } from 'react-dom';
import routes from './routes';
import InitializeActions from './actions/initializeActions';

InitializeActions.initApp();

render(routes, document.getElementById('app'));
