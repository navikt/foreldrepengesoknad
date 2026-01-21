import { IntlShape } from 'react-intl';

type VarighetFormat = 'full' | 'normal';

export const getVarighetString = (antallDager: number, intl: IntlShape, format: VarighetFormat = 'full'): string => {
    const { uker, dager } = getUkerOgDagerFromDager(Math.abs(antallDager));
    const dagerStr = intl.formatMessage(
        { id: 'varighet.dager' },
        {
            dager,
        },
    );
    if (uker === 0) {
        return dagerStr;
    }
    const ukerStr = intl.formatMessage({ id: 'varighet.uker' }, { uker });
    if (dager > 0) {
        const text =
            format === 'full'
                ? intl.formatMessage({
                      id: `varighet.separator--full`,
                  })
                : intl.formatMessage({
                      id: `varighet.separator--normal`,
                  });
        return `${ukerStr}${text}${dagerStr}`;
    }
    return ukerStr;
};

const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker,
    };
};
