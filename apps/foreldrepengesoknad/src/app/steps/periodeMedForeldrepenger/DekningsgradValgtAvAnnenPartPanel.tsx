import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { CalendarIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading, Box, VStack, HStack } from '@navikt/ds-react';
import { Dekningsgrad, TilgjengeligStønadskonto, bemUtils, getVarighetString } from '@navikt/fp-common';
import { StepButtons } from '@navikt/fp-ui';
import { ContextDataType, useContextSaveData } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';
import { getAntallUker } from '../uttaksplan-info/utils/stønadskontoer';
import { Kjønn } from '@navikt/fp-types';

import './dekningsgradValgtAvAnnenPartPanel.less';

type Props = {
    mellomlagreSøknadOgNaviger: () => void;
    fornavnAnnenForelder: string;
    kjønnAnnenForelder?: Kjønn;
    dekningsgrad: Dekningsgrad;
    valgtStønadskonto: TilgjengeligStønadskonto[];
};

const DekningsgradValgtAvAnnenPartPanel: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    fornavnAnnenForelder,
    kjønnAnnenForelder,
    dekningsgrad,
    valgtStønadskonto,
}) => {
    const intl = useIntl();
    const bem = bemUtils('circle');

    const oppdaterPeriodeMedForeldrepenger = useContextSaveData(ContextDataType.PERIODE_MED_FORELDREPENGER);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const lagre = () => {
        setIsSubmitting(true);

        oppdaterPeriodeMedForeldrepenger({
            dekningsgrad,
        });
        oppdaterAppRoute(SøknadRoutes.UTTAKSPLAN_INFO);

        return mellomlagreSøknadOgNaviger();
    };

    const goToPreviousStep = () => {
        oppdaterAppRoute(SøknadRoutes.ANNEN_FORELDER);
        mellomlagreSøknadOgNaviger();
    };

    const uker = getAntallUker(valgtStønadskonto);

    return (
        <VStack gap="10">
            <Box padding="4" background="surface-action-subtle">
                <HStack justify="space-between" align="start">
                    <VStack gap="2" style={{ width: '85%' }}>
                        <Heading size="xsmall">
                            <FormattedMessage
                                id="DekningsgradValgtAvAnnenPartPanel.Heading"
                                values={{
                                    uker: getVarighetString(uker * 5, intl),
                                    dekningsgrad,
                                }}
                            />
                        </Heading>
                        <BodyShort>
                            {kjønnAnnenForelder === 'M' ? (
                                <FormattedMessage
                                    id="DekningsgradValgtAvAnnenPartPanel.ValgtAvHans"
                                    values={{
                                        navn: fornavnAnnenForelder,
                                    }}
                                />
                            ) : (
                                <FormattedMessage
                                    id="DekningsgradValgtAvAnnenPartPanel.ValgtAvHennes"
                                    values={{
                                        navn: fornavnAnnenForelder,
                                    }}
                                />
                            )}
                        </BodyShort>
                    </VStack>
                    <div className={bem.block}>
                        <CalendarIcon title="a11y-title" height={24} width={24} color="#005B82" />
                    </div>
                </HStack>
            </Box>
            <StepButtons isSubmitting={isSubmitting} nextButtonOnClick={lagre} goToPreviousStep={goToPreviousStep} />
        </VStack>
    );
};

export default DekningsgradValgtAvAnnenPartPanel;
