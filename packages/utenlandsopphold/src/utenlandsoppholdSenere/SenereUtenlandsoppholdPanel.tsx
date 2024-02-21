import { Fragment, useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';
import { Form, ErrorSummaryHookForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { StepConfig, UtenlandsoppholdPeriode, UtenlandsoppholdSenere } from '@navikt/fp-types';

import SenereUtenlandsoppholdPeriode from './SenereUtenlandsoppholdPeriode';
import UtenlandsoppholdIntlProvider from '../intl/UtenlandsoppholdIntlProvider';
import { HorizontalLine } from '../../../ui';

const DEFAULT_PERIODE = {
    fom: '',
    tom: '',
    landkode: '',
} as UtenlandsoppholdPeriode;

const DEFAULT_FORM_VALUES = {
    utenlandsoppholdNeste12Mnd: [DEFAULT_PERIODE],
} as UtenlandsoppholdSenere;

export interface Props {
    senereUtenlandsopphold?: UtenlandsoppholdSenere;
    saveOnNext: (formValues: UtenlandsoppholdSenere) => void;
    saveOnPrevious: (formValues: UtenlandsoppholdSenere | undefined) => void;
    cancelApplication: () => void;
    onContinueLater?: () => void;
    goToPreviousStep: () => void;
    stepConfig: StepConfig[];
}

const SenereUtenlandsoppholdPanel: React.FunctionComponent<Props> = ({
    saveOnNext,
    saveOnPrevious,
    cancelApplication,
    onContinueLater,
    goToPreviousStep,
    senereUtenlandsopphold,
    stepConfig,
}) => {
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

    return (
        <UtenlandsoppholdIntlProvider>
            <Step onCancel={cancelApplication} onContinueLater={onContinueLater} steps={stepConfig}>
                <Form formMethods={formMethods} onSubmit={saveOnNext}>
                    <VStack gap="10">
                        <ErrorSummaryHookForm />
                        <VStack gap="10" align="start">
                            {fields.map((field, index) => (
                                <Fragment key={field.id}>
                                    <SenereUtenlandsoppholdPeriode index={index} fjernOpphold={remove} />
                                    {fields.length > 1 && <HorizontalLine />}
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
                            goToPreviousStep={goToPreviousStep}
                            saveDataOnPreviousClick={saveOnPrevious}
                        />
                    </VStack>
                </Form>
            </Step>
        </UtenlandsoppholdIntlProvider>
    );
};

export default SenereUtenlandsoppholdPanel;
