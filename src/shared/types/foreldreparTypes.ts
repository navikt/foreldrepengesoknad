export type ForeldreparForelder = 'far1' | 'far2' | 'far3' | 'far4' | 'medmor1' | 'medmor2' | 'mor1' | 'mor2';

export type ForeldreparIllustrasjonsvariant =
    | 'førsteForelderHalvtSynlig'
    | 'andreForelderHalvtSynlig'
    | 'foreldreSeparert'
    | 'foreldreNærmere';

export enum ForeldreparSituasjon {
    'farOgMor' = 'farOgMor',
    'bareFar' = 'bareFar',
    'bareMor' = 'bareMor',
    'aleneomsorg' = 'aleneomsorg',
    'farOgFar' = 'farOgFar',
    'morOgMedmor' = 'morOgMedmor',
}
