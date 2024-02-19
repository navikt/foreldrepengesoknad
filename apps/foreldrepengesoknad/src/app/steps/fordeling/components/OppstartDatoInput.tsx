import { Barn, ISOStringToDate, intlUtils, uttaksplanDatoavgrensninger } from '@navikt/fp-common';
import { Datepicker } from '@navikt/fp-form-hooks';
import { isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { validateOppstartsdato } from '../fordelingFormUtils';
import { SøkersituasjonFp } from '@navikt/fp-types';
import { getFamiliehendelsedatoDate, getTermindato } from 'app/utils/barnUtils';
import { DatepickerLimitations } from '@navikt/ds-datepicker';
import { getFørsteUttaksdagForeldrepengerFørFødsel } from '@navikt/uttaksplan/src/utils/uttaksdatoerUtils';

const getDatoAvgrensninger = (
    barn: Barn,
    søkersituasjon: SøkersituasjonFp,
    erAleneOmOmsorg: boolean,
): DatepickerLimitations => {
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFødsel = søkersituasjon.situasjon === 'fødsel';
    const erFarEllerMedmor = søkersituasjon.rolle !== 'mor';
    const erMorFødsel = !erFarEllerMedmor && erFødsel;
    const termindato = getTermindato(barn);
    const familiehendelsesdato = getFamiliehendelsedatoDate(barn);
    if (erAdopsjon) {
        return uttaksplanDatoavgrensninger.startdatoPermisjonAdopsjon(familiehendelsesdato);
    }
    if (erMorFødsel) {
        return uttaksplanDatoavgrensninger.startdatoFørTermin(familiehendelsesdato, termindato);
    }
    if (erFarEllerMedmor && erAleneOmOmsorg && barn.datoForAleneomsorg) {
        return uttaksplanDatoavgrensninger.startdatoPermisjonAleneomsorgFarMedmor(
            barn.datoForAleneomsorg,
            familiehendelsesdato,
        );
    }
    return uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(
        familiehendelsesdato,
        termindato,
        søkersituasjon.situasjon,
    );
};

const OppstartDatoInput = () => {
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkerData = notEmpty(useContextGetData(ContextDataType.SØKER_DATA));
    const erFarEllerMedmor = søkersituasjon.rolle !== 'mor';
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erAleneOmOmsorg = søkerData.erAleneOmOmsorg;
    const datoAvgrensninger = getDatoAvgrensninger(barn, søkersituasjon, erAleneOmOmsorg);
    const intl = useIntl();
    const minDato = ISOStringToDate(datoAvgrensninger.minDate);
    const maksDato = ISOStringToDate(datoAvgrensninger.maxDate);
    const familiehendelsesdato = getFamiliehendelsedatoDate(barn);
    const defaultDate =
        erFarEllerMedmor || erAdopsjon
            ? familiehendelsesdato
            : getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);
    return (
        <Datepicker
            name="oppstartDato"
            label={<FormattedMessage id="fordeling.oppstartDato.spørsmål" />}
            description={intlUtils(intl, 'fordeling.oppstartDato.description')}
            minDate={minDato}
            maxDate={maksDato}
            defaultMonth={defaultDate}
            validate={[
                isRequired(intlUtils(intl, 'fordeling.oppstartDato.måOppgis')),
                isValidDate(intlUtils(intl, 'fordeling.oppstartDato.gyldig')),
                validateOppstartsdato(intl, minDato, maksDato),
            ]}
        />
    );
};

export default OppstartDatoInput;
