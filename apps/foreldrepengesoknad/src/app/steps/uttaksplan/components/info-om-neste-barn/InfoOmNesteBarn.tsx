import { BabyWrappedIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';

import { Uttaksdagen, bemUtils, formaterDato, getToTetteReglerGjelder, intlUtils } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';

import './info-om-neste-barn.css';

export interface Props {
    minsterettUkerToTette?: number;
}

const InfoOmNesteBarn: React.FunctionComponent<Props> = ({ minsterettUkerToTette }) => {
    const intl = useIntl();
    const bem = bemUtils('infoOmNesteBarn');
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const startStønadsperiodeNyttBarn =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;
    const familiehendelsedatoNesteBarn =
        barnFraNesteSak !== undefined ? barnFraNesteSak.familiehendelsesdato : undefined;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erToTette = getToTetteReglerGjelder(familiehendelsesdato, familiehendelsedatoNesteBarn);
    const minsterettToTetteAntallUkerTekst = [minsterettUkerToTette, intlUtils(intl, 'uker')].join(' ');
    const sisteUttaksdagDetteBarnet =
        startStønadsperiodeNyttBarn !== undefined ? Uttaksdagen(startStønadsperiodeNyttBarn).forrige() : undefined;

    return (
        <Box padding="4" background="surface-alt-3-subtle" className={bem.block}>
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
                <div className={bem.element('ikon')}>
                    <BabyWrappedIcon height={24} width={24} color="#005B82" />
                </div>
            </HStack>
        </Box>
    );
};

export default InfoOmNesteBarn;
