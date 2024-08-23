import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Heading, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';
import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';
import { getKanHaSvpFremTilTreUkerFørTermin } from 'app/utils/dateUtils';

import Bedriftsbanner from '../Bedriftsbanner';
import PerioderFieldArray, { NEW_PERIODE, PerioderFormData } from './PerioderFieldArray';
import { mapPerioderFormDataToState } from './perioderStepUtils';

export interface Props {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
}

const PerioderStep: FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const vti = notEmpty(useContextGetData(ContextDataType.VALGT_TILRETTELEGGING_ID));
    const [valgtTilretteleggingId] = useState(vti); //For å unngå oppdatering ved neste

    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);

    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const valgtTilrettelegging = notEmpty(tilrettelegginger.find((t) => t.id === valgtTilretteleggingId));
    const erFlereTilrettelegginger = tilrettelegginger.length > 1;

    const kanHaSVPFremTilTreUkerFørTermin = getKanHaSvpFremTilTreUkerFørTermin(barn);

    const onSubmit = (values: PerioderFormData) => {
        const mappedTilrettelegging = mapPerioderFormDataToState(valgtTilretteleggingId, values, tilrettelegginger);
        oppdaterTilrettelegginger(mappedTilrettelegging);

        return navigator.goToNextStep(SøknadRoutes.FERIE);
    };

    // TODO (TOR) Denne typen er ikkje heilt korrekt for forma. Forma har ingen 'type' i periodane
    const formMethods = useForm<PerioderFormData>({
        shouldUnregister: true,
        defaultValues: {
            varierendePerioder:
                valgtTilrettelegging.varierendePerioder && valgtTilrettelegging.varierendePerioder.length > 0
                    ? valgtTilrettelegging.varierendePerioder
                    : [NEW_PERIODE],
        },
    });

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
            onStepChange={navigator.goToNextStep}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {erFlereTilrettelegginger && <Bedriftsbanner arbeid={valgtTilrettelegging.arbeidsforhold} />}
                    <div>
                        <Heading size="small">
                            <FormattedMessage id="perioder.varierende.heading"></FormattedMessage>
                        </Heading>
                        <BodyShort>
                            {kanHaSVPFremTilTreUkerFørTermin ? (
                                <FormattedMessage id="perioder.varierende.description.termin"></FormattedMessage>
                            ) : (
                                <FormattedMessage id="perioder.varierende.description.fødsel"></FormattedMessage>
                            )}
                        </BodyShort>
                    </div>
                    <PerioderFieldArray
                        valgtTilretteleggingId={valgtTilretteleggingId}
                        barn={barn}
                        tilrettelegginger={tilrettelegginger}
                        kanHaSVPFremTilTreUkerFørTermin={kanHaSVPFremTilTreUkerFørTermin}
                    />
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </Form>
        </Step>
    );
};

export default PerioderStep;
