import { guid } from 'nav-frontend-js-utils';
import { UttakArbeidType } from 'app/types/UttakArbeidType';
import { Arbeidsform } from 'uttaksplan/types/Periode';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { Saksperiode } from 'app/types/Saksperiode';
import { Saksgrunnlag } from 'app/types/Saksgrunnlag';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { getFamiliehendelseType } from './getFamiliehendelseType';
import { convertTidsperiodeToTidsperiodeDate, getRelevantFamiliehendelseDato, ISOStringToDate } from './dateUtils';
import { SaksperiodeDTO } from 'app/types/SaksperiodeDTO';
import mapSaksperioderTilUttaksperioder from './mapSaksperioderTilUttaksperioder';
import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Søkerrolle } from 'app/types/Søkerrolle';
import { Søknad } from 'app/context/types/Søknad';
import AnnenForelder from 'app/context/types/AnnenForelder';
import Søker from 'app/context/types/Søker';
import Person, { RegistrertAnnenForelder, RegistrertBarn } from 'app/types/Person';
import { Situasjon } from 'app/types/Situasjon';
import dayjs from 'dayjs';
import Barn, { BarnType, isAdoptertBarn, isFødtBarn, isUfødtBarn } from 'app/context/types/Barn';
import { FamiliehendelseType } from 'app/types/FamiliehendelseType';
import { Sak } from 'app/types/Sak';
import { DekningsgradDTO } from 'app/types/DekningsgradDTO';
import { RettighetType } from 'app/types/RettighetType';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { AnnenPartsVedtakDTO } from 'app/types/AnnenPartsVedtakDTO';
import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { SelectableBarn } from 'app/pages/velkommen/components/barnVelger/BarnVelger';
import Søkersituasjon from 'app/context/types/Søkersituasjon';

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
        case OppholdÅrsakType.UttakForelderpengerFørFødselAnnenForelder:
            return StønadskontoType.ForeldrepengerFørFødsel;
        default:
            return undefined;
    }
};

const mapSaksperiodeFromDTO = (p: SaksperiodeDTO, erAnnenPartsSak: boolean): Saksperiode => {
    const { oppholdÅrsak } = p;
    const returnPeriode: Saksperiode = {
        ...p,
        guid: guid(),
        periode: {
            fom: p.fom,
            tom: p.tom,
        },
        gjelderAnnenPart: erAnnenPartsSak,
    } as Saksperiode;

    if (oppholdÅrsak !== undefined && erAnnenPartsSak === false) {
        returnPeriode.gjelderAnnenPart = true;
        returnPeriode.kontoType = getStønadskontoTypeFromOppholdÅrsakType(oppholdÅrsak)!;
    }

    if (oppholdÅrsak !== undefined && erAnnenPartsSak) {
        returnPeriode.gjelderAnnenPart = false;
        returnPeriode.angittAvAnnenPart = true;
        returnPeriode.kontoType = getStønadskontoTypeFromOppholdÅrsakType(oppholdÅrsak)!;
    }

    return returnPeriode as Saksperiode;
};

const saksperiodeErInnvilget = (saksperiode: Saksperiode): boolean => saksperiode.resultat.innvilget;

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
            )
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

export const getStartdatoFørstePeriodeAnnenPart = (
    annenPartsSak: AnnenPartsVedtakDTO | undefined | ''
): Date | undefined => {
    if (
        annenPartsSak === undefined ||
        annenPartsSak === '' ||
        Object.keys(annenPartsSak).length === 0 ||
        annenPartsSak.perioder.length === 0
    ) {
        return undefined;
    }
    return ISOStringToDate(annenPartsSak.perioder[0].fom);
};

export const mapAnnenPartsVedtakIFørstegangssøknadFromDTO = (
    eksisterendeSakAnnenPart: AnnenPartsVedtakDTO | undefined | '',
    barn: Barn,
    søkerErFarEllerMedmor: boolean,
    familiehendelsesdato: string
): EksisterendeSak | undefined => {
    if (
        eksisterendeSakAnnenPart === undefined ||
        eksisterendeSakAnnenPart === '' ||
        Object.keys(eksisterendeSakAnnenPart).length === 0
    ) {
        return undefined;
    }

    const saksperioderAnnenPart = eksisterendeSakAnnenPart.perioder
        .map((p) => {
            return mapSaksperiodeFromDTO(p, true);
        })
        .filter(filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode);
    const fødselsdato = isFødtBarn(barn) ? dateToISOString(barn.fødselsdatoer[0]) : undefined;
    const termindato = isUfødtBarn(barn) ? dateToISOString(barn.termindato) : undefined;

    const grunnlagForAnnenPart = {
        dekningsgrad:
            eksisterendeSakAnnenPart.dekningsgrad === DekningsgradDTO.HUNDRE_PROSENT
                ? Dekningsgrad.HUNDRE_PROSENT
                : Dekningsgrad.ÅTTI_PROSENT,
        antallBarn: barn.antallBarn,
        morErAleneOmOmsorg: false,
        morErUfør: false,
        morHarRett: true,
        farMedmorErAleneOmOmsorg: false,
        farMedmorHarRett: true,
        søkerErFarEllerMedmor,
        termindato,
        fødselsdato,
        omsorgsovertakelsesdato: isAdoptertBarn(barn) ? dateToISOString(barn.adopsjonsdato) : undefined,
        erDeltUttak: true,
        erBarnetFødt: fødselsdato !== undefined,
        familiehendelseDato: familiehendelsesdato,
        familiehendelseType: getFamiliehendelseType(fødselsdato, termindato),
        harAnnenForelderTilsvarendeRettEØS: false,
        ønskerJustertUttakVedFødsel: undefined,
        barn: [], // barn brukes ikke videre her
    };

    const uttaksplanAnnenPart = mapSaksperioderTilUttaksperioder(saksperioderAnnenPart, grunnlagForAnnenPart);

    return {
        saksnummer: '',
        erAnnenPartsSak: true,
        grunnlag: grunnlagForAnnenPart,
        saksperioder: saksperioderAnnenPart,
        uttaksplan: uttaksplanAnnenPart,
    };
};

export const mapEksisterendeSak2FromDTO = (
    eksisterendeSak: Sak | undefined | '',
    erAnnenPartsSak: boolean
): EksisterendeSak | undefined => {
    if (eksisterendeSak === undefined || eksisterendeSak === '' || Object.keys(eksisterendeSak).length === 0) {
        return undefined;
    }

    const {
        dekningsgrad,
        familiehendelse: { fødselsdato, termindato, omsorgsovertagelse, antallBarn },
        gjeldendeVedtak: { perioder },
        harAnnenForelderTilsvarendeRettEØS,
        morUføretrygd,
        rettighetType,
        sakTilhørerMor,
        ønskerJustertUttakVedFødsel,
        annenPart,
        barn,
    } = eksisterendeSak;

    const erFarEllerMedmor = !sakTilhørerMor;
    const grunnlag: Saksgrunnlag = {
        dekningsgrad:
            dekningsgrad === DekningsgradDTO.HUNDRE_PROSENT ? Dekningsgrad.HUNDRE_PROSENT : Dekningsgrad.ÅTTI_PROSENT,
        antallBarn: antallBarn,
        morErAleneOmOmsorg: sakTilhørerMor && rettighetType === RettighetType.ALENEOMSORG,
        morErUfør: morUføretrygd,
        morHarRett: sakTilhørerMor || rettighetType === RettighetType.BEGGE_RETT,
        farMedmorErAleneOmOmsorg: !sakTilhørerMor && rettighetType === RettighetType.ALENEOMSORG,
        farMedmorHarRett: !sakTilhørerMor || rettighetType === RettighetType.BEGGE_RETT,
        søkerErFarEllerMedmor: erFarEllerMedmor,
        termindato,
        fødselsdato,
        omsorgsovertakelsesdato: omsorgsovertagelse,
        erDeltUttak: rettighetType === RettighetType.BEGGE_RETT,
        erBarnetFødt: fødselsdato !== undefined,
        familiehendelseDato: getRelevantFamiliehendelseDato(termindato, fødselsdato, omsorgsovertagelse),
        familiehendelseType: getFamiliehendelseType(fødselsdato, termindato),
        ønskerJustertUttakVedFødsel: fødselsdato === undefined ? ønskerJustertUttakVedFødsel : undefined,
        harAnnenForelderTilsvarendeRettEØS,
        annenPart,
        barn,
    };

    const saksperioder = perioder
        .map((p) => {
            return mapSaksperiodeFromDTO(p, erAnnenPartsSak);
        })
        .filter(filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode);

    const uttaksplan = mapSaksperioderTilUttaksperioder(saksperioder, grunnlag);

    return {
        saksnummer: eksisterendeSak.saksnummer,
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

const getBarnFromSaksgrunnlag = (situasjon: Situasjon, sak: Saksgrunnlag): Barn | undefined => {
    switch (situasjon) {
        case 'fødsel':
            if (sak.fødselsdato) {
                return {
                    type: BarnType.FØDT,
                    antallBarn: sak.antallBarn,
                    fødselsdatoer: sak.barn.map((b) => ISOStringToDate(b.fødselsdato)!),
                    termindato: sak.termindato ? ISOStringToDate(sak.termindato) : undefined,
                };
            }

            return {
                type: BarnType.UFØDT,
                antallBarn: sak.antallBarn,
                termindato: ISOStringToDate(sak.termindato)!,
                terminbekreftelse: [],
            };
        case 'adopsjon':
            return {
                type: BarnType.ADOPTERT_STEBARN,
                adopsjonsdato: ISOStringToDate(sak.omsorgsovertakelsesdato)!,
                antallBarn: sak.antallBarn,
                fødselsdatoer: sak.barn
                    .filter((b) => b.fødselsdato !== undefined)
                    .map((barn) => ISOStringToDate(barn.fødselsdato)!),
                omsorgsovertakelse: [],
            };
        default:
            return undefined;
    }
};

const getAnnenForelderFromSaksgrunnlag = (
    situasjon: Situasjon,
    grunnlag: Saksgrunnlag,
    annenPart: RegistrertAnnenForelder,
    erFarEllerMedmor: boolean
): AnnenForelder | undefined => {
    switch (situasjon) {
        case 'fødsel':
        case 'adopsjon':
            if (erFarEllerMedmor) {
                return {
                    fornavn: annenPart.fornavn,
                    etternavn: annenPart.etternavn,
                    erUfør: grunnlag.morErUfør,
                    harRettPåForeldrepengerINorge: grunnlag.morHarRett,
                    fnr: annenPart.fnr,
                    kanIkkeOppgis: false,
                };
            }
            return {
                fornavn: annenPart.fornavn,
                etternavn: annenPart.etternavn,
                harRettPåForeldrepengerINorge: grunnlag.farMedmorHarRett,
                fnr: annenPart.fnr,
                kanIkkeOppgis: false,
            };
        default:
            return undefined;
    }
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
            const { fnr, etternavn, fornavn, mellomnavn } = annenForelder;
            const annenPart: RegistrertAnnenForelder = {
                fornavn,
                etternavn,
                mellomnavn,
                fnr,
            };
            return getAnnenForelderFromSaksgrunnlag(situasjon, grunnlag, annenPart, erFarEllerMedmor);
        }
    }
};

const getBarnFromValgteBarn = (valgteBarn: SelectableBarn): Barn => {
    if (valgteBarn.fødselsdatoer !== undefined && valgteBarn.fødselsdatoer.length > 0) {
        return {
            type: BarnType.FØDT,
            antallBarn: valgteBarn.antallBarn,
            fødselsdatoer: valgteBarn.fødselsdatoer!,
            fnr: valgteBarn.fnr !== undefined && valgteBarn.fnr.length > 0 ? valgteBarn.fnr : undefined,
        };
    } else if (valgteBarn.termindato !== undefined) {
        return {
            type: BarnType.UFØDT,
            antallBarn: valgteBarn.antallBarn,
            termindato: valgteBarn.termindato,
        };
    } else {
        return {
            type: BarnType.IKKE_UTFYLT,
            antallBarn: valgteBarn.antallBarn,
            fødselsdatoer: valgteBarn.fødselsdatoer!,
            fnr: valgteBarn.fnr !== undefined && valgteBarn.fnr.length > 0 ? valgteBarn.fnr : undefined,
        };
    }
};

const getAnnenForelderFromValgteBarn = (valgteBarn: SelectableBarn): AnnenForelder | undefined => {
    if (valgteBarn.annenForelder !== undefined) {
        return {
            fornavn: valgteBarn.annenForelder.fornavn,
            etternavn: valgteBarn.annenForelder.etternavn,
            fnr: valgteBarn.annenForelder.fnr,
            kanIkkeOppgis: false,
            erUfør:
                valgteBarn.sak !== undefined
                    ? !valgteBarn.sak.sakTilhørerMor && valgteBarn.sak.morUføretrygd
                    : undefined,
            harRettPåForeldrepengerIEØS:
                valgteBarn.sak !== undefined ? valgteBarn.sak.harAnnenForelderTilsvarendeRettEØS : undefined,
        };
    }
    return undefined;
};

export const opprettSøknadFraValgteBarn = (valgteBarn: SelectableBarn): Partial<Søknad> | undefined => {
    const barn = getBarnFromValgteBarn(valgteBarn);
    const annenForelder = getAnnenForelderFromValgteBarn(valgteBarn);
    const søknad: Partial<Søknad> = {
        barn,
        annenForelder,
        erEndringssøknad: false,
    };

    return søknad;
};

export const opprettSøknadFraValgteBarnMedSak = (valgteBarn: SelectableBarn): Partial<Søknad> | undefined => {
    const barn = getBarnFromValgteBarn(valgteBarn);
    const annenForelder = getAnnenForelderFromValgteBarn(valgteBarn);
    const søknad: Partial<Søknad> = {
        barn,
        annenForelder,
        erEndringssøknad: false,
    };

    if (valgteBarn.sak !== undefined) {
        const søkersituasjon = {
            situasjon: valgteBarn.sak.gjelderAdopsjon ? 'adopsjon' : 'fødsel',
            rolle: valgteBarn.sak.sakTilhørerMor ? undefined : 'far',
        } as Søkersituasjon;
        søknad.søkersituasjon = søkersituasjon;
    }
    return søknad;
};

export const opprettSøknadFraEksisterendeSak = (
    søkerinfo: Søkerinfo,
    eksisterendeSak: EksisterendeSak
): Partial<Søknad> | undefined => {
    const { grunnlag, uttaksplan } = eksisterendeSak;
    const { dekningsgrad, familiehendelseType, søkerErFarEllerMedmor, ønskerJustertUttakVedFødsel } = grunnlag;
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
    const barn = getBarnFromSaksgrunnlag(situasjon, grunnlag);
    const annenForelderFraSak =
        eksisterendeSak.grunnlag.annenPart !== undefined
            ? getAnnenForelderFromSaksgrunnlag(
                  situasjon,
                  grunnlag,
                  eksisterendeSak.grunnlag.annenPart,
                  søkerErFarEllerMedmor
              )
            : undefined;

    const annenForelderFraBarn = finnAnnenForelderPåFødselsdato(
        søkerinfo.registrerteBarn,
        ISOStringToDate(grunnlag.fødselsdato),
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
        saksnummer: eksisterendeSak.saksnummer,
        ønskerJustertUttakVedFødsel: ønskerJustertUttakVedFødsel,
    };

    return søknad;
};
