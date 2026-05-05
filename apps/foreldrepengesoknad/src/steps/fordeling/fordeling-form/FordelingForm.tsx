import isEqual from 'lodash/isEqual';

import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useResetUttaksplanData } from 'appData/useResetUttaksplanData';
import { useForm } from 'react-hook-form';
import { isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { Fordeling } from 'types/Fordeling';
import { getDatoForAleneomsorg } from 'utils/annenForelderUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';

import { VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { NavnPåForeldre } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { FellesperiodeFordeling } from './fellesperiode-fordeling/FellesperiodeFordeling';
import { OppstartAvForeldrepenger } from './oppstart-av-foreldrepenger/OppstartAvForeldrepenger';
import { getValgOptionsForOppstart } from './oppstart-av-foreldrepenger/OppstartValgInput';

type Props = {
    erDeltUttak: boolean;
    navnPåForeldre: NavnPåForeldre;
    dagerMedFellesperiode: number;
    førsteDagEtterAnnenForelder: string | undefined;
    goToPreviousDefaultStep: () => void;
    goToNextDefaultStep: () => void;
    onAvsluttOgSlett?: () => void;
    onFortsettSenere?: () => void;
};

export const FordelingForm = ({
    erDeltUttak,
    navnPåForeldre,
    dagerMedFellesperiode,
    førsteDagEtterAnnenForelder,
    goToPreviousDefaultStep,
    goToNextDefaultStep,
    onAvsluttOgSlett,
    onFortsettSenere,
}: Props) => {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const fordelingAvForeldrepenger = useContextGetData(ContextDataType.FORDELING);

    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);
    const resetUttaksplanData = useResetUttaksplanData();

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const datoForAleneomsorg = getDatoForAleneomsorg(annenForelder);

    const formMethods = useForm<Fordeling>({
        defaultValues: fordelingAvForeldrepenger,
        shouldUnregister: true,
    });

    const søkerDeltUttakINorgeSomMorFørFar =
        erDeltUttak &&
        !erFarEllerMedmor &&
        isAnnenForelderOppgitt(annenForelder) &&
        !annenForelder.harRettPåForeldrepengerIEØS;

    const oppstartsValgOptions = getValgOptionsForOppstart(
        søkersituasjon,
        barn,
        erDeltUttak,
        førsteDagEtterAnnenForelder,
        datoForAleneomsorg,
    );

    const onSubmit = (values: Fordeling) => {
        if (fordelingAvForeldrepenger !== undefined && !isEqual(fordelingAvForeldrepenger, values)) {
            resetUttaksplanData();
        }
        oppdaterFordeling(values);
        return goToNextDefaultStep();
    };
    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="space-40">
                <ErrorSummaryHookForm />
                {søkerDeltUttakINorgeSomMorFørFar && (
                    <FellesperiodeFordeling
                        navnPåForeldre={navnPåForeldre}
                        dagerMedFellesperiode={dagerMedFellesperiode}
                        erFarEllerMedmor={erFarEllerMedmor}
                    />
                )}
                <OppstartAvForeldrepenger
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                    førsteDagEtterAnnenForelder={førsteDagEtterAnnenForelder}
                    oppstartsvalg={oppstartsValgOptions}
                />

                <StepButtonsHookForm
                    goToPreviousStep={goToPreviousDefaultStep}
                    onAvsluttOgSlett={onAvsluttOgSlett}
                    onFortsettSenere={onFortsettSenere}
                />
            </VStack>
        </RhfForm>
    );
};
