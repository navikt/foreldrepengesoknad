import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { BodyShort, Heading, Box, VStack } from '@navikt/ds-react';
import { Dekningsgrad, TilgjengeligStønadskonto, getVarighetString } from '@navikt/fp-common';
import { StepButtons } from '@navikt/fp-ui';
import { ContextDataType, useContextSaveData } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';
import { getAntallUker } from '../uttaksplan-info/utils/stønadskontoer';

type Props = {
    mellomlagreSøknadOgNaviger: () => void;
    fornavn: string;
    dekningsgrad: Dekningsgrad;
    valgtStønadskonto: TilgjengeligStønadskonto[];
};

const DekningsgradValgtAvAnnenPartPanel: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    fornavn,
    dekningsgrad,
    valgtStønadskonto,
}) => {
    const intl = useIntl();

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
            <Box padding="4" background="surface-alt-3-subtle">
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
                    <FormattedMessage
                        id="DekningsgradValgtAvAnnenPartPanel.ValgtAv"
                        values={{
                            navn: fornavn,
                        }}
                    />
                </BodyShort>
            </Box>
            <StepButtons isSubmitting={isSubmitting} nextButtonOnClick={lagre} goToPreviousStep={goToPreviousStep} />
        </VStack>
    );
};

export default DekningsgradValgtAvAnnenPartPanel;
