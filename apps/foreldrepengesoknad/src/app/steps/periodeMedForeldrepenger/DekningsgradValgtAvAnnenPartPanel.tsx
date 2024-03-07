import { CalendarIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';

import { Dekningsgrad, TilgjengeligStønadskonto, bemUtils, getAntallUker, getVarighetString } from '@navikt/fp-common';
import { Kjønn } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';

import { ContextDataType, useContextSaveData } from 'app/context/FpDataContext';

import './dekningsgradValgtAvAnnenPartPanel.less';

type Props = {
    goToPreviousDefaultStep: () => Promise<void>;
    goToNextDefaultStep: () => Promise<void>;
    fornavnAnnenForelder: string;
    kjønnAnnenForelder?: Kjønn;
    dekningsgrad: Dekningsgrad;
    valgtStønadskonto: TilgjengeligStønadskonto[];
};

const DekningsgradValgtAvAnnenPartPanel: React.FunctionComponent<Props> = ({
    goToPreviousDefaultStep,
    goToNextDefaultStep,
    fornavnAnnenForelder,
    kjønnAnnenForelder,
    dekningsgrad,
    valgtStønadskonto,
}) => {
    const intl = useIntl();
    const bem = bemUtils('circle');

    const oppdaterPeriodeMedForeldrepenger = useContextSaveData(ContextDataType.PERIODE_MED_FORELDREPENGER);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const lagre = () => {
        setIsSubmitting(true);

        oppdaterPeriodeMedForeldrepenger({
            dekningsgrad,
        });

        return goToNextDefaultStep();
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
                        <CalendarIcon height={24} width={24} color="#3386E0" />
                    </div>
                </HStack>
            </Box>
            <StepButtons
                isDisabledAndLoading={isSubmitting}
                nextButtonOnClick={lagre}
                goToPreviousStep={goToPreviousDefaultStep}
            />
        </VStack>
    );
};

export default DekningsgradValgtAvAnnenPartPanel;
