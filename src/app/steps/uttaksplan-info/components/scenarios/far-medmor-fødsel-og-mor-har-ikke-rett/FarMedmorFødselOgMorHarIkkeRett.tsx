import React, { FunctionComponent } from 'react';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import useSøknad from 'app/utils/hooks/useSøknad';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
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
import dayjs from 'dayjs';
import { isFødtBarn } from 'app/context/types/Barn';
import { DateRange, dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { uttaksplanDatoavgrensninger } from 'app/steps/uttaksplan-info/utils/uttaksplanDatoavgrensninger';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { DatepickerDateRange } from 'nav-datovelger';
import { Hovedknapp } from 'nav-frontend-knapper';
import { validateStartdatoFarMedmor } from './validation/farMedmorFødselOgMorHarIkkeRettValidering';
import DekningsgradSpørsmål from '../spørsmål/DekningsgradSpørsmål';
import { getDekningsgradFromString } from 'app/utils/getDekningsgradFromString';

const skalViseInfoOmPrematuruker = (fødselsdato: Date | undefined, termindato: Date | undefined): boolean => {
    if (fødselsdato === undefined || termindato === undefined) {
        return false;
    }

    const fødselsdatoEtterEllerLikFørsteJuli = dayjs(fødselsdato).isSameOrAfter(dayjs(new Date('2019-07-01')));

    return (
        dayjs(fødselsdato).add(7, 'weeks').add(3, 'days').isBefore(dayjs(termindato)) &&
        fødselsdatoEtterEllerLikFørsteJuli
    );
};

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
    const { søkersituasjon, annenForelder, barn, dekningsgrad } = useSøknad();
    const {
        person: { fornavn, mellomnavn, etternavn },
    } = useSøkerinfo();
    const lagretUttaksplanInfo = useUttaksplanInfo<FarMedmorFødselOgMorHarIkkeRettUttaksplanInfo>();

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const annenForelderHarIkkeRett = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepenger === false
        : false;

    const onValidSubmitHandler = (values: Partial<FarMedmorFødselOgMorHarIkkeRettFormData>) => {
        return [
            actionCreator.setUttaksplanInfo(mapFarMedmorFødselOgMorHarIkkeRettFormToState(values)),
            actionCreator.setDekningsgrad(getDekningsgradFromString(values.dekningsgrad)),
        ];
    };

    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTTAKSPLAN);

    const shouldRender = erFarEllerMedmor && erFødsel && annenForelderHarIkkeRett;

    if (!shouldRender) {
        return null;
    }

    const erDeltUttak = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.harRettPåForeldrepenger : false;

    const erMorUfør = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.erUfør : false;
    const navnMor = isAnnenForelderOppgitt(annenForelder)
        ? formaterNavn(annenForelder.fornavn, annenForelder.etternavn)
        : '';
    const navnFarMedmor = formaterNavn(fornavn, etternavn, mellomnavn);

    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const førsteUttaksdag = Uttaksdagen(ISOStringToDate(familiehendelsesdato)!).denneEllerNeste();
    const datoAvgrensinger = uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(dateToISOString(førsteUttaksdag));

    const fødselsdato = isFødtBarn(barn) ? ISOStringToDate(barn.fødselsdatoer[0]) : undefined;
    const termindato = isFødtBarn(barn) ? ISOStringToDate(barn.termindato) : undefined;
    const visInfoOmPrematuruker =
        søkersituasjon.situasjon === 'fødsel' ? skalViseInfoOmPrematuruker(fødselsdato, termindato) : false;
    const ekstraDagerGrunnetPrematurFødsel = visInfoOmPrematuruker
        ? Tidsperioden({ fom: fødselsdato!, tom: termindato! }).getAntallUttaksdager() - 1
        : undefined;

    const tilgjengeligeStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
        tilgjengeligeStønadskontoer80DTO,
        tilgjengeligeStønadskontoer100DTO,
        familiehendelsesdato,
        erMorUfør
    );

    return (
        <FarMedmorFødselOgMorHarIkkeRettFormComponents.FormikWrapper
            initialValues={getInitialFarMedmorFødselOgMorHarIkkeRettValues(dekningsgrad, lagretUttaksplanInfo)}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = farMedmorFødselOgMorHarIkkeRettQuestionsConfig.getVisbility({
                    ...formValues,
                    erMorUfør,
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
                                validate={validateStartdatoFarMedmor(intl)}
                            />
                        </Block>
                        <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                            <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                        </Block>
                    </FarMedmorFødselOgMorHarIkkeRettFormComponents.Form>
                );
            }}
        />
    );
};

export default FarMedmorFødselOgMorHarIkkeRett;
