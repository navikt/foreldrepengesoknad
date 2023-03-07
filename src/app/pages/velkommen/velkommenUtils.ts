import { SakDTO } from 'app/types/SakDTO';
import { guid } from 'nav-frontend-js-utils';
import { SelectableBarn, SelectableBarnType } from './components/barnVelger/BarnVelger';
import { Familiehendelse } from 'app/types/Familiehendelse';
import { RegistrertBarn } from 'app/types/Person';
import dayjs from 'dayjs';
import { erEldreEnn3ÅrOg3Måneder } from 'app/utils/personUtils';
import { getRelevantFamiliehendelseDato, ISOStringToDate } from 'app/utils/dateUtils';
import { BarnFraNesteSak } from 'app/context/types/Barn';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import {
    getAndreBarnFødtSammenMedBarnet,
    getDødeBarnetForMerEnn3MånederSiden,
    getLeverBarnet,
} from 'app/utils/barnUtils';
import { getMockAnnenForelder } from 'app/utils/annenForelderUtils';
import { AnnenForelderOppgitt } from 'app/context/types/AnnenForelder';

export const getSortableBarnDato = (
    fødselsdatoer: Date[],
    termindato: Date | undefined,
    omsorgsovertagelse: Date | undefined
): Date => {
    //Dato som skal kun brukes til å sortere barna i visningen
    if (fødselsdatoer.length > 0) {
        return fødselsdatoer![0];
    }
    if (termindato !== undefined) {
        return termindato!;
    }

    return omsorgsovertagelse!;
};

const getSelectableBarnType = (gjelderAdopsjon: boolean, familiehendelse: Familiehendelse): SelectableBarnType => {
    if (gjelderAdopsjon) {
        return SelectableBarnType.ADOPTERT;
    }
    if (familiehendelse.fødselsdato !== undefined) {
        return SelectableBarnType.FØDT;
    }
    return SelectableBarnType.UFØDT;
};

const getSelectableBarnFraSak = (sak: SakDTO, registrerteBarn: RegistrertBarn[]): SelectableBarn => {
    const barnFnrFraSaken = sak.barn !== undefined ? sak.barn.map((b) => b.fnr).flat() : [];
    const fødselsdatoFraSak = ISOStringToDate(sak.familiehendelse.fødselsdato);

    const pdlBarnMedSammeFnr = registrerteBarn.filter((b) => barnFnrFraSaken.includes(b.fnr));

    //Noen saken sendes uten barn, derfor må sjekke PDL mot fødselsdato også
    const pdlBarnMedSammeFødselsdato =
        fødselsdatoFraSak !== undefined
            ? registrerteBarn.filter(
                  (barn) =>
                      dayjs(barn.fødselsdato).isSameOrAfter(dayjs(fødselsdatoFraSak).subtract(1, 'day'), 'day') &&
                      dayjs(barn.fødselsdato).isSameOrBefore(dayjs(fødselsdatoFraSak).add(1, 'day'), 'day') &&
                      !pdlBarnMedSammeFnr.find((pdlBarn) => pdlBarn.fnr === barn.fnr)
              )
            : [];
    const pdlBarn = pdlBarnMedSammeFnr.concat(pdlBarnMedSammeFødselsdato);

    const barnMedAnnenForelder = registrerteBarn.find((b) => b.annenForelder !== undefined);
    const annenForelderFraSak = getAnnenForelderFraSak(barnMedAnnenForelder, sak);
    const familiehendelseDato = ISOStringToDate(
        getRelevantFamiliehendelseDato(
            sak.familiehendelse.termindato,
            sak.familiehendelse.fødselsdato,
            sak.familiehendelse.omsorgsovertakelse
        )
    );
    const barnType = getSelectableBarnType(sak.gjelderAdopsjon, sak.familiehendelse);
    return {
        id: guid(),
        type: barnType,
        antallBarn: sak.familiehendelse.antallBarn,
        termindato: ISOStringToDate(sak.familiehendelse.termindato),
        omsorgsovertagelse: ISOStringToDate(sak.familiehendelse.omsorgsovertakelse),
        kanSøkeOmEndring: sak.kanSøkeOmEndring,
        sak: sak,
        fødselsdatoer:
            fødselsdatoFraSak !== undefined ? Array(sak.familiehendelse.antallBarn).fill(fødselsdatoFraSak) : undefined,
        annenForelder: annenForelderFraSak,
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
        etternavn: pdlBarn !== undefined && pdlBarn.length > 0 ? pdlBarn.map((b) => b.etternavn) : undefined,
        fnr:
            pdlBarn !== undefined && pdlBarn.length > 0
                ? pdlBarn.filter((barn) => barn.fnr !== undefined).map((b) => b.fnr)
                : undefined,
        alleBarnaLever:
            pdlBarn !== undefined && pdlBarn.length > 0 ? pdlBarn.every((barn) => getLeverBarnet(barn)) : false,
    };
};

const getSelectableBarnFraPDL = (registrertBarn: RegistrertBarn): SelectableBarn => {
    const navn =
        registrertBarn.mellomnavn !== undefined
            ? [registrertBarn.fornavn, registrertBarn.mellomnavn].join(' ')
            : registrertBarn.fornavn;
    return {
        id: guid(),
        type: SelectableBarnType.IKKE_UTFYLT,
        antallBarn: 1,
        fødselsdatoer: [registrertBarn.fødselsdato],
        fornavn: navn !== undefined ? [navn] : undefined,
        etternavn: [registrertBarn.etternavn],
        fnr: [registrertBarn.fnr],
        sortableDato: registrertBarn.fødselsdato,
        alleBarnaLever: getLeverBarnet(registrertBarn),
    };
};

const getSelectableFlerlingerFraPDL = (
    registrertBarn: RegistrertBarn,
    barnFødtISammePeriode: RegistrertBarn[]
): SelectableBarn | undefined => {
    const alleBarna = [registrertBarn].concat(barnFødtISammePeriode).sort(sorterRegistrerteBarnEtterEldstOgNavn);
    const minstEttBarnDødeForMerEnn3MndSiden = !!alleBarna.find(
        (b) => !getLeverBarnet(b) && getDødeBarnetForMerEnn3MånederSiden(b)
    );
    if (minstEttBarnDødeForMerEnn3MndSiden || alleBarna.length == 0) {
        return undefined;
    }

    if (alleBarna.length > 0) {
        return {
            id: guid(),
            type: SelectableBarnType.IKKE_UTFYLT,
            antallBarn: alleBarna.length,
            fødselsdatoer: alleBarna.map((b) => b.fødselsdato),
            fornavn: alleBarna.map((b) => [b.fornavn, b.mellomnavn !== undefined ? b.mellomnavn : ''].join(' ')),
            etternavn: alleBarna.map((b) => b.etternavn),
            fnr: alleBarna.map((b) => b.fnr),
            sortableDato: alleBarna[0].fødselsdato,
            alleBarnaLever: alleBarna.every((b) => getLeverBarnet(b)),
        };
    }
};

const getSelectableBarnOptionsFromSaker = (saker: SakDTO[], registrerteBarn: RegistrertBarn[]) => {
    return saker
        .filter(
            (sak) =>
                (sak.barn !== undefined && sak.barn.length > 0) ||
                sak.familiehendelse.termindato !== undefined ||
                sak.familiehendelse.fødselsdato !== undefined ||
                sak.familiehendelse.omsorgsovertakelse !== undefined
        )
        .map((sakMedBarn) => getSelectableBarnFraSak(sakMedBarn, registrerteBarn));
};

// const getAnnenForelderFraPDL = (registrertBarn: RegistrertBarn | undefined) => {
//     if (!!registrertBarn && !!registrertBarn.annenForelder) {
//         return {
//             fnr: registrertBarn.annenForelder.fnr,
//             fornavn: registrertBarn.annenForelder.fornavn,
//             mellomnavn: registrertBarn.annenForelder.mellomnavn,
//             etternavn: registrertBarn.annenForelder.etternavn,
//         };
//     }
//     return undefined;
// };

const getAnnenForelderFraSak = (registrertBarn: RegistrertBarn | undefined, sak: SakDTO): AnnenForelderOppgitt => {
    const mockAnnenForelder = getMockAnnenForelder(sak);
    const annenPartFnr = sak?.annenPart?.fnr;
    if (!!registrertBarn && !!registrertBarn.annenForelder) {
        return {
            ...mockAnnenForelder,
            fnr: annenPartFnr || registrertBarn.annenForelder.fnr,
            fornavn:
                annenPartFnr === registrertBarn.annenForelder.fnr
                    ? registrertBarn.annenForelder.fornavn
                    : mockAnnenForelder.fornavn,
            etternavn:
                annenPartFnr === registrertBarn.annenForelder.fnr
                    ? registrertBarn.annenForelder.etternavn
                    : mockAnnenForelder.etternavn,
        };
    }
    return mockAnnenForelder;
};

const getSelectableBarnOptionsFraPDL = (
    registrerteBarn: RegistrertBarn[],
    barnFraSaker: SelectableBarn[],
    avsluttedeSaker: SakDTO[]
): SelectableBarn[] => {
    //Vi ønsker ikke å vise barn som har avsluttet sak
    const registrerteBarnUtenAvsluttedeSaker = registrerteBarn.filter(
        (regBarn) =>
            !avsluttedeSaker.find(
                (sak) =>
                    dayjs(regBarn.fødselsdato).isSameOrAfter(
                        dayjs(sak.familiehendelse.fødselsdato).subtract(1, 'day'),
                        'day'
                    ) &&
                    dayjs(regBarn.fødselsdato).isSameOrBefore(
                        dayjs(sak.familiehendelse.fødselsdato).add(1, 'day'),
                        'day'
                    )
            )
    );

    //Må oppdatere dødfødte barn med falsk fnr for å kunne identifisere de som allerede er blitt lagt til i visningen
    const tempString = 'tempFnr';
    const registrerteBarnMedFnr = registrerteBarnUtenAvsluttedeSaker.map((b) =>
        b.fnr === undefined ? { ...b, fnr: tempString + guid().toString() } : b
    );

    //Dødfødte barn har ikke fnr og må filtreres bort senere
    const fnrPåBarnSomErLagtTil = barnFraSaker.map((b) => b.fnr).flat();
    const fødselsdatoPåBarnFraSaker = barnFraSaker
        .filter((barn) => barn.fødselsdatoer !== undefined && barn.fødselsdatoer.length > 0)
        .map((b) => b.fødselsdatoer)
        .flat();
    const selectableBarnFraPDL = [] as SelectableBarn[];

    //Fjerner dødfødte barn som har en sak
    const registrerteBarnUtenDødeBarnMedSak = registrerteBarnMedFnr.filter(
        (b) =>
            !(
                b.dødsdato !== undefined &&
                !!fødselsdatoPåBarnFraSaker.find((dato) => dayjs(dato).isSame(dayjs(b.fødselsdato), 'day'))
            )
    );
    registrerteBarnUtenDødeBarnMedSak.forEach((regBarn) => {
        if (!fnrPåBarnSomErLagtTil.includes(regBarn.fnr) && !erEldreEnn3ÅrOg3Måneder(regBarn.fødselsdato)) {
            const barnFødtISammePeriode = getAndreBarnFødtSammenMedBarnet(
                regBarn.fnr,
                regBarn.fødselsdato,
                registrerteBarnMedFnr
            );
            fnrPåBarnSomErLagtTil.push(regBarn.fnr);
            // const barnMedAnnenForelder =
            //     regBarn.annenForelder !== undefined
            //         ? regBarn
            //         : barnFødtISammePeriode.find((b) => b.annenForelder !== undefined);
            // const annenForelder = getAnnenForelderFraPDL(barnMedAnnenForelder);
            if (barnFødtISammePeriode.length === 0) {
                if (!getDødeBarnetForMerEnn3MånederSiden(regBarn)) {
                    // const selectableBarn = getSelectableBarnFraPDL(regBarn, annenForelder);
                    const selectableBarn = getSelectableBarnFraPDL(regBarn);
                    selectableBarnFraPDL.push(selectableBarn);
                }
            } else {
                const selectableFlerlinger = getSelectableFlerlingerFraPDL(
                    regBarn,
                    barnFødtISammePeriode
                    // annenForelder
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
        b.fnr && b.fnr.length > 0 ? { ...b, fnr: b.fnr.filter((nr) => nr && !nr.startsWith(tempString)) } : b
    );
    return selectableBarn;
};

export const getSelectableBarnOptions = (saker: SakDTO[], registrerteBarn: RegistrertBarn[]) => {
    const åpneSaker = saker.filter((sak) => !sak.sakAvsluttet);
    const avsluttedeSaker = saker.filter((sak) => sak.sakAvsluttet);
    const barnFraSaker = getSelectableBarnOptionsFromSaker(åpneSaker, registrerteBarn);
    const barnFraPDL = getSelectableBarnOptionsFraPDL(registrerteBarn, barnFraSaker, avsluttedeSaker);
    return barnFraSaker.concat(barnFraPDL);
};

export const getBarnFraNesteSak = (
    valgteBarn: SelectableBarn,
    selectableBarn: SelectableBarn[]
): BarnFraNesteSak | undefined => {
    const allePåfølgendeBarn = selectableBarn.filter(
        (barn) =>
            barn.sak !== undefined &&
            barn.id !== valgteBarn.id &&
            barn.familiehendelsesdato !== undefined &&
            dayjs(barn.familiehendelsesdato!).isAfter(valgteBarn.familiehendelsesdato!, 'day')
    );

    const nesteBarn = allePåfølgendeBarn.sort(sorterSelectableBarnEtterYngst)[allePåfølgendeBarn.length - 1];
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

export function sorterRegistrerteBarnEtterEldstOgNavn(b1: RegistrertBarn, b2: RegistrertBarn) {
    if (dayjs(b1.fødselsdato).isAfter(b2.fødselsdato, 'd')) {
        return 1;
    } else if (dayjs(b1.fødselsdato).isBefore(b2.fødselsdato, 'd')) {
        return -1;
    } else {
        return b1.fornavn < b2.fornavn ? -1 : 1;
    }
}

export function sorterSelectableBarnEtterYngst(b1: SelectableBarn, b2: SelectableBarn) {
    return dayjs(b1.sortableDato).isBefore(b2.sortableDato, 'd')
        ? 1
        : dayjs(b1.sortableDato).isAfter(b2.sortableDato, 'd')
        ? -1
        : 0;
}
