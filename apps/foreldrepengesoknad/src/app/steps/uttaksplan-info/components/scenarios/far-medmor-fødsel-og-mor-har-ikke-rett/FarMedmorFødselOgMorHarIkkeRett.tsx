import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import dayjs from 'dayjs';
import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import {
    Block,
    Dekningsgrad,
    ISOStringToDate,
    Uttaksdagen,
    andreAugust2022ReglerGjelder,
    formaterNavn,
    getErMorUfør,
    intlUtils,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    uttaksplanDatoavgrensninger,
} from '@navikt/fp-common';
import { DateRange, dateToISOString } from '@navikt/fp-formik';
import { DatepickerDateRange, Søker } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import FordelingOversikt from 'app/components/fordeling-oversikt/FordelingOversikt';
import { getFordelingFraKontoer } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';

import {
    FarMedmorFødselOgMorHarIkkeRettFormComponents,
    FarMedmorFødselOgMorHarIkkeRettFormData,
    FarMedmorFødselOgMorHarIkkeRettFormField,
} from './farMedmorFødselOgMorHarIkkeRettFormConfig';
import {
    FarMedmorFødselOgMorHarIkkeRettQuestionsPayload,
    farMedmorFødselOgMorHarIkkeRettQuestionsConfig,
} from './farMedmorFødselOgMorHarIkkeRettQuestionsConfig';
import {
    getInitialFarMedmorFødselOgMorHarIkkeRettValues,
    mapFarMedmorFødselOgMorHarIkkeRettFormToState,
} from './farMedmorFødselOgMorHarIkkeRettUtils';
import { validateStartdatoFarMedmor } from './validation/farMedmorFødselOgMorHarIkkeRettValidering';

const konverterStringTilDate = (invalidDateRanges?: DatepickerDateRange[]): DateRange[] | undefined => {
    if (!invalidDateRanges) {
        return undefined;
    }

    return invalidDateRanges.map((r) => ({
        from: ISOStringToDate(r.from)!,
        to: ISOStringToDate(r.to)!,
    }));
};

export interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
    erEndringssøknad: boolean;
    søker: Søker;
    goToNextDefaultStep: () => Promise<void>;
    goToPreviousDefaultStep: () => Promise<void>;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const FarMedmorFødselOgMorHarIkkeRett: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer80DTO,
    tilgjengeligeStønadskontoer100DTO,
    erEndringssøknad,
    søker,
    goToNextDefaultStep,
    goToPreviousDefaultStep,
    oppdaterBarnOgLagreUttaksplandata,
}) => {
    const intl = useIntl();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const perioderMedForeldrepenger = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);
    // TODO (TOR) fjern as
    const uttaksplanInfo = useContextGetData(
        ContextDataType.UTTAKSPLAN_INFO,
    ) as FarMedmorFødselOgMorHarIkkeRettFormData;

    const oppdaterUttaksplanInfo = useContextSaveData(ContextDataType.UTTAKSPLAN_INFO);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const { fornavn, mellomnavn, etternavn } = søker;
    const { dekningsgrad } = perioderMedForeldrepenger;

    const førsteUttaksdagNesteBarnsSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const annenForelderHarIkkeRett = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepengerINorge === false && annenForelder.harRettPåForeldrepengerIEØS === false
        : false;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);
    const termindato = getTermindato(barn);

    const onSubmit = (values: Partial<FarMedmorFødselOgMorHarIkkeRettFormData>) => {
        setIsSubmitting(true);

        const startDatoUttaksplan =
            andreAugust2022ReglerGjelder(familiehendelsesdatoDate!) || getErMorUfør(annenForelder, erFarEllerMedmor)
                ? values.permisjonStartdato
                : dateToISOString(Uttaksdagen(Uttaksdagen(familiehendelsesdatoDate!).denneEllerNeste()).leggTil(30));

        const uttaksplan = lagUttaksplan({
            annenForelderErUfør: erMorUfør,
            erDeltUttak: false,
            erEndringssøknad,
            erEnkelEndringssøknad: erEndringssøknad,
            familiehendelsesdato: familiehendelsesdatoDate!,
            førsteUttaksdagEtterSeksUker: Uttaksdagen(Uttaksdagen(familiehendelsesdatoDate!).denneEllerNeste()).leggTil(
                30,
            ),
            situasjon: søkersituasjon.situasjon,
            søkerErFarEllerMedmor: erFarEllerMedmor,
            søkerHarMidlertidigOmsorg: false,
            tilgjengeligeStønadskontoer: tilgjengeligeStønadskontoer[getDekningsgradFromString(dekningsgrad)],
            uttaksplanSkjema: {
                startdatoPermisjon: startDatoUttaksplan,
            },
            bareFarMedmorHarRett: true,
            termindato: ISOStringToDate(termindato),
            harAktivitetskravIPeriodeUtenUttak: getHarAktivitetskravIPeriodeUtenUttak({
                erDeltUttak: false,
                morHarRett: false,
                søkerErAleneOmOmsorg: false,
            }),
            førsteUttaksdagNesteBarnsSak,
        });

        oppdaterUttaksplanInfo(mapFarMedmorFødselOgMorHarIkkeRettFormToState(values));

        oppdaterUttaksplan(uttaksplan);

        oppdaterBarnOgLagreUttaksplandata({ ...uttaksplanMetadata });

        return goToNextDefaultStep();
    };

    const shouldRender = erFarEllerMedmor && erFødsel && annenForelderHarIkkeRett;

    if (!shouldRender) {
        return null;
    }

    const erMorUfør = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.erMorUfør : false;
    const navnMor = isAnnenForelderOppgitt(annenForelder)
        ? formaterNavn(annenForelder.fornavn, annenForelder.etternavn, false)
        : '';
    const navnFarMedmor = formaterNavn(fornavn, etternavn, false, mellomnavn);
    const datoAvgrensinger = uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(
        familiehendelsesdatoDate!,
        termindato ? dayjs(termindato).toDate() : undefined,
        søkersituasjon.situasjon,
    );

    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
    );

    const valgtStønadskonto = tilgjengeligeStønadskontoer[dekningsgrad === '100' ? 100 : 80];
    const minsterett =
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? tilgjengeligeStønadskontoer100DTO.minsteretter
            : tilgjengeligeStønadskontoer80DTO.minsteretter;

    const fordelingScenario = getFordelingFraKontoer(
        valgtStønadskonto,
        minsterett,
        søkersituasjon,
        barn,
        false,
        navnMor,
        navnFarMedmor,
        intl,
    );
    return (
        <VStack gap="5">
            <FordelingOversikt
                kontoer={valgtStønadskonto}
                navnFarMedmor={navnFarMedmor}
                navnMor={navnMor}
                deltUttak={false}
                fordelingScenario={fordelingScenario}
            />
            <FarMedmorFødselOgMorHarIkkeRettFormComponents.FormikWrapper
                initialValues={getInitialFarMedmorFødselOgMorHarIkkeRettValues(uttaksplanInfo)}
                onSubmit={onSubmit}
                renderForm={({ values: formValues }) => {
                    const visibility = farMedmorFødselOgMorHarIkkeRettQuestionsConfig.getVisbility({
                        ...formValues,
                        erMorUfør,
                        familiehendelsesdato: familiehendelsesdatoDate!,
                    } as FarMedmorFødselOgMorHarIkkeRettQuestionsPayload);

                    return (
                        <FarMedmorFødselOgMorHarIkkeRettFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                        >
                            <Block
                                padBottom="xl"
                                visible={visibility.isIncluded(
                                    FarMedmorFødselOgMorHarIkkeRettFormField.permisjonStartdato,
                                )}
                            >
                                <FarMedmorFødselOgMorHarIkkeRettFormComponents.DatePicker
                                    name={FarMedmorFødselOgMorHarIkkeRettFormField.permisjonStartdato}
                                    label={intlUtils(intl, 'uttaksplaninfo.spørsmål.startdatoPermisjonFarMedmor.label')}
                                    minDate={ISOStringToDate(datoAvgrensinger.minDate)}
                                    maxDate={ISOStringToDate(datoAvgrensinger.maxDate)}
                                    disabledDateRanges={konverterStringTilDate(datoAvgrensinger.invalidDateRanges)}
                                    disableWeekends={datoAvgrensinger.weekendsNotSelectable}
                                    validate={validateStartdatoFarMedmor(
                                        intl,
                                        ISOStringToDate(datoAvgrensinger.minDate)!,
                                        ISOStringToDate(datoAvgrensinger.maxDate)!,
                                    )}
                                    dropdownCaption={true}
                                />
                            </Block>
                            <Block>
                                <StepButtons
                                    isNexButtonVisible={visibility.areAllQuestionsAnswered()}
                                    goToPreviousStep={goToPreviousDefaultStep}
                                    isDisabledAndLoading={isSubmitting}
                                />
                            </Block>
                        </FarMedmorFødselOgMorHarIkkeRettFormComponents.Form>
                    );
                }}
            />
        </VStack>
    );
};

export default FarMedmorFødselOgMorHarIkkeRett;
