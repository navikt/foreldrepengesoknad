import { BabyWrappedIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { getFamiliehendelsedato } from 'utils/barnUtils';
import { formaterDato, getToTetteReglerGjelder } from 'utils/dateUtils';

import { BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';
import { Uttaksdagen } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import styles from './info-om-neste-barn.module.css';

interface Props {
    minsterettUkerToTette?: number;
}

export const InfoOmNesteBarn = ({ minsterettUkerToTette }: Props) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const startStønadsperiodeNyttBarn = barnFraNesteSak ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;
    const familiehendelsedatoNesteBarn = barnFraNesteSak ? barnFraNesteSak.familiehendelsesdato : undefined;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erToTette = getToTetteReglerGjelder(familiehendelsesdato, familiehendelsedatoNesteBarn);
    const minsterettToTetteAntallUkerTekst = [minsterettUkerToTette, intl.formatMessage({ id: 'uker' })].join(' ');
    const sisteUttaksdagDetteBarnet = startStønadsperiodeNyttBarn
        ? Uttaksdagen(startStønadsperiodeNyttBarn).forrige()
        : undefined;

    return (
        <Box.New padding="4" background="brand-blue-moderate" className={styles.infoOmNesteBarn}>
            <HStack justify="space-between" align="start">
                <VStack gap="space-8" style={{ width: '85%' }}>
                    <Heading size="xsmall">
                        {erToTette ? (
                            <FormattedMessage
                                id="infoOmSøknaden.toTette.finnesBarnMedNesteSak.tittel"
                                values={{ antallUkerToTette: minsterettUkerToTette }}
                            />
                        ) : (
                            <FormattedMessage
                                id="infoOmSøknaden.ikkeToTette.finnesBarnMedNesteSak.tittel"
                                values={{ sisteUttaksdagDetteBarnet: formaterDato(sisteUttaksdagDetteBarnet) }}
                            />
                        )}
                    </Heading>
                    <BodyShort>
                        {erToTette ? (
                            <FormattedMessage
                                id="infoOmSøknaden.toTette.finnesBarnMedNesteSak"
                                values={{
                                    startStønadsperiodeNyttBarn: formaterDato(startStønadsperiodeNyttBarn),
                                    minsterettAntallUker: <strong>{minsterettToTetteAntallUkerTekst}</strong>,
                                }}
                            />
                        ) : (
                            <FormattedMessage
                                id="infoOmSøknaden.ikkeToTette.finnesBarnMedNesteSak"
                                values={{
                                    startStønadsperiodeNyttBarn: formaterDato(startStønadsperiodeNyttBarn),
                                    sisteUttaksdagDetteBarnet: formaterDato(sisteUttaksdagDetteBarnet),
                                }}
                            />
                        )}
                    </BodyShort>
                </VStack>
                <IconCircleWrapper size="medium" color="lightBlue">
                    <BabyWrappedIcon height={24} width={24} color="var(--ax-brand-blue-800)" />
                </IconCircleWrapper>
            </HStack>
        </Box.New>
    );
};
