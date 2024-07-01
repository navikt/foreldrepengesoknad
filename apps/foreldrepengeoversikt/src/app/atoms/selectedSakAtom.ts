import { atom } from 'jotai';

import { Sak } from 'app/types/Sak';

export const selectedSakAtom = atom<Sak | undefined>(undefined);
