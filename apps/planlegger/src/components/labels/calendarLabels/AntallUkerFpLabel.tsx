import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { findDaysAndWeeksBetween } from 'utils/uttakUtils';

import { BodyShort } from '@navikt/ds-react';

import { capitalizeFirstLetter } from '@navikt/fp-utils';

import CalendarIconLabel from './CalendarIconLabel';
import styles from './oversiktLabels.module.css';

interface Props {
    søkerTekst: string;
    startdato: string;
    sluttdato: string;
    isBluePanel?: boolean;
}

const AntallUkerFpLabel: FunctionComponent<Props> = ({ søkerTekst, startdato, sluttdato, isBluePanel = false }) => {
    const intl = useIntl();

    const dagerOgUker = findDaysAndWeeksBetween(startdato, sluttdato);

    return (
        <CalendarIconLabel iconType={isBluePanel ? 'blue' : 'green'}>
            <BodyShort>
                <FormattedMessage
                    id="OversiktSteg.UkerForeldrepenger"
                    values={{
                        hvem: capitalizeFirstLetter(søkerTekst),
                    }}
                />
            </BodyShort>
            <div className={styles.srOnly}>
                <FormattedMessage
                    id="OversiktSteg.UkerForeldrepengerSlutter"
                    values={{
                        hvem: capitalizeFirstLetter(søkerTekst),
                        uker: dagerOgUker.uker,
                        dager: dagerOgUker.dager,
                        dato: intl.formatDate(sluttdato, {
                            day: '2-digit',
                            month: 'long',
                            weekday: 'long',
                        }),
                    }}
                />
            </div>
        </CalendarIconLabel>
    );
};

export default AntallUkerFpLabel;
