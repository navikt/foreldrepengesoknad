import { IntlShape } from 'react-intl';
import { getUkerOgDagerFromDager } from 'common/util/datoUtils';

export function intlHasKey(intl: IntlShape, key: string) {
    return intl.messages[key] !== undefined;
}

export type VarighetFormat = 'full' | 'normal';

export const getVarighetString = (antallDager: number, intl: IntlShape, format: VarighetFormat = 'full'): string => {
    const { uker, dager } = getUkerOgDagerFromDager(Math.abs(antallDager));
    const dagerStr = intl.formatMessage(
        { id: 'common.varighet.dager' },
        {
            dager,
        }
    );
    if (uker === 0) {
        return dagerStr;
    }
    const ukerStr = intl.formatMessage({ id: 'common.varighet.uker' }, { uker });
    if (dager > 0) {
        return `${ukerStr}${intl.formatMessage({
            id: `common.varighet.separator--${format}`,
        })}${dagerStr}`;
    }
    return ukerStr;
};
export const pluralize = (count: number, single: string, other: string) => (count === 1 ? single : other);

export const tallTilTekst = (tall: number, intl: IntlShape): string => {
    if (tall > 10 || tall < 0) {
        return `${tall}`;
    } else {
        return intl.formatMessage({ id: `common.tall-${tall}` });
    }
};
