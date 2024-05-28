import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { getAntallUkerAktivitetsfriKvote, getAntallUkerForeldrepenger } from 'utils/stønadskontoerUtils';

import { BodyShort } from '@navikt/ds-react';

import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

import CalendarIconLabel from './CalendarIconLabel';
import styles from './oversiktLabels.module.css';

interface Props {
    utenAktivitetskrav?: boolean;
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad;
    tekstPart1: string;
    tekstPart2: string;
    isBluePanel?: boolean;
    visUkerAktivitetskrav?: boolean;
}

const AktivitetskravLabel: FunctionComponent<Props> = ({
    utenAktivitetskrav = false,
    tekstPart1,
    tekstPart2,
    isBluePanel = false,
    valgtStønadskonto,
    visUkerAktivitetskrav = true,
}) => {
    return (
        <CalendarIconLabel iconType={isBluePanel ? 'blue' : 'green'}>
            <BodyShort>
                {visUkerAktivitetskrav ? (
                    <>
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
                    }}
                />
            </div>
        </CalendarIconLabel>
    );
};

export default AktivitetskravLabel;
