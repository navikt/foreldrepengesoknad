import React, { FunctionComponent } from 'react';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import useSøknad from 'app/utils/hooks/useSøknad';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getFamiliehendelsedato, getFødselsdato, getTermindato } from 'app/utils/barnUtils';
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
import { FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo } from 'app/context/types/UttaksplanInfo';
import actionCreator from 'app/context/action/actionCreator';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import SøknadRoutes from 'app/routes/routes';
import useUttaksplanInfo from 'app/utils/hooks/useUttaksplanInfo';
import { Block, intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import { farMedmorFødselOgMorHarIkkeRettQuestionsConfig } from './farMedmorFødselOgMorHarIkkeRettQuestionsConfig';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import TilgjengeligeDagerGraf from '../../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import { getTilgjengeligeDager } from '../../tilgjengeligeDagerGraf/tilgjengeligeDagerUtils';
import { Forelder } from 'app/types/Forelder';
import { formaterNavn } from 'app/utils/personUtils';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'app/assets/VeilederNormal';
import { DateRange, dateToISOString } from '@navikt/sif-common-formik/lib';
import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { uttaksplanDatoavgrensninger } from 'app/steps/uttaksplan-info/utils/uttaksplanDatoavgrensninger';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { DatepickerDateRange } from 'nav-datovelger';
import { Hovedknapp } from 'nav-frontend-knapper';
import { validateStartdatoFarMedmor } from './validation/farMedmorFødselOgMorHarIkkeRettValidering';
import DekningsgradSpørsmål from '../spørsmål/DekningsgradSpørsmål';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';
import { lagUttaksplan } from 'app/utils/uttaksplan/lagUttaksplan';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { andreAugust2022ReglerGjelder, ISOStringToDate } from 'app/utils/dateUtils';
import { getErMorUfør } from 'app/utils/annenForelderUtils';
import { getHarAktivitetskravIPeriodeUtenUttak } from 'app/utils/uttaksplan/uttaksplanUtils';
import { skalViseInfoOmPrematuruker } from 'app/utils/uttaksplanInfoUtils';

const konverterStringTilDate = (invalidDateRanges?: DatepickerDateRange[]): DateRange[] | undefined => {
    if (!invalidDateRanges) {
        return undefined;
    }

    return invalidDateRanges.map((r) => ({
        from: ISOStringToDate(r.from)!,
        to: ISOStringToDate(r.to)!,
    }));
};

interface Props {
    tilgjengeligeStønadskontoer100DTO: TilgjengeligeStønadskontoerDTO;
    tilgjengeligeStønadskontoer80DTO: TilgjengeligeStønadskontoerDTO;
}

const FarMedmorFødselOgMorHarIkkeRett: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer80DTO,
    tilgjengeligeStønadskontoer100DTO,
}) => {
    const intl = useIntl();
    const { søkersituasjon, annenForelder, barn, dekningsgrad, erEndringssøknad } = useSøknad();
    const {
        person: { fornavn, mellomnavn, etternavn },
    } = useSøkerinfo();
    const lagretUttaksplanInfo = useUttaksplanInfo<FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo>();

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const annenForelderHarIkkeRett = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepengerINorge === false && annenForelder.harRettPåForeldrepengerIEØS === false
        : false;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato);
    const termindato = getTermindato(barn);

    const onValidSubmitHandler = (values: Partial<FarMedmorFødselOgMorHarIkkeRettFormData>) => {
        const startDatoUttaksplan =
            andreAugust2022ReglerGjelder(familiehendelsesdatoDate!) || getErMorUfør(annenForelder, erFarEllerMedmor)
                ? values.permisjonStartdato
                : dateToISOString(Uttaksdagen(Uttaksdagen(familiehendelsesdatoDate!).denneEllerNeste()).leggTil(30));

        return [
            actionCreator.setUttaksplanInfo(mapFarMedmorFødselOgMorHarIkkeRettFormToState(values)),
            actionCreator.setDekningsgrad(getDekningsgradFromString(values.dekningsgrad)),
            actionCreator.lagUttaksplanforslag(
                lagUttaksplan({
                    annenForelderErUfør: erMorUfør,
                    erDeltUttak: false,
                    erEndringssøknad,
                    erEnkelEndringssøknad: erEndringssøknad,
                    familiehendelsesdato: familiehendelsesdatoDate!,
                    førsteUttaksdagEtterSeksUker: Uttaksdagen(
                        Uttaksdagen(familiehendelsesdatoDate!).denneEllerNeste()
                    ).leggTil(30),
                    situasjon: søkersituasjon.situasjon,
                    søkerErFarEllerMedmor: erFarEllerMedmor,
                    søkerHarMidlertidigOmsorg: false,
                    tilgjengeligeStønadskontoer:
                        tilgjengeligeStønadskontoer[getDekningsgradFromString(values.dekningsgrad)],
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
                })
            ),
        ];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.UTTAKSPLAN,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );

    const shouldRender = erFarEllerMedmor && erFødsel && annenForelderHarIkkeRett;

    if (!shouldRender) {
        return null;
    }

    const erDeltUttak = !annenForelderHarIkkeRett;
    const erMorUfør = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.erUfør : false;
    const navnMor = isAnnenForelderOppgitt(annenForelder)
        ? formaterNavn(annenForelder.fornavn, annenForelder.etternavn)
        : '';
    const navnFarMedmor = formaterNavn(fornavn, etternavn, mellomnavn);
    const datoAvgrensinger = uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(
        familiehendelsesdatoDate!,
        termindato,
        søkersituasjon.situasjon
    );
    const fødselsdato = getFødselsdato(barn);
    const visInfoOmPrematuruker = skalViseInfoOmPrematuruker(fødselsdato, termindato, søkersituasjon.situasjon);
    const ekstraDagerGrunnetPrematurFødsel = visInfoOmPrematuruker
        ? Tidsperioden({ fom: fødselsdato!, tom: termindato! }).getAntallUttaksdager() - 1
        : undefined;

    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO
    );

    return (
        <FarMedmorFødselOgMorHarIkkeRettFormComponents.FormikWrapper
            initialValues={getInitialFarMedmorFødselOgMorHarIkkeRettValues(dekningsgrad, lagretUttaksplanInfo)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = farMedmorFødselOgMorHarIkkeRettQuestionsConfig.getVisbility({
                    ...formValues,
                    erMorUfør,
                    familiehendelsesdato: familiehendelsesdatoDate!,
                });

                const valgtStønadskonto = tilgjengeligeStønadskontoer[formValues.dekningsgrad];

                return (
                    <FarMedmorFødselOgMorHarIkkeRettFormComponents.Form
                        includeButtons={false}
                        includeValidationSummary={true}
                    >
                        <Block
                            padBottom="l"
                            visible={visibility.isIncluded(FarMedmorFødselOgMorHarIkkeRettFormField.dekningsgrad)}
                        >
                            <DekningsgradSpørsmål
                                FormKomponent={FarMedmorFødselOgMorHarIkkeRettFormComponents}
                                dekningsgradFeltNavn={FarMedmorFødselOgMorHarIkkeRettFormField.dekningsgrad}
                                tilgjengeligeStønadskontoer={tilgjengeligeStønadskontoer}
                                erDeltUttak={erDeltUttak}
                            />
                        </Block>
                        <Block
                            padBottom="l"
                            visible={visibility.isAnswered(FarMedmorFødselOgMorHarIkkeRettFormField.dekningsgrad)}
                        >
                            {valgtStønadskonto && (
                                <TilgjengeligeDagerGraf
                                    erDeltUttak={erDeltUttak}
                                    erFarEllerMedmor
                                    navnFarMedmor={navnFarMedmor}
                                    navnMor={navnMor}
                                    tilgjengeligeDager={getTilgjengeligeDager(
                                        valgtStønadskonto,
                                        erDeltUttak,
                                        Forelder.farMedmor
                                    )}
                                />
                            )}
                        </Block>
                        <Block padBottom="l" visible={visInfoOmPrematuruker === true}>
                            <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                                <FormattedMessage
                                    id="uttaksplaninfo.veileder.informasjonPrematuruker"
                                    values={{
                                        antallprematuruker: Math.floor(ekstraDagerGrunnetPrematurFødsel! / 5),
                                        antallprematurdager: ekstraDagerGrunnetPrematurFødsel! % 5,
                                    }}
                                />
                            </Veilederpanel>
                        </Block>
                        <Block
                            padBottom="l"
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
                                    ISOStringToDate(datoAvgrensinger.maxDate)!
                                )}
                                placeholder={'dd.mm.åååå'}
                            />
                        </Block>
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Hovedknapp disabled={isSubmitting} spinner={isSubmitting}>
                                {intlUtils(intl, 'søknad.gåVidere')}
                            </Hovedknapp>
                        </Block>
                    </FarMedmorFødselOgMorHarIkkeRettFormComponents.Form>
                );
            }}
        />
    );
};

export default FarMedmorFødselOgMorHarIkkeRett;
