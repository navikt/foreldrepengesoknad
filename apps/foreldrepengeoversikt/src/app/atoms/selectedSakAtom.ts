import { Sak } from 'app/types/Sak';
import { atom } from 'jotai';

export const selectedSakAtom = atom<Sak | undefined>(undefined);
