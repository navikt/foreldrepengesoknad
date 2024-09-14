import { CalendarIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { getVarighetString, getVis1Juli2024Info } from 'utils/dateUtils';
import { getAntallUker } from 'utils/stønadskontoerUtils';

import { BodyShort, VStack } from '@navikt/ds-react';

import { Dekningsgrad } from '@navikt/fp-common';
import { Kjønn, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { Infobox, StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

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
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const oppdaterPeriodeMedForeldrepenger = useContextSaveData(ContextDataType.PERIODE_MED_FORELDREPENGER);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const lagre = () => {
        setIsSubmitting(true);

        oppdaterPeriodeMedForeldrepenger(dekningsgrad);

        return goToNextDefaultStep();
    };

    const uker = getAntallUker(valgtStønadskonto);
    const vis1Juli2024Info = getVis1Juli2024Info(barn, annenForelder) && dekningsgrad === Dekningsgrad.ÅTTI_PROSENT;
    return (
        <VStack gap="10">
            <Infobox
                color="blue"
                header={
                    <FormattedMessage
                        id="DekningsgradValgtAvAnnenPartPanel.Heading"
                        values={{
                            uker: getVarighetString(uker * 5, intl),
                            dekningsgrad,
                        }}
                    />
                }
                icon={<CalendarIcon height={24} width={24} color="#005B82" />}
            >
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
            </Infobox>
            <StepButtons
                isDisabledAndLoading={isSubmitting}
                nextButtonOnClick={lagre}
                goToPreviousStep={goToPreviousDefaultStep}
            />
        </VStack>
    );
};

export default DekningsgradValgtAvAnnenPartPanel;
