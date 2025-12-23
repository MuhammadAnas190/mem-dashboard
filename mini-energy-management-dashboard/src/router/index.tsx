import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import LivePage from '../pages/live';
// import AlarmsPage from '../pages/alarms';
// import AlarmDetailsPage from '../pages/alarms/details';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LivePage />,
      },
      // {
      //   path: 'alarms',
      //   element: <AlarmsPage />,
      // },
      // {
      //   path: 'site/:id',
      //   element: <AlarmDetailsPage />,
      // },
    ],
  },
]);
