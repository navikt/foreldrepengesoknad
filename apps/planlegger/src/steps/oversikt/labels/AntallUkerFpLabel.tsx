import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { weeksBetween } from 'utils/uttakUtils';

import { BodyShort, HStack } from '@navikt/ds-react';

import { capitalizeFirstLetter } from '@navikt/fp-utils';

import BlåSirkel from './ikoner/BlåSirkel';
import GrønnSirkel from './ikoner/GrønnSirkel';
import styles from './oversiktLabels.module.css';

interface Props {
    søkerTekst: string;
    startdato: string;
    sluttdato: string;
    isBluePanel?: boolean;
}

const AntallUkerFpLabel: FunctionComponent<Props> = ({ søkerTekst, startdato, sluttdato, isBluePanel = false }) => {
    const intl = useIntl();

    return (
        <div className={isBluePanel ? styles.bluePanel : styles.greenPanel}>
            <HStack gap="2" align="end" wrap={false}>
                <BodyShort>
                    <FormattedMessage
                        id="OversiktSteg.UkerForeldrepenger"
                        values={{
                            hvem: capitalizeFirstLetter(søkerTekst),
                            uker: weeksBetween(startdato, sluttdato),
                            dato: intl.formatDate(startdato, {
                                day: '2-digit',
                                month: 'short',
                                weekday: 'long',
                            }),
                        }}
                    />
                </BodyShort>
                <div className={styles.srOnly}>
                    <FormattedMessage
                        id="OversiktSteg.UkerForeldrepengerSlutter"
                        values={{
                            hvem: capitalizeFirstLetter(søkerTekst),
                            uker: weeksBetween(startdato, sluttdato),
                            dato: intl.formatDate(sluttdato, {
                                day: '2-digit',
                                month: 'short',
                                weekday: 'long',
                            }),
                        }}
                    />
                </div>
                <div className={styles.margin}>{isBluePanel ? <BlåSirkel /> : <GrønnSirkel />}</div>
            </HStack>
        </div>
    );
};

export default AntallUkerFpLabel;
