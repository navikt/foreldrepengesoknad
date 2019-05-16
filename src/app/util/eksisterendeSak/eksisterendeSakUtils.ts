import Søknad, { Søkersituasjon, SøkerRolle } from '../../types/søknad/Søknad';
import {
    EksisterendeSak,
    FamiliehendelsesType,
    Saksgrunnlag,
    Saksperiode,
    PeriodeResultatType,
    UttakArbeidType,
    ArbeidsgiverInfo
} from '../../types/EksisterendeSak';
import { Barn } from '../../types/søknad/Barn';
import AnnenForelder from '../../types/søknad/AnnenForelder';
import { Søker } from '../../types/søknad/Søker';
import { Søkerinfo } from '../../types/søkerinfo';
import Person from '../../types/Person';
import { Kjønn } from '../../types/common';
import Sak, { AnnenPart } from 'app/types/søknad/Sak';
import { StønadskontoType, SaksperiodeUtsettelseÅrsakType, Arbeidsform } from 'app/types/uttaksplan/periodetyper';
import { UttaksplanDTO } from 'app/api/types/uttaksplanDTO';
import mapSaksperioderTilUttaksperioder from './mapSaksperioderTilUttaksperioder';
import { isFeatureEnabled, Feature } from 'app/Feature';

export const getArbeidsformFromUttakArbeidstype = (arbeidstype: UttakArbeidType): Arbeidsform => {
    switch (arbeidstype) {
        case UttakArbeidType.SELVSTENDIG_NÆRINGSDRIVENDE:
            return Arbeidsform.selvstendignæringsdrivende;
        case UttakArbeidType.FRILANS:
            return Arbeidsform.frilans;
        default:
            return Arbeidsform.arbeidstaker;
    }
};

export const getEksisterendeSakFromDTO = (dto: UttaksplanDTO): EksisterendeSak | undefined => {
    const {
        grunnlag: {
            dekningsgrad,
            familieHendelseDato,
            familieHendelseType,
            søkerKjønn,
            annenForelderKjønn,
            ...restGrunnlag
        },
        perioder
    } = dto;

    try {
        const grunnlag: Saksgrunnlag = {
            ...restGrunnlag,
            erBarnetFødt: familieHendelseType !== FamiliehendelsesType.TERM,
            dekningsgrad: dekningsgrad === 100 ? '100' : '80',
            familieHendelseDato: new Date(familieHendelseDato),
            familieHendelseType: familieHendelseType as FamiliehendelsesType
        };

        const saksperioder = perioder.map((p): Saksperiode => {
            const {
                periodeResultatType,
                periode,
                stønadskontotype,
                utsettelsePeriodeType,
                arbeidsgiverInfo,
                uttakArbeidType,
                ...periodeRest
            } = p;
            return {
                ...periodeRest,
                periodeResultatType: periodeResultatType as PeriodeResultatType,
                stønadskontotype: stønadskontotype as StønadskontoType,
                utsettelsePeriodeType: utsettelsePeriodeType as SaksperiodeUtsettelseÅrsakType,
                arbeidsgiverInfo: arbeidsgiverInfo as ArbeidsgiverInfo,
                uttakArbeidType: uttakArbeidType as UttakArbeidType,
                tidsperiode: {
                    fom: new Date(periode.fom),
                    tom: new Date(periode.tom)
                }
            };
        });

        const uttaksplan = kanUttaksplanGjennskapesFraSak(saksperioder)
            ? mapSaksperioderTilUttaksperioder(saksperioder, grunnlag)
            : undefined;

        const sak: EksisterendeSak = {
            grunnlag,
            saksperioder,
            uttaksplan
        };

        return sak;
    } catch (e) {
        return undefined;
    }
};

const getSøkersituasjonFromSaksgrunnlag = (grunnlag: Saksgrunnlag): Søkersituasjon | undefined => {
    switch (grunnlag.familieHendelseType) {
        case FamiliehendelsesType.TERM:
        case FamiliehendelsesType.FØDSEL:
            return Søkersituasjon.FØDSEL;
        case FamiliehendelsesType.ADOPSJON:
            return Søkersituasjon.ADOPSJON;
        case FamiliehendelsesType.OMSORGSOVERTAKELSE:
            return undefined;
    }
};

const getSøkerrolleFromSaksgrunnlag = (
    person: Person,
    situasjon: Søkersituasjon,
    grunnlag: Saksgrunnlag
): SøkerRolle | undefined => {
    const { søkerErFarEllerMedmor } = grunnlag;
    const søkerErKvinne = person.kjønn === Kjønn.KVINNE;
    switch (situasjon) {
        case Søkersituasjon.FØDSEL:
        case Søkersituasjon.ADOPSJON:
            if (søkerErKvinne) {
                return søkerErFarEllerMedmor ? SøkerRolle.MEDMOR : SøkerRolle.MOR;
            }
            return SøkerRolle.FAR;
    }
    return undefined;
};

const getSøkerFromSaksgrunnlag = (
    person: Person,
    situasjon: Søkersituasjon,
    grunnlag: Saksgrunnlag
): Partial<Søker> | undefined => {
    return {
        erAleneOmOmsorg: grunnlag.søkerErFarEllerMedmor
            ? grunnlag.farMedmorErAleneOmOmsorg
            : grunnlag.morErAleneOmOmsorg,
        rolle: getSøkerrolleFromSaksgrunnlag(person, situasjon, grunnlag)
    };
};

const getBarnFromSaksgrunnlag = (situasjon: Søkersituasjon, sak: Saksgrunnlag): Partial<Barn> | undefined => {
    switch (situasjon) {
        case Søkersituasjon.FØDSEL:
            return {
                antallBarn: sak.antallBarn,
                erBarnetFødt: sak.erBarnetFødt,
                ...(sak.erBarnetFødt
                    ? {
                          fødselsdatoer: [sak.familieHendelseDato]
                      }
                    : {
                          termindato: sak.familieHendelseDato
                      })
            };
        case Søkersituasjon.ADOPSJON:
            return {
                antallBarn: sak.antallBarn,
                adopsjonsdato: sak.familieHendelseDato,
                fødselsdatoer: [sak.familieHendelseDato]
            };
    }
    return undefined;
};

const getAnnenForelderFromSaksgrunnlag = (
    situasjon: Søkersituasjon,
    sak: Saksgrunnlag,
    annenPart?: AnnenPart
): Partial<AnnenForelder> | undefined => {
    const { søkerErFarEllerMedmor } = sak;
    switch (situasjon) {
        case Søkersituasjon.FØDSEL:
        case Søkersituasjon.ADOPSJON:
            if (søkerErFarEllerMedmor) {
                return {
                    fornavn: annenPart ? annenPart.navn.fornavn : 'mor',
                    etternavn: annenPart ? annenPart.navn.etternavn : '',
                    erUfør: sak.morErUfør,
                    harRettPåForeldrepenger: sak.morHarRett,
                    fnr: annenPart ? annenPart.fnr : undefined,
                    kanIkkeOppgis: annenPart === undefined
                };
            }
            return {
                fornavn: annenPart ? annenPart.navn.fornavn : 'Far eller medmor',
                etternavn: annenPart ? annenPart.navn.etternavn : '',
                harRettPåForeldrepenger: sak.farMedmorHarRett,
                fnr: annenPart ? annenPart.fnr : undefined,
                kanIkkeOppgis: annenPart === undefined
            };
    }
    return undefined;
};

const saksperiodeKanKonverteresTilPeriode = (periode: Saksperiode) => {
    if (
        periode.flerbarnsdager === false &&
        (isFeatureEnabled(Feature.mapOpphold) ? true : periode.gjelderAnnenPart === false) &&
        (isFeatureEnabled(Feature.visAvslåttPeriode)
            ? true
            : periode.periodeResultatType === PeriodeResultatType.INNVILGET) &&
        periode.samtidigUttak === false
    ) {
        return true;
    }
    return false;
};

export const kanUttaksplanGjennskapesFraSak = (perioder: Saksperiode[]): boolean => {
    const noenPerioderKanIkkeGjennskapes = perioder.some(
        (periode) => saksperiodeKanKonverteresTilPeriode(periode) === false
    );
    return noenPerioderKanIkkeGjennskapes === false;
};

export const opprettSøknadFraEksisterendeSak = (
    søkerinfo: Søkerinfo,
    eksisterendeSak: EksisterendeSak,
    sak: Sak
): Partial<Søknad> | undefined => {
    const { grunnlag, uttaksplan } = eksisterendeSak;
    const situasjon = getSøkersituasjonFromSaksgrunnlag(grunnlag);

    if (!situasjon) {
        return undefined;
    }

    const søker = getSøkerFromSaksgrunnlag(søkerinfo.person, situasjon, grunnlag);
    const barn = getBarnFromSaksgrunnlag(situasjon, grunnlag);
    const annenForelder = getAnnenForelderFromSaksgrunnlag(situasjon, grunnlag, sak.annenPart);

    if (!søker || !barn || !annenForelder) {
        return undefined;
    }

    const søknad: Partial<Søknad> = {
        situasjon,
        søker: søker as Søker,
        barn: barn as Barn,
        annenForelder: annenForelder as AnnenForelder,
        erEndringssøknad: true,
        dekningsgrad: grunnlag.dekningsgrad,
        uttaksplan: uttaksplan || []
    };
    return søknad;
};
