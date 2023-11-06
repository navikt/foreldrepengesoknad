import { Fragment, useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';
import { useCustomIntl } from '@navikt/fp-ui';
import { Form, ErrorSummaryHookForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';

import useEsNavigator from 'appData/useEsNavigator';
import { EsDataType, useEsStateData, useEsStateSaveFn } from 'appData/EsDataContext';
import { UtenlandsoppholdSenere, UtenlandsoppholdPeriode } from 'types/Utenlandsopphold';
import useStepData from 'appData/useStepData';
import SenereUtenlandsoppholdPeriode from './SenereUtenlandsoppholdPeriode';

const DEFAULT_PERIODE = {
    fom: '',
    tom: '',
    landkode: '',
} as UtenlandsoppholdPeriode;

const DEFAULT_FORM_VALUES = {
    utenlandsoppholdNeste12Mnd: [DEFAULT_PERIODE],
} as UtenlandsoppholdSenere;

const SenereUtenlandsoppholdSteg: React.FunctionComponent = () => {
    const { i18n } = useCustomIntl();

    const stepData = useStepData();
    const navigator = useEsNavigator();

    const senereUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_SENERE);
    const lagreSenereUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_SENERE);

    const defaultValues = useMemo(() => senereUtenlandsopphold || DEFAULT_FORM_VALUES, [senereUtenlandsopphold]);
    const formMethods = useForm<UtenlandsoppholdSenere>({
        defaultValues,
    });
    const { fields, append, remove } = useFieldArray({
        name: 'utenlandsoppholdNeste12Mnd',
        control: formMethods.control,
    });

    const leggTilOpphold = useCallback(() => {
        append(DEFAULT_PERIODE);
    }, [append]);

    const fjernOpphold = useCallback(
        (index: number) => {
            remove(index);
        },
        [remove],
    );

    const lagre = useCallback(
        (formValues: UtenlandsoppholdSenere) => {
            lagreSenereUtenlandsopphold(formValues);
            navigator.goToNextDefaultStep();
        },
        [lagreSenereUtenlandsopphold, navigator],
    );

    return (
        <Step
            bannerTitle={i18n('Søknad.Pageheading')}
            pageTitle={i18n('SenereUtenlandsoppholdSteg.Fremtidig')}
            onCancel={navigator.avbrytSøknad}
            steps={stepData.stepConfig}
            activeStepId={stepData.activeStepId}
            useNoTempSavingText
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <VStack gap="10" align="start">
                        {fields.map((field, index) => (
                            <Fragment key={field.id}>
                                <SenereUtenlandsoppholdPeriode index={index} fjernOpphold={fjernOpphold} />
                                {fields.length > 1 && <hr style={{ width: '100%' }} color="#99C4DD" />}
                            </Fragment>
                        ))}
                        <Button
                            type="button"
                            variant="secondary"
                            size="small"
                            icon={<PlusIcon aria-hidden />}
                            onClick={leggTilOpphold}
                        >
                            <FormattedMessage id="SenereUtenlandsoppholdSteg.Knapp.LeggTilLand" />
                        </Button>
                    </VStack>
                    <StepButtonsHookForm<UtenlandsoppholdSenere>
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        saveDataOnPreviousClick={lagreSenereUtenlandsopphold}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default SenereUtenlandsoppholdSteg;
