import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';

const getColorStyleForPeriode = (periode: Periode, gradert?: boolean): string | undefined => {
    if (periode.type === Periodetype.Uttak) {
        return `${periode.type}-${periode.forelder}`;
    }
    if (periode.type === Periodetype.Utsettelse) {
        return `${periode.type}`;
    }
    return undefined;
};

export const getPeriodeBkgModifierClass = (periode: Periode) => {
    const colorStyle = getColorStyleForPeriode(periode);
    if (colorStyle) {
        return `m-periodeBkg--${colorStyle}`;
    }
    return '';
};

export const getPeriodeBorderModifierClass = (periode: Periode) => {
    const colorStyle = getColorStyleForPeriode(periode);
    if (colorStyle) {
        return `m-periodeBorder--${colorStyle}`;
    }
    return '';
};
