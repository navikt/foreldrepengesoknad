import { ContextDataMap, ContextDataType, OpprinneligUttaksplan } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import { harMinstEnUttaksEllerOverføringsperiode } from 'steps/uttaksplan/submitValidering';
import { AnnenForelder, isAnnenForelderIkkeOppgitt } from 'types/AnnenForelder';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { VedleggDataType } from 'types/VedleggDataType';
import { getEndringstidspunktNy } from 'utils/dateUtils';

import {
    AnnenForelderDto,
    Attachment,
    Barn,
    BarnDto,
    BrukerRolle,
    EndringssøknadForeldrepengerDto,
    ForeldrepengesøknadDto,
    FpPersonopplysningerDto_fpoversikt,
    FpSak_fpoversikt,
    KontoType,
    Målform,
    SøkerDto,
    Søkerrolle,
    UttakPeriodeDto,
    isAdoptertBarn,
    isAdoptertStebarn,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-types';
import { Uttaksdagen, Uttaksperioden, getDecoratorLanguageCookie, omitOne } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

const hentValgtSpråk = (): Målform => {
    return getDecoratorLanguageCookie('decorator-language').toUpperCase() as Målform;
};

const cleanBarn = (barn: Barn): BarnDto => {
    if (isUfødtBarn(barn)) {
        return {
            type: 'termin',
            antallBarn: barn.antallBarn,
            termindato: barn.termindato,
            terminbekreftelseDato: barn.terminbekreftelsedato,
        };
    }

    if (isFødtBarn(barn)) {
        return {
            type: 'fødsel',
            antallBarn: barn.antallBarn,
            fødselsdato: barn.fødselsdatoer[0]!,
            termindato: barn.termindato,
        };
    }

    if (isAdoptertBarn(barn)) {
        const barnRest = omitOne(barn, 'type');
        return {
            ...barnRest,
            type: 'adopsjon',
            adopsjonAvEktefellesBarn: isAdoptertStebarn(barn),
        };
    }

    throw new Error('Det er feil i data om barnet');
};

const konverterRolle = (rolle: Søkerrolle): BrukerRolle => {
    switch (rolle) {
        case 'mor': {
            return 'MOR';
        }
        case 'far': {
            return 'FAR';
        }
        case 'medmor': {
            return 'MEDMOR';
        }
    }
};

const convertAttachmentsMapToArray = (vedlegg: VedleggDataType | undefined): Attachment[] => {
    if (!vedlegg) {
        return [];
    }

    const vedleggArray: Attachment[] = [];

    for (const key of Object.keys(vedlegg)) {
        const vedleggAvTypeSkjemanummer = vedlegg[key as GyldigeSkjemanummer];

        if (vedleggAvTypeSkjemanummer && vedleggAvTypeSkjemanummer.length > 0) {
            vedleggArray.push(...vedleggAvTypeSkjemanummer);
        }
    }

    return vedleggArray;
};

const cleanAnnenforelder = (annenForelder: AnnenForelder | undefined): AnnenForelderDto | undefined => {
    if (annenForelder === undefined || isAnnenForelderIkkeOppgitt(annenForelder)) {
        return;
    }

    const harRettPåForeldrepenger = !!annenForelder.harRettPåForeldrepengerINorge;
    /*
     Hvis bruker har svart på spørsmålet om annenForelder er informert så bruker vi det.
     Men i tilfelle endringssøknad så finnes ikke dette spørsmålet eksplisitt (det finnes implisitt i en checkbox for å kunne sende).
     I de tilfellene sier vi ja hvis annen forelder har rett i Norge.
    */
    const erInformertOmSøknaden = (() => {
        if (annenForelder.erInformertOmSøknaden === undefined) {
            return harRettPåForeldrepenger ? true : undefined;
        }
        return annenForelder.erInformertOmSøknaden;
    })();

    const baseData = {
        fnr: annenForelder.fnr,
        fornavn: annenForelder.fornavn,
        etternavn: annenForelder.etternavn,
        rettigheter: {
            harRettPåForeldrepenger,
            erInformertOmSøknaden,
            erAleneOmOmsorg: annenForelder.erAleneOmOmsorg,
            harMorUføretrygd: annenForelder.erMorUfør,
            harAnnenForelderOppholdtSegIEØS: annenForelder.harOppholdtSegIEØS,
            harAnnenForelderTilsvarendeRettEØS:
                // Bevarer logikken fra steget og gammel oppførsel her siden harRettPåForeldrepengerIEØS defaulter til false mange plasser
                annenForelder.harRettPåForeldrepengerINorge === false && annenForelder.harOppholdtSegIEØS === true
                    ? annenForelder.harRettPåForeldrepengerIEØS
                    : undefined,
        },
    };
    return annenForelder.utenlandskFnr
        ? { type: 'utenlandsk', ...baseData, bostedsland: annenForelder.bostedsland ?? 'UNDEFINED' }
        : { type: 'norsk', ...baseData };
};

export const getSøknadsdataForInnsending = (
    erEndringssøknad: boolean,
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    søkerinfo: FpPersonopplysningerDto_fpoversikt,
    foreldrepengerSaker: FpSak_fpoversikt[],
): ForeldrepengesøknadDto | EndringssøknadForeldrepengerDto => {
    const valgtEksisterendeSaksnr = hentData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);

    if (erEndringssøknad && foreldrepengerSaker.every((sak) => sak.saksnummer !== valgtEksisterendeSaksnr)) {
        throw new Error('Finner ikke valgt sak for endringssøknad');
    }

    return erEndringssøknad ? mapTilEndringssøknadDto(hentData, søkerinfo) : mapTilSøknadDto(hentData, søkerinfo);
};

// Dobbelsikring mot at en plan som ikke er validert i uttaksplan-steget (f.eks. etter navigering med
// nettleserens frem/tilbake-knapp) blir sendt inn uten periodene backend krever.
export const harSøknadenNødvendigeUttaksperioder = (
    søknad: ForeldrepengesøknadDto | EndringssøknadForeldrepengerDto,
    erEndringssøknad: boolean,
    helePlanen: UttakPeriodeDto[],
): boolean => {
    if (erEndringssøknad) {
        // Med endringsdato legger fp-soknad selv inn fri utsettelse, så de innsendte periodene trenger ingen
        // søkerperiode. Søkeren må likevel ha egne perioder i planen.
        const harSøkerperiodeEllerEndringsdato =
            ('endringsdato' in søknad && søknad.endringsdato !== undefined) ||
            (søknad.uttaksplan.perioder ?? []).some((periode) => periode.søker !== undefined);
        return harSøkerperiodeEllerEndringsdato && helePlanen.some((periode) => periode.søker !== undefined);
    }
    return harMinstEnUttaksEllerOverføringsperiode(søknad.uttaksplan.perioder ?? []);
};

export const mapTilSøknadDto = (
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    søkerinfo: FpPersonopplysningerDto_fpoversikt,
): ForeldrepengesøknadDto => {
    const annenForelder = notEmpty(hentData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(hentData(ContextDataType.OM_BARNET));
    const frilans = hentData(ContextDataType.FRILANS);
    const egenNæring = hentData(ContextDataType.EGEN_NÆRING);
    const andreInntektskilder = hentData(ContextDataType.ANDRE_INNTEKTSKILDER);
    const søkersituasjon = notEmpty(hentData(ContextDataType.SØKERSITUASJON));
    const utenlandsoppholdNeste12Mnd = hentData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const utenlandsoppholdSiste12Mnd = hentData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const dekningsgrad = notEmpty(hentData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const uttaksplan = notEmpty(hentData(ContextDataType.UTTAKSPLAN));
    const ønskerJustertUttakVedFødsel = hentData(ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL);

    const vedlegg = hentData(ContextDataType.VEDLEGG);

    return {
        søkerinfo: mapSøkerInfoTilSøknadDto(søkerinfo),
        rolle: konverterRolle(søkersituasjon.rolle),
        språkkode: hentValgtSpråk(),
        frilans: frilans,
        egenNæring: egenNæring,
        andreInntekterSiste10Mnd: andreInntektskilder,
        barn: cleanBarn(barn),
        annenForelder: cleanAnnenforelder(annenForelder),
        dekningsgrad,
        // fpsoknad tek søkjaren sine periodar herifrå og lagrar annan part sine periodar i fp-oversikt, så
        // perioder skal innehalda heile planen.
        uttaksplan: {
            perioder: uttaksplan,
            ønskerJustertUttakVedFødsel,
        },
        utenlandsopphold: [...(utenlandsoppholdSiste12Mnd ?? []), ...(utenlandsoppholdNeste12Mnd ?? [])],
        vedlegg: convertAttachmentsMapToArray(vedlegg),
    };
};

const mapSøkerInfoTilSøknadDto = (søkerinfo: FpPersonopplysningerDto_fpoversikt): SøkerDto => {
    return {
        fnr: søkerinfo.fnr,
        navn: søkerinfo.navn,
        arbeidsforhold: søkerinfo.arbeidsforhold.map((af) => ({
            navn: af.arbeidsgiverNavn,
            orgnummer: af.arbeidsgiverId,
            stillingsprosent: af.stillingsprosent,
            fom: af.fom,
            tom: af.tom,
        })),
        // Oppdragsgiver kan være en privatperson, så arbeidsgiverId sendes ikke med (ville vært et fødselsnummer)
        frilansoppdrag: søkerinfo.frilansoppdrag.map((fo) => ({
            navn: fo.arbeidsgiverNavn,
            fom: fo.fom,
            tom: fo.tom,
        })),
        selvstendigNæring: søkerinfo.selvstendigNæring.map((sn) => ({
            navn: sn.navn,
            organisasjonsnummer: sn.organisasjonsnummer,
            næringstype: sn.næringstype,
        })),
    };
};

export const mapTilEndringssøknadDto = (
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    søkerinfo: FpPersonopplysningerDto_fpoversikt,
): EndringssøknadForeldrepengerDto => {
    const annenForelder = notEmpty(hentData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(hentData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(hentData(ContextDataType.SØKERSITUASJON));
    const valgtEksisterendeSaksnr = notEmpty(hentData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR));
    const uttaksplan = notEmpty(hentData(ContextDataType.UTTAKSPLAN));
    const opprinneligUttaksplan = hentData(ContextDataType.OPPRINNELIG_UTTAKSPLAN);
    const ønskerJustertUttakVedFødsel = hentData(ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL);
    const vedlegg = hentData(ContextDataType.VEDLEGG);

    const søkersNyePerioder = filtrerUtAnnenPartsPerioder(uttaksplan);

    const søkersEksisterendePerioder = filtrerUtAnnenPartsPerioder(
        finnOpprinneligPlan(opprinneligUttaksplan, valgtEksisterendeSaksnr),
    );

    const endringstidspunkt = getEndringstidspunktNy(søkersEksisterendePerioder, søkersNyePerioder);

    // fp-soknad avviser endringsdato i helg.
    const endringsdato = endringstidspunkt ? Uttaksdagen.denneEllerNeste(endringstidspunkt).getDato() : undefined;
    const perioder = fjernSøkersAvslåttePerioder(uttaksplan, endringsdato);

    return {
        søkerinfo: mapSøkerInfoTilSøknadDto(søkerinfo),
        saksnummer: valgtEksisterendeSaksnr,
        rolle: konverterRolle(søkersituasjon.rolle),
        språkkode: hentValgtSpråk(),
        barn: cleanBarn(barn),
        annenForelder: cleanAnnenforelder(annenForelder),
        vedlegg: convertAttachmentsMapToArray(vedlegg),
        endringsdato,
        uttaksplan: {
            perioder,
            ønskerJustertUttakVedFødsel,
        },
    };
};

// Søkeren skal ikke søke på nytt om avslåtte perioder som sendes videre til fpsak. fp-soknad sender perioder som
// slutter på eller etter endringsdato (kuttet ved endringsdato), og hele planen når endringsdato mangler.
const fjernSøkersAvslåttePerioder = (
    uttaksplan: UttakPeriodeDto[],
    endringsdato: string | undefined,
): UttakPeriodeDto[] =>
    uttaksplan.flatMap((periode) => {
        const sendesTilFpsak = endringsdato === undefined || !dayjs(periode.tom).isBefore(endringsdato, 'day');
        if (!sendesTilFpsak || periode.søker?.resultat?.innvilget !== false) {
            return [periode];
        }
        return periode.annenPart || periode.annenPartEøs ? [omitOne(periode, 'søker')] : [];
    });

const finnOpprinneligPlan = (
    opprinneligUttaksplan: OpprinneligUttaksplan | undefined,
    valgtEksisterendeSaksnr: string,
): UttakPeriodeDto[] => {
    if (opprinneligUttaksplan === undefined) {
        throw new Error('Mangler opprinnelig uttaksplan for endringssøknad');
    }
    if (opprinneligUttaksplan.saksnummer !== valgtEksisterendeSaksnr) {
        throw new Error('Opprinnelig uttaksplan tilhører ikke valgt sak');
    }
    return opprinneligUttaksplan.perioder;
};

// Endringstidspunktet finnes ut fra søkerens perioder og annen parts uttak som tidligere ble sendt som opphold.
// Annen parts utsettelser, avslag og perioder på kontoer uten oppholdsårsak (f.eks. FFF) er ikke opphold.
const filtrerUtAnnenPartsPerioder = (uttaksplan: UttakPeriodeDto[]): UttakPeriodeDto[] => {
    return uttaksplan.filter((periode) => periode.søker !== undefined || erOppholdSomKanSendast(periode));
};

const erOppholdSomKanSendast = (periode: UttakPeriodeDto): boolean => {
    const annenPart = periode.annenPart;
    return (
        Uttaksperioden.erOppholdsperiode(periode) &&
        !!annenPart &&
        annenPart.utsettelseÅrsak === undefined &&
        annenPart.resultat?.innvilget !== false &&
        annenPart.kontoType !== undefined &&
        KONTOTYPER_MED_OPPHOLDSÅRSAK.has(annenPart.kontoType)
    );
};

const KONTOTYPER_MED_OPPHOLDSÅRSAK = new Set<KontoType>([
    'MØDREKVOTE',
    'FEDREKVOTE',
    'FELLESPERIODE',
    'FORELDREPENGER',
]);
