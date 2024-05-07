import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { TilgjengeligeStønadskontoerForDekningsgrad } from 'types/TilgjengeligeStønadskontoer';
import { getAntallUkerAktivitetsfriKvote, getAntallUkerForeldrepenger } from 'utils/stønadskontoerUtils';

import { BodyShort } from '@navikt/ds-react';

import { capitalizeFirstLetter } from '@navikt/fp-utils';

import CalendarIconLabel from './CalendarIconLabel';
import styles from './oversiktLabels.module.css';

interface Props {
    utenAktivitetskrav?: boolean;
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad;
    tekstPart1: string;
    tekstPart2: string;
    startdato: string;
    sluttdato: string;
    isBluePanel?: boolean;
}

const AktivitetskravLabel: FunctionComponent<Props> = ({
    utenAktivitetskrav = false,
    tekstPart1,
    tekstPart2,
    startdato,
    sluttdato,
    isBluePanel = false,
    valgtStønadskonto,
}) => {
    const intl = useIntl();

    return (
        <CalendarIconLabel iconType={isBluePanel ? 'blue' : 'green'}>
            <BodyShort>
                {utenAktivitetskrav && (
                    <FormattedMessage
                        id="OversiktSteg.UkerUtenAktivitetskrav"
                        values={{
                            hvem: capitalizeFirstLetter(tekstPart1),
                            uker: getAntallUkerAktivitetsfriKvote(valgtStønadskonto),
                            hvemPart2: capitalizeFirstLetter(tekstPart2),
                        }}
                    />
                )}
                {!utenAktivitetskrav && (
                    <FormattedMessage
                        id="OversiktSteg.UkerMedAktivitetskrav"
                        values={{
                            hvem: capitalizeFirstLetter(tekstPart1),
                            uker: getAntallUkerForeldrepenger(valgtStønadskonto),
                            hvemPart2: capitalizeFirstLetter(tekstPart2),
                        }}
                    />
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
