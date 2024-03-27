import { getFørsteUttaksdagForeldrepengerFørFødsel } from '@navikt/uttaksplan/src/utils/uttaksdatoerUtils';
import dayjs from 'dayjs';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { AnnenForelder, Barn, uttaksplanDatoavgrensninger } from '@navikt/fp-common';
import { Datepicker } from '@navikt/fp-form-hooks';
import { DatepickerLimitationsString, ISOStringToDate } from '@navikt/fp-formik';
import { SøkersituasjonFp } from '@navikt/fp-types';
import { isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { OppstartValg } from 'app/context/types/Fordeling';
import { getDatoForAleneomsorg, getErAleneOmOmsorg } from 'app/utils/annenForelderUtils';
import { getFamiliehendelsedato, getFamiliehendelsedatoDate, getTermindato } from 'app/utils/barnUtils';

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
    const termindatoDate = ISOStringToDate(termindato);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = getFamiliehendelsedatoDate(barn);
    if (erAdopsjon) {
        return uttaksplanDatoavgrensninger.startdatoPermisjonAdopsjon(familiehendelsesdato);
    }
    if (erMorFødsel) {
        return uttaksplanDatoavgrensninger.startdatoFørTermin(familiehendelsesdatoDate, termindatoDate);
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

const OppstartDatoInput: React.FunctionComponent<Props> = ({ oppstartValg }) => {
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
    const spørsmålId =
        oppstartValg === OppstartValg.ANNEN_DATO ? 'fordeling.oppstartDato.input.' : 'fordeling.oppstartDato.spørsmål';

    return (
        <Datepicker
            name="oppstartDato"
            label={<FormattedMessage id={spørsmålId} />}
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

export default OppstartDatoInput;
