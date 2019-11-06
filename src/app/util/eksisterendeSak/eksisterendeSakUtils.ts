import moment from 'moment';
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
import { guid } from 'nav-frontend-js-utils';
import { cloneDeep } from 'lodash';
import { Barn } from '../../types/søknad/Barn';
import AnnenForelder from '../../types/søknad/AnnenForelder';
import { Søker } from '../../types/søknad/Søker';
import { Søkerinfo } from '../../types/søkerinfo';
import Person from '../../types/Person';
import { Kjønn } from '../../types/common';
import Sak, { AnnenPart } from 'app/types/søknad/Sak';
import {
    StønadskontoType,
    SaksperiodeUtsettelseÅrsakType,
    Arbeidsform,
    MorsAktivitet,
    OppholdÅrsakType
} from 'app/types/uttaksplan/periodetyper';
import { UttaksplanDTO, UttaksplanPeriodeDTO, MorsAktivitetDto, OppholdsÅrsak } from 'app/api/types/uttaksplanDTO';
import mapSaksperioderTilUttaksperioder from './mapSaksperioderTilUttaksperioder';
import { Tidsperioden } from '../uttaksplan/Tidsperioden';
import { getRelevantFamiliehendelseDato } from '../dates/dates';
import { getFamilieHendelseType } from '../domain/getFamilieHendelseType';
import { FamiliehendelseDatoer } from 'app/types/søknad/FamiliehendelseDatoer';
import { Dekningsgrad } from 'common/types';

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

export const getStønadskontoTypeFromOppholdsÅrsak = (årsak: OppholdsÅrsak): StønadskontoType | undefined => {
    switch (årsak) {
        case OppholdsÅrsak.UTTAK_FEDREKVOTE_ANNEN_FORELDER:
            return StønadskontoType.Fedrekvote;
        case OppholdsÅrsak.UTTAK_FELLESP_ANNEN_FORELDER:
            return StønadskontoType.Fellesperiode;
        case OppholdsÅrsak.UTTAK_MØDREKVOTE_ANNEN_FORELDER:
            return StønadskontoType.Mødrekvote;
        default:
            return undefined;
    }
};

export const getStønadskontoTypeFromOppholdÅrsakType = (årsak: OppholdÅrsakType): StønadskontoType => {
    switch (årsak) {
        case OppholdÅrsakType.UttakFedrekvoteAnnenForelder:
            return StønadskontoType.Fedrekvote;
        case OppholdÅrsakType.UttakFellesperiodeAnnenForelder:
            return StønadskontoType.Fellesperiode;
        case OppholdÅrsakType.UttakMødrekvoteAnnenForelder:
            return StønadskontoType.Mødrekvote;
        case OppholdÅrsakType.UttakForelderpengerFørFødsel:
            return StønadskontoType.ForeldrepengerFørFødsel;
    }
};

export const erEksisterendeSakErDeltUttak = (dto: UttaksplanDTO): boolean => {
    const {
        grunnlag: { farMedmorErAleneOmOmsorg, farMedmorHarRett, morErAleneOmOmsorg, morHarRett }
    } = dto;
    if (farMedmorErAleneOmOmsorg || morErAleneOmOmsorg || farMedmorHarRett === false || morHarRett === false) {
        return false;
    }
    return true;
};

const mapSaksperiodeFromDTO = (p: UttaksplanPeriodeDTO): Saksperiode => {
    const {
        periodeResultatType,
        periode,
        stønadskontotype,
        utsettelsePeriodeType,
        arbeidsgiverInfo,
        uttakArbeidType,
        morsAktivitet,
        oppholdAarsak,
        gjelderAnnenPart,
        flerbarnsdager,
        ...periodeRest
    } = p;

    const returnPeriode: Partial<Saksperiode> = {
        ...periodeRest,
        guid: guid(),
        periodeResultatType: periodeResultatType as PeriodeResultatType,
        stønadskontotype: stønadskontotype as StønadskontoType,
        utsettelsePeriodeType: utsettelsePeriodeType as SaksperiodeUtsettelseÅrsakType,
        arbeidsgiverInfo: arbeidsgiverInfo as ArbeidsgiverInfo,
        uttakArbeidType: uttakArbeidType as UttakArbeidType,
        tidsperiode: {
            fom: new Date(periode.fom),
            tom: new Date(periode.tom)
        },
        gjelderAnnenPart,
        morsAktivitetIPerioden:
            morsAktivitet !== MorsAktivitetDto.samtidigUttak
                ? ((morsAktivitet as unknown) as MorsAktivitet)
                : undefined,
        flerbarnsdager
    };

    if (oppholdAarsak !== undefined && gjelderAnnenPart === false) {
        returnPeriode.gjelderAnnenPart = true;
        returnPeriode.stønadskontotype = getStønadskontoTypeFromOppholdsÅrsak(oppholdAarsak);
    }

    if (oppholdAarsak !== undefined && gjelderAnnenPart) {
        returnPeriode.gjelderAnnenPart = false;
        returnPeriode.angittAvAnnenPart = true;
        returnPeriode.stønadskontotype = getStønadskontoTypeFromOppholdsÅrsak(oppholdAarsak);
    }

    return returnPeriode as Saksperiode;
};

export const getEksisterendeSakFromDTO = (
    dto: UttaksplanDTO,
    erAnnenPartsSak: boolean
): EksisterendeSak | undefined => {
    const {
        grunnlag: { dekningsgrad, termindato, fødselsdato, omsorgsovertakelsesdato, søkerKjønn, ...restGrunnlag },
        perioder
    } = dto;

    const familiehendelseDatoer: FamiliehendelseDatoer = {
        termindato: termindato ? moment.utc(termindato).toDate() : undefined,
        fødselsdato: fødselsdato ? moment.utc(fødselsdato).toDate() : undefined,
        omsorgsovertakelsesdato: omsorgsovertakelsesdato ? moment.utc(omsorgsovertakelsesdato).toDate() : undefined
    };

    if (
        familiehendelseDatoer.fødselsdato === undefined &&
        familiehendelseDatoer.termindato === undefined &&
        familiehendelseDatoer.omsorgsovertakelsesdato === undefined
    ) {
        return undefined;
    }

    const familiehendelseType = getFamilieHendelseType(familiehendelseDatoer);

    const grunnlag: Saksgrunnlag = {
        ...restGrunnlag,
        erDeltUttak: erEksisterendeSakErDeltUttak(dto),
        erBarnetFødt: fødselsdato !== undefined,
        dekningsgrad: dekningsgrad === 100 ? Dekningsgrad.HUNDRE_PROSENT : Dekningsgrad.ÅTTI_PROSENT,
        familieHendelseDato: getRelevantFamiliehendelseDato(familiehendelseDatoer),
        familieHendelseType: familiehendelseType as FamiliehendelsesType,
        termindato: familiehendelseDatoer.termindato
    };

    const saksperioder = perioder
        .map(mapSaksperiodeFromDTO)
        .filter(filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode)
        .reduce(reduceDuplikateSaksperioderGrunnetArbeidsforhold, []);

    const uttaksplan = mapSaksperioderTilUttaksperioder(saksperioder, grunnlag, false);

    return {
        erAnnenPartsSak,
        grunnlag,
        saksperioder,
        uttaksplan
    };
};

const saksperiodeErInnvilget = (saksperiode: Saksperiode) =>
    saksperiode.periodeResultatType === PeriodeResultatType.INNVILGET;

const filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode = (
    periode: Saksperiode,
    index: number,
    saksperioder: Saksperiode[]
) => {
    const likePerioder = saksperioder.filter(
        (periode2) =>
            periode.guid !== periode2.guid &&
            Tidsperioden(periode.tidsperiode).erLik(periode2.tidsperiode) &&
            periode.gjelderAnnenPart === periode2.gjelderAnnenPart
    );

    if (likePerioder.length === 0) {
        return true;
    }

    const innvilgedePerioder = likePerioder.filter(saksperiodeErInnvilget);
    if (saksperiodeErInnvilget(periode) === false && innvilgedePerioder.length > 0) {
        return false;
    }
    return true;
};

const reduceDuplikateSaksperioderGrunnetArbeidsforhold = (
    resultatPerioder: Saksperiode[],
    periode: Saksperiode,
    index: number,
    saksperioder: Saksperiode[]
) => {
    if (inneholderDuplikatSaksperiode(saksperioder, periode)) {
        if (periode.graderingInnvilget && periode.arbeidstidprosent > 0) {
            resultatPerioder.push(periode);

            return resultatPerioder;
        }

        if (!periode.graderingInnvilget && !inneholderDuplikatSaksperiode(resultatPerioder, periode)) {
            resultatPerioder.push(periode);

            return resultatPerioder;
        }

        return resultatPerioder;
    }

    resultatPerioder.push(periode);

    return resultatPerioder;
};

const inneholderDuplikatSaksperiode = (saksperioder: Saksperiode[], saksperiode: Saksperiode): boolean => {
    if (saksperioder.length === 0) {
        return false;
    }

    return saksperioder.some(
        (s) =>
            Tidsperioden(s.tidsperiode).erLik(saksperiode.tidsperiode) &&
            s.gjelderAnnenPart === saksperiode.gjelderAnnenPart &&
            s.guid !== saksperiode.guid
    );
};

const getSøkersituasjonFromSaksgrunnlag = (grunnlag: Saksgrunnlag): Søkersituasjon | undefined => {
    switch (grunnlag.familieHendelseType) {
        case FamiliehendelsesType.TERM:
        case FamiliehendelsesType.FØDSEL:
            return Søkersituasjon.FØDSEL;
        case FamiliehendelsesType.ADOPSJON:
            return Søkersituasjon.ADOPSJON;
        case FamiliehendelsesType.OMSORGSOVERTAKELSE:
        default:
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
        default:
            return undefined;
    }
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

const getBarnFromSaksgrunnlag = (
    situasjon: Søkersituasjon,
    sak: Saksgrunnlag,
    søkerinfo: Søkerinfo
): Partial<Barn> | undefined => {
    const nyesteBarn = søkerinfo.registrerteBarn.sort((a, b) =>
        moment(b.fødselsdato)
            .format('YYYY-MM-DD')
            .localeCompare(moment(a.fødselsdato).format('YYYY-MM-DD'))
    )[0];

    if (nyesteBarn === undefined) {
        return undefined;
    }

    const erBarnetFødt = moment(nyesteBarn.fødselsdato).isBetween(
        moment(sak.familieHendelseDato).subtract(20, 'weeks'),
        moment(sak.familieHendelseDato).add(6, 'weeks')
    );

    switch (situasjon) {
        case Søkersituasjon.FØDSEL:
            return {
                antallBarn: sak.antallBarn,
                erBarnetFødt,
                ...(erBarnetFødt
                    ? {
                          fødselsdatoer: [sak.familieHendelseDato],
                          termindato: sak.termindato
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
        default:
            return undefined;
    }
};

const getAnnenForelderFromSaksgrunnlag = (
    situasjon: Søkersituasjon,
    sak: Saksgrunnlag,
    annenPart: AnnenPart
): Partial<AnnenForelder> | undefined => {
    const { søkerErFarEllerMedmor } = sak;
    switch (situasjon) {
        case Søkersituasjon.FØDSEL:
        case Søkersituasjon.ADOPSJON:
            if (søkerErFarEllerMedmor) {
                return {
                    fornavn: annenPart.navn.fornavn,
                    etternavn: annenPart.navn.etternavn,
                    erUfør: sak.morErUfør,
                    harRettPåForeldrepenger: sak.morHarRett,
                    fnr: annenPart.fnr,
                    kanIkkeOppgis: false
                };
            }
            return {
                fornavn: annenPart.navn.fornavn,
                etternavn: annenPart.navn.etternavn,
                harRettPåForeldrepenger: sak.farMedmorHarRett,
                fnr: annenPart.fnr,
                kanIkkeOppgis: false
            };
        default:
            return undefined;
    }
};

const kanSaksperiodeKonverteresTilPeriode = (periode: Saksperiode) => {
    if (periode.flerbarnsdager === false) {
        return true;
    }
    return false;
};

export const kanUttaksplanGjennskapesFraSak = (perioder: Saksperiode[]): boolean => {
    const noenPerioderKanIkkeGjennskapes = perioder.some(
        (periode) => kanSaksperiodeKonverteresTilPeriode(periode) === false
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

    const mockForelder: Partial<AnnenForelder> = {
        fornavn: '',
        etternavn: '',
        fnr: '',
        harRettPåForeldrepenger: false,
        kanIkkeOppgis: false
    };
    const søker = getSøkerFromSaksgrunnlag(søkerinfo.person, situasjon, grunnlag);
    const barn = getBarnFromSaksgrunnlag(situasjon, grunnlag, søkerinfo);
    const annenForelder = sak.annenPart
        ? getAnnenForelderFromSaksgrunnlag(situasjon, grunnlag, sak.annenPart)
        : mockForelder;

    if (!søker || !barn || (grunnlag.erDeltUttak && !annenForelder)) {
        return undefined;
    }

    const søknad: Partial<Søknad> = {
        situasjon,
        søker: søker as Søker,
        barn: barn as Barn,
        annenForelder: annenForelder as AnnenForelder,
        erEndringssøknad: true,
        dekningsgrad: grunnlag.dekningsgrad,
        uttaksplan: uttaksplan ? cloneDeep(uttaksplan) : []
    };
    return søknad;
};
