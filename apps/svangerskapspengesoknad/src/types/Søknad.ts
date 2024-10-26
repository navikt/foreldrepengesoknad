import { ArbeidIUtlandetInput } from 'types/ArbeidIUtlandet';
import { Barn } from 'types/Barn';

import { EgenNæring, Frilans, LocaleNo, UtenlandsoppholdPeriode } from '@navikt/fp-types';

import { AttachmentDTO } from './AttachmentDTO';
import { TilretteleggingDTO } from './TilretteleggingDto';

export interface SøknadDTO {
    språkkode: LocaleNo;
    barn: Barn;
    frilans: Frilans | undefined;
    egenNæring: EgenNæring | undefined;
    andreInntekterSiste10Mnd: ArbeidIUtlandetInput[] | undefined;
    utenlandsopphold: UtenlandsoppholdPeriode[] | undefined;
    tilretteleggingsbehov: TilretteleggingDTO[];
    vedlegg: AttachmentDTO[];
}
