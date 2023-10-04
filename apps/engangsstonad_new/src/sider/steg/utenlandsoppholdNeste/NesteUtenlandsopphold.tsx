import { Fragment, useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, ErrorMessage, VStack } from '@navikt/ds-react';
import { Step, dateRangesCollide } from '@navikt/fp-common';

import Form from 'fpcommon/form/Form';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import StepButtonsHookForm from 'fpcommon/form/StepButtonsHookForm';
import NesteUtenlandsoppholdPanel from './NesteUtenlandsoppholdPanel';
import useEsNavigator from 'appData/useEsNavigator';
import { EsDataType, useEsStateData, useEsStateSaveFn } from 'appData/EsDataContext';
import { UtenlandsoppholdNeste, UtenlandsoppholdPeriode } from 'types/Utenlandsopphold';
import useStepData from 'appData/useStepData';

const harPerioderOverlapp = (perioder: UtenlandsoppholdPeriode[]): boolean => {
    const dateRanges = perioder.map((u) => ({ from: dayjs(u.fom).toDate(), to: dayjs(u.tom).toDate() }));
    return dateRangesCollide(dateRanges);
};

const DEFAULT_PERIODE = {
    fom: '',
    tom: '',
    landkode: '',
} as UtenlandsoppholdPeriode;

const DEFAULT_FORM_VALUES = {
    utenlandsoppholdNeste12Mnd: [DEFAULT_PERIODE],
} as UtenlandsoppholdNeste;

const NesteUtenlandsopphold: React.FunctionComponent = () => {
    const intl = useIntl();

    const stepData = useStepData();
    const navigator = useEsNavigator();
    const nesteUtenlandsopphold = useEsStateData(EsDataType.UTENLANDSOPPHOLD_NESTE);
    const lagreNesteUtenlandsopphold = useEsStateSaveFn(EsDataType.UTENLANDSOPPHOLD_NESTE);

    const defaultValues = useMemo(() => nesteUtenlandsopphold || DEFAULT_FORM_VALUES, []);
    const formMethods = useForm<UtenlandsoppholdNeste>({
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

    const [harOverlapp, setOverlapp] = useState(false);

    const lagre = useCallback((formValues: UtenlandsoppholdNeste) => {
        if (harPerioderOverlapp(formValues.utenlandsoppholdNeste12Mnd)) {
            setOverlapp(true);
        } else {
            // TODO Bør nok mappe '' til undefined for tom som ikkje er oppgitt
            lagreNesteUtenlandsopphold(formValues);
            navigator.goToNextDefaultStep();
        }
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            pageTitle={intl.formatMessage({ id: 'søknad.utenlandsopphold.fremtidig' })}
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
                                <NesteUtenlandsoppholdPanel index={index} fjernOpphold={fjernOpphold} />
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
                            <FormattedMessage id="utenlandsopphold.knapp.leggTilLand" />
                        </Button>
                        {harOverlapp && (
                            <ErrorMessage>
                                <FormattedMessage id="valideringsfeil.utenlandsopphold.overlapp" />
                            </ErrorMessage>
                        )}
                    </VStack>
                    <StepButtonsHookForm<UtenlandsoppholdNeste>
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        saveDataOnPreviousClick={lagreNesteUtenlandsopphold}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default NesteUtenlandsopphold;
