import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { Søknad } from 'types/Søknad';
import { ValgtBarn } from 'types/ValgtBarn';

import {
    AnnenForelder,
    AnnenForelderOppgitt,
    Arbeidsform,
    Barn,
    BarnType,
    EksisterendeSak,
    FamiliehendelseType,
    Saksgrunnlag,
    Saksperiode,
    Situasjon,
    Søkerrolle,
    isAdoptertBarn,
    isFødtBarn,
    isInfoPeriode,
    isUfødtBarn,
} from '@navikt/fp-common';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import {
    AktivitetType_fpoversikt,
    AnnenForelderDto_fpoversikt,
    AnnenPartSak_fpoversikt,
    BarnDto_fpoversikt,
    FpSak_fpoversikt,
    KontoType_fpoversikt,
    Oppholdsårsak,
    PersonDto_fpoversikt,
    Person_fpoversikt,
    UttakOppholdÅrsak_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { Tidsperioden } from '@navikt/fp-utils';
import { convertTidsperiodeToTidsperiodeDate } from '@navikt/fp-uttaksplan';

import {
    ISOStringToDate,
    dateToISOString,
    getErDatoInnenEnDagFraAnnenDato,
    getRelevantFamiliehendelseDato,
    sorterDatoEtterEldst,
} from './dateUtils';
import { getFamiliehendelseType } from './familiehendelseUtils';
import { guid } from './guid';
import { mapSaksperioderTilUttaksperioder } from './mapSaksperioderTilUttaksperioder';
import { getKjønnFromFnrString } from './personUtils';

export const getArbeidsformFromUttakArbeidstype = (arbeidstype: AktivitetType_fpoversikt): Arbeidsform => {
    switch (arbeidstype) {
        case 'SELVSTENDIG_NÆRINGSDRIVENDE':
            return Arbeidsform.selvstendignæringsdrivende;
        case 'FRILANS':
            return Arbeidsform.frilans;
        default:
            return Arbeidsform.arbeidstaker;
    }
};

const getStønadskontoTypeFromOppholdÅrsakType = (
    årsak: UttakOppholdÅrsak_fpoversikt,
): KontoType_fpoversikt | undefined => {
    switch (årsak) {
        case 'FEDREKVOTE_ANNEN_FORELDER':
            return 'FEDREKVOTE';
        case 'FELLESPERIODE_ANNEN_FORELDER':
            return 'FELLESPERIODE';
        case 'MØDREKVOTE_ANNEN_FORELDER':
            return 'MØDREKVOTE';
        default:
            return undefined;
    }
};

const mapOppholdÅrsakType = (årsak: UttakOppholdÅrsak_fpoversikt | undefined): Oppholdsårsak | undefined => {
    switch (årsak) {
        case 'FEDREKVOTE_ANNEN_FORELDER':
            return 'UTTAK_FEDREKVOTE_ANNEN_FORELDER';
        case 'FELLESPERIODE_ANNEN_FORELDER':
            return 'UTTAK_FELLESP_ANNEN_FORELDER';
        case 'MØDREKVOTE_ANNEN_FORELDER':
            return 'UTTAK_MØDREKVOTE_ANNEN_FORELDER';
        default:
            return undefined;
    }
};

export const mapSaksperiodeFromDTO = (p: UttakPeriode_fpoversikt, erAnnenPartsSak: boolean): Saksperiode => {
    const { oppholdÅrsak } = p;
    const returnPeriode: Saksperiode = {
        guid: guid(),
        periode: {
            fom: p.fom,
            tom: p.tom,
        },
        gjelderAnnenPart: erAnnenPartsSak,
        resultat: p.resultat,
        kontoType: p.kontoType,
        flerbarnsdager: p.flerbarnsdager,
        gradering: p.gradering,
        utsettelseÅrsak: p.utsettelseÅrsak,
        overføringÅrsak: p.overføringÅrsak,
        samtidigUttak: p.samtidigUttak,
        morsAktivitet: p.morsAktivitet,
        oppholdÅrsak: mapOppholdÅrsakType(p.oppholdÅrsak),
    };

    if (oppholdÅrsak !== undefined) {
        returnPeriode.kontoType = getStønadskontoTypeFromOppholdÅrsakType(oppholdÅrsak);
        if (erAnnenPartsSak) {
            returnPeriode.gjelderAnnenPart = false;
            returnPeriode.angittAvAnnenPart = true;
        }
        if (!erAnnenPartsSak) {
            returnPeriode.gjelderAnnenPart = true;
        }
    }

    return returnPeriode;
};

const saksperiodeErInnvilget = (saksperiode: Saksperiode): boolean => saksperiode.resultat?.innvilget === true;

const filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode = (
    periode: Saksperiode,
    _index: number,
    saksperioder: Saksperiode[],
) => {
    const likePerioder = saksperioder.filter(
        (periode2) =>
            periode.guid !== periode2.guid &&
            Tidsperioden(convertTidsperiodeToTidsperiodeDate(periode.periode)).erLik(
                convertTidsperiodeToTidsperiodeDate(periode2.periode),
            ),
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
    annenPartsSak: AnnenPartSak_fpoversikt | undefined,
): Date | undefined => {
    if (!annenPartsSak || annenPartsSak.perioder.length === 0) {
        return undefined;
    }
    return ISOStringToDate(annenPartsSak.perioder[0].fom);
};

export const mapAnnenPartsEksisterendeSakFromDTO = (
    eksisterendeSakAnnenPart: AnnenPartSak_fpoversikt | undefined,
    barn: Barn,
    søkerErFarEllerMedmor: boolean,
    familiehendelsesdato: string,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
): EksisterendeSak | undefined => {
    if (
        eksisterendeSakAnnenPart === undefined ||
        //@ts-expect-error Dette skjer i Storybook av ein eller annan grunn. Ser ut som ein bug i chrome da logging av variabel gir undefined
        eksisterendeSakAnnenPart === ''
    ) {
        return undefined;
    }
    const erAnnenPartsSak = true;
    const saksperioderAnnenPart = eksisterendeSakAnnenPart.perioder
        .map((p) => {
            return mapSaksperiodeFromDTO(p, erAnnenPartsSak);
        })
        .filter(filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode);
    let termindato = undefined;
    if (eksisterendeSakAnnenPart.termindato !== undefined) {
        termindato = eksisterendeSakAnnenPart.termindato;
    } else if ((isFødtBarn(barn) || isUfødtBarn(barn)) && barn.termindato !== undefined) {
        termindato = barn.termindato;
    }
    const fødselsdato = isFødtBarn(barn) ? barn.fødselsdatoer[0] : undefined;
    const adopsjonsdato = isAdoptertBarn(barn) ? barn.adopsjonsdato : undefined;

    const grunnlagForAnnenPart = {
        dekningsgrad: eksisterendeSakAnnenPart.dekningsgrad === 'HUNDRE' ? '100' : '80',
        antallBarn: eksisterendeSakAnnenPart.antallBarn ?? barn.antallBarn,
        morErAleneOmOmsorg: false,
        morErUfør: false,
        morHarRett: true,
        farMedmorErAleneOmOmsorg: false,
        farMedmorHarRett: true,
        søkerErFarEllerMedmor,
        termindato,
        fødselsdato,
        omsorgsovertakelsesdato: adopsjonsdato,
        erDeltUttak: true,
        erBarnetFødt: fødselsdato !== undefined,
        familiehendelseDato: familiehendelsesdato,
        familiehendelseType: getFamiliehendelseType(fødselsdato, termindato, adopsjonsdato),
        harAnnenForelderTilsvarendeRettEØS: false,
        ønskerJustertUttakVedFødsel: undefined,
        barn: [], // barn brukes ikke videre her
        perioderAnnenpartEøs: undefined,
    } as const;

    const uttaksplanAnnenPart = mapSaksperioderTilUttaksperioder(
        saksperioderAnnenPart,
        grunnlagForAnnenPart,
        undefined,
        førsteUttaksdagNesteBarnsSak,
    );

    return {
        saksnummer: '',
        erAnnenPartsSak,
        grunnlag: grunnlagForAnnenPart,
        saksperioder: saksperioderAnnenPart,
        uttaksplan: uttaksplanAnnenPart.filter((p) => isInfoPeriode(p)),
    };
};

export const mapSøkerensEksisterendeSakFromDTO = (
    eksisterendeSak: FpSak_fpoversikt,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
    valgtBarnFødselsdatoer: Date[] | undefined,
): EksisterendeSak => {
    const erAnnenPartsSak = false;
    const {
        dekningsgrad,
        familiehendelse: { fødselsdato: fødselsdatoFraFPSak, termindato, omsorgsovertakelse, antallBarn },
        harAnnenForelderTilsvarendeRettEØS,
        morUføretrygd,
        rettighetType,
        sakTilhørerMor,
        ønskerJustertUttakVedFødsel,
    } = eksisterendeSak;

    const perioder = eksisterendeSak.gjeldendeVedtak ? eksisterendeSak.gjeldendeVedtak.perioder : [];

    const erFarEllerMedmor = !sakTilhørerMor;
    const fødselsdatoFraValgtBarn =
        valgtBarnFødselsdatoer && valgtBarnFødselsdatoer.length > 0
            ? dateToISOString(valgtBarnFødselsdatoer[0])
            : undefined;
    const fødselsdatoForSaken = fødselsdatoFraFPSak ?? fødselsdatoFraValgtBarn;
    const grunnlag: Saksgrunnlag = {
        dekningsgrad: dekningsgrad === 'HUNDRE' ? '100' : '80',
        antallBarn: antallBarn,
        morErAleneOmOmsorg: sakTilhørerMor && rettighetType === 'ALENEOMSORG',
        morErUfør: morUføretrygd,
        morHarRett: sakTilhørerMor || rettighetType === 'BEGGE_RETT',
        farMedmorErAleneOmOmsorg: !sakTilhørerMor && rettighetType === 'ALENEOMSORG',
        farMedmorHarRett: !sakTilhørerMor || rettighetType === 'BEGGE_RETT',
        søkerErFarEllerMedmor: erFarEllerMedmor,
        termindato,
        fødselsdato: fødselsdatoForSaken,
        omsorgsovertakelsesdato: omsorgsovertakelse,
        erDeltUttak: rettighetType === 'BEGGE_RETT',
        erBarnetFødt: fødselsdatoForSaken !== undefined,
        familiehendelseDato: getRelevantFamiliehendelseDato(termindato, fødselsdatoForSaken, omsorgsovertakelse),
        familiehendelseType: getFamiliehendelseType(fødselsdatoForSaken, termindato, omsorgsovertakelse),
        ønskerJustertUttakVedFødsel: fødselsdatoForSaken === undefined ? ønskerJustertUttakVedFødsel : undefined,
        harAnnenForelderTilsvarendeRettEØS,
    };

    const saksperioder = perioder
        .map((p) => {
            return mapSaksperiodeFromDTO(p, erAnnenPartsSak);
        })
        .filter(filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode);

    const uttaksplan = mapSaksperioderTilUttaksperioder(
        saksperioder,
        grunnlag,
        eksisterendeSak.gjeldendeVedtak?.perioderAnnenpartEøs,
        førsteUttaksdagNesteBarnsSak,
    );

    return {
        saksnummer: eksisterendeSak.saksnummer,
        erAnnenPartsSak,
        grunnlag,
        saksperioder,
        uttaksplan,
    };
};

const getSøkersituasjonFromSaksgrunnlag = (familiehendelseType: FamiliehendelseType): Situasjon => {
    if (familiehendelseType === FamiliehendelseType.TERM || familiehendelseType === FamiliehendelseType.FØDSEL) {
        return 'fødsel';
    }

    return 'adopsjon';
};

const getSøkerrolleFromSaksgrunnlag = (person: PersonDto_fpoversikt, grunnlag: Saksgrunnlag): Søkerrolle => {
    const { søkerErFarEllerMedmor } = grunnlag;
    const søkerErKvinne = person.kjønn === 'K';
    if (søkerErKvinne) {
        return søkerErFarEllerMedmor ? 'medmor' : 'mor';
    }
    return 'far';
};

const getFødselsdatoer = (valgteBarn: ValgtBarn, sak: Saksgrunnlag): string[] => {
    if (valgteBarn.fødselsdatoer) {
        return sorterDatoEtterEldst(valgteBarn.fødselsdatoer);
    } else if (sak.fødselsdato) {
        return new Array(sak.antallBarn).fill(sak.fødselsdato!);
    }
    return [];
};

const getBarnFromSaksgrunnlag = (situasjon: Situasjon, sak: Saksgrunnlag, valgteBarn: ValgtBarn): Barn => {
    switch (situasjon) {
        case 'fødsel':
            if (sak.fødselsdato) {
                return {
                    type: BarnType.FØDT,
                    antallBarn: sak.antallBarn,
                    fødselsdatoer: getFødselsdatoer(valgteBarn, sak),
                    termindato: sak.termindato,
                    fnr: valgteBarn?.fnr,
                };
            }

            return {
                type: BarnType.UFØDT,
                antallBarn: sak.antallBarn,
                termindato: sak.termindato!,
            };
        case 'adopsjon':
            return {
                type: BarnType.ADOPTERT_STEBARN,
                adopsjonsdato: sak.omsorgsovertakelsesdato!,
                antallBarn: sak.antallBarn,
                fødselsdatoer: getFødselsdatoer(valgteBarn, sak),
                fnr: valgteBarn?.fnr,
            };
        case 'omsorgsovertakelse':
            throw new Error('Kan ikke sende endringssøknad for omsorgsovertakelse');
    }
};

const finnFornavn = (annenPart: AnnenForelderDto_fpoversikt, intl: IntlShape) => {
    return annenPart.navn.fornavn !== undefined && annenPart.navn.fornavn !== ''
        ? annenPart.navn.fornavn
        : intl.formatMessage({ id: 'annen.forelder' });
};

const getAnnenForelderFromSaksgrunnlag = (
    situasjon: Situasjon,
    grunnlag: Saksgrunnlag,
    annenPart: AnnenForelderDto_fpoversikt,
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): AnnenForelderOppgitt => {
    switch (situasjon) {
        case 'fødsel':
        case 'adopsjon':
            if (erFarEllerMedmor) {
                return {
                    fornavn: finnFornavn(annenPart, intl),
                    etternavn: annenPart.navn.etternavn,
                    erMorUfør: grunnlag.morErUfør,
                    harRettPåForeldrepengerINorge: grunnlag.morHarRett && !grunnlag.harAnnenForelderTilsvarendeRettEØS,
                    fnr: annenPart.fnr,
                    kanIkkeOppgis: false,
                    harRettPåForeldrepengerIEØS: grunnlag.harAnnenForelderTilsvarendeRettEØS,
                    erAleneOmOmsorg: grunnlag.farMedmorErAleneOmOmsorg,
                };
            }
            return {
                fornavn: finnFornavn(annenPart, intl),
                etternavn: annenPart.navn.etternavn,
                harRettPåForeldrepengerINorge:
                    grunnlag.farMedmorHarRett && !grunnlag.harAnnenForelderTilsvarendeRettEØS,
                fnr: annenPart.fnr,
                kanIkkeOppgis: false,
                harRettPåForeldrepengerIEØS: grunnlag.harAnnenForelderTilsvarendeRettEØS,
                erAleneOmOmsorg: grunnlag.farMedmorErAleneOmOmsorg || grunnlag.morErAleneOmOmsorg,
            };
        case 'omsorgsovertakelse':
            throw new Error('Kan ikke sende endringssøknad for omsorgsovertakelse');
    }
};

const finnAnnenForelderForSaken = (
    barn: BarnDto_fpoversikt[],
    fødselsdato: Date | undefined,
    grunnlag: Saksgrunnlag,
    situasjon: Situasjon,
    intl: IntlShape,
    valgtBarnFnr: string[] | undefined,
    annenForeldersFnrFraSaken: string | undefined,
) => {
    if ((valgtBarnFnr === undefined && fødselsdato === undefined) || !annenForeldersFnrFraSaken) {
        return undefined;
    }
    const barnMedGittFnr = valgtBarnFnr
        ? barn.find((b) => valgtBarnFnr.includes(b.fnr) && b.annenPart !== undefined)
        : undefined;
    const barnMedGittFødselsdato = fødselsdato
        ? barn.find((b) => getErDatoInnenEnDagFraAnnenDato(b.fødselsdato, fødselsdato) && b.annenPart !== undefined)
        : undefined;

    const barnet = barnMedGittFnr ?? barnMedGittFødselsdato;

    if (barnet !== undefined && barnet.annenPart?.fnr === annenForeldersFnrFraSaken) {
        const annenForelder = barnet.annenPart;
        const { fornavn } = annenForelder.navn;
        const fornavnAnnenForelder =
            fornavn !== undefined && fornavn.trim() !== '' ? fornavn : intl.formatMessage({ id: 'annen.forelder' });
        const annenPart: AnnenForelderDto_fpoversikt = {
            ...annenForelder,
            navn: { ...annenForelder.navn, fornavn: fornavnAnnenForelder },
        };
        return getAnnenForelderFromSaksgrunnlag(situasjon, grunnlag, annenPart, grunnlag.søkerErFarEllerMedmor, intl);
    }

    return undefined;
};

const getBarnFromValgteBarn = (valgteBarn: ValgtBarn): Barn => {
    if (valgteBarn.fødselsdatoer !== undefined && valgteBarn.fødselsdatoer.length > 0) {
        return {
            type: BarnType.FØDT,
            antallBarn: valgteBarn.antallBarn,
            fødselsdatoer: sorterDatoEtterEldst(valgteBarn.fødselsdatoer),
            termindato: dateToISOString(valgteBarn.termindato),
            fnr:
                valgteBarn.fnr !== undefined && valgteBarn.fnr.length > 0
                    ? valgteBarn.fnr.filter((fnr) => !!fnr)
                    : undefined,
        };
    } else if (valgteBarn.termindato) {
        return {
            type: BarnType.UFØDT,
            antallBarn: valgteBarn.antallBarn,
            termindato: dayjs(valgteBarn.termindato).format(ISO_DATE_FORMAT),
        };
    } else {
        return {
            type: BarnType.IKKE_UTFYLT,
            antallBarn: valgteBarn.antallBarn,
            fødselsdatoer: valgteBarn.fødselsdatoer ? sorterDatoEtterEldst(valgteBarn.fødselsdatoer) : [],
            fnr:
                valgteBarn.fnr !== undefined && valgteBarn.fnr.length > 0
                    ? valgteBarn.fnr.filter((fnr) => !!fnr)
                    : undefined,
        };
    }
};

const getAnnenForelderFromValgteBarn = (valgteBarn: ValgtBarn): AnnenForelder | undefined => {
    if (valgteBarn.annenForelder !== undefined) {
        return {
            fornavn: valgteBarn.annenForelder.navn.fornavn,
            etternavn: valgteBarn.annenForelder.navn.etternavn,
            fnr: valgteBarn.annenForelder.fnr,
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
        };
    }

    return undefined;
};

const getRolleFarEllerMedmorFraFnr = (fnr: string): Søkerrolle => {
    const kjønn = getKjønnFromFnrString(fnr);
    if (kjønn === 'K') {
        return 'medmor';
    } else if (kjønn === 'M') {
        return 'far';
    } else {
        throw new Error('Kan ikke utlede kjønn fra fødselsnummer.');
    }
};

export const lagNySøknadForRegistrerteBarn = (valgteBarn: ValgtBarn) => {
    const barn = getBarnFromValgteBarn(valgteBarn);
    const annenForelder = getAnnenForelderFromValgteBarn(valgteBarn);
    const søknad = {
        barn,
        annenForelder,
        erEndringssøknad: false,
    };

    return søknad;
};

const opprettAnnenForelderFraEksisterendeSak = (
    intl: IntlShape,
    annenPartFraSak: Person_fpoversikt | undefined,
    grunnlag: Saksgrunnlag,
    barn: BarnDto_fpoversikt[],
    situasjon: Situasjon,
    valgteBarnFnr: string[] | undefined,
): AnnenForelderOppgitt => {
    const fnrAnnenForelderFraSak = annenPartFraSak !== undefined ? annenPartFraSak.fnr : undefined;

    const mockAnnenForelder = {
        fornavn: intl.formatMessage({ id: 'annen.forelder' }),
        etternavn: '',
        fnr: fnrAnnenForelderFraSak ?? '',
        harRettPåForeldrepengerINorge: grunnlag.søkerErFarEllerMedmor
            ? grunnlag.morHarRett && !grunnlag.harAnnenForelderTilsvarendeRettEØS
            : grunnlag.farMedmorHarRett && !grunnlag.harAnnenForelderTilsvarendeRettEØS,
        harRettPåForeldrepengerIEØS: grunnlag.harAnnenForelderTilsvarendeRettEØS,
        kanIkkeOppgis: false,
        erMorUfør: grunnlag.søkerErFarEllerMedmor ? grunnlag.morErUfør : undefined,
        erAleneOmOmsorg: grunnlag.farMedmorErAleneOmOmsorg || grunnlag.morErAleneOmOmsorg,
    } satisfies AnnenForelderOppgitt;
    const annenForelderFraSak = finnAnnenForelderForSaken(
        barn,
        ISOStringToDate(grunnlag.fødselsdato),
        grunnlag,
        situasjon,
        intl,
        valgteBarnFnr,
        fnrAnnenForelderFraSak,
    );
    return annenForelderFraSak || mockAnnenForelder;
};

export const lagSøknadFraValgteBarnMedSak = (
    valgteBarn: ValgtBarn & { sak: FpSak_fpoversikt },
    intl: IntlShape,
    registrerteBarn: BarnDto_fpoversikt[],
    søkerFnr: string,
): Partial<Søknad> => {
    const eksisterendeSak = mapSøkerensEksisterendeSakFromDTO(valgteBarn.sak, undefined, valgteBarn.fødselsdatoer);
    const { grunnlag } = eksisterendeSak;
    const situasjon = getSøkersituasjonFromSaksgrunnlag(grunnlag.familiehendelseType);
    const barn = getBarnFromValgteBarn(valgteBarn);
    const annenForelder = opprettAnnenForelderFraEksisterendeSak(
        intl,
        valgteBarn.sak.annenPart,
        grunnlag,
        registrerteBarn,
        situasjon,
        valgteBarn.fnr,
    );
    const rolle = valgteBarn.sak.sakTilhørerMor ? 'mor' : getRolleFarEllerMedmorFraFnr(søkerFnr);
    const søkersituasjon = {
        situasjon: valgteBarn.sak.gjelderAdopsjon ? 'adopsjon' : 'fødsel',
        rolle,
    } as const;
    return {
        barn,
        annenForelder,
        søkersituasjon,
        erEndringssøknad: false,
        dekningsgrad: grunnlag.dekningsgrad,
    };
};

export const lagEndringsSøknad = (
    person: PersonDto_fpoversikt,
    eksisterendeSak: EksisterendeSak,
    intl: IntlShape,
    annenPartFraSak: Person_fpoversikt | undefined,
    valgteBarn: ValgtBarn,
): Partial<Søknad> => {
    const { grunnlag, uttaksplan } = eksisterendeSak;
    const { dekningsgrad, familiehendelseType, søkerErFarEllerMedmor, ønskerJustertUttakVedFødsel } = grunnlag;
    const situasjon = getSøkersituasjonFromSaksgrunnlag(familiehendelseType);
    const barn = getBarnFromSaksgrunnlag(situasjon, grunnlag, valgteBarn);
    const rolle = getSøkerrolleFromSaksgrunnlag(person, grunnlag);

    const annenForelder = opprettAnnenForelderFraEksisterendeSak(
        intl,
        annenPartFraSak,
        grunnlag,
        person.barn,
        situasjon,
        valgteBarn?.fnr,
    );

    return {
        søkersituasjon: {
            situasjon,
            rolle,
        },
        barn,
        annenForelder: {
            ...annenForelder,
            erAleneOmOmsorg: søkerErFarEllerMedmor ? grunnlag.farMedmorErAleneOmOmsorg : grunnlag.morErAleneOmOmsorg,
        },
        erEndringssøknad: true,
        dekningsgrad,
        uttaksplan,
        saksnummer: eksisterendeSak.saksnummer,
        ønskerJustertUttakVedFødsel: ønskerJustertUttakVedFødsel,
    };
};
