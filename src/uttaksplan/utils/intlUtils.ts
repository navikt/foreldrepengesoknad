import { InjectedIntl } from 'react-intl';
import { getUkerOgDagerFromDager } from 'uttaksplan/utils/uttaksdagerUtils';

export const getVarighetString = (
    antallDager: number,
    intl: InjectedIntl
): string => {
    const { uker, dager } = getUkerOgDagerFromDager(antallDager);
    const dagerStr = intl.formatMessage(
        { id: 'uttaksplan.dager' },
        {
            dager
        }
    );

    if (uker === 0) {
        return `${tallTilTekst(dager, intl)} ${dagerStr}`;
    }
    const ukerStr = intl.formatMessage({ id: 'uttaksplan.uker' }, { uker });
    if (dager > 0) {
        return `${ukerStr} ${intl.formatMessage({
            id: 'uttaksplan.og'
        })} ${dagerStr}`;
    }
    return ukerStr;
};

export const pluralize = (count: number, single: string, other: string) =>
    count === 1 ? single : other;

export const tallTilTekst = (tall: number, intl: InjectedIntl): string => {
    if (tall > 10 || tall < 0) {
        return `${tall}`;
    } else {
        return intl.formatMessage({ id: `uttaksplan.tall-${tall}` });
    }
};
