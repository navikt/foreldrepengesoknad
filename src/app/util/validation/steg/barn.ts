import moment from 'moment';
import { Adopsjonsbarn, ForeldreansvarBarn, FødtBarn, UfødtBarn, Barn } from '../../../types/søknad/Barn';
import Søknad, { Søkersituasjon } from '../../../types/søknad/Søknad';
import { fødselsdatoerErFyltUt } from '../fields/fødselsdato';
import { Søkerinfo } from '../../../types/søkerinfo';
import { harAktivtArbeidsforhold } from '../../domain/arbeidsforhold';
import DateValues from '../values';
import { RegistrertBarn, RegistrertAnnenForelder } from '../../../types/Person';
import { findDateMostDistantInPast } from '../../dates/dates';

const fødtBarnErGyldig = (barn: FødtBarn) => {
    return (
        barn.fødselsdatoer !== undefined && barn.fødselsdatoer.length > 0 && fødselsdatoerErFyltUt(barn.fødselsdatoer)
    );
};

const adopsjonsbarnErGyldig = (barn: Adopsjonsbarn) => {
    const {
        fødselsdatoer,
        adopsjonsdato,
        adopsjonAvEktefellesBarn,
        adoptertIUtlandet,
        ankomstdato,
        omsorgsovertakelse
    } = barn;

    return (
        fødselsdatoer.length > 0 &&
        fødselsdatoer[0] !== undefined &&
        adopsjonsdato &&
        (adopsjonAvEktefellesBarn || adoptertIUtlandet === false || (adoptertIUtlandet && ankomstdato !== undefined)) &&
        omsorgsovertakelse !== undefined &&
        omsorgsovertakelse.length > 0
    );
};

const foreldreansvarBarnErGyldig = (barn: ForeldreansvarBarn) => {
    const { fødselsdatoer, foreldreansvarsdato } = barn;

    return foreldreansvarsdato && fødselsdatoer.length > 0;
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
    return søknad.temp.søknadenGjelderBarnValg.valgteBarn.length > 0;
};

export const barnErGyldig = (søknad: Søknad, søkerinfo: Søkerinfo): boolean => {
    const { situasjon, barn } = søknad;
    const skalLasteOppTerminbekreftelse = skalSøkerLasteOppTerminbekreftelse(søknad, søkerinfo);
    switch (situasjon) {
        case Søkersituasjon.FØDSEL:
            if (harValgtRegistrertBarn(søknad)) {
                return true;
            }
            return barn.erBarnetFødt
                ? fødtBarnErGyldig(barn as FødtBarn)
                : ufødtBarnErGyldig(barn as UfødtBarn, skalLasteOppTerminbekreftelse || false);

        case Søkersituasjon.ADOPSJON:
            return adopsjonsbarnErGyldig(barn as Adopsjonsbarn);
        case Søkersituasjon.FORELDREANSVAR:
            return foreldreansvarBarnErGyldig(barn as ForeldreansvarBarn);
        default:
            return false;
    }
};

export const skalSøkerLasteOppTerminbekreftelse = (søknad: Søknad, søkerinfo: Søkerinfo): boolean => {
    return (
        søknad.barn.erBarnetFødt === false &&
        !harAktivtArbeidsforhold(søkerinfo.arbeidsforhold, DateValues.today.toDate())
    );
};

export const getUniqeRegistrertAnnenForelderFromBarn = (
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
    const fødselsdato = findDateMostDistantInPast(valgteBarn.map((b: RegistrertBarn) => b.fødselsdato));
    return {
        fødselsdatoer: fødselsdato ? [fødselsdato] : [],
        antallBarn: valgteBarn.length > 0 ? valgteBarn.length : undefined,
        erBarnetFødt: valgteBarn.length > 0 || undefined
    };
};
