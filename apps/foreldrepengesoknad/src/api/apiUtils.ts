import { ContextDataMap, ContextDataType, OpprinneligUttaksplan } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import { AnnenForelder, isAnnenForelderIkkeOppgitt, isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';
import { VedleggDataType } from 'types/VedleggDataType';
import { getEndringstidspunktNy } from 'utils/dateUtils';

import { Periodetype } from '@navikt/fp-constants';
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
    Oppholdsårsak,
    SøkerDto,
    Søkerrolle,
    UtsettelsesÅrsak,
    UtsettelseÅrsak_fpoversikt,
    UttakPeriodeDto_fpoversikt,
    Uttaksplanperiode,
    isAdoptertBarn,
    isAdoptertStebarn,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-types';
import { Uttaksdagen, Uttaksperioden, getDecoratorLanguageCookie, omitOne } from '@navikt/fp-utils';
import { skalBesvareFlerbarnsdager } from '@navikt/fp-uttaksplan/flerbarnsdager';
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

const finnTidsromForFriUtsettelse = (perioder: Array<{ fom: string }>, endringstidspunkt: string) => {
    const førstePeriodeEtterEndringstidspunkt = perioder.find((periode) =>
        dayjs(periode.fom).isAfter(endringstidspunkt, 'day'),
    );
    const endringsTidspunktPeriodeTom = førstePeriodeEtterEndringstidspunkt
        ? Uttaksdagen.forrige(førstePeriodeEtterEndringstidspunkt.fom).getDato()
        : endringstidspunkt;

    return {
        fom: endringstidspunkt,
        tom: dayjs(endringsTidspunktPeriodeTom).isBefore(endringstidspunkt, 'day')
            ? endringstidspunkt
            : endringsTidspunktPeriodeTom,
    };
};

export const getUttaksplanMedFriUtsettelsesperiode = (
    uttaksplan: Uttaksplanperiode[],
    endringstidspunkt: string,
): Uttaksplanperiode[] => {
    const endringsTidspunktPeriode: Uttaksplanperiode = {
        type: Periodetype.Utsettelse,
        årsak: 'FRI',
        ...finnTidsromForFriUtsettelse(uttaksplan, endringstidspunkt),
        erArbeidstaker: false,
    };

    uttaksplan.push(endringsTidspunktPeriode);

    uttaksplan.sort((p1, p2) => (dayjs(p1.fom).isBefore(p2.fom, 'day') ? -1 : 1));

    return uttaksplan;
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
                annenForelder.harRettPåForeldrepengerINorge !== false || annenForelder.harOppholdtSegIEØS !== true
                    ? undefined
                    : annenForelder.harRettPåForeldrepengerIEØS,
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

    const søkersPerioder = uttaksplan.filter((periode) => periode.søker !== undefined);

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
            uttaksperioder: midlertidigMappingAvUttaksplan(søkersPerioder, barn, annenForelder),
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

    const perioderForInnsending = endringstidspunkt
        ? filtrerPerioderFraOgMedEndringstidspunkt(søkersNyePerioder, endringstidspunkt)
        : søkersNyePerioder;

    const perioderSomSendes = filtrerUtAvslåttePerioder(filtrerUtEøsPeriode(perioderForInnsending));
    const mappaUttaksperioder = midlertidigMappingAvUttaksplan(perioderSomSendes, barn, annenForelder);

    const harPeriodeVedEndringstidspunkt = perioderForInnsending.some((periode) =>
        dayjs(endringstidspunkt).isBetween(periode.fom, periode.tom, 'day', '[]'),
    );
    const skalLeggeTilFriUtsettelse = endringstidspunkt && !harPeriodeVedEndringstidspunkt;

    // Midlertidig innsendingstilpasning: bruk samme datokutt og filtrering av annen part og avslag
    // som for uttaksperioder, til backend overtar. Den fullstendige planen i konteksten beholdes.
    const søkersRolle = søkersituasjon.rolle === 'mor' ? 'MOR' : 'FAR_MEDMOR';
    const perioder = skalLeggeTilFriUtsettelse
        ? leggTilFriUtsettelseForInnsending(perioderSomSendes, endringstidspunkt, søkersRolle)
        : perioderSomSendes;

    return {
        søkerinfo: mapSøkerInfoTilSøknadDto(søkerinfo),
        saksnummer: valgtEksisterendeSaksnr,
        rolle: konverterRolle(søkersituasjon.rolle),
        språkkode: hentValgtSpråk(),
        barn: cleanBarn(barn),
        annenForelder: cleanAnnenforelder(annenForelder),
        vedlegg: convertAttachmentsMapToArray(vedlegg),
        uttaksplan: {
            uttaksperioder: skalLeggeTilFriUtsettelse
                ? getUttaksplanMedFriUtsettelsesperiode(mappaUttaksperioder, endringstidspunkt)
                : mappaUttaksperioder,
            perioder,
            ønskerJustertUttakVedFødsel,
        },
    };
};

const leggTilFriUtsettelseForInnsending = (
    perioder: UttakPeriodeDto_fpoversikt[],
    endringstidspunkt: string,
    søkersRolle: 'MOR' | 'FAR_MEDMOR',
): UttakPeriodeDto_fpoversikt[] => {
    const friPeriode: UttakPeriodeDto_fpoversikt = {
        ...finnTidsromForFriUtsettelse(perioder, endringstidspunkt),
        søker: { forelder: søkersRolle, utsettelseÅrsak: 'FRI', flerbarnsdager: false },
    };
    return [...perioder, friPeriode].toSorted((p1, p2) => (dayjs(p1.fom).isBefore(p2.fom, 'day') ? -1 : 1));
};

const finnOpprinneligPlan = (
    opprinneligUttaksplan: OpprinneligUttaksplan | undefined,
    valgtEksisterendeSaksnr: string,
): UttakPeriodeDto_fpoversikt[] => {
    if (opprinneligUttaksplan === undefined) {
        throw new Error('Mangler opprinnelig uttaksplan for endringssøknad');
    }
    if (opprinneligUttaksplan.saksnummer !== valgtEksisterendeSaksnr) {
        throw new Error('Opprinnelig uttaksplan tilhører ikke valgt sak');
    }
    return opprinneligUttaksplan.perioder;
};

const filtrerPerioderFraOgMedEndringstidspunkt = (
    perioder: UttakPeriodeDto_fpoversikt[],
    endringstidspunkt: string,
): UttakPeriodeDto_fpoversikt[] => {
    const endring = dayjs(endringstidspunkt);
    return perioder.filter(
        (periode) =>
            endring.isBetween(periode.fom, periode.tom, 'day', '[]') ||
            dayjs(periode.fom).isSameOrAfter(endring, 'day'),
    );
};

const filtrerUtEøsPeriode = (nyUttaksplan: UttakPeriodeDto_fpoversikt[]): UttakPeriodeDto_fpoversikt[] => {
    // Ei "eøs-periode" i det gamle flate modellen var ei rein annenPartEøs-rad utan .søker/.annenPart.
    // Slike periodar manglar no både .søker og .annenPart.
    return nyUttaksplan.filter((periode) => periode.søker !== undefined || periode.annenPart !== undefined);
};

const filtrerUtAvslåttePerioder = (perioder: UttakPeriodeDto_fpoversikt[]): UttakPeriodeDto_fpoversikt[] => {
    // Ikke fjern bare søkerdelen: da ville backend tolket et gjenværende uttak hos annen part som et nytt opphold.
    return perioder.filter((periode) => periode.søker?.resultat?.innvilget !== false);
};

// Ved endringssøknad blir annan part sitt uttak sendt som opphald, slik opphaldsradene i søkjaren sitt
// eige vedtak vart sende før. Førstegongssøknaden sender berre søkjaren sine eigne periodar.
// Annan part sine utsetjingar, avslag og periodar på kontoar utan opphaldsårsak (t.d. FFF) er ikkje opphald.
const filtrerUtAnnenPartsPerioder = (uttaksplan: UttakPeriodeDto_fpoversikt[]): UttakPeriodeDto_fpoversikt[] => {
    return uttaksplan.filter((periode) => periode.søker !== undefined || erOppholdSomKanSendast(periode));
};

const erOppholdSomKanSendast = (periode: UttakPeriodeDto_fpoversikt): boolean => {
    const annenPart = periode.annenPart;
    return (
        Uttaksperioden.erOppholdsperiode(periode) &&
        !!annenPart &&
        annenPart.utsettelseÅrsak === undefined &&
        annenPart.resultat?.innvilget !== false &&
        kontoTypeTilOppholdsårsak(annenPart.kontoType) !== undefined
    );
};

const midlertidigMappingAvUttaksplan = (
    uttaksplan: UttakPeriodeDto_fpoversikt[],
    barn: Barn,
    annenForelder: AnnenForelder,
): Uttaksplanperiode[] => {
    const erDeltUttak = isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepengerINorge || !!annenForelder.harRettPåForeldrepengerIEØS
        : false;

    return uttaksplan.map((periode) => {
        if (Uttaksperioden.erOppholdsperiode(periode)) {
            return {
                type: 'opphold',
                fom: periode.fom,
                tom: periode.tom,
                årsak: notEmpty(kontoTypeTilOppholdsårsak(periode.annenPart?.kontoType)),
            };
        }

        // Ei uttaksperiode/utsettelse/overføring har alltid ein .søker her, sidan periodar
        // utan .søker allereie er filtrert bort med mindre dei er oppholdsperiodar (over).
        const søker = notEmpty(periode.søker);

        const skalViseFlerbarnsdager = skalBesvareFlerbarnsdager(
            barn.antallBarn,
            søker.forelder,
            søker.kontoType,
            søker.samtidigUttak,
        );

        if (søker.overføringÅrsak) {
            return {
                type: 'overføring',
                fom: periode.fom,
                tom: periode.tom,
                konto: notEmpty(søker.kontoType),
                årsak: søker.overføringÅrsak,
            };
        }
        if (søker.utsettelseÅrsak) {
            return {
                type: 'utsettelse',
                fom: periode.fom,
                tom: periode.tom,
                erArbeidstaker: false,
                morsAktivitetIPerioden: søker.morsAktivitet,
                årsak: midlertidigMappingAvUtsettelseÅrsak(søker.utsettelseÅrsak),
            };
        }
        return {
            type: 'uttak',
            fom: periode.fom,
            tom: periode.tom,
            gradering: søker.gradering
                ? {
                      erArbeidstaker: søker.gradering.aktivitet?.type === 'ORDINÆRT_ARBEID',
                      erFrilanser: søker.gradering.aktivitet?.type === 'FRILANS',
                      erSelvstendig: søker.gradering.aktivitet?.type === 'SELVSTENDIG_NÆRINGSDRIVENDE',
                      orgnumre: søker.gradering.aktivitet?.arbeidsgiver?.id
                          ? [søker.gradering.aktivitet.arbeidsgiver.id]
                          : [],
                      stillingsprosent: søker.gradering?.arbeidstidprosent,
                  }
                : undefined,
            konto: notEmpty(søker.kontoType),
            morsAktivitetIPerioden: søker.morsAktivitet,
            samtidigUttakProsent: søker.samtidigUttak,
            ønskerFlerbarnsdager: skalViseFlerbarnsdager ? søker.flerbarnsdager : undefined,
            ønskerGradering: søker.gradering !== undefined,
            ønskerSamtidigUttak: erDeltUttak ? søker.samtidigUttak !== undefined : undefined,
        };
    });
};

// Opphaldsårsaka kom tidlegare direkte frå backend som eit eige felt. No er ho strukturell:
// årsaka til at søkjar har eit hol i planen sin er kontotypen til annan part sitt uttak der.
const kontoTypeTilOppholdsårsak = (kontoType: KontoType | undefined): Oppholdsårsak | undefined => {
    switch (kontoType) {
        case 'MØDREKVOTE': {
            return 'UTTAK_MØDREKVOTE_ANNEN_FORELDER';
        }
        case 'FEDREKVOTE': {
            return 'UTTAK_FEDREKVOTE_ANNEN_FORELDER';
        }
        case 'FELLESPERIODE': {
            return 'UTTAK_FELLESP_ANNEN_FORELDER';
        }
        case 'FORELDREPENGER': {
            return 'UTTAK_FORELDREPENGER_ANNEN_FORELDER';
        }
        default: {
            return;
        }
    }
};

const midlertidigMappingAvUtsettelseÅrsak = (årsak: UtsettelseÅrsak_fpoversikt): UtsettelsesÅrsak => {
    switch (årsak) {
        case 'ARBEID': {
            return 'ARBEID';
        }
        case 'BARN_INNLAGT': {
            return 'INSTITUSJONSOPPHOLD_BARNET';
        }
        case 'FRI': {
            return 'FRI';
        }
        case 'HV_ØVELSE': {
            return 'HV_OVELSE';
        }
        case 'FERIE': {
            return 'LOVBESTEMT_FERIE';
        }
        case 'NAV_TILTAK': {
            return 'NAV_TILTAK';
        }
        case 'SØKER_INNLAGT': {
            return 'INSTITUSJONSOPPHOLD_SØKER';
        }
        case 'SØKER_SYKDOM': {
            return 'SYKDOM';
        }
        default: {
            throw new Error('Ukjent utsettelsesårsak');
        }
    }
};
