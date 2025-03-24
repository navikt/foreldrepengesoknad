import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ValgtBarn, ValgtBarnType } from 'types/ValgtBarn';
import {
    getAndreBarnFødtSammenMedBarnet,
    getDødeBarnetForMerEnn3MånederSiden,
    getLeverBarnet,
    sorterRegistrerteBarnEtterEldstOgNavn,
} from 'utils/barnUtils';
import { ISOStringToDate, getErDatoInnenEnDagFraAnnenDato, getRelevantFamiliehendelseDato } from 'utils/dateUtils';
import { guid } from 'utils/guid';
import { erEldreEnn3ÅrOg3Måneder } from 'utils/personUtils';

import { BarnFraNesteSak } from '@navikt/fp-common';
import { AnnenForelderFrontend, BarnFrontend, Familiehendelse, FpSak } from '@navikt/fp-types';
import { Uttaksdagen, isISODateString } from '@navikt/fp-utils';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getSortableBarnDato = (
    fødselsdatoer: Date[],
    termindato: Date | undefined,
    omsorgsovertagelse: Date | undefined,
): Date => {
    //Dato som skal kun brukes til å sortere barna i visningen
    if (fødselsdatoer.length > 0) {
        return fødselsdatoer[0];
    }
    if (termindato !== undefined) {
        return termindato;
    }

    return omsorgsovertagelse!;
};

const getSelectableBarnType = (
    gjelderAdopsjon: boolean,
    familiehendelse: Familiehendelse,
    pdlBarn: BarnFrontend[] | undefined,
): ValgtBarnType => {
    if (gjelderAdopsjon) {
        return ValgtBarnType.ADOPTERT;
    }
    if (familiehendelse.fødselsdato !== undefined || (pdlBarn && pdlBarn.length > 0)) {
        return ValgtBarnType.FØDT;
    }
    return ValgtBarnType.UFØDT;
};

const getPDLBarnForSakMedUfødtBarn = (sak: FpSak, registrerteBarn: BarnFrontend[]): BarnFrontend[] => {
    const termindato = sak.familiehendelse.termindato;
    if (isISODateString(termindato)) {
        const terminMinus17Uker = dayjs(termindato).subtract(17, 'week');
        const terminPlus6Uker = dayjs(termindato).add(6, 'week');
        return registrerteBarn.filter((barn) =>
            dayjs(barn.fødselsdato).isBetween(terminMinus17Uker, terminPlus6Uker, 'day', '[]'),
        );
    }
    return [];
};

const getPDLBarnForSakMedFødteBarn = (sak: FpSak, registrerteBarn: BarnFrontend[]): BarnFrontend[] => {
    const fødselsdatoFraSak = ISOStringToDate(sak.familiehendelse.fødselsdato);
    const barnFnrFraSaken = sak.barn !== undefined ? sak.barn.map((b) => b.fnr).flat() : [];
    const pdlBarnMedSammeFnr = registrerteBarn.filter((b) => barnFnrFraSaken.includes(b.fnr));

    //Noen saker sendes uten barn, derfor må sjekke PDL mot fødselsdato også
    const pdlBarnMedSammeFødselsdato =
        fødselsdatoFraSak !== undefined
            ? registrerteBarn.filter(
                  (barn) =>
                      getErDatoInnenEnDagFraAnnenDato(barn.fødselsdato, fødselsdatoFraSak) &&
                      !pdlBarnMedSammeFnr.find((pdlBarn) => pdlBarn.fnr === barn.fnr),
              )
            : [];

    return pdlBarnMedSammeFnr.concat(pdlBarnMedSammeFødselsdato);
};

const getSelectableBarnFraSak = (sak: FpSak, registrerteBarn: BarnFrontend[]): ValgtBarn => {
    let pdlBarn;
    if (sak.barn || sak.familiehendelse.fødselsdato) {
        pdlBarn = getPDLBarnForSakMedFødteBarn(sak, registrerteBarn);
    }

    //Noen termin-saker får ikke fødsel på barnet registrert, må sjekke PDL mot termindato også
    if (sak.familiehendelse.termindato && !sak.familiehendelse.fødselsdato && !sak.barn) {
        pdlBarn = getPDLBarnForSakMedUfødtBarn(sak, registrerteBarn);
    }

    const familiehendelseDato = ISOStringToDate(
        getRelevantFamiliehendelseDato(
            sak.familiehendelse.termindato,
            sak.familiehendelse.fødselsdato,
            sak.familiehendelse.omsorgsovertakelse,
        ),
    );
    const barnType = getSelectableBarnType(sak.gjelderAdopsjon, sak.familiehendelse, pdlBarn);
    const fødselsdatoFraSak = ISOStringToDate(sak.familiehendelse.fødselsdato);

    let fødselsdatoer;
    if (pdlBarn && pdlBarn.length > 0) {
        fødselsdatoer = pdlBarn.map((barn) => dayjs.utc(barn.fødselsdato).toDate());
    } else if (fødselsdatoFraSak !== undefined) {
        fødselsdatoer = Array(sak.familiehendelse.antallBarn).fill(fødselsdatoFraSak);
    }
    return {
        id: guid(),
        type: barnType,
        antallBarn: sak.familiehendelse.antallBarn,
        termindato: ISOStringToDate(sak.familiehendelse.termindato),
        omsorgsovertagelse: ISOStringToDate(sak.familiehendelse.omsorgsovertakelse),
        kanSøkeOmEndring: sak.kanSøkeOmEndring,
        sak,
        fødselsdatoer,
        familiehendelsesdato: familiehendelseDato,
        sortableDato: ISOStringToDate(sak.familiehendelse.termindato)!,
        startdatoFørsteStønadsperiode:
            sak.gjeldendeVedtak !== undefined && sak.gjeldendeVedtak.perioder.length > 0
                ? Uttaksdagen(ISOStringToDate(sak.gjeldendeVedtak.perioder[0].fom)!).denneEllerNeste()
                : undefined,
        fornavn:
            pdlBarn !== undefined && pdlBarn.length > 0
                ? pdlBarn
                      .filter((b) => b.fornavn !== undefined && b.fornavn.trim() !== '')
                      .map((b) => [b.fornavn, b.mellomnavn !== undefined ? b.mellomnavn : ''].join(' '))
                : undefined,
        fnr:
            pdlBarn !== undefined && pdlBarn.length > 0
                ? pdlBarn.filter((barn) => barn.fnr !== undefined).map((b) => b.fnr)
                : undefined,
        alleBarnaLever:
            pdlBarn !== undefined && pdlBarn.length > 0 ? pdlBarn.every((barn) => getLeverBarnet(barn)) : false,
    };
};

const getSelectableBarnFraPDL = (
    registrertBarn: BarnFrontend,
    annenForelder: AnnenForelderFrontend | undefined,
): ValgtBarn => {
    const navn =
        registrertBarn.mellomnavn !== undefined
            ? [registrertBarn.fornavn, registrertBarn.mellomnavn].join(' ')
            : registrertBarn.fornavn;
    return {
        id: guid(),
        type: ValgtBarnType.IKKE_UTFYLT,
        antallBarn: 1,
        fødselsdatoer: [dayjs.utc(registrertBarn.fødselsdato).toDate()],
        fornavn: navn !== undefined ? [navn] : undefined,
        fnr: [registrertBarn.fnr],
        sortableDato: dayjs.utc(registrertBarn.fødselsdato).toDate(),
        alleBarnaLever: getLeverBarnet(registrertBarn),
        annenForelder,
    };
};

const getSelectableFlerlingerFraPDL = (
    registrertBarn: BarnFrontend,
    barnFødtISammePeriode: BarnFrontend[],
    annenForelder: AnnenForelderFrontend | undefined,
): ValgtBarn | undefined => {
    const alleBarna = [registrertBarn].concat(barnFødtISammePeriode).sort(sorterRegistrerteBarnEtterEldstOgNavn);
    const minstEttBarnDødeForMerEnn3MndSiden = !!alleBarna.find(
        (b) => !getLeverBarnet(b) && getDødeBarnetForMerEnn3MånederSiden(b),
    );
    if (minstEttBarnDødeForMerEnn3MndSiden || alleBarna.length == 0) {
        return undefined;
    }

    return {
        id: guid(),
        type: ValgtBarnType.IKKE_UTFYLT,
        antallBarn: alleBarna.length,
        fødselsdatoer: alleBarna.map((b) => dayjs.utc(b.fødselsdato).toDate()),
        fornavn: alleBarna.map((b) => [b.fornavn, b.mellomnavn !== undefined ? b.mellomnavn : ''].join(' ')),
        fnr: alleBarna.map((b) => b.fnr),
        sortableDato: dayjs.utc(alleBarna[0].fødselsdato).toDate(),
        alleBarnaLever: alleBarna.every((b) => getLeverBarnet(b)),
        annenForelder,
    };
};

const getSelectableBarnOptionsFromSaker = (saker: FpSak[], registrerteBarn: BarnFrontend[]) => {
    return saker
        .filter(
            (sak) =>
                (sak.barn !== undefined && sak.barn.length > 0) ||
                sak.familiehendelse.termindato !== undefined ||
                sak.familiehendelse.fødselsdato !== undefined ||
                sak.familiehendelse.omsorgsovertakelse !== undefined,
        )
        .map((sakMedBarn) => getSelectableBarnFraSak(sakMedBarn, registrerteBarn));
};

const getSelectableBarnOptionsFraPDL = (
    registrerteBarn: BarnFrontend[],
    barnFraSaker: ValgtBarn[],
    avsluttedeSaker: FpSak[],
): ValgtBarn[] => {
    //Vi ønsker ikke å vise barn som har avsluttet sak
    const registrerteBarnUtenAvsluttedeSaker = registrerteBarn.filter(
        (regBarn) =>
            !avsluttedeSaker.find((sak) =>
                getErDatoInnenEnDagFraAnnenDato(regBarn.fødselsdato, ISOStringToDate(sak.familiehendelse.fødselsdato)),
            ),
    );

    //Må oppdatere dødfødte barn med falsk fnr for å kunne identifisere de som allerede er blitt lagt til i visningen
    const tempString = 'tempFnr';
    const registrerteBarnMedFnr = registrerteBarnUtenAvsluttedeSaker.map((b) =>
        b.fnr === undefined ? { ...b, fnr: tempString + guid().toString() } : b,
    );

    //Dødfødte barn har ikke fnr og må filtreres bort senere
    const fnrPåBarnSomErLagtTil = barnFraSaker.map((b) => b.fnr).flat();
    const fødselsdatoPåBarnFraSaker = barnFraSaker
        .filter((barn) => barn.fødselsdatoer !== undefined && barn.fødselsdatoer.length > 0)
        .map((b) => b.fødselsdatoer)
        .flat();
    const selectableBarnFraPDL = [] as ValgtBarn[];

    //Fjerner dødfødte barn som har en sak
    const registrerteBarnUtenDødeBarnMedSak = registrerteBarnMedFnr.filter(
        (b) =>
            !(
                b.dødsdato !== undefined &&
                !!fødselsdatoPåBarnFraSaker.find((dato) => dayjs(dato).isSame(dayjs.utc(b.fødselsdato), 'day'))
            ),
    );
    registrerteBarnUtenDødeBarnMedSak.forEach((regBarn) => {
        if (!fnrPåBarnSomErLagtTil.includes(regBarn.fnr) && !erEldreEnn3ÅrOg3Måneder(regBarn.fødselsdato)) {
            const barnFødtISammePeriode = getAndreBarnFødtSammenMedBarnet(
                regBarn.fnr,
                regBarn.fødselsdato,
                registrerteBarnMedFnr,
            );
            const annenForelder =
                regBarn.annenForelder !== undefined
                    ? {
                          fnr: regBarn.annenForelder.fnr,
                          fornavn: regBarn.annenForelder.fornavn,
                          mellomnavn: regBarn.annenForelder.mellomnavn,
                          etternavn: regBarn.annenForelder.etternavn,
                      }
                    : undefined;
            fnrPåBarnSomErLagtTil.push(regBarn.fnr);
            if (barnFødtISammePeriode.length === 0) {
                if (!getDødeBarnetForMerEnn3MånederSiden(regBarn)) {
                    const selectableBarn = getSelectableBarnFraPDL(regBarn, annenForelder);
                    selectableBarnFraPDL.push(selectableBarn);
                }
            } else {
                const selectableFlerlinger = getSelectableFlerlingerFraPDL(
                    regBarn,
                    barnFødtISammePeriode,
                    annenForelder,
                );
                barnFødtISammePeriode.forEach((b) => {
                    fnrPåBarnSomErLagtTil.push(b.fnr);
                });
                if (selectableFlerlinger !== undefined) {
                    selectableBarnFraPDL.push(selectableFlerlinger);
                }
            }
        }
    });
    //Fjerner temp fnr fra barna som skal vises på forsiden
    const selectableBarn = selectableBarnFraPDL.map((b) =>
        b.fnr && b.fnr.length > 0 ? { ...b, fnr: b.fnr.filter((nr) => nr && !nr.startsWith(tempString)) } : b,
    );
    return selectableBarn;
};

export const getSelectableBarnOptions = (saker: FpSak[], registrerteBarn: BarnFrontend[]) => {
    const åpneSaker = saker.filter((sak) => !sak.sakAvsluttet);
    const avsluttedeSaker = saker.filter((sak) => sak.sakAvsluttet);
    const barnFraSaker = getSelectableBarnOptionsFromSaker(åpneSaker, registrerteBarn);
    const barnFraPDL = getSelectableBarnOptionsFraPDL(registrerteBarn, barnFraSaker, avsluttedeSaker);
    return barnFraSaker.concat(barnFraPDL);
};

export const getBarnFraNesteSak = (valgteBarn: ValgtBarn, selectableBarn: ValgtBarn[]): BarnFraNesteSak | undefined => {
    const allePåfølgendeBarn = selectableBarn.filter(
        (barn) =>
            barn.sak !== undefined &&
            barn.id !== valgteBarn.id &&
            barn.familiehendelsesdato !== undefined &&
            dayjs(barn.familiehendelsesdato).isAfter(valgteBarn.familiehendelsesdato!, 'day'),
    );
    allePåfølgendeBarn.sort(sorterSelectableBarnEtterYngst);
    const nesteBarn = allePåfølgendeBarn[allePåfølgendeBarn.length - 1];
    if (nesteBarn === undefined) {
        return undefined;
    }

    return {
        familiehendelsesdato: nesteBarn.familiehendelsesdato!,
        startdatoFørsteStønadsperiode: nesteBarn.startdatoFørsteStønadsperiode!,
        fnr: nesteBarn.fnr,
        annenForelderFnr: nesteBarn.sak?.annenPart?.fnr,
    };
};

export const sorterSelectableBarnEtterYngst = (b1: ValgtBarn, b2: ValgtBarn) => {
    return dayjs(b1.sortableDato).isBefore(b2.sortableDato, 'd')
        ? 1
        : dayjs(b1.sortableDato).isAfter(b2.sortableDato, 'd')
          ? -1
          : 0;
};
