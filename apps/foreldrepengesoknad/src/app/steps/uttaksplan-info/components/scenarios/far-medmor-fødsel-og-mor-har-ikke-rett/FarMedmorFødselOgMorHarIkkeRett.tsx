import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { DatepickerDateRange } from '@navikt/ds-datepicker';
import { DateRange, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { Button, GuidePanel } from '@navikt/ds-react';
import {
    Block,
    Forelder,
    ISOStringToDate,
    StepButtonWrapper,
    Tidsperioden,
    Uttaksdagen,
    andreAugust2022ReglerGjelder,
    formaterNavn,
    getErMorUfør,
    intlUtils,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    uttaksplanDatoavgrensninger,
} from '@navikt/fp-common';
import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import { notEmpty } from '@navikt/fp-validation';
import Person from '@navikt/fp-common/src/common/types/Person';
import {
    FarMedmorFødselOgMorHarIkkeRettFormComponents,
    FarMedmorFødselOgMorHarIkkeRettFormData,
    FarMedmorFødselOgMorHarIkkeRettFormField,
} from './farMedmorFødselOgMorHarIkkeRettFormConfig';
import { getValgtStønadskontoFor80Og100Prosent } from 'app/utils/stønadskontoUtils';
import {
    getInitialFarMedmorFødselOgMorHarIkkeRettValues,
    mapFarMedmorFødselOgMorHarIkkeRettFormToState,
} from './farMedmorFødselOgMorHarIkkeRettUtils';
import SøknadRoutes from 'app/routes/routes';
import { getFamiliehendelsedato, getFødselsdato, getTermindato } from 'app/utils/barnUtils';
import {
    FarMedmorFødselOgMorHarIkkeRettQuestionsPayload,
    farMedmorFødselOgMorHarIkkeRettQuestionsConfig,
} from './farMedmorFødselOgMorHarIkkeRettQuestionsConfig';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import { validateStartdatoFarMedmor } from './validation/farMedmorFødselOgMorHarIkkeRettValidering';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import { skalViseInfoOmPrematuruker } from 'app/utils/uttaksplanInfoUtils';
import { getPreviousStepHref } from 'app/steps/stepsConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import BackButton from 'app/steps/BackButton';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import { UttaksplanInfoScenario } from '../scenarios';

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
    person: Person;
    scenario: UttaksplanInfoScenario;
    mellomlagreSøknadOgNaviger: () => void;
    oppdaterBarnOgLagreUttaksplandata: (metadata: UttaksplanMetaData) => void;
}

const FarMedmorFødselOgMorHarIkkeRett: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer80DTO,
    tilgjengeligeStønadskontoer100DTO,
    erEndringssøknad,
    person,
    mellomlagreSøknadOgNaviger,
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

    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const oppdaterUttaksplanInfo = useContextSaveData(ContextDataType.UTTAKSPLAN_INFO);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const { fornavn, mellomnavn, etternavn } = person;
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
            termindato,
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

        oppdaterAppRoute(SøknadRoutes.UTTAKSPLAN);

        mellomlagreSøknadOgNaviger();
    };

    const shouldRender = erFarEllerMedmor && erFødsel && annenForelderHarIkkeRett;

    if (!shouldRender) {
        return null;
    }

    const erDeltUttak = !annenForelderHarIkkeRett;
    const erMorUfør = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.erUfør : false;
    const navnMor = isAnnenForelderOppgitt(annenForelder)
        ? formaterNavn(annenForelder.fornavn, annenForelder.etternavn, true)
        : '';
    const navnFarMedmor = formaterNavn(fornavn, etternavn, true, mellomnavn);
    const datoAvgrensinger = uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(
        familiehendelsesdatoDate!,
        termindato,
        søkersituasjon.situasjon,
    );
    const fødselsdato = getFødselsdato(barn);
    const visInfoOmPrematuruker = skalViseInfoOmPrematuruker(fødselsdato, termindato, søkersituasjon.situasjon);
    const ekstraDagerGrunnetPrematurFødsel = visInfoOmPrematuruker
        ? Tidsperioden({ fom: fødselsdato!, tom: termindato! }).getAntallUttaksdager() - 1
        : undefined;

    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
    );

    return (
        <FarMedmorFødselOgMorHarIkkeRettFormComponents.FormikWrapper
            initialValues={getInitialFarMedmorFødselOgMorHarIkkeRettValues(uttaksplanInfo)}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = farMedmorFødselOgMorHarIkkeRettQuestionsConfig.getVisbility({
                    ...formValues,
                    erMorUfør,
                    familiehendelsesdato: familiehendelsesdatoDate!,
                } as FarMedmorFødselOgMorHarIkkeRettQuestionsPayload);

                const valgtStønadskonto = tilgjengeligeStønadskontoer[dekningsgrad === '100' ? 100 : 80];

                return (
                    <FarMedmorFødselOgMorHarIkkeRettFormComponents.Form
                        includeButtons={false}
                        includeValidationSummary={true}
                    >
                        <Block padBottom="xl">
                            {valgtStønadskonto && (
                                <TilgjengeligeDagerGraf
                                    erDeltUttak={erDeltUttak}
                                    erFarEllerMedmor
                                    navnFarMedmor={navnFarMedmor}
                                    navnMor={navnMor}
                                    tilgjengeligeDager={getTilgjengeligeDager(
                                        valgtStønadskonto,
                                        erDeltUttak,
                                        Forelder.farMedmor,
                                    )}
                                />
                            )}
                        </Block>
                        <Block padBottom="xl" visible={visInfoOmPrematuruker === true}>
                            <GuidePanel>
                                <FormattedMessage
                                    id="uttaksplaninfo.veileder.informasjonPrematuruker"
                                    values={{
                                        antallprematuruker: Math.floor(ekstraDagerGrunnetPrematurFødsel! / 5),
                                        antallprematurdager: ekstraDagerGrunnetPrematurFødsel! % 5,
                                    }}
                                />
                            </GuidePanel>
                        </Block>
                        <Block
                            padBottom="xl"
                            visible={visibility.isIncluded(FarMedmorFødselOgMorHarIkkeRettFormField.permisjonStartdato)}
                        >
                            <FarMedmorFødselOgMorHarIkkeRettFormComponents.DatePicker
                                name={FarMedmorFødselOgMorHarIkkeRettFormField.permisjonStartdato}
                                label={intlUtils(intl, 'uttaksplaninfo.spørsmål.startdatoPermisjonFarMedmor.label')}
                                minDate={ISOStringToDate(datoAvgrensinger.minDate)}
                                maxDate={ISOStringToDate(datoAvgrensinger.maxDate)}
                                disabledDateRanges={konverterStringTilDate(datoAvgrensinger.invalidDateRanges)}
                                disableWeekend={datoAvgrensinger.weekendsNotSelectable}
                                validate={validateStartdatoFarMedmor(
                                    intl,
                                    ISOStringToDate(datoAvgrensinger.minDate)!,
                                    ISOStringToDate(datoAvgrensinger.maxDate)!,
                                )}
                                placeholder={'dd.mm.åååå'}
                            />
                        </Block>
                        <Block>
                            <StepButtonWrapper>
                                <BackButton
                                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                                    route={getPreviousStepHref('uttaksplanInfo')}
                                />
                                {visibility.areAllQuestionsAnswered() && (
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
                                )}
                            </StepButtonWrapper>
                        </Block>
                    </FarMedmorFødselOgMorHarIkkeRettFormComponents.Form>
                );
            }}
        />
    );
};

export default FarMedmorFødselOgMorHarIkkeRett;
