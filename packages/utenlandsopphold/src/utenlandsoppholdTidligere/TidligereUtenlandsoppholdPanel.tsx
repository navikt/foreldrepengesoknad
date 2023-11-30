import { Fragment, useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';
import { ErrorSummaryHookForm, StepButtonsHookForm, Form } from '@navikt/fp-form-hooks';
import { StepConfig, UtenlandsoppholdPeriode, UtenlandsoppholdTidligere } from '@navikt/fp-types';

import TidligereUtenlandsoppholdPeriode from './TidligereUtenlandsoppholdPeriode';
import UtenlandsoppholdIntlProvider from '../intl/UtenlandsoppholdIntlProvider';

const DEFAULT_PERIODE = {
    fom: '',
    tom: '',
    landkode: '',
} as UtenlandsoppholdPeriode;

const DEFAULT_FORM_VALUES = {
    utenlandsoppholdSiste12Mnd: [DEFAULT_PERIODE],
} as UtenlandsoppholdTidligere;

export interface Props {
    tidligereUtenlandsopphold?: UtenlandsoppholdTidligere;
    saveOnNext: (formValues: UtenlandsoppholdTidligere) => void;
    saveOnPrevious: (data: UtenlandsoppholdTidligere | undefined) => void;
    cancelApplication: () => void;
    onContinueLater?: () => void;
    goToPreviousStep: () => void;
    stepConfig: StepConfig[];
    supportsTempSaving?: boolean;
}

const TidligereUtenlandsoppholdPanel: React.FunctionComponent<Props> = ({
    tidligereUtenlandsopphold,
    saveOnNext,
    saveOnPrevious,
    cancelApplication,
    onContinueLater,
    goToPreviousStep,
    stepConfig,
    supportsTempSaving = true,
}) => {
    const defaultValues = useMemo(() => tidligereUtenlandsopphold || DEFAULT_FORM_VALUES, [tidligereUtenlandsopphold]);
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

    return (
        <UtenlandsoppholdIntlProvider>
            <Step
                onCancel={cancelApplication}
                onContinueLater={onContinueLater}
                steps={stepConfig}
                useNoTempSavingText={!supportsTempSaving}
            >
                <Form formMethods={formMethods} onSubmit={saveOnNext}>
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
                            goToPreviousStep={goToPreviousStep}
                            saveDataOnPreviousClick={saveOnPrevious}
                        />
                    </VStack>
                </Form>
            </Step>
        </UtenlandsoppholdIntlProvider>
    );
};

export default TidligereUtenlandsoppholdPanel;
