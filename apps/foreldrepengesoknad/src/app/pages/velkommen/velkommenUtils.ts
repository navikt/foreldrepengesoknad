import dayjs from 'dayjs';
import {
    getAndreBarnFødtSammenMedBarnet,
    getDødeBarnetForMerEnn3MånederSiden,
    getLeverBarnet,
} from 'app/utils/barnUtils';
import {
    BarnFraNesteSak,
    ISOStringToDate,
    RegistrertAnnenForelder,
    Sak,
    Uttaksdagen,
    erEldreEnn3ÅrOg3Måneder,
    guid,
} from '@navikt/fp-common';
import { Familiehendelse } from '@navikt/fp-common/src/common/types/Familiehendelse';
import { getRelevantFamiliehendelseDato } from '../../utils/dateUtils';
import { ValgtBarn, ValgtBarnType } from 'app/types/ValgtBarn';
import { RegistrertBarn } from '@navikt/fp-types';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

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

const getSelectableBarnType = (gjelderAdopsjon: boolean, familiehendelse: Familiehendelse): ValgtBarnType => {
    if (gjelderAdopsjon) {
        return ValgtBarnType.ADOPTERT;
    }
    if (familiehendelse.fødselsdato !== undefined) {
        return ValgtBarnType.FØDT;
    }
    return ValgtBarnType.UFØDT;
};

export const getErDatoInnenEnDagFraAnnenDato = (dato1: string | undefined, dato2: Date | undefined): boolean => {
    if (dato1 === undefined || dato2 === undefined) {
        return false;
    }
    return (
        dayjs(dato1).isSameOrAfter(dayjs(dato2).subtract(1, 'day'), 'day') &&
        dayjs(dato1).isSameOrBefore(dayjs(dato2).add(1, 'day'), 'day')
    );
};

const getSelectableBarnFraSak = (sak: Sak, registrerteBarn: RegistrertBarn[]): ValgtBarn => {
    const barnFnrFraSaken = sak.barn !== undefined ? sak.barn.map((b) => b.fnr).flat() : [];
    const fødselsdatoFraSak = ISOStringToDate(sak.familiehendelse.fødselsdato);

    const pdlBarnMedSammeFnr = registrerteBarn.filter((b) => barnFnrFraSaken.includes(b.fnr));

    //Noen saken sendes uten barn, derfor må sjekke PDL mot fødselsdato også
    const pdlBarnMedSammeFødselsdato =
        fødselsdatoFraSak !== undefined
            ? registrerteBarn.filter(
                  (barn) =>
                      getErDatoInnenEnDagFraAnnenDato(barn.fødselsdato, fødselsdatoFraSak) &&
                      !pdlBarnMedSammeFnr.find((pdlBarn) => pdlBarn.fnr === barn.fnr),
              )
            : [];
    const pdlBarn = pdlBarnMedSammeFnr.concat(pdlBarnMedSammeFødselsdato);

    const familiehendelseDato = ISOStringToDate(
        getRelevantFamiliehendelseDato(
            sak.familiehendelse.termindato,
            sak.familiehendelse.fødselsdato,
            sak.familiehendelse.omsorgsovertakelse,
        ),
    );
    const barnType = getSelectableBarnType(sak.gjelderAdopsjon, sak.familiehendelse);

    let fødselsdatoer;
    if (pdlBarn && pdlBarn.length > 0) {
        fødselsdatoer = pdlBarn.map((barn) => barn.fødselsdato);
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
        sak: sak,
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
    registrertBarn: RegistrertBarn,
    annenForelder: RegistrertAnnenForelder | undefined,
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
    registrertBarn: RegistrertBarn,
    barnFødtISammePeriode: RegistrertBarn[],
    annenForelder: RegistrertAnnenForelder | undefined,
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

const getSelectableBarnOptionsFromSaker = (saker: Sak[], registrerteBarn: RegistrertBarn[]) => {
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
    registrerteBarn: RegistrertBarn[],
    barnFraSaker: ValgtBarn[],
    avsluttedeSaker: Sak[],
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
                !!fødselsdatoPåBarnFraSaker.find((dato) => dayjs(dato).isSame(dayjs(b.fødselsdato), 'day'))
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

export const getSelectableBarnOptions = (saker: Sak[], registrerteBarn: RegistrertBarn[]) => {
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

export const sorterRegistrerteBarnEtterEldstOgNavn = (b1: RegistrertBarn, b2: RegistrertBarn) => {
    if (dayjs(b1.fødselsdato).isAfter(b2.fødselsdato, 'd')) {
        return 1;
    } else if (dayjs(b1.fødselsdato).isBefore(b2.fødselsdato, 'd')) {
        return -1;
    } else {
        return b1.fornavn < b2.fornavn ? -1 : 1;
    }
};

export const sorterSelectableBarnEtterYngst = (b1: ValgtBarn, b2: ValgtBarn) => {
    return dayjs(b1.sortableDato).isBefore(b2.sortableDato, 'd')
        ? 1
        : dayjs(b1.sortableDato).isAfter(b2.sortableDato, 'd')
          ? -1
          : 0;
};
