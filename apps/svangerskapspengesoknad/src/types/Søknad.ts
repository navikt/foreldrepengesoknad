import { ArbeidIUtlandetInput } from 'types/ArbeidIUtlandet';
import { Barn } from 'types/Barn';

import { Attachment, EgenNæring, Frilans, LocaleNo, UtenlandsoppholdPeriode } from '@navikt/fp-types';

import { TilretteleggingDTO } from './Tilrettelegging';

export enum Søkerrolle {
    'MOR' = 'mor',
}

export interface SøknadDTO {
    rolle: Søkerrolle;
    språkkode: LocaleNo;
    barn: Barn;
    frilans: Frilans | undefined;
    egenNæring: EgenNæring | undefined;
    andreInntekterSiste10Mnd: ArbeidIUtlandetInput[] | undefined;
    utenlandsopphold: UtenlandsoppholdPeriode[] | undefined;
    tilretteleggingsbehov: TilretteleggingDTO[];
    vedlegg: Attachment[];
}
