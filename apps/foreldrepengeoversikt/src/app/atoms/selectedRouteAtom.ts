import { atom } from 'jotai';

import OversiktRoutes from 'app/routes/routes';

export const selectedRouteAtom = atom(OversiktRoutes.HOVEDSIDE);
