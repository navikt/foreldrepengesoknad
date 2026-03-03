import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Hide, Show } from '@navikt/ds-react';

import { capitalizeFirstLetter } from '@navikt/fp-utils';
import { periodFormat } from '@navikt/fp-utils/src/periodUtils';

interface PeriodeRadProps {
    hvem: string;
    fom: string;
    tom: string;
}

export const PeriodeRad = ({ hvem, fom, tom }: PeriodeRadProps) => {
    const intl = useIntl();
    return (
        <>
            <Show above="sm">
                <BodyShort weight="semibold">
                    <FormattedMessage
                        id="FordelingsdetaljerPanel.Infoboks.Periode"
                        values={{
                            hvem: capitalizeFirstLetter(hvem),
                            periode: periodFormat(fom, tom, intl, { separator: '–', useShortMonth: true }),
                        }}
                    />
                </BodyShort>
            </Show>
            <Hide above="sm">
                <BodyShort weight="semibold">
                    <FormattedMessage
                        id="FordelingsdetaljerPanel.Infoboks.Periode"
                        values={{
                            hvem: capitalizeFirstLetter(hvem),
                            periode: periodFormat(fom, tom, intl, { separator: '–', useShortYear: true }),
                        }}
                    />
                </BodyShort>
            </Hide>
        </>
    );
};
