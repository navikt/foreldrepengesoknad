import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import { DayOfWeek } from 'react-day-picker';
import { FormattedMessage, useIntl } from 'react-intl';
import { OppstartValg } from 'types/Fordeling';
import { getDatoForAleneomsorg, getErAleneOmOmsorg } from 'utils/annenForelderUtils';
import { getFamiliehendelsedato, getFamiliehendelsedatoDate, getFødselsdato, getTermindato } from 'utils/barnUtils';
import { ISOStringToDate } from 'utils/dateUtils';

import { AnnenForelder, Barn } from '@navikt/fp-common';
import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { SøkersituasjonFp } from '@navikt/fp-types';
import { getFørsteUttaksdagForeldrepengerFørFødsel, uttaksplanDatoavgrensninger } from '@navikt/fp-uttaksplan';
import { isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';

import { validateOppstartsdato } from '../fordelingFormUtils';

const getDefaultDateOppstartsdato = (
    minDate: Date | undefined,
    maxDate: Date | undefined,
    erFarEllerMedmor: boolean,
    erAdopsjon: boolean,
    familiehendelsesdato: Date,
) => {
    if (minDate && maxDate && dayjs(minDate).isSame(dayjs(maxDate), 'd')) {
        return minDate;
    }
    if (erFarEllerMedmor || erAdopsjon) {
        return familiehendelsesdato;
    }
    return getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);
};

interface DatepickerDateRange {
    from: string;
    to: string;
}

interface DatepickerLimitationsString {
    minDate?: string;
    maxDate?: string;
    invalidDateRanges?: DatepickerDateRange[];
    weekendsNotSelectable?: boolean;
    disabledDaysOfWeek?: DayOfWeek;
}

const getDatoAvgrensninger = (
    barn: Barn,
    søkersituasjon: SøkersituasjonFp,
    annenForelder: AnnenForelder,
): DatepickerLimitationsString => {
    const erAleneOmOmsorg = getErAleneOmOmsorg(annenForelder);
    const datoForAleneomsorg = getDatoForAleneomsorg(annenForelder);
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erFarEllerMedmor = søkersituasjon.rolle !== 'mor';
    const erMorFødsel = !erFarEllerMedmor && erFødsel;
    const termindato = getTermindato(barn);
    const fødselsdato = getFødselsdato(barn);
    const termindatoDate = ISOStringToDate(termindato);
    const fødselsdatoDate = ISOStringToDate(fødselsdato);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = getFamiliehendelsedatoDate(barn);
    if (erAdopsjon) {
        return uttaksplanDatoavgrensninger.startdatoPermisjonAdopsjon(familiehendelsesdato);
    }
    if (erMorFødsel) {
        return uttaksplanDatoavgrensninger.startdatoPermisjonMor(fødselsdatoDate, termindatoDate);
    }
    if (erFarEllerMedmor && erAleneOmOmsorg && datoForAleneomsorg) {
        return uttaksplanDatoavgrensninger.startdatoPermisjonAleneomsorgFarMedmor(
            datoForAleneomsorg,
            familiehendelsesdato,
        );
    }
    return uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(
        familiehendelsesdatoDate,
        termindatoDate,
        søkersituasjon.situasjon,
    );
};
interface Props {
    oppstartValg: OppstartValg | undefined;
}

export const OppstartDatoInput = ({ oppstartValg }: Props) => {
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const erFarEllerMedmor = søkersituasjon.rolle !== 'mor';
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const datoAvgrensninger = getDatoAvgrensninger(barn, søkersituasjon, annenForelder);
    const intl = useIntl();
    const minDato = ISOStringToDate(datoAvgrensninger.minDate);
    const maksDato = ISOStringToDate(datoAvgrensninger.maxDate);
    const familiehendelsesdato = getFamiliehendelsedatoDate(barn);
    const defaultDate = getDefaultDateOppstartsdato(
        minDato,
        maksDato,
        erFarEllerMedmor,
        erAdopsjon,
        familiehendelsesdato,
    );

    return (
        <RhfDatepicker
            name="oppstartDato"
            label={
                oppstartValg === OppstartValg.ANNEN_DATO ? (
                    <FormattedMessage id="fordeling.oppstartDato.input" />
                ) : (
                    <FormattedMessage id="fordeling.oppstartDato.spørsmål" />
                )
            }
            description={intl.formatMessage({ id: 'fordeling.oppstartDato.description' })}
            minDate={minDato}
            maxDate={maksDato}
            showMonthAndYearDropdowns={true}
            defaultMonth={defaultDate}
            disableWeekends={true}
            validate={[
                isRequired(intl.formatMessage({ id: 'fordeling.oppstartDato.måOppgis' })),
                isValidDate(intl.formatMessage({ id: 'fordeling.oppstartDato.gyldig' })),
                validateOppstartsdato(intl, minDato, maksDato),
            ]}
        />
    );
};
