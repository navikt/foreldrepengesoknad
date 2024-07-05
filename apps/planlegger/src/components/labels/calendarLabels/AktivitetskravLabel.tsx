import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { capitalizeFirstLetter } from '@navikt/fp-utils';

import CalendarIconLabel from './CalendarIconLabel';
import styles from './oversiktLabels.module.css';

interface Props {
    utenAktivitetskrav?: boolean;
    startdato: string;
    sluttdato: string;
    tekstPart1: string;
    tekstPart2: string;
    isBluePanel?: boolean;
    visUkerAktivitetskrav?: boolean;
}

const AktivitetskravLabel: FunctionComponent<Props> = ({
    utenAktivitetskrav = false,
    tekstPart1,
    isBluePanel = false,
    startdato,
    sluttdato,
    visUkerAktivitetskrav = true,
}) => {
    const intl = useIntl();

    return (
        <CalendarIconLabel iconType={isBluePanel ? 'blue' : 'green'}>
            <BodyShort>
                {visUkerAktivitetskrav ? (
                    <>
                        {utenAktivitetskrav && <FormattedMessage id="OversiktSteg.UtenAktivitetskrav" />}
                        {!utenAktivitetskrav && <FormattedMessage id="OversiktSteg.MedAktivitetskrav" />}
                    </>
                ) : (
                    <>
                        {utenAktivitetskrav && <FormattedMessage id="OversiktSteg.UtenAktivitetskrav" />}
                        {!utenAktivitetskrav && <FormattedMessage id="OversiktSteg.MedAktivitetskrav" />}
                    </>
                )}
            </BodyShort>
            <div className={styles.srOnly}>
                <FormattedMessage
                    id="OversiktSteg.PeriodeSrOnly"
                    values={{
                        hvem: capitalizeFirstLetter(tekstPart1),
                        startdato: intl.formatDate(startdato, {
                            day: '2-digit',
                            month: 'long',
                            weekday: 'long',
                            year: 'numeric',
                        }),
                        sluttdato: intl.formatDate(sluttdato, {
                            day: '2-digit',
                            month: 'long',
                            weekday: 'long',
                            year: 'numeric',
                        }),
                    }}
                />
            </div>
        </CalendarIconLabel>
    );
};

export default AktivitetskravLabel;
