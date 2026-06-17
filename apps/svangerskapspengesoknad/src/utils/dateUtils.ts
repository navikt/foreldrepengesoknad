import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Barn } from 'types/Barn';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { dagenFør, treUkerSiden } from '@navikt/fp-utils';

dayjs.extend(isBetween);

const getDagenFørTreUkerFørTermin = (termindato: string): Dayjs => {
    return dayjs(treUkerSiden(termindato)).subtract(1, 'd');
};

export const getKanHaSvpFremTilTreUkerFørTermin = (barn: Barn): boolean => {
    if (barn.erBarnetFødt && barn.fødselsdato) {
        const dagenFørTreUkerFørTermin = getDagenFørTreUkerFørTermin(barn.termindato);
        const dagenFørFødsel = dagenFør(barn.fødselsdato);
        return dayjs(dagenFørTreUkerFørTermin).isSameOrBefore(dagenFørFødsel);
    }
    return true;
};

export const getSisteDagForSvangerskapspenger = (barn: Barn): string => {
    const dagenFørTreUkerFørTermin = getDagenFørTreUkerFørTermin(barn.termindato);
    if (getKanHaSvpFremTilTreUkerFørTermin(barn) || !barn.fødselsdato) {
        return dagenFørTreUkerFørTermin.format(ISO_DATE_FORMAT);
    }
    const dagenFørFødsel = dagenFør(barn.fødselsdato);
    return dagenFørFødsel.format(ISO_DATE_FORMAT);
};

export const getDefaultMonth = (minDato: string | Dayjs, maxDato: string | Dayjs): Dayjs => {
    return dayjs().isBetween(dayjs(minDato), dayjs(maxDato), 'd') ? dayjs() : dayjs(maxDato);
};
