import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { Søknad } from 'types/Søknad';
import { ValgtBarn } from 'types/ValgtBarn';

import {
    AnnenForelder,
    Arbeidsform,
    Barn,
    BarnType,
    Dekningsgrad,
    EksisterendeSak,
    FamiliehendelseType,
    OppholdÅrsakType,
    OppholdÅrsakTypeDTO,
    Saksgrunnlag,
    Saksperiode,
    SaksperiodeDTO,
    Situasjon,
    StønadskontoType,
    Søkerrolle,
    UttakArbeidType,
    isAdoptertBarn,
    isFødtBarn,
    isInfoPeriode,
    isUfødtBarn,
} from '@navikt/fp-common';
import { RettighetType } from '@navikt/fp-common/src/common/types/RettighetType';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { AnnenForelderFrontend, AnnenPartSak, BarnFrontend, FpSak, Person, PersonFrontend } from '@navikt/fp-types';
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

const getStønadskontoTypeFromOppholdÅrsakType = (årsak: OppholdÅrsakTypeDTO): StønadskontoType | undefined => {
    switch (årsak) {
        case OppholdÅrsakTypeDTO.UttakFedrekvoteAnnenForelder:
            return StønadskontoType.Fedrekvote;
        case OppholdÅrsakTypeDTO.UttakFellesperiodeAnnenForelder:
            return StønadskontoType.Fellesperiode;
        case OppholdÅrsakTypeDTO.UttakMødrekvoteAnnenForelder:
            return StønadskontoType.Mødrekvote;
        default:
            return undefined;
    }
};

const mapOppholdÅrsakType = (årsak: OppholdÅrsakTypeDTO | undefined): OppholdÅrsakType | undefined => {
    switch (årsak) {
        case OppholdÅrsakTypeDTO.UttakFedrekvoteAnnenForelder:
            return OppholdÅrsakType.UttakFedrekvoteAnnenForelder;
        case OppholdÅrsakTypeDTO.UttakFellesperiodeAnnenForelder:
            return OppholdÅrsakType.UttakFellesperiodeAnnenForelder;
        case OppholdÅrsakTypeDTO.UttakMødrekvoteAnnenForelder:
            return OppholdÅrsakType.UttakMødrekvoteAnnenForelder;
        default:
            return undefined;
    }
};

export const mapSaksperiodeFromDTO = (p: SaksperiodeDTO, erAnnenPartsSak: boolean): Saksperiode => {
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

const saksperiodeErInnvilget = (saksperiode: Saksperiode): boolean => saksperiode.resultat.innvilget;

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

export const getStartdatoFørstePeriodeAnnenPart = (annenPartsSak: AnnenPartSak | undefined): Date | undefined => {
    if (!annenPartsSak || annenPartsSak.perioder.length === 0) {
        return undefined;
    }
    return ISOStringToDate(annenPartsSak.perioder[0].fom);
};

export const mapAnnenPartsEksisterendeSakFromDTO = (
    eksisterendeSakAnnenPart: AnnenPartSak | undefined,
    barn: Barn,
    søkerErFarEllerMedmor: boolean,
    familiehendelsesdato: string,
    førsteUttaksdagNesteBarnsSak: Date | undefined,
): EksisterendeSak | undefined => {
    if (
        eksisterendeSakAnnenPart === undefined ||
        eksisterendeSakAnnenPart === null ||
        //@ts-expect-error Dette skjer i Storybook av ein eller annan grunn. Ser ut som ein bug i chrome da logging av variabel gir undefined
        eksisterendeSakAnnenPart === ''
    ) {
        return undefined;
    }
    const erAnnenPartsSak = true;
    const saksperioderAnnenPart = eksisterendeSakAnnenPart.perioder
        .map((p) => {
            //@ts-expect-error -- ignorer frem til typer er ported til autogenererte
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
        dekningsgrad:
            eksisterendeSakAnnenPart.dekningsgrad === 'HUNDRE'
                ? Dekningsgrad.HUNDRE_PROSENT
                : Dekningsgrad.ÅTTI_PROSENT,
        antallBarn: eksisterendeSakAnnenPart.antallBarn ? eksisterendeSakAnnenPart.antallBarn : barn.antallBarn,
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
    };

    const uttaksplanAnnenPart = mapSaksperioderTilUttaksperioder(
        saksperioderAnnenPart,
        grunnlagForAnnenPart,
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
    eksisterendeSak: FpSak,
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
    const fødselsdatoForSaken = fødselsdatoFraFPSak || fødselsdatoFraValgtBarn;
    const grunnlag: Saksgrunnlag = {
        dekningsgrad: dekningsgrad === 'HUNDRE' ? Dekningsgrad.HUNDRE_PROSENT : Dekningsgrad.ÅTTI_PROSENT,
        antallBarn: antallBarn,
        morErAleneOmOmsorg: sakTilhørerMor && rettighetType === RettighetType.ALENEOMSORG,
        morErUfør: morUføretrygd,
        morHarRett: sakTilhørerMor || rettighetType === RettighetType.BEGGE_RETT,
        farMedmorErAleneOmOmsorg: !sakTilhørerMor && rettighetType === RettighetType.ALENEOMSORG,
        farMedmorHarRett: !sakTilhørerMor || rettighetType === RettighetType.BEGGE_RETT,
        søkerErFarEllerMedmor: erFarEllerMedmor,
        termindato,
        fødselsdato: fødselsdatoForSaken,
        omsorgsovertakelsesdato: omsorgsovertakelse,
        erDeltUttak: rettighetType === RettighetType.BEGGE_RETT,
        erBarnetFødt: fødselsdatoForSaken !== undefined,
        familiehendelseDato: getRelevantFamiliehendelseDato(termindato, fødselsdatoForSaken, omsorgsovertakelse),
        familiehendelseType: getFamiliehendelseType(fødselsdatoForSaken, termindato, omsorgsovertakelse),
        ønskerJustertUttakVedFødsel: fødselsdatoForSaken === undefined ? ønskerJustertUttakVedFødsel : undefined,
        harAnnenForelderTilsvarendeRettEØS,
    };

    const saksperioder = perioder
        .map((p) => {
            // @ts-expect-error -- feil frem til alt er over på nye autogenererte typer
            return mapSaksperiodeFromDTO(p, erAnnenPartsSak);
        })
        .filter(filterAvslåttePeriodeMedInnvilgetPeriodeISammeTidsperiode);

    const uttaksplan = mapSaksperioderTilUttaksperioder(saksperioder, grunnlag, førsteUttaksdagNesteBarnsSak);

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

const getSøkerrolleFromSaksgrunnlag = (søker: PersonFrontend, grunnlag: Saksgrunnlag): Søkerrolle => {
    const { søkerErFarEllerMedmor } = grunnlag;
    const søkerErKvinne = søker.kjønn === 'K';
    if (søkerErKvinne) {
        return søkerErFarEllerMedmor ? 'medmor' : 'mor';
    }
    return 'far';
};

const getFødselsdatoer = (valgteBarn: ValgtBarn, sak: Saksgrunnlag): string[] => {
    if (valgteBarn.fødselsdatoer) {
        return sorterDatoEtterEldst(valgteBarn.fødselsdatoer);
    } else if (sak.fødselsdato) {
        return Array(sak.antallBarn).fill(sak.fødselsdato!);
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
                    termindato: sak.termindato ? sak.termindato : undefined,
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

const finnFornavn = (annenPart: AnnenForelderFrontend, intl: IntlShape) => {
    return annenPart.fornavn !== undefined && annenPart.fornavn !== ''
        ? annenPart.fornavn
        : intl.formatMessage({ id: 'annen.forelder' });
};

const getAnnenForelderFromSaksgrunnlag = (
    situasjon: Situasjon,
    grunnlag: Saksgrunnlag,
    annenPart: AnnenForelderFrontend,
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): AnnenForelder => {
    switch (situasjon) {
        case 'fødsel':
        case 'adopsjon':
            if (erFarEllerMedmor) {
                return {
                    fornavn: finnFornavn(annenPart, intl),
                    etternavn: annenPart.etternavn,
                    erMorUfør: grunnlag.morErUfør,
                    harRettPåForeldrepengerINorge:
                        !!grunnlag.morHarRett && !grunnlag.harAnnenForelderTilsvarendeRettEØS,
                    fnr: annenPart.fnr,
                    kanIkkeOppgis: false,
                    harRettPåForeldrepengerIEØS: grunnlag.harAnnenForelderTilsvarendeRettEØS,
                    erAleneOmOmsorg: grunnlag.farMedmorErAleneOmOmsorg,
                };
            }
            return {
                fornavn: finnFornavn(annenPart, intl),
                etternavn: annenPart.etternavn,
                harRettPåForeldrepengerINorge:
                    !!grunnlag.farMedmorHarRett && !grunnlag.harAnnenForelderTilsvarendeRettEØS,
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
    barn: BarnFrontend[],
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
    const barnMedGittFnr =
        valgtBarnFnr !== undefined
            ? barn.find((b) => valgtBarnFnr.includes(b.fnr) && b.annenForelder !== undefined)
            : undefined;
    const barnMedGittFødselsdato =
        fødselsdato !== undefined
            ? barn.find(
                  (b) => getErDatoInnenEnDagFraAnnenDato(b.fødselsdato, fødselsdato) && b.annenForelder !== undefined,
              )
            : undefined;

    const barnet = barnMedGittFnr || barnMedGittFødselsdato;

    if (barnet !== undefined && barnet.annenForelder?.fnr === annenForeldersFnrFraSaken) {
        const annenForelder = barnet.annenForelder;
        const { fornavn } = annenForelder;
        const fornavnAnnenForelder =
            fornavn !== undefined && fornavn.trim() !== '' ? fornavn : intl.formatMessage({ id: 'annen.forelder' });
        const annenPart: AnnenForelderFrontend = { ...annenForelder, fornavn: fornavnAnnenForelder };
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
    } else if (valgteBarn.termindato !== undefined) {
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

const getAnnenForelderFromValgteBarn = (valgteBarn: ValgtBarn): AnnenForelder => {
    if (valgteBarn.annenForelder !== undefined) {
        return {
            fornavn: valgteBarn.annenForelder.fornavn,
            etternavn: valgteBarn.annenForelder.etternavn,
            fnr: valgteBarn.annenForelder.fnr,
            kanIkkeOppgis: false,
        };
    }

    return {
        kanIkkeOppgis: false,
    };
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

export const opprettAnnenForelderFraEksisterendeSak = (
    intl: IntlShape,
    annenPartFraSak: Person | undefined,
    grunnlag: Saksgrunnlag,
    barn: BarnFrontend[],
    situasjon: Situasjon,
    valgteBarnFnr: string[] | undefined,
): AnnenForelder => {
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
    };
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
    valgteBarn: ValgtBarn & { sak: FpSak },
    intl: IntlShape,
    registrerteBarn: BarnFrontend[],
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
    søker: PersonFrontend,
    eksisterendeSak: EksisterendeSak,
    intl: IntlShape,
    annenPartFraSak: Person | undefined,
    valgteBarn: ValgtBarn,
): Partial<Søknad> => {
    const { grunnlag, uttaksplan } = eksisterendeSak;
    const { dekningsgrad, familiehendelseType, søkerErFarEllerMedmor, ønskerJustertUttakVedFødsel } = grunnlag;
    const situasjon = getSøkersituasjonFromSaksgrunnlag(familiehendelseType);
    const barn = getBarnFromSaksgrunnlag(situasjon, grunnlag, valgteBarn);
    const rolle = getSøkerrolleFromSaksgrunnlag(søker, grunnlag);

    const annenForelder = opprettAnnenForelderFraEksisterendeSak(
        intl,
        annenPartFraSak,
        grunnlag,
        søker.barn,
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
