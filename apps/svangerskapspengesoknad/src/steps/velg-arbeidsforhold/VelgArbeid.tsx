import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import useStepConfig from 'appData/useStepConfig';
import useSvpNavigator from 'appData/useSvpNavigator';
import { useTilretteleggingerHelper } from 'appData/useTilretteleggingerHelper';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Checkbox, VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfCheckboxGroup, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import FlereArbeidsforholdGuidePanel from './FlereArbeidsforholdGuidePanel';
import { getOptionNavn, mapArbeidsforholdToVelgArbeidOptions } from './velgArbeidFormUtils';

type VelgArbeidForm = {
    arbeidMedTilrettelegging: string[];
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const VelgArbeid: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);
    const { fjernTilrettelegginger } = useTilretteleggingerHelper();

    const valgteArbeidsforhold = useContextGetData(ContextDataType.VALGTE_ARBEIDSFORHOLD);
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const frilans = useContextGetData(ContextDataType.FRILANS);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterValgteArbeidsforhold = useContextSaveData(ContextDataType.VALGTE_ARBEIDSFORHOLD);

    const arbeidsforholdOptions = mapArbeidsforholdToVelgArbeidOptions(
        arbeidsforholdOgInntekt,
        arbeidsforhold,
        barnet.termindato,
        intl,
        frilans,
        egenNæring,
    );

    const onSubmit = (formValues: VelgArbeidForm) => {
        oppdaterValgteArbeidsforhold(formValues.arbeidMedTilrettelegging);

        if (valgteArbeidsforhold && tilrettelegginger) {
            const valgSomSkalFjernes = valgteArbeidsforhold.filter(
                (x) => !formValues.arbeidMedTilrettelegging.includes(x),
            );
            fjernTilrettelegginger(valgSomSkalFjernes);
        }

        return navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<VelgArbeidForm>({
        defaultValues: valgteArbeidsforhold ? { arbeidMedTilrettelegging: valgteArbeidsforhold } : undefined,
    });

    const arbeidMedTilrettelegging = formMethods.watch('arbeidMedTilrettelegging');
    const visInfo = arbeidMedTilrettelegging && arbeidMedTilrettelegging.length > 1;

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
            onStepChange={navigator.goToNextStep}
        >
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <RhfCheckboxGroup
                        name="arbeidMedTilrettelegging"
                        label={intl.formatMessage({ id: 'velgArbeid.hvor' })}
                        validate={[isRequired(intl.formatMessage({ id: 'valideringsfeil.tilrettelegging.påkrevd' }))]}
                    >
                        {arbeidsforholdOptions.map((option) => (
                            <Checkbox key={option.id} value={option.id}>
                                {getOptionNavn(option.arbeidsforholdType, intl, option.arbeidsforholdNavn)}
                            </Checkbox>
                        ))}
                    </RhfCheckboxGroup>
                    {visInfo && <FlereArbeidsforholdGuidePanel />}
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </RhfForm>
        </Step>
    );
};

export default VelgArbeid;
