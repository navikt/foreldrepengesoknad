import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import { Barn } from 'app/types/Barn';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

export const niMånederFremITid = (dato: Date) => dayjs(dato).startOf('day').add(9, 'months').toDate();
export const etÅrSiden = (dato: Date) => dayjs(dato).startOf('day').subtract(1, 'year').add(1, 'day').toDate();
export const enMånedSiden = (dato: Date) => dayjs(dato).startOf('day').subtract(1, 'month').toDate();
export const tiMånederSidenDato = (dato: Date) => dayjs(dato).startOf('day').subtract(10, 'month').toDate();
export const halvannetÅrSiden = (dato: Date) =>
    dayjs(dato).startOf('day').subtract(1, 'year').subtract(6, 'months').toDate();
export const date4YearsAgo = dayjs().subtract(4, 'year').startOf('day').toDate();
export const treUkerSiden = (dato: Date) => dayjs(dato).startOf('day').subtract(3, 'weeks').toDate();
export const fireUkerSiden = (dato: Date) => dayjs(dato).startOf('day').subtract(4, 'weeks').toDate();
export const femMånederSiden = () => dayjs().startOf('day').subtract(5, 'month').toDate();
export const dagenFør = (dato: Date) => dayjs(dato).startOf('day').toDate();

export const getDagenFørTreUkerFørTermin = (termindato: string) => {
    return dayjs(treUkerSiden(new Date(termindato))).subtract(1, 'd');
};

export const getKanHaSvpFremTilTreUkerFørTermin = (barn: Barn): boolean => {
    if (barn.erBarnetFødt && barn.fødselsdato) {
        const dagenFørTreUkerFørTermin = getDagenFørTreUkerFørTermin(barn.termindato);
        const dagenFørFødsel = dagenFør(new Date(barn.fødselsdato));
        return dayjs(dagenFørTreUkerFørTermin).isSameOrBefore(dagenFørFødsel);
    }
    return true;
};

export const getSisteDagForSvangerskapspenger = (barn: Barn): Date => {
    const dagenFørTreUkerFørTermin = getDagenFørTreUkerFørTermin(barn.termindato);
    if (getKanHaSvpFremTilTreUkerFørTermin(barn) || !barn.fødselsdato) {
        return dagenFørTreUkerFørTermin.toDate();
    }
    const dagenFørFødsel = dagenFør(new Date(barn.fødselsdato));
    return dagenFørFødsel;
};
