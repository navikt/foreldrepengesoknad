import { useForm } from 'react-hook-form';

import { VStack } from '@navikt/ds-react';

import {
    EksisterendeSak,
    NavnPåForeldre,
    TilgjengeligStønadskonto,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { ISOStringToDate } from '@navikt/fp-formik';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import Fordeling, { FellesperiodeFordelingValg } from 'app/context/types/Fordeling';
import { getDatoForAleneomsorg } from 'app/utils/annenForelderUtils';

import OppstartAvForeldrepenger from './components/OppstartAvForeldrepenger';
import { getValgOptionsForOppstart } from './components/OppstartValgInput';
import FellesperiodeFordeling from './components/fellesperiode-fordeling/FellesperiodeFordeling';

type Props = {
    erDeltUttak: boolean;
    navnPåForeldre: NavnPåForeldre;
    dagerMedFellesperiode: number;
    førsteDagEtterAnnenForelder: Date | undefined;
    valgtStønadskonto: TilgjengeligStønadskonto[];
    eksisterendeVedtakAnnenPart: EksisterendeSak | undefined;
    ukerMedFellesperiode: number;
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
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const fordelingAvForeldrepenger = useContextGetData(ContextDataType.FORDELING);
    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);
    const oppdaterUttaksplanMetaData = useContextSaveData(ContextDataType.UTTAKSPLAN_METADATA);
    const datoForAleneomsorg = ISOStringToDate(getDatoForAleneomsorg(annenForelder));

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
        oppdaterFordeling(mappedFordelingValues);
        if (uttaksplanMetadata?.harUttaksplanBlittSlettet !== false) {
            oppdaterUttaksplanMetaData({
                ...uttaksplanMetadata,
                harUttaksplanBlittSlettet: false,
            });
        }
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
