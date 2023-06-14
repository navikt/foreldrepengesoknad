import { History } from 'history';

export const navigateTo = (route: string, history: History) => history.push(route);
