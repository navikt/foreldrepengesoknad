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

export interface Props {
    minsterettUkerToTette?: number;
}

export const InfoOmNesteBarn = ({ minsterettUkerToTette }: Props) => {
    const intl = useIntl();
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const startStønadsperiodeNyttBarn =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;
    const familiehendelsedatoNesteBarn =
        barnFraNesteSak !== undefined ? barnFraNesteSak.familiehendelsesdato : undefined;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erToTette = getToTetteReglerGjelder(familiehendelsesdato, familiehendelsedatoNesteBarn);
    const minsterettToTetteAntallUkerTekst = [minsterettUkerToTette, intl.formatMessage({ id: 'uker' })].join(' ');
    const sisteUttaksdagDetteBarnet =
        startStønadsperiodeNyttBarn !== undefined ? Uttaksdagen(startStønadsperiodeNyttBarn).forrige() : undefined;

    return (
        <Box padding="4" background="surface-alt-3-subtle" className={styles.infoOmNesteBarn}>
            <HStack justify="space-between" align="start">
                <VStack gap="2" style={{ width: '85%' }}>
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
                    <BabyWrappedIcon height={24} width={24} color="#005B82" />
                </IconCircleWrapper>
            </HStack>
        </Box>
    );
};
