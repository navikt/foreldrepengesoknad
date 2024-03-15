import { useForm } from 'react-hook-form';

import { VStack } from '@navikt/ds-react';

import {
    NavnPåForeldre,
    Periode,
    TilgjengeligStønadskonto,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { ISOStringToDate } from '@navikt/fp-formik';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import Fordeling from 'app/context/types/Fordeling';
import { getDatoForAleneomsorg } from 'app/utils/annenForelderUtils';
import { lagUttaksplanForslag } from 'app/utils/uttaksplan/lagUttaksplanForslag';

import OppstartAvForeldrepenger from './components/OppstartAvForeldrepenger';
import { getValgOptionsForOppstart } from './components/OppstartValgInput';
import FellesperiodeFordeling from './components/fellesperiode-fordeling/FellesperiodeFordeling';

type Props = {
    deltUttak: boolean;
    navnPåForeldre: NavnPåForeldre;
    dagerMedFellesperiode: number;
    førsteDagEtterAnnenForelder: Date | undefined;
    valgtStønadskonto: TilgjengeligStønadskonto[];
    annenPartsPerioder: Periode[] | undefined;
    goToPreviousDefaultStep: () => Promise<void>;
    goToNextDefaultStep: () => Promise<void>;
};

const FordelingForm: React.FunctionComponent<Props> = ({
    deltUttak,
    navnPåForeldre,
    dagerMedFellesperiode,
    førsteDagEtterAnnenForelder,
    valgtStønadskonto,
    annenPartsPerioder,
    goToPreviousDefaultStep,
    goToNextDefaultStep,
}) => {
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const fordelingAvForeldrepenger = useContextGetData(ContextDataType.FORDELING);
    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);
    const datoForAleneomsorg = ISOStringToDate(getDatoForAleneomsorg(annenForelder));
    const formMethods = useForm<Fordeling>({
        defaultValues: fordelingAvForeldrepenger,
    });

    const søkerDeltUttakINorgeSomMorFørst =
        deltUttak &&
        !erFarEllerMedmor &&
        førsteDagEtterAnnenForelder === undefined &&
        isAnnenForelderOppgitt(annenForelder) &&
        !annenForelder.harRettPåForeldrepengerIEØS;

    const oppstartsValgOptions = getValgOptionsForOppstart(
        søkersituasjon,
        barn,
        deltUttak,
        førsteDagEtterAnnenForelder,
        datoForAleneomsorg,
    );

    const onSubmit = (values: Fordeling) => {
        const mappedFordelingValues = {
            fordelingValg: values.fordelingValg,
            antallUkerFellesperiodeTilSøker: values.antallUkerFellesperiodeTilSøker,
            oppstartAvForeldrepengerValg:
                values.oppstartAvForeldrepengerValg &&
                oppstartsValgOptions.includes(values.oppstartAvForeldrepengerValg)
                    ? values.oppstartAvForeldrepengerValg
                    : undefined,
            oppstartDato: values.oppstartDato,
        };
        const uttaksplanForslag = lagUttaksplanForslag(
            valgtStønadskonto,
            annenPartsPerioder,
            søkersituasjon,
            barn,
            barnFraNesteSak,
            annenForelder,
            values,
            oppstartsValgOptions.length,
        );
        oppdaterFordeling(mappedFordelingValues);
        oppdaterUttaksplan(uttaksplanForslag);
        return goToNextDefaultStep();
    };
    return (
        <Form formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="10">
                <ErrorSummaryHookForm />
                {søkerDeltUttakINorgeSomMorFørst && (
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
        </Form>
    );
};

export default FordelingForm;
