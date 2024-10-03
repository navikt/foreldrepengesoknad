import { ArbeidIUtlandetInput } from 'types/ArbeidIUtlandet';
import { Barn } from 'types/Barn';

import { Attachment, EgenNæring, Frilans, LocaleNo, UtenlandsoppholdPeriode } from '@navikt/fp-types';

import { TilretteleggingDTO } from './Tilrettelegging';

export interface SøknadDTO {
    språkkode: LocaleNo;
    barn: Barn;
    frilans: Frilans | undefined;
    egenNæring: EgenNæring | undefined;
    andreInntekterSiste10Mnd: ArbeidIUtlandetInput[] | undefined;
    utenlandsopphold: UtenlandsoppholdPeriode[] | undefined;
    tilrettelegging: TilretteleggingDTO[];
    vedlegg: Attachment[];
}
