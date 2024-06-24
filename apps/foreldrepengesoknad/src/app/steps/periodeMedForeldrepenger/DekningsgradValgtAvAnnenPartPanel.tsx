import { CalendarIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';

import { Dekningsgrad, bemUtils, getAntallUker, getVarighetString } from '@navikt/fp-common';
import { Kjønn, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { getVis1Juli2024Info } from 'app/utils/dateUtils';

import InfoOmUtvidet80ProsentPeriode from './InfoOmUtvidet80ProsentPeriode';
import './panelWithCircleIcon.less';

type Props = {
    goToPreviousDefaultStep: () => Promise<void>;
    goToNextDefaultStep: () => Promise<void>;
    fornavnAnnenForelder: string;
    kjønnAnnenForelder?: Kjønn;
    dekningsgrad: Dekningsgrad;
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad;
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
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
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
    const vis1Juli2024Info = getVis1Juli2024Info(barn, annenForelder) && dekningsgrad === Dekningsgrad.ÅTTI_PROSENT;
    return (
        <VStack gap="10">
            <Box padding="4" background="surface-alt-3-subtle">
                <HStack justify="space-between" align="start">
                    <VStack gap="3" style={{ width: '85%' }}>
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
                        {vis1Juli2024Info && (
                            <div style={{ paddingTop: '1.5rem' }}>
                                <InfoOmUtvidet80ProsentPeriode />
                            </div>
                        )}
                    </VStack>
                    <div className={bem.block}>
                        <CalendarIcon height={24} width={24} color="#005B82" />
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
