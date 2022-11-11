import { guid } from 'nav-frontend-js-utils';
import { UttakArbeidType } from 'app/types/UttakArbeidType';
import { Arbeidsform } from 'uttaksplan/types/Periode';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { EksisterendeSakV2 } from 'app/types/EksisterendeSak';
import { Saksperiode, SaksperiodeV2 } from 'app/types/Saksperiode';
import { SaksgrunnlagV2 } from 'app/types/Saksgrunnlag';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { getFamiliehendelseType } from './getFamiliehendelseType';
import { convertTidsperiodeToTidsperiodeDate, getRelevantFamiliehendelseDato, ISOStringToDate } from './dateUtils';
import { SaksperiodeDTOV2 } from 'app/types/SaksperiodeDTO';
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
import Barn, { BarnType, isAdoptertBarn, isFødtBarn, isUfødtBarn } from 'app/context/types/Barn';
import { FamiliehendelseType } from 'app/types/FamiliehendelseType';
import { Sakv2 } from 'app/types/sakerv2/Sakv2';
import { DekningsgradV2DTO } from 'app/types/sakerv2/Dekningsgradv2DTO';
import { RettighetType } from 'app/types/sakerv2/RettighetType';
import { PersonV2 } from 'app/types/sakerv2/Personv2';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { AnnenPartsVedtakDTO } from 'app/types/sakerv2/AnnenPartsVedtakDTO';
import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { SelectableBarn } from 'app/pages/velkommen/components/barnVelger/BarnVelger';

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

const mapSaksperiodeFromDTOV2 = (p: SaksperiodeDTOV2, erAnnenPartsSak: boolean): SaksperiodeV2 => {
    const { oppholdÅrsak } = p;
    const returnPeriode: SaksperiodeV2 = {
        ...p,
        guid: guid(),
        periode: {
            fom: p.fom,
            tom: p.tom,
        },
        gjelderAnnenPart: erAnnenPartsSak,
    } as SaksperiodeV2;

    if (oppholdÅrsak !== undefined && erAnnenPartsSak === false) {
        returnPeriode.gjelderAnnenPart = true;
        returnPeriode.kontoType = getStønadskontoTypeFromOppholdÅrsakType(oppholdÅrsak)!;
    }

    if (oppholdÅrsak !== undefined && erAnnenPartsSak) {
        returnPeriode.gjelderAnnenPart = false;
        returnPeriode.angittAvAnnenPart = true;
        returnPeriode.kontoType = getStønadskontoTypeFromOppholdÅrsakType(oppholdÅrsak)!;
    }

    return returnPeriode as SaksperiodeV2;
};

const saksperiodeErInnvilget = (saksperiode: SaksperiodeV2): boolean => saksperiode.resultat.innvilget;

const filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode = (
    periode: SaksperiodeV2,
    _index: number,
    saksperioder: SaksperiodeV2[]
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

export const mapAnnenPartsVedtakIFørstegangssøknadFromDTO = (
    eksisterendeSakAnnenPart: AnnenPartsVedtakDTO | undefined | '',
    barn: Barn,
    søkerErFarEllerMedmor: boolean,
    familiehendelsesdato: string
): EksisterendeSakV2 | undefined => {
    if (
        eksisterendeSakAnnenPart === undefined ||
        eksisterendeSakAnnenPart === '' ||
        Object.keys(eksisterendeSakAnnenPart).length === 0
    ) {
        return undefined;
    }

    const saksperioderAnnenPart = eksisterendeSakAnnenPart.perioder
        .map((p) => {
            return mapSaksperiodeFromDTOV2(p, true);
        })
        .filter(filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode);
    const fødselsdato = isFødtBarn(barn) ? dateToISOString(barn.fødselsdatoer[0]) : undefined;
    const termindato = isUfødtBarn(barn) ? dateToISOString(barn.termindato) : undefined;

    const grunnlagForAnnenPart = {
        dekningsgrad:
            eksisterendeSakAnnenPart.dekningsgrad === DekningsgradV2DTO.HUNDRE_PROSENT
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
    eksisterendeSak: Sakv2 | undefined | '',
    erAnnenPartsSak: boolean
): EksisterendeSakV2 | undefined => {
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
    const grunnlag: SaksgrunnlagV2 = {
        dekningsgrad:
            dekningsgrad === DekningsgradV2DTO.HUNDRE_PROSENT ? Dekningsgrad.HUNDRE_PROSENT : Dekningsgrad.ÅTTI_PROSENT,
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
            return mapSaksperiodeFromDTOV2(p, erAnnenPartsSak);
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

const getSøkerFromSaksgrunnlag = (grunnlag: SaksgrunnlagV2, erFarEllerMedmor: boolean): Partial<Søker> => {
    return {
        erAleneOmOmsorg: erFarEllerMedmor ? grunnlag.farMedmorErAleneOmOmsorg : grunnlag.morErAleneOmOmsorg,
    };
};

const getSøkerrolleFromSaksgrunnlag = (
    person: Person,
    situasjon: Situasjon,
    grunnlag: SaksgrunnlagV2
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

const getBarnFromSaksgrunnlag = (situasjon: Situasjon, sak: SaksgrunnlagV2, søkerinfo: Søkerinfo): Barn | undefined => {
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

const getBarnFromSaksgrunnlagV2 = (situasjon: Situasjon, sak: SaksgrunnlagV2): Barn | undefined => {
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
                fødselsdatoer: sak.barn.map((b) => ISOStringToDate(b.fødselsdato)!),
                omsorgsovertakelse: [],
            };
        default:
            return undefined;
    }
};

const getAnnenForelderFromSaksgrunnlag = (
    situasjon: Situasjon,
    grunnlag: SaksgrunnlagV2,
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

const getAnnenForelderFromSaksgrunnlagV2 = (
    situasjon: Situasjon,
    grunnlag: SaksgrunnlagV2,
    annenPart: PersonV2,
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
    grunnlag: SaksgrunnlagV2,
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
    eksisterendeSak: EksisterendeSakV2,
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

const getBarnFromValgteBarn = (valgteBarn: SelectableBarn): Barn | undefined => {
    return {
        type: BarnType.IKKE_UTFYLT,
        antallBarn: valgteBarn.fnr.length,
        fødselsdatoer: valgteBarn.fødselsdatoer!,
        fnr: valgteBarn.fnr.length > 0 ? valgteBarn.fnr : undefined,
    };
};

const getAnnenForelderFromValgteBarn = (valgteBarn: SelectableBarn): AnnenForelder | undefined => {
    if (valgteBarn.annenForelder !== undefined) {
        return {
            fornavn: valgteBarn.annenForelder.fornavn,
            etternavn: valgteBarn.annenForelder.etternavn,
            fnr: valgteBarn.annenForelder.fnr,
            kanIkkeOppgis: false,
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
export const opprettSøknadFraEksisterendeSakV2 = (
    søkerinfo: Søkerinfo,
    eksisterendeSak: EksisterendeSakV2
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
    const barn = getBarnFromSaksgrunnlagV2(situasjon, grunnlag);
    const annenForelderFraSak =
        eksisterendeSak.grunnlag.annenPart !== undefined
            ? getAnnenForelderFromSaksgrunnlagV2(
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
