import { guid } from 'nav-frontend-js-utils';
import { UttakArbeidType } from 'app/types/UttakArbeidType';
import { Arbeidsform } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { Saksperiode } from 'app/types/Saksperiode';
import { PeriodeResultatType } from 'uttaksplan/types/PeriodeResultatType';
import { Saksgrunnlag } from 'app/types/Saksgrunnlag';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { getFamiliehendelseType } from './getFamiliehendelseType';
import { convertTidsperiodeToTidsperiodeDate, getRelevantFamiliehendelseDato, ISOStringToDate } from './dateUtils';
import { EksisterendeSakDTO } from 'app/types/EksisterendeSakDTO';
import { SaksperiodeDTO } from 'app/types/SaksperiodeDTO';
import mapSaksperioderTilUttaksperioder from './mapSaksperioderTilUttaksperioder';
import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Søkerrolle } from 'app/types/Søkerrolle';
import Sak from 'app/types/Sak';
import { Søknad } from 'app/context/types/Søknad';
import AnnenForelder from 'app/context/types/AnnenForelder';
import { AnnenPart } from 'app/types/AnnenPart';
import Søker from 'app/context/types/Søker';
import Person, { RegistrertBarn } from 'app/types/Person';
import { Situasjon } from 'app/types/Situasjon';
import dayjs from 'dayjs';
import Barn, { BarnType } from 'app/context/types/Barn';
import { FamiliehendelseType } from 'app/types/FamiliehendelseType';

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

const getStønadskontoTypeFromOppholdÅrsakType = (årsak: OppholdÅrsakType): StønadskontoType | undefined => {
    switch (årsak) {
        case OppholdÅrsakType.UttakFedrekvoteAnnenForelder:
            return StønadskontoType.Fedrekvote;
        case OppholdÅrsakType.UttakFellesperiodeAnnenForelder:
            return StønadskontoType.Fellesperiode;
        case OppholdÅrsakType.UttakMødrekvoteAnnenForelder:
            return StønadskontoType.Mødrekvote;
        case OppholdÅrsakType.UttakForelderpengerFørFødsel:
            return StønadskontoType.ForeldrepengerFørFødsel;
        default:
            return undefined;
    }
};

const erEksisterendeSakErDeltUttak = (eksisterendeSak: EksisterendeSakDTO): boolean => {
    const {
        grunnlag: {
            farMedmorErAleneOmOmsorg,
            farMedmorHarRett,
            morErAleneOmOmsorg,
            morHarRett,
            harAnnenForelderTilsvarendeRettEØS,
        },
    } = eksisterendeSak;
    if (
        farMedmorErAleneOmOmsorg ||
        morErAleneOmOmsorg ||
        (farMedmorHarRett === false && harAnnenForelderTilsvarendeRettEØS === false) ||
        (morHarRett === false && harAnnenForelderTilsvarendeRettEØS === false)
    ) {
        return false;
    }
    return true;
};

const mapSaksperiodeFromDTO = (p: SaksperiodeDTO): Saksperiode => {
    const { oppholdAarsak, gjelderAnnenPart, uttakArbeidType } = p;

    const returnPeriode: Saksperiode = {
        ...p,
        guid: guid(),
        uttakArbeidType: [uttakArbeidType as UttakArbeidType],
    };

    if (oppholdAarsak !== undefined && gjelderAnnenPart === false) {
        returnPeriode.gjelderAnnenPart = true;
        returnPeriode.stønadskontotype = getStønadskontoTypeFromOppholdÅrsakType(oppholdAarsak)!;
    }

    if (oppholdAarsak !== undefined && gjelderAnnenPart) {
        returnPeriode.gjelderAnnenPart = false;
        returnPeriode.angittAvAnnenPart = true;
        returnPeriode.stønadskontotype = getStønadskontoTypeFromOppholdÅrsakType(oppholdAarsak)!;
    }

    return returnPeriode as Saksperiode;
};

const saksperiodeErInnvilget = (saksperiode: Saksperiode) =>
    saksperiode.periodeResultatType === PeriodeResultatType.INNVILGET;

const filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode = (
    periode: Saksperiode,
    _index: number,
    saksperioder: Saksperiode[]
) => {
    const likePerioder = saksperioder.filter(
        (periode2) =>
            periode.guid !== periode2.guid &&
            Tidsperioden(convertTidsperiodeToTidsperiodeDate(periode.periode)).erLik(
                convertTidsperiodeToTidsperiodeDate(periode2.periode)
            ) &&
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
    _index: number,
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

        if (!periode.graderingInnvilget && inneholderDuplikatSaksperiode(resultatPerioder, periode)) {
            const periodeSomOverlever = saksperioder.find(
                (s) =>
                    Tidsperioden(convertTidsperiodeToTidsperiodeDate(s.periode)).erLik(
                        convertTidsperiodeToTidsperiodeDate(periode.periode)
                    ) &&
                    s.gjelderAnnenPart === periode.gjelderAnnenPart &&
                    s.guid !== periode.guid
            );
            const arbeidsform = periode.uttakArbeidType[0];

            if (arbeidsform !== undefined && periodeSomOverlever !== undefined) {
                if (!periodeSomOverlever.uttakArbeidType.includes(arbeidsform)) {
                    periodeSomOverlever.uttakArbeidType.push(arbeidsform);
                }
            }

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
            Tidsperioden(convertTidsperiodeToTidsperiodeDate(s.periode)).erLik(
                convertTidsperiodeToTidsperiodeDate(saksperiode.periode)
            ) &&
            s.gjelderAnnenPart === saksperiode.gjelderAnnenPart &&
            s.guid !== saksperiode.guid
    );
};

export const mapEksisterendeSakFromDTO = (
    eksisterendeSak: EksisterendeSakDTO | undefined | '',
    erFarEllerMedmor: boolean,
    erAnnenPartsSak: boolean
): EksisterendeSak | undefined => {
    if (eksisterendeSak === undefined || eksisterendeSak === '' || Object.keys(eksisterendeSak).length === 0) {
        return undefined;
    }

    const {
        grunnlag: {
            dekningsgrad,
            termindato,
            fødselsdato,
            omsorgsovertakelsesdato,
            ønskerJustertUttakVedFødsel,
            ...restGrunnlag
        },
        perioder,
    } = eksisterendeSak;

    const grunnlag: Saksgrunnlag = {
        ...restGrunnlag,
        erDeltUttak: erEksisterendeSakErDeltUttak(eksisterendeSak),
        erBarnetFødt: fødselsdato !== undefined,
        dekningsgrad: dekningsgrad === 100 ? Dekningsgrad.HUNDRE_PROSENT : Dekningsgrad.ÅTTI_PROSENT,
        familiehendelseDato: getRelevantFamiliehendelseDato(termindato, fødselsdato, omsorgsovertakelsesdato),
        familiehendelseType: getFamiliehendelseType(fødselsdato, termindato),
        ønskerJustertUttakVedFødsel: fødselsdato === undefined ? ønskerJustertUttakVedFødsel : undefined,
        termindato,
        fødselsdato,
        omsorgsovertakelsesdato,
    };

    const saksperioder = perioder
        .map(mapSaksperiodeFromDTO)
        .filter(filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode)
        .reduce(reduceDuplikateSaksperioderGrunnetArbeidsforhold, []);

    const uttaksplan = mapSaksperioderTilUttaksperioder(saksperioder, grunnlag, erFarEllerMedmor);

    return {
        erAnnenPartsSak,
        grunnlag,
        saksperioder,
        uttaksplan,
    };
};

const getSøkersituasjonFromSaksgrunnlag = (familiehendelseType: FamiliehendelseType): Situasjon | undefined => {
    if (familiehendelseType === FamiliehendelseType.TERM || familiehendelseType === FamiliehendelseType.FØDSEL) {
        return 'fødsel';
    }

    return 'adopsjon';
};

const getSøkerFromSaksgrunnlag = (grunnlag: Saksgrunnlag, erFarEllerMedmor: boolean): Partial<Søker> => {
    return {
        erAleneOmOmsorg: erFarEllerMedmor ? grunnlag.farMedmorErAleneOmOmsorg : grunnlag.morErAleneOmOmsorg,
    };
};

const getSøkerrolleFromSaksgrunnlag = (
    person: Person,
    situasjon: Situasjon,
    grunnlag: Saksgrunnlag
): Søkerrolle | undefined => {
    const { søkerErFarEllerMedmor } = grunnlag;
    const søkerErKvinne = person.kjønn === 'K';
    switch (situasjon) {
        case 'fødsel':
        case 'adopsjon':
            if (søkerErKvinne) {
                return søkerErFarEllerMedmor ? 'medmor' : 'mor';
            }
            return 'far';
        default:
            return undefined;
    }
};

const getBarnFromSaksgrunnlag = (situasjon: Situasjon, sak: Saksgrunnlag, søkerinfo: Søkerinfo): Barn | undefined => {
    const nyesteBarn = søkerinfo.registrerteBarn.sort((a, b) =>
        dayjs(b.fødselsdato).format('YYYY-MM-DD').localeCompare(dayjs(a.fødselsdato).format('YYYY-MM-DD'))
    )[0];

    let erBarnetFødt;
    if (nyesteBarn === undefined) {
        erBarnetFødt = sak.erBarnetFødt;
    } else {
        erBarnetFødt = dayjs(nyesteBarn.fødselsdato).isBetween(
            dayjs(sak.familiehendelseDato).subtract(20, 'weeks'),
            dayjs(sak.familiehendelseDato).add(6, 'weeks')
        );
    }

    if (erBarnetFødt === undefined) {
        return undefined;
    }

    switch (situasjon) {
        case 'fødsel':
            if (sak.fødselsdato) {
                return {
                    type: BarnType.FØDT,
                    antallBarn: sak.antallBarn,
                    fødselsdatoer: [ISOStringToDate(sak.familiehendelseDato)!],
                    termindato: sak.termindato ? ISOStringToDate(sak.termindato) : undefined,
                };
            }

            return {
                type: BarnType.UFØDT,
                antallBarn: sak.antallBarn,
                termindato: ISOStringToDate(sak.familiehendelseDato)!,
                terminbekreftelse: [],
            };
        case 'adopsjon':
            return {
                type: BarnType.ADOPTERT_STEBARN,
                adopsjonsdato: ISOStringToDate(sak.familiehendelseDato)!,
                antallBarn: sak.antallBarn,
                fødselsdatoer: [ISOStringToDate(sak.familiehendelseDato)!],
                omsorgsovertakelse: [],
            };
        default:
            return undefined;
    }
};

const getAnnenForelderFromSaksgrunnlag = (
    situasjon: Situasjon,
    grunnlag: Saksgrunnlag,
    annenPart: AnnenPart,
    erFarEllerMedmor: boolean
): AnnenForelder | undefined => {
    switch (situasjon) {
        case 'fødsel':
        case 'adopsjon':
            if (erFarEllerMedmor) {
                return {
                    fornavn: annenPart.navn.fornavn,
                    etternavn: annenPart.navn.etternavn,
                    erUfør: grunnlag.morErUfør,
                    harRettPåForeldrepengerINorge: grunnlag.morHarRett,
                    fnr: annenPart.fnr,
                    kanIkkeOppgis: false,
                };
            }
            return {
                fornavn: annenPart.navn.fornavn,
                etternavn: annenPart.navn.etternavn,
                harRettPåForeldrepengerINorge: grunnlag.farMedmorHarRett,
                fnr: annenPart.fnr,
                kanIkkeOppgis: false,
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

const finnAnnenForelderPåFødselsdato = (
    barn: RegistrertBarn[],
    fødselsdato: Date | undefined,
    grunnlag: Saksgrunnlag,
    situasjon: Situasjon,
    erFarEllerMedmor: boolean
): AnnenForelder | undefined => {
    if (fødselsdato === undefined) {
        return undefined;
    }

    const barnMedGittFødselsdato = barn.find((b) => dayjs(b.fødselsdato).isSame(dayjs(fødselsdato), 'day'));

    if (barnMedGittFødselsdato !== undefined) {
        const annenForelder = barnMedGittFødselsdato.annenForelder;

        if (annenForelder !== undefined) {
            const { fnr, etternavn, fornavn } = annenForelder;
            const annenPart: Partial<AnnenPart> = {
                navn: {
                    fornavn,
                    etternavn,
                },
                fnr,
            };
            return getAnnenForelderFromSaksgrunnlag(situasjon, grunnlag, annenPart as AnnenPart, erFarEllerMedmor);
        }
    }
};

export const opprettSøknadFraEksisterendeSak = (
    søkerinfo: Søkerinfo,
    eksisterendeSak: EksisterendeSak,
    sak: Sak
): Partial<Søknad> | undefined => {
    const { grunnlag, uttaksplan } = eksisterendeSak;
    const { fødselsdato, dekningsgrad, familiehendelseType, søkerErFarEllerMedmor, ønskerJustertUttakVedFødsel } =
        grunnlag;
    const situasjon = getSøkersituasjonFromSaksgrunnlag(familiehendelseType);

    if (!situasjon) {
        return undefined;
    }

    const mockForelder: Partial<AnnenForelder> = {
        fornavn: '',
        etternavn: '',
        fnr: '',
        harRettPåForeldrepengerINorge: grunnlag.søkerErFarEllerMedmor
            ? !!grunnlag.morHarRett
            : !!grunnlag.farMedmorHarRett,
        kanIkkeOppgis: false,
    };
    const søker = getSøkerFromSaksgrunnlag(grunnlag, søkerErFarEllerMedmor);
    const barn = getBarnFromSaksgrunnlag(situasjon, grunnlag, søkerinfo);
    const annenForelderFraSak = sak.annenPart
        ? getAnnenForelderFromSaksgrunnlag(situasjon, grunnlag, sak.annenPart, søkerErFarEllerMedmor)
        : undefined;
    const annenForelderFraBarn = finnAnnenForelderPåFødselsdato(
        søkerinfo.registrerteBarn,
        ISOStringToDate(fødselsdato),
        grunnlag,
        situasjon,
        søkerErFarEllerMedmor
    );
    const rolle = getSøkerrolleFromSaksgrunnlag(søkerinfo.person, situasjon, grunnlag);

    const annenForelderBase = annenForelderFraSak || annenForelderFraBarn || mockForelder;

    const annenForelder = {
        ...annenForelderBase,
        harRettPåForeldrepengerIEØS: grunnlag.harAnnenForelderTilsvarendeRettEØS,
    };

    if (!barn || !rolle) {
        return undefined;
    }

    const søknad: Partial<Søknad> = {
        søker: søker as Søker,
        søkersituasjon: {
            situasjon,
            rolle,
        },
        barn,
        annenForelder: annenForelder as AnnenForelder,
        erEndringssøknad: true,
        dekningsgrad,
        uttaksplan,
        saksnummer: sak.saksnummer,
        ønskerJustertUttakVedFødsel: ønskerJustertUttakVedFødsel,
    };

    return søknad;
};
