import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useForm } from 'react-hook-form';
import Fordeling from 'types/Fordeling';
import { getDatoForAleneomsorg } from 'utils/annenForelderUtils';
import { ISOStringToDate } from 'utils/dateUtils';
import isFarEllerMedmor from 'utils/isFarEllerMedmor';

import { VStack } from '@navikt/ds-react';

import { NavnPåForeldre, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { notEmpty } from '@navikt/fp-validation';

import FellesperiodeFordeling from './fellesperiode-fordeling/FellesperiodeFordeling';
import OppstartAvForeldrepenger from './oppstart-av-foreldrepenger/OppstartAvForeldrepenger';
import { getValgOptionsForOppstart } from './oppstart-av-foreldrepenger/OppstartValgInput';

type Props = {
    erDeltUttak: boolean;
    navnPåForeldre: NavnPåForeldre;
    dagerMedFellesperiode: number;
    førsteDagEtterAnnenForelder: Date | undefined;
    goToPreviousDefaultStep: () => Promise<void>;
    goToNextDefaultStep: () => Promise<void>;
};

const FordelingForm: React.FunctionComponent<Props> = ({
    erDeltUttak,
    navnPåForeldre,
    dagerMedFellesperiode,
    førsteDagEtterAnnenForelder,
    goToPreviousDefaultStep,
    goToNextDefaultStep,
}) => {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const fordelingAvForeldrepenger = useContextGetData(ContextDataType.FORDELING);

    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);
    const oppdaterUttaksplanMetaData = useContextSaveData(ContextDataType.UTTAKSPLAN_METADATA);

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const datoForAleneomsorg = ISOStringToDate(getDatoForAleneomsorg(annenForelder));

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
        oppdaterFordeling(values);

        //TODO Trenger man dette når den nye uttaksplanen kommer i bruk?
        if (uttaksplanMetadata?.harUttaksplanBlittSlettet !== false) {
            oppdaterUttaksplanMetaData({
                ...uttaksplanMetadata,
                harUttaksplanBlittSlettet: false,
            });
        }
        return goToNextDefaultStep();
    };
    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="10">
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

                <StepButtonsHookForm goToPreviousStep={goToPreviousDefaultStep} />
            </VStack>
        </RhfForm>
    );
};

export default FordelingForm;
