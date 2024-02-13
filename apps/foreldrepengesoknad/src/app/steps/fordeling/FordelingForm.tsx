import { useForm } from 'react-hook-form';
import { VStack } from '@navikt/ds-react';
import { Form, ErrorSummaryHookForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import UttaksplanInfo from 'app/context/types/UttaksplanInfo';
import { NavnPåForeldre, isFarEllerMedmor } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';
import Oppstartsvalg from './components/OppstartsValg';
import FellesperiodeFordeling from './components/FellesperiodeFordeling';

type Props = {
    deltUttak: boolean;
    navnPåForeldre: NavnPåForeldre;
    dagerMedFellesperiode: number;
    førsteDagEtterAnnenForelder: Date | undefined;
    goToPreviousDefaultStep: () => Promise<void>;
    goToNextDefaultStep: () => Promise<void>;
};

const FordelingForm: React.FunctionComponent<Props> = ({
    deltUttak,
    navnPåForeldre,
    dagerMedFellesperiode,
    førsteDagEtterAnnenForelder,
    goToPreviousDefaultStep,
    goToNextDefaultStep,
}) => {
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const fordelingAvForeldrepenger = useContextGetData(ContextDataType.UTTAKSPLAN_INFO);
    const oppdaterFordeling = useContextSaveData(ContextDataType.UTTAKSPLAN_INFO);
    const formMethods = useForm<UttaksplanInfo>({
        defaultValues: fordelingAvForeldrepenger,
    });

    const onSubmit = (values: UttaksplanInfo) => {
        oppdaterFordeling(values);
        return goToNextDefaultStep();
    };

    return (
        <Form formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="10">
                <ErrorSummaryHookForm />
                {deltUttak && (
                    <FellesperiodeFordeling
                        navnPåForeldre={navnPåForeldre}
                        dagerMedFellesperiode={dagerMedFellesperiode}
                        erFarEllerMedmor={erFarEllerMedmor}
                    />
                )}
                <Oppstartsvalg
                    barn={barn}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                    førsteDagEtterAnnenForelder={førsteDagEtterAnnenForelder}
                />
            </VStack>
            <StepButtonsHookForm goToPreviousStep={goToPreviousDefaultStep} />
        </Form>
    );
};

export default FordelingForm;
