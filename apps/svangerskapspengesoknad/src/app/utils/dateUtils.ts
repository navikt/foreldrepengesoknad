import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import { Barn } from 'app/types/Barn';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

export const niMånederFremITid = (dato: string): Dayjs => dayjs(dato).startOf('day').add(9, 'months');
export const etÅrSiden = (dato: string): Dayjs => dayjs(dato).startOf('day').subtract(1, 'year').add(1, 'day');
export const enMånedSiden = (dato: string): Dayjs => dayjs(dato).startOf('day').subtract(1, 'month');
export const tiMånederSidenDato = (dato: string): Dayjs => dayjs(dato).startOf('day').subtract(10, 'month');
export const halvannetÅrSiden = (dato: string): Dayjs =>
    dayjs(dato).startOf('day').subtract(1, 'year').subtract(6, 'months');
export const date4YearsAgo = dayjs().subtract(4, 'year').startOf('day');
export const treUkerSiden = (dato: string): Dayjs => dayjs(dato).startOf('day').subtract(3, 'weeks');
export const fireUkerSiden = (dato: string | Dayjs): Dayjs => dayjs(dato).startOf('day').subtract(4, 'weeks');
export const femMånederSiden = (): Dayjs => dayjs().startOf('day').subtract(5, 'month');
export const femMånederSidenDayjs = (): Dayjs => dayjs().startOf('day').subtract(5, 'month');
export const dagenFør = (dato: string): Dayjs => dayjs(dato).startOf('day');

export const getDagenFørTreUkerFørTermin = (termindato: string): Dayjs => {
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

export const getDefaultMonth = (minDato: Date | string | Dayjs, maxDato: Date | string | Dayjs): Dayjs => {
    return dayjs().isBetween(dayjs(minDato), dayjs(maxDato), 'd') ? dayjs() : dayjs(maxDato);
};
