import {
    getHarAktivitetskravIPeriodeUtenUttak,
    leggTilAnnenPartsPerioderISøkerenesUttaksplan,
} from '@navikt/uttaksplan';
import { useForm } from 'react-hook-form';

import { VStack } from '@navikt/ds-react';

import {
    NavnPåForeldre,
    Periode,
    TilgjengeligStønadskonto,
    getKunFarHarRett,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { ISOStringToDate } from '@navikt/fp-formik';
import { notEmpty } from '@navikt/fp-validation';

import { getMorHarRettINorge } from 'app/api/getStønadskontoParams';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import Fordeling, { FellesperiodeFordelingValg } from 'app/context/types/Fordeling';
import { getDatoForAleneomsorg, getErAleneOmOmsorg } from 'app/utils/annenForelderUtils';
import { getFamiliehendelsedatoDate } from 'app/utils/barnUtils';
import { lagUttaksplanForslag } from 'app/utils/uttaksplan/lagUttaksplanForslag';

import OppstartAvForeldrepenger from './components/OppstartAvForeldrepenger';
import { getValgOptionsForOppstart } from './components/OppstartValgInput';
import FellesperiodeFordeling from './components/fellesperiode-fordeling/FellesperiodeFordeling';

type Props = {
    erDeltUttak: boolean;
    navnPåForeldre: NavnPåForeldre;
    dagerMedFellesperiode: number;
    førsteDagEtterAnnenForelder: Date | undefined;
    valgtStønadskonto: TilgjengeligStønadskonto[];
    annenPartsPerioder: Periode[] | undefined;
    ukerMedFellesperiode: number;
    goToPreviousDefaultStep: () => Promise<void>;
    goToNextDefaultStep: () => Promise<void>;
};

const FordelingForm: React.FunctionComponent<Props> = ({
    erDeltUttak,
    navnPåForeldre,
    dagerMedFellesperiode,
    førsteDagEtterAnnenForelder,
    valgtStønadskonto,
    annenPartsPerioder,
    ukerMedFellesperiode,
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
    const familiehendelsesdato = getFamiliehendelsedatoDate(barn);
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const søkerErAleneOmOmsorg = getErAleneOmOmsorg(annenForelder);
    const bareFarMedmorHarRett = getKunFarHarRett(erFarEllerMedmor, annenForelder, søkerErAleneOmOmsorg);
    const morHarRett = getMorHarRettINorge(erFarEllerMedmor, annenForelder);

    const formMethods = useForm<Fordeling>({
        defaultValues: fordelingAvForeldrepenger,
    });

    const søkerDeltUttakINorgeSomMorFørst =
        erDeltUttak &&
        !erFarEllerMedmor &&
        førsteDagEtterAnnenForelder === undefined &&
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
        const mappedFordelingValues = {
            fordelingValg: values.fordelingValg,
            antallUkerFellesperiodeTilSøker:
                values.fordelingValg === FellesperiodeFordelingValg.VIL_VELGE
                    ? values.antallUkerFellesperiodeTilSøker
                    : undefined,
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
            mappedFordelingValues,
            oppstartsValgOptions.length,
            ukerMedFellesperiode,
        );
        let uttaksplanMedAnnenPart;
        if (annenPartsPerioder && annenPartsPerioder.length > 0 && uttaksplanForslag.length > 0) {
            const harAktivitetskravIPeriodeUtenUttak = getHarAktivitetskravIPeriodeUtenUttak({
                erDeltUttak,
                morHarRett,
                søkerErAleneOmOmsorg,
            });
            uttaksplanMedAnnenPart = leggTilAnnenPartsPerioderISøkerenesUttaksplan(
                annenPartsPerioder,
                uttaksplanForslag,
                familiehendelsesdato,
                harAktivitetskravIPeriodeUtenUttak,
                erAdopsjon,
                bareFarMedmorHarRett,
                erFarEllerMedmor,
                barnFraNesteSak?.startdatoFørsteStønadsperiode,
            );
        } else if (annenPartsPerioder && annenPartsPerioder.length > 0) {
            uttaksplanMedAnnenPart = annenPartsPerioder;
        } else {
            uttaksplanMedAnnenPart = uttaksplanForslag;
        }

        oppdaterFordeling(mappedFordelingValues);
        oppdaterUttaksplan(uttaksplanMedAnnenPart);
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
