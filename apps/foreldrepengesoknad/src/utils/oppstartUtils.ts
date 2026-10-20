import { OppstartValg } from 'types/Fordeling';

import { Barn } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { getFamiliehendelsedato, getTermindato } from './barnUtils';

export const getStandardOppstartsdato = (
    barn: Barn,
    oppstartValg: OppstartValg.TRE_UKER_FØR_TERMIN | OppstartValg.TRE_UKER_FØR_FØDSEL,
    tilpassTilTermin: boolean,
): string => {
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const dato =
        tilpassTilTermin || oppstartValg === OppstartValg.TRE_UKER_FØR_TERMIN
            ? notEmpty(getTermindato(barn))
            : familiehendelsesdato;
    const startdato = Uttaksdagen.denneEllerNeste(dato).getDatoAntallUttaksdagerTidligere(15);
    return tilpassTilTermin && startdato > familiehendelsesdato
        ? Uttaksdagen.denneEllerNeste(familiehendelsesdato).getDato()
        : startdato;
};
