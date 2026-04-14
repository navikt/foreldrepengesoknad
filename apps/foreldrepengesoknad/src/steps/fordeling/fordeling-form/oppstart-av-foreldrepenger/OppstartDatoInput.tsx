import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { AnnenForelder } from 'types/AnnenForelder';
import { Fordeling, OppstartValg } from 'types/Fordeling';
import { getDatoForAleneomsorg, getErAleneOmOmsorg } from 'utils/annenForelderUtils';
import { getFørsteUttaksdag2UkerFørFødsel } from 'utils/arbeidsforholdUtils';
import { getFamiliehendelsedato, getFamiliehendelsedatoDate, getFødselsdato, getTermindato } from 'utils/barnUtils';
import { andreAugust2022ReglerGjelder } from 'utils/dateUtils';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { Barn, Situasjon, SøkersituasjonFp } from '@navikt/fp-types';
import { UttaksdagenString } from '@navikt/fp-utils';
import { isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';

import { validateOppstartsdato } from '../fordelingFormUtils';
import { getFørsteUttaksdagForeldrepengerFørFødsel } from './MorOppstartInformasjon';

const MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL = 12;
const MAKS_PERMISJONSLENGDE_I_ÅR = 3;

const getDefaultDateOppstartsdato = (
    minDate: string | undefined,
    maxDate: string | undefined,
    erFarEllerMedmor: boolean,
    erAdopsjon: boolean,
    familiehendelsesdato: string,
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
}

const sisteMuligePermisjonsdag = (familiehendelsedato: string): string => {
    const startDato = UttaksdagenString.denneEllerNeste(familiehendelsedato).getDato();
    return UttaksdagenString.denneEllerNeste(
        dayjs(startDato).add(MAKS_PERMISJONSLENGDE_I_ÅR, 'years').format(ISO_DATE_FORMAT),
    ).getDato();
};

const defaultPermisjonsperiodeAvgrensning = (familiehendelsesdato: string): DatepickerLimitationsString => {
    const minDato = UttaksdagenString.denneEllerNeste(familiehendelsesdato).getDato();
    const maksDato = sisteMuligePermisjonsdag(familiehendelsesdato);
    return {
        minDate: minDato,
        maxDate: maksDato,
        weekendsNotSelectable: true,
    };
};

const startdatoPermisjonAdopsjon = (familiehendelsesdato: string): DatepickerLimitationsString => {
    return defaultPermisjonsperiodeAvgrensning(familiehendelsesdato);
};

const getSisteDatoForOppstartMor = (familiehendelsesdato: string): string => {
    return UttaksdagenString.denneEllerNeste(familiehendelsesdato).getDato();
};

const startDatoMorUfødtBarn = (termindato: string) => {
    const sisteOppstartsdato = getSisteDatoForOppstartMor(termindato);
    const førsteOppstartsdato = dayjs(sisteOppstartsdato)
        .subtract(MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL, 'week')
        .format(ISO_DATE_FORMAT);
    return {
        minDate: førsteOppstartsdato,
        maxDate: sisteOppstartsdato,
        weekendsNotSelectable: true,
    };
};

const startDatoMorFødtBarn = (termindato: string | undefined, fødselsdato: string) => {
    const sisteOppstartsdato = getSisteDatoForOppstartMor(fødselsdato);
    const termindatoMinus12Uker =
        termindato === undefined
            ? undefined
            : dayjs(UttaksdagenString.denneEllerNeste(termindato).getDato())
                  .subtract(MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL, 'weeks')
                  .format(ISO_DATE_FORMAT);
    const erFødselsdatoFørTermindatoMinus12Uker =
        termindato === undefined ? false : dayjs(fødselsdato).isBefore(dayjs(termindatoMinus12Uker), 'd');

    if (erFødselsdatoFørTermindatoMinus12Uker) {
        return {
            minDate: sisteOppstartsdato,
            maxDate: sisteOppstartsdato,
            weekendsNotSelectable: true,
        };
    } else {
        const tidligstOppstartsdato =
            termindatoMinus12Uker ??
            dayjs(UttaksdagenString.denneEllerNeste(fødselsdato).getDato())
                .subtract(MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL, 'weeks')
                .format(ISO_DATE_FORMAT);
        return {
            minDate: tidligstOppstartsdato,
            maxDate: sisteOppstartsdato,
            weekendsNotSelectable: true,
        };
    }
};

const startdatoPermisjonMor = (
    fødselsdato: string | undefined,
    termindato: string | undefined,
): DatepickerLimitationsString => {
    if (!fødselsdato && termindato) {
        return startDatoMorUfødtBarn(termindato);
    } else if (fødselsdato) {
        return startDatoMorFødtBarn(termindato, fødselsdato);
    } else {
        throw new Error('Mangler fødselsdato eller termindato på barnet.');
    }
};

const startdatoPermisjonAleneomsorgFarMedmor = (
    datoForAleneomsorg: string,
    familiehendelsesdato: string,
): DatepickerLimitationsString => {
    const minDato = UttaksdagenString.denneEllerNeste(datoForAleneomsorg).getDato();
    const maksDato = sisteMuligePermisjonsdag(familiehendelsesdato);
    return {
        minDate: minDato,
        maxDate: maksDato,
        weekendsNotSelectable: true,
    };
};

const startdatoPermisjonFarMedmor = (
    familiehendelsesdato: string,
    termindato: string | undefined,
    situasjon: Situasjon,
): DatepickerLimitationsString => {
    const defaultAvgrensning = defaultPermisjonsperiodeAvgrensning(familiehendelsesdato);
    if (situasjon === 'fødsel' && andreAugust2022ReglerGjelder(familiehendelsesdato)) {
        return {
            ...defaultAvgrensning,
            minDate: getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato),
        };
    }
    return defaultAvgrensning;
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
    const fødselsdato = getFødselsdato(barn);
    const termindatoDate = termindato;
    const fødselsdatoDate = fødselsdato;
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const familiehendelsesdatoDate = getFamiliehendelsedatoDate(barn);
    if (erAdopsjon) {
        return startdatoPermisjonAdopsjon(familiehendelsesdato);
    }
    if (erMorFødsel) {
        return startdatoPermisjonMor(fødselsdatoDate, termindatoDate);
    }
    if (erFarEllerMedmor && erAleneOmOmsorg && datoForAleneomsorg) {
        return startdatoPermisjonAleneomsorgFarMedmor(datoForAleneomsorg, familiehendelsesdato);
    }
    return startdatoPermisjonFarMedmor(familiehendelsesdatoDate, termindatoDate, søkersituasjon.situasjon);
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
    const minDato = datoAvgrensninger.minDate;
    const maksDato = datoAvgrensninger.maxDate;
    const familiehendelsesdato = getFamiliehendelsedatoDate(barn);
    const defaultDate = getDefaultDateOppstartsdato(
        minDato,
        maksDato,
        erFarEllerMedmor,
        erAdopsjon,
        familiehendelsesdato,
    );

    const { control } = useFormContext<Fordeling>();

    return (
        <RhfDatepicker
            name="oppstartDato"
            control={control}
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
