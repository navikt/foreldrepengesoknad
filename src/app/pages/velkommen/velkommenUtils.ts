import { Sak } from 'app/types/Sak';
import { guid } from 'nav-frontend-js-utils';
import { SelectableBarn, SelectableBarnType } from './components/barnVelger/BarnVelger';
import { Familiehendelse } from 'app/types/Familiehendelse';
import { RegistrertAnnenForelder, RegistrertBarn } from 'app/types/Person';
import dayjs from 'dayjs';
import { erEldreEnn3År } from 'app/utils/personUtils';
import { getRelevantFamiliehendelseDato, ISOStringToDate } from 'app/utils/dateUtils';
import { BarnFraNesteSak } from 'app/context/types/Barn';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';

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

const getAnnenForelderFraSak = (sak: Sak): RegistrertAnnenForelder | undefined => {
    return sak.annenPart !== undefined
        ? {
              fnr: sak.annenPart.fnr,
              fornavn: sak.annenPart.fornavn,
              etternavn: sak.annenPart.etternavn,
          }
        : undefined;
};

const getSelectableBarnFraSakMedBarn = (sak: Sak): SelectableBarn => {
    const annenForelderFraSak = getAnnenForelderFraSak(sak);
    const barnFraSak = {
        id: guid(),
        fnr: sak.barn.map((b) => b.fnr),
        type: getSelectableBarnType(sak.gjelderAdopsjon, sak.familiehendelse),
        antallBarn: sak.familiehendelse.antallBarn,
        omsorgsovertagelse: ISOStringToDate(sak.familiehendelse.omsorgsovertagelse),
        fødselsdatoer: sak.barn
            .filter((ba) => ba !== undefined && ba.fødselsdato !== undefined)
            .map((b) => ISOStringToDate(b.fødselsdato)!),
        termindato: ISOStringToDate(sak.familiehendelse.termindato),
        fornavn: sak.barn.map((b) => b.fornavn),
        etternavn: sak.barn.map((b) => b.etternavn),
        kanSøkeOmEndring: sak.kanSøkeOmEndring,
        sak: sak,
        annenForelder: annenForelderFraSak,
        familiehendelsesdato: ISOStringToDate(
            getRelevantFamiliehendelseDato(
                sak.familiehendelse.termindato,
                sak.familiehendelse.fødselsdato,
                sak.familiehendelse.omsorgsovertagelse
            )
        ),
        startdatoFørsteStønadsperiode: Uttaksdagen(
            ISOStringToDate(sak.gjeldendeVedtak.perioder[0].fom)!
        ).denneEllerNeste(),
    };
    return {
        ...barnFraSak,
        sortableDato: getSortableBarnDato(
            barnFraSak.fødselsdatoer,
            barnFraSak.termindato,
            barnFraSak.omsorgsovertagelse
        ),
    };
};
const getSelectableBarnFraSak = (sak: Sak): SelectableBarn => {
    if (sak.barn.length > 0) {
        return getSelectableBarnFraSakMedBarn(sak);
    } else {
        const annenForelderFraSak = getAnnenForelderFraSak(sak);

        return {
            id: guid(),
            type: SelectableBarnType.UFØDT,
            antallBarn: sak.familiehendelse.antallBarn,
            termindato: ISOStringToDate(sak.familiehendelse.termindato),
            kanSøkeOmEndring: sak.kanSøkeOmEndring,
            sak: sak,
            annenForelder: annenForelderFraSak,
            familiehendelsesdato: ISOStringToDate(sak.familiehendelse.termindato),
            sortableDato: ISOStringToDate(sak.familiehendelse.termindato)!,
            startdatoFørsteStønadsperiode: Uttaksdagen(
                ISOStringToDate(sak.gjeldendeVedtak.perioder[0].fom)!
            ).denneEllerNeste(),
        };
    }
};

const getSelectableBarnFraPDL = (
    registrertBarn: RegistrertBarn,
    annenForelder: RegistrertAnnenForelder | undefined
): SelectableBarn => {
    return {
        id: guid(),
        type: SelectableBarnType.IKKE_UTFYLT,
        antallBarn: 1,
        fødselsdatoer: [registrertBarn.fødselsdato],
        fornavn: [registrertBarn.fornavn],
        etternavn: [registrertBarn.etternavn],
        fnr: [registrertBarn.fnr],
        sortableDato: registrertBarn.fødselsdato,
        annenForelder,
    };
};

const getSelectableFlerlingerFraPDL = (
    registrertBarn: RegistrertBarn,
    barnFødtISammePeriode: RegistrertBarn[],
    annenForelder: RegistrertAnnenForelder | undefined
): SelectableBarn | undefined => {
    const alleBarna = [registrertBarn].concat(barnFødtISammePeriode).sort(sorterRegistrerteBarnEtterEldst);
    let barnaSomSkalVises;

    const registrerteFlerlingerSomLever = alleBarna.filter((regbarn) => {
        return regbarn.dødsdato === undefined;
    });

    if (registrerteFlerlingerSomLever.length === 0) {
        if (!getDødeBarnetForMerEnn3MånederSiden(alleBarna[0])) {
            barnaSomSkalVises = alleBarna;
        } else {
            return undefined;
        }
    } else {
        barnaSomSkalVises = registrerteFlerlingerSomLever;
    }
    return {
        id: guid(),
        type: SelectableBarnType.IKKE_UTFYLT,
        antallBarn: alleBarna.length,
        fødselsdatoer: barnaSomSkalVises.map((b) => b.fødselsdato),
        fornavn: barnaSomSkalVises.map((b) => b.fornavn),
        etternavn: barnaSomSkalVises.map((b) => b.etternavn),
        fnr: barnaSomSkalVises.map((b) => b.fnr),
        sortableDato: alleBarna[0].fødselsdato,
        annenForelder,
    };
};

const getSelectableBarnOptionsFromSaker = (saker: Sak[]) => {
    return saker
        .filter((sak) => sak.barn.length > 0 || sak.familiehendelse.termindato !== undefined)
        .map((sakMedBarn) => getSelectableBarnFraSak(sakMedBarn));
};

const getDødeBarnetForMerEnn3MånederSiden = (registrerteBarn: RegistrertBarn) => {
    const dato3MånederTilbake = dayjs(new Date()).subtract(3, 'month');
    return (
        registrerteBarn.dødsdato !== undefined && dayjs(registrerteBarn.dødsdato).isBefore(dato3MånederTilbake, 'day')
    );
};

const getSelectableBarnOptionsFraPDL = (
    registrerteBarn: RegistrertBarn[],
    barnFraSaker: SelectableBarn[]
): SelectableBarn[] => {
    const barnSomErLagtTilFnr = barnFraSaker.map((b) => b.fnr).flat();
    const selectableBarnFraPDL = [] as SelectableBarn[];
    registrerteBarn.forEach((regBarn) => {
        if (!barnSomErLagtTilFnr.includes(regBarn.fnr) && !erEldreEnn3År(regBarn.fødselsdato)) {
            const dagenFørFødsel = dayjs(regBarn.fødselsdato).subtract(1, 'day');
            const dagenEtterFødsel = dayjs(regBarn.fødselsdato).add(1, 'day');
            const barnFødtISammePeriode = registrerteBarn.filter(
                (b) =>
                    b.fnr !== regBarn.fnr &&
                    dayjs(b.fødselsdato).isSameOrAfter(dagenFørFødsel, 'day') &&
                    dayjs(b.fødselsdato).isSameOrBefore(dagenEtterFødsel, 'day')
            );
            barnSomErLagtTilFnr.push(regBarn.fnr);
            const annenForelder =
                regBarn.annenForelder !== undefined
                    ? {
                          fnr: regBarn.annenForelder.fnr,
                          fornavn: regBarn.annenForelder.fornavn,
                          mellomnavn: regBarn.annenForelder.mellomnavn,
                          etternavn: regBarn.annenForelder.etternavn,
                      }
                    : undefined;
            if (barnFødtISammePeriode.length === 0) {
                if (!getDødeBarnetForMerEnn3MånederSiden(regBarn)) {
                    const selectableBarn = getSelectableBarnFraPDL(regBarn, annenForelder);
                    selectableBarnFraPDL.push(selectableBarn);
                }
            } else {
                const selectableFlerlinger = getSelectableFlerlingerFraPDL(
                    regBarn,
                    barnFødtISammePeriode,
                    annenForelder
                );
                barnFødtISammePeriode.forEach((b) => {
                    barnSomErLagtTilFnr.push(b.fnr);
                });
                if (selectableFlerlinger !== undefined) {
                    selectableBarnFraPDL.push(selectableFlerlinger);
                }
            }
        }
    });

    return selectableBarnFraPDL;
};

export const getSelectableBarnOptions = (saker: Sak[], registrerteBarn: RegistrertBarn[]) => {
    const åpneSaker = saker.filter((sak) => !sak.sakAvsluttet);
    const barnFraSaker = getSelectableBarnOptionsFromSaker(åpneSaker);
    const barnFraPDL = getSelectableBarnOptionsFraPDL(registrerteBarn, barnFraSaker);
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
        annenForelderFnr: nesteBarn.annenForelder !== undefined ? nesteBarn.annenForelder.fnr : undefined,
    };
};

export const kanSøkeOmEndringPåBarnet = (barn: SelectableBarn): boolean => {
    return barn.kanSøkeOmEndring === true;
};

export function sorterRegistrerteBarnEtterEldst(b1: RegistrertBarn, b2: RegistrertBarn) {
    return dayjs(b1.fødselsdato).isAfter(b2.fødselsdato, 'd')
        ? 1
        : dayjs(b1.fødselsdato).isBefore(b2.fødselsdato, 'd')
        ? -1
        : 0;
}

export function sorterSelectableBarnEtterYngst(b1: SelectableBarn, b2: SelectableBarn) {
    return dayjs(b1.sortableDato).isBefore(b2.sortableDato, 'd')
        ? 1
        : dayjs(b1.sortableDato).isAfter(b2.sortableDato, 'd')
        ? -1
        : 0;
}
