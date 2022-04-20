import { IntlShape } from 'react-intl';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import moment from 'moment';
import { isISODateString } from 'nav-datovelger';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';
import { visTermindato } from 'app/steg/barn/relasjonTilBarnFødselSteg/visibility/visibilityFunctions';
import Arbeidsforhold from '../../../types/Arbeidsforhold';
import { RegistrertAnnenForelder, RegistrertBarn } from '../../../types/Person';
import { Søkerinfo } from '../../../types/søkerinfo';
import {
    Adopsjonsbarn,
    Barn,
    ForeldreansvarBarn,
    FødtBarn,
    isAdopsjonsbarn,
    isForeldreansvarsbarn,
    isFødtBarn,
    isUfødtBarn,
    UfødtBarn,
} from '../../../types/søknad/Barn';
import Søknad, { SøkerRolle } from '../../../types/søknad/Søknad';
import { findOldestDate } from '../../dates/dates';
import { harAktivtArbeidsforhold } from '../../domain/arbeidsforhold';
import { erGyldigDato, hasValueRule } from '../common';
import { dateMoreThan10WeeksAgo } from '../values';

const fødtBarnErGyldig = (barn: FødtBarn, rolle: SøkerRolle) => {
    const fødselsdatoErFyltUt = barn.fødselsdatoer !== undefined && barn.fødselsdatoer.length > 0;
    const gyldigFødselsdato = fødselsdatoErFyltUt ? ISOStringToDate(barn.fødselsdatoer[0]) : undefined;
    let skalViseTermindato = true;

    if (rolle !== SøkerRolle.MOR && gyldigFødselsdato) {
        skalViseTermindato = moment(gyldigFødselsdato).isSameOrAfter(dateMoreThan10WeeksAgo);
    }

    return skalViseTermindato ? fødselsdatoErFyltUt && barn.termindato !== undefined : fødselsdatoErFyltUt;
};

const adopsjonsbarnErGyldig = (barn: Adopsjonsbarn): boolean => {
    const { fødselsdatoer, adopsjonsdato, adopsjonAvEktefellesBarn, adoptertIUtlandet, ankomstdato } = barn;
    const adopsjonAvEktefellesBarnTruthy = adopsjonAvEktefellesBarn !== undefined && adopsjonAvEktefellesBarn;
    const adoptertIUtlandetTruthy = adoptertIUtlandet !== undefined && adoptertIUtlandet;

    return (
        fødselsdatoer !== undefined &&
        fødselsdatoer.length > 0 &&
        fødselsdatoer[0] !== undefined &&
        adopsjonsdato !== undefined &&
        (adopsjonAvEktefellesBarnTruthy ||
            adoptertIUtlandet === false ||
            (adoptertIUtlandetTruthy && ankomstdato !== undefined))
    );
};

const foreldreansvarBarnErGyldig = (barn: ForeldreansvarBarn): boolean => {
    const { fødselsdatoer, foreldreansvarsdato } = barn;
    return isISODateString(foreldreansvarsdato) && fødselsdatoer && fødselsdatoer.length > 0;
};

const ufødtBarnErGyldig = (barn: UfødtBarn, skalLasteOppTerminbekreftelse: boolean): boolean => {
    const { termindato, terminbekreftelseDato } = barn;
    if (!termindato) {
        return false;
    }
    if (
        skalLasteOppTerminbekreftelse &&
        (barn.terminbekreftelse === undefined || terminbekreftelseDato === undefined)
    ) {
        return false;
    }
    return true;
};

const harValgtRegistrertBarn = (søknad: Søknad): boolean => {
    const { søknadenGjelderBarnValg } = søknad.ekstrainfo;
    return søknadenGjelderBarnValg !== undefined && søknadenGjelderBarnValg.valgteBarn.length > 0;
};

export const barnErGyldig = (søknad: Søknad, søkerinfo: Søkerinfo): boolean => {
    const { situasjon, barn } = søknad;
    if (isFødtBarn(barn, situasjon) || isUfødtBarn(barn, situasjon)) {
        if (harValgtRegistrertBarn(søknad)) {
            const { søknadenGjelderBarnValg } = søknad.ekstrainfo;
            const valgtBarn = søknadenGjelderBarnValg!.valgteBarn[0];
            return visTermindato(valgtBarn.fødselsdato, søknad.søker.rolle) ? barn.termindato !== undefined : true;
        }
        return isFødtBarn(barn, situasjon)
            ? fødtBarnErGyldig(barn, søknad.søker.rolle)
            : ufødtBarnErGyldig(barn, skalSøkerLasteOppTerminbekreftelse(søknad, søkerinfo.arbeidsforhold) || false);
    }
    if (isAdopsjonsbarn(barn, situasjon)) {
        return adopsjonsbarnErGyldig(barn);
    }
    if (isForeldreansvarsbarn(barn, situasjon)) {
        return foreldreansvarBarnErGyldig(barn);
    }
    return false;
};

export const skalSøkerLasteOppTerminbekreftelse = (søknad: Søknad, arbeidsforhold: Arbeidsforhold[]): boolean => {
    const { barn, situasjon } = søknad;
    return isUfødtBarn(barn, situasjon) && !harAktivtArbeidsforhold(arbeidsforhold, ISOStringToDate(barn.termindato));
};

export const getUniqueRegistrertAnnenForelderFromBarn = (
    barn?: RegistrertBarn[]
): RegistrertAnnenForelder | undefined => {
    if (!barn || barn.length === 0) {
        return undefined;
    }
    const foreldre: RegistrertAnnenForelder[] = [];
    barn.forEach((b) => {
        const { annenForelder } = b;
        if (annenForelder && !foreldre.find((f) => f.fnr === annenForelder.fnr)) {
            foreldre.push({
                ...annenForelder,
                fødselsdato: moment(annenForelder.fødselsdato).toDate(),
            });
        }
    });
    return foreldre.length === 1 ? foreldre[0] : undefined;
};

export const getBarnInfoFraRegistrertBarnValg = (
    gjelderAnnetBarn: boolean | undefined,
    valgteBarn: RegistrertBarn[]
): Partial<Barn> => {
    if (gjelderAnnetBarn === true) {
        return {
            fødselsdatoer: [],
        };
    }
    const fødselsdato = findOldestDate(valgteBarn.map((b: RegistrertBarn) => b.fødselsdato));
    return {
        fødselsdatoer: fødselsdato ? [dateToISOString(fødselsdato)] : [],
        antallBarn: valgteBarn.length > 0 ? valgteBarn.length : undefined,
        erBarnetFødt: valgteBarn.length > 0 || undefined,
    };
};

const barnErFødtFørAnkomstNorge = (fødselsdato: Date, ankomstdato: Date): boolean => {
    return moment(fødselsdato).isSameOrBefore(ankomstdato, 'day');
};

export const getAdopsjonAnkomstdatoValidatorer = (barn: Adopsjonsbarn, intl: IntlShape): Validator[] | undefined => {
    const { fødselsdatoer, ankomstdato } = barn;
    const fødselsdatoDate = fødselsdatoer && fødselsdatoer.length > 0 ? ISOStringToDate(fødselsdatoer[0]) : undefined;
    const ankomstdatoDate = ISOStringToDate(ankomstdato);
    const regler = [
        hasValueRule(ankomstdato, getMessage(intl, 'valideringsfeil.adopsjonsdato.ankomstDato.duMåOppgi')),
        erGyldigDato(ankomstdato, getMessage(intl, 'valideringsfeil.adopsjonsdato.ankomstDato')),
    ];

    if (fødselsdatoDate && ankomstdatoDate) {
        regler.push({
            test: () => barnErFødtFørAnkomstNorge(fødselsdatoDate, ankomstdatoDate),
            failText: getMessage(intl, 'valideringsfeil.fodselsdato.etterAdopsjonsdato'),
        });

        return regler;
    }

    return regler;
};
