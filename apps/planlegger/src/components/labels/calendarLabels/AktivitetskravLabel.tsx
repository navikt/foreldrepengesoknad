import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerForDekningsgrad } from 'types/TilgjengeligeStønadskontoer';
import { erMorDelAvSøknaden } from 'utils/HvemPlanleggerUtils';
import { getAntallUkerAktivitetsfriKvote, getAntallUkerForeldrepenger } from 'utils/stønadskontoerUtils';

import { BodyShort } from '@navikt/ds-react';

import { capitalizeFirstLetter } from '@navikt/fp-utils';

import CalendarIconLabel from './CalendarIconLabel';
import styles from './oversiktLabels.module.css';

interface Props {
    utenAktivitetskrav?: boolean;
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad;
    hvemPlanlegger: HvemPlanlegger;
    annenPartTekst: string;
    startdato: string;
    sluttdato: string;
    isBluePanel?: boolean;
}

const AktivitetskravLabel: FunctionComponent<Props> = ({
    utenAktivitetskrav = false,
    annenPartTekst,
    startdato,
    sluttdato,
    isBluePanel = false,
    valgtStønadskonto,
    hvemPlanlegger,
}) => {
    const intl = useIntl();

    return (
        <CalendarIconLabel iconType={isBluePanel ? 'blue' : 'green'}>
            <BodyShort>
                {utenAktivitetskrav && (
                    <FormattedMessage
                        id="OversiktSteg.UkerUtenAktivitetskrav"
                        values={{
                            hvem: capitalizeFirstLetter(annenPartTekst),
                            uker: getAntallUkerAktivitetsfriKvote(valgtStønadskonto),
                            erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger),
                        }}
                    />
                )}
                {!utenAktivitetskrav && (
                    <FormattedMessage
                        id="OversiktSteg.UkerMedAktivitetskrav"
                        values={{
                            hvem: capitalizeFirstLetter(annenPartTekst),
                            uker: getAntallUkerForeldrepenger(valgtStønadskonto),
                            erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger),
                        }}
                    />
                )}
            </BodyShort>
            <div className={styles.srOnly}>
                <FormattedMessage
                    id="OversiktSteg.PeriodeSrOnly"
                    values={{
                        hvem: capitalizeFirstLetter(annenPartTekst),
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
