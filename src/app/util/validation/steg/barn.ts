import moment from 'moment';
import {
    Adopsjonsbarn,
    ForeldreansvarBarn,
    FødtBarn,
    UfødtBarn,
    Barn,
    isUfødtBarn,
    isFødtBarn,
    isAdopsjonsbarn,
    isForeldreansvarsbarn
} from '../../../types/søknad/Barn';
import Søknad from '../../../types/søknad/Søknad';
import { fødselsdatoerErFyltUt } from '../fødselsdato';
import { Søkerinfo } from '../../../types/søkerinfo';
import { harAktivtArbeidsforhold } from '../../domain/arbeidsforhold';
import { RegistrertBarn, RegistrertAnnenForelder } from '../../../types/Person';
import { findOldestDate } from '../../dates/dates';
import { Validator } from 'common/lib/validation/types';
import { InjectedIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Arbeidsforhold from '../../../types/Arbeidsforhold';

const fødtBarnErGyldig = (barn: FødtBarn) => {
    return (
        barn.fødselsdatoer !== undefined && barn.fødselsdatoer.length > 0 && fødselsdatoerErFyltUt(barn.fødselsdatoer)
    );
};

const adopsjonsbarnErGyldig = (barn: Adopsjonsbarn) => {
    const { fødselsdatoer, adopsjonsdato, adopsjonAvEktefellesBarn, adoptertIUtlandet, ankomstdato } = barn;
    const adopsjonAvEktefellesBarnTruthy = adopsjonAvEktefellesBarn !== undefined && adopsjonAvEktefellesBarn;
    const adoptertIUtlandetTruthy = adoptertIUtlandet !== undefined && adoptertIUtlandet;

    return (
        fødselsdatoer &&
        fødselsdatoer.length > 0 &&
        fødselsdatoer[0] !== undefined &&
        adopsjonsdato !== undefined &&
        (adopsjonAvEktefellesBarnTruthy ||
            adoptertIUtlandet === false ||
            (adoptertIUtlandetTruthy && ankomstdato !== undefined))
    );
};

const foreldreansvarBarnErGyldig = (barn: ForeldreansvarBarn) => {
    const { fødselsdatoer, foreldreansvarsdato } = barn;
    return foreldreansvarsdato && fødselsdatoer && fødselsdatoer.length > 0;
};

const ufødtBarnErGyldig = (barn: UfødtBarn, skalLasteOppTerminbekreftelse: boolean) => {
    const { termindato, terminbekreftelseDato } = barn;
    if (!termindato) {
        return false;
    }
    if (
        skalLasteOppTerminbekreftelse &&
        barn.terminbekreftelse &&
        barn.terminbekreftelse.length > 0 &&
        terminbekreftelseDato === undefined
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
    const skalLasteOppTerminbekreftelse = skalSøkerLasteOppTerminbekreftelse(søknad, søkerinfo);
    if (isFødtBarn(barn, situasjon) || isUfødtBarn(barn, situasjon)) {
        if (harValgtRegistrertBarn(søknad)) {
            return true;
        }
        return isFødtBarn(barn, situasjon)
            ? fødtBarnErGyldig(barn)
            : ufødtBarnErGyldig(barn, skalLasteOppTerminbekreftelse || false);
    }
    if (isAdopsjonsbarn(barn, situasjon)) {
        return adopsjonsbarnErGyldig(barn);
    }
    if (isForeldreansvarsbarn(barn, situasjon)) {
        return foreldreansvarBarnErGyldig(barn);
    }
    return false;
};

export const skalSøkerLasteOppTerminbekreftelse = (søknad: Søknad, søkerinfo: Søkerinfo): boolean => {
    let trengerLasteOppterminbekreftelse = false;

    if (søknad.barn.erBarnetFødt === false && !harAktivtArbeidsforhold(søkerinfo.arbeidsforhold)) {
        trengerLasteOppterminbekreftelse = true;
    }
    if (søkerinfo.arbeidsforhold.length < 1) {
        trengerLasteOppterminbekreftelse = true;
    }
    const { barn } = søknad;
    if (
        isUfødtBarn(barn, søknad.situasjon) &&
        barn.termindato !== undefined &&
        !harAktivtArbeidsforhold(søkerinfo.arbeidsforhold)
    ) {
        søkerinfo.arbeidsforhold.forEach((a: Arbeidsforhold) => {
            const sluttdato = a.tom;
            if (sluttdato) {
                if (barn.termindato > sluttdato) {
                    trengerLasteOppterminbekreftelse = true;
                }
                if (barn.termindato < sluttdato) {
                    trengerLasteOppterminbekreftelse = false;
                }
            }
        });
    }
    return trengerLasteOppterminbekreftelse;
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
                fødselsdato: moment(annenForelder.fødselsdato).toDate()
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
            fødselsdatoer: []
        };
    }
    const fødselsdato = findOldestDate(valgteBarn.map((b: RegistrertBarn) => b.fødselsdato));
    return {
        fødselsdatoer: fødselsdato ? [fødselsdato] : [],
        antallBarn: valgteBarn.length > 0 ? valgteBarn.length : undefined,
        erBarnetFødt: valgteBarn.length > 0 || undefined
    };
};

const barnErFødtFørAnkomstNorge = (fødselsdato: Date, ankomstdato: Date): boolean => {
    return moment(fødselsdato).isSameOrBefore(ankomstdato, 'day');
};

export const getAdopsjonAnkomstdatoValidatorer = (barn: Adopsjonsbarn, intl: InjectedIntl): Validator[] | undefined => {
    const { fødselsdatoer, ankomstdato } = barn;
    if (fødselsdatoer && fødselsdatoer.length > 0 && ankomstdato !== undefined) {
        return [
            {
                test: () => barnErFødtFørAnkomstNorge(barn.fødselsdatoer[0], ankomstdato),
                failText: getMessage(intl, 'valideringsfeil.fodselsdato.etterAdopsjonsdato')
            }
        ];
    }
    return undefined;
};
