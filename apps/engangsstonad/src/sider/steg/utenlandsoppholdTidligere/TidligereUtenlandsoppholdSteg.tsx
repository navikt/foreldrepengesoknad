import { Fragment, useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';
import { ErrorSummaryHookForm, StepButtonsHookForm, Form } from '@navikt/fp-form-hooks';

import useEsNavigator from 'appData/useEsNavigator';
import { Path } from 'appData/paths';
import { EsDataType, useEsStateData, useEsStateSaveFn } from 'appData/EsDataContext';
import useStepData from 'appData/useStepData';
import { UtenlandsoppholdTidligere, UtenlandsoppholdPeriode } from 'types/Utenlandsopphold';
import TidligereUtenlandsoppholdPeriode from './TidligereUtenlandsoppholdPeriode';

const DEFAULT_PERIODE = {
    fom: '',
    tom: '',
    landkode: '',
} as UtenlandsoppholdPeriode;
const DEFAULT_FORM_VALUES = {
    utenlandsoppholdSiste12Mnd: [DEFAULT_PERIODE],
} as UtenlandsoppholdTidligere;

const TidligereUtenlandsoppholdSteg: React.FunctionComponent = () => {
    const intl = useIntl();

    const stepData = useStepData();
    const navigator = useEsNavigator();

    const utenlandsopphold = notEmpty(useEsStateData(EsDataType.UTENLANDSOPPHOLD));
    const sisteUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const lagreTidligereUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_TIDLIGERE);

    const defaultValues = useMemo(() => sisteUtenlandsopphold || DEFAULT_FORM_VALUES, []);
    const formMethods = useForm<UtenlandsoppholdTidligere>({
        defaultValues,
    });
    const { fields, append, remove } = useFieldArray({
        name: 'utenlandsoppholdSiste12Mnd',
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

    const lagre = useCallback((formValues: UtenlandsoppholdTidligere) => {
        lagreTidligereUtenlandsopphold(formValues);
        navigator.goToNextStep(
            utenlandsopphold.skalBoUtenforNorgeNeste12Mnd ? Path.SENERE_UTENLANDSOPPHOLD : Path.OPPSUMMERING,
        );
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}
            pageTitle={intl.formatMessage({ id: 'TidligereUtenlandsoppholdSteg.Tidligere' })}
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
                                <TidligereUtenlandsoppholdPeriode index={index} fjernOpphold={fjernOpphold} />
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
                            <FormattedMessage id="TidligereUtenlandsoppholdSteg.Knapp.LeggTilLand" />
                        </Button>
                    </VStack>
                    <StepButtonsHookForm<UtenlandsoppholdTidligere>
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        saveDataOnPreviousClick={lagreTidligereUtenlandsopphold}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default TidligereUtenlandsoppholdSteg;
