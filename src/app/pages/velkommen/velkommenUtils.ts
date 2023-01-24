import { Sak } from 'app/types/Sak';
import { guid } from 'nav-frontend-js-utils';
import { SelectableBarn, SelectableBarnType } from './components/barnVelger/BarnVelger';
import { Familiehendelse } from 'app/types/Familiehendelse';
import { RegistrertAnnenForelder, RegistrertBarn } from 'app/types/Person';
import dayjs from 'dayjs';
import { erEldreEnn3ÅrOg3Måneder } from 'app/utils/personUtils';
import { getRelevantFamiliehendelseDato, ISOStringToDate } from 'app/utils/dateUtils';
import { BarnFraNesteSak } from 'app/context/types/Barn';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import {
    getAndreBarnFødtSammenMedBarnet,
    getDødeBarnetForMerEnn3MånederSiden,
    getErDødfødtBarn,
} from 'app/utils/barnUtils';

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
        omsorgsovertagelse: ISOStringToDate(sak.familiehendelse.omsorgsovertakelse),
        fødselsdatoer: sak.barn
            .filter((ba) => ba !== undefined && ba.fødselsdato !== undefined)
            .map((b) => ISOStringToDate(b.fødselsdato)!),
        termindato: ISOStringToDate(sak.familiehendelse.termindato),
        fornavn: sak.barn.map((b) => [b.fornavn, b.mellomnavn !== undefined ? b.mellomnavn : ''].join(' ')),
        etternavn: sak.barn.map((b) => b.etternavn),
        kanSøkeOmEndring: sak.kanSøkeOmEndring,
        sak: sak,
        annenForelder: annenForelderFraSak,
        familiehendelsesdato: ISOStringToDate(
            getRelevantFamiliehendelseDato(
                sak.familiehendelse.termindato,
                sak.familiehendelse.fødselsdato,
                sak.familiehendelse.omsorgsovertakelse
            )
        ),
        startdatoFørsteStønadsperiode:
            sak.gjeldendeVedtak !== undefined && sak.gjeldendeVedtak.perioder.length > 0
                ? Uttaksdagen(ISOStringToDate(sak.gjeldendeVedtak.perioder[0].fom)!).denneEllerNeste()
                : undefined,
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
const getSelectableBarnFraSak = (sak: Sak, registrerteBarn: RegistrertBarn[]): SelectableBarn => {
    if (sak.barn.length > 0) {
        return getSelectableBarnFraSakMedBarn(sak);
    } else {
        const fødselsdatoFraSak =
            sak.familiehendelse.fødselsdato !== undefined
                ? ISOStringToDate(sak.familiehendelse.fødselsdato)
                : undefined;
        const omsorgsovertakelseDato =
            sak.familiehendelse.omsorgsovertakelse !== undefined
                ? ISOStringToDate(sak.familiehendelse.omsorgsovertakelse)
                : undefined;
        let familiehendelseDato;
        const pdlBarnMedSammeFødselsdato =
            fødselsdatoFraSak !== undefined && registrerteBarn.length > 0
                ? registrerteBarn.filter(
                      (barn) =>
                          dayjs(barn.fødselsdato).isSameOrAfter(dayjs(fødselsdatoFraSak).subtract(1, 'day'), 'day') &&
                          dayjs(barn.fødselsdato).isSameOrBefore(dayjs(fødselsdatoFraSak).add(1, 'day'), 'day')
                  )
                : undefined;
        const annenForelderFraSak = getAnnenForelderFraSak(sak);
        let barnType;
        if (sak.familiehendelse.omsorgsovertakelse !== undefined) {
            barnType = SelectableBarnType.ADOPTERT;
            familiehendelseDato = omsorgsovertakelseDato;
        } else if (sak.familiehendelse.fødselsdato !== undefined) {
            barnType = SelectableBarnType.FØDT;
            familiehendelseDato = ISOStringToDate(sak.familiehendelse.fødselsdato);
        } else {
            barnType = SelectableBarnType.UFØDT;
            familiehendelseDato = ISOStringToDate(sak.familiehendelse.termindato);
        }

        return {
            id: guid(),
            type: barnType,
            antallBarn: sak.familiehendelse.antallBarn,
            termindato:
                sak.familiehendelse.termindato !== undefined
                    ? ISOStringToDate(sak.familiehendelse.termindato)
                    : undefined,
            omsorgsovertagelse: omsorgsovertakelseDato,
            kanSøkeOmEndring: sak.kanSøkeOmEndring,
            sak: sak,
            fødselsdatoer:
                sak.familiehendelse.fødselsdato !== undefined
                    ? Array(sak.familiehendelse.antallBarn).fill(ISOStringToDate(sak.familiehendelse.fødselsdato)!)
                    : undefined,
            annenForelder: annenForelderFraSak,
            familiehendelsesdato: familiehendelseDato,
            sortableDato: ISOStringToDate(sak.familiehendelse.termindato)!,
            startdatoFørsteStønadsperiode:
                sak.gjeldendeVedtak !== undefined && sak.gjeldendeVedtak.perioder.length > 0
                    ? Uttaksdagen(ISOStringToDate(sak.gjeldendeVedtak.perioder[0].fom)!).denneEllerNeste()
                    : undefined,
            fornavn:
                pdlBarnMedSammeFødselsdato !== undefined && pdlBarnMedSammeFødselsdato.length > 0
                    ? pdlBarnMedSammeFødselsdato
                          ?.filter((b) => b.fornavn !== undefined && b.fornavn !== '')
                          .map((b) => [b.fornavn, b.mellomnavn !== undefined ? b.mellomnavn : ''].join(' '))
                    : undefined,
            etternavn:
                pdlBarnMedSammeFødselsdato !== undefined && pdlBarnMedSammeFødselsdato.length > 0
                    ? pdlBarnMedSammeFødselsdato?.map((b) => b.etternavn)
                    : undefined,
            fnr:
                pdlBarnMedSammeFødselsdato !== undefined && pdlBarnMedSammeFødselsdato.length > 0
                    ? pdlBarnMedSammeFødselsdato.filter((barn) => barn.fnr !== undefined).map((b) => b.fnr)
                    : undefined,
        };
    }
};

const getSelectableBarnFraPDL = (
    registrertBarn: RegistrertBarn,
    annenForelder: RegistrertAnnenForelder | undefined
): SelectableBarn => {
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
        annenForelder,
    };
};

const getSelectableFlerlingerFraPDL = (
    registrertBarn: RegistrertBarn,
    barnFødtISammePeriode: RegistrertBarn[],
    annenForelder: RegistrertAnnenForelder | undefined
): SelectableBarn | undefined => {
    const alleBarna = [registrertBarn].concat(barnFødtISammePeriode).sort(sorterRegistrerteBarnEtterEldst);

    const barnaSomSkalVises = alleBarna.filter((regbarn) => {
        return regbarn.dødsdato === undefined || !getDødeBarnetForMerEnn3MånederSiden(regbarn);
    });

    if (barnaSomSkalVises.length > 0) {
        return {
            id: guid(),
            type: SelectableBarnType.IKKE_UTFYLT,
            antallBarn: alleBarna.length,
            fødselsdatoer: barnaSomSkalVises.map((b) => b.fødselsdato),
            fornavn: barnaSomSkalVises.map((b) =>
                [b.fornavn, b.mellomnavn !== undefined ? b.mellomnavn : ''].join(' ')
            ),
            etternavn: barnaSomSkalVises.map((b) => b.etternavn),
            fnr: barnaSomSkalVises.map((b) => b.fnr),
            sortableDato: alleBarna[0].fødselsdato,
            annenForelder,
            minstEnErDødfødt: !!barnaSomSkalVises.find((b) => getErDødfødtBarn(b)),
        };
    }
    return undefined;
};

const getSelectableBarnOptionsFromSaker = (saker: Sak[], registrerteBarn: RegistrertBarn[]) => {
    return saker
        .filter(
            (sak) =>
                sak.barn.length > 0 ||
                sak.familiehendelse.termindato !== undefined ||
                sak.familiehendelse.fødselsdato !== undefined ||
                sak.familiehendelse.omsorgsovertakelse !== undefined
        )
        .map((sakMedBarn) => getSelectableBarnFraSak(sakMedBarn, registrerteBarn));
};

const getSelectableBarnOptionsFraPDL = (
    registrerteBarn: RegistrertBarn[],
    barnFraSaker: SelectableBarn[]
): SelectableBarn[] => {
    //Må oppdatere dødfødte barn med falsk fnr for å kunne identifisere de som allerede er blitt lagt til i visningen
    const tempString = 'tempFnr';
    const registrerteBarnMedFnr = registrerteBarn.map((b) =>
        b.fnr === undefined ? { ...b, fnr: tempString + guid().toString() } : b
    );

    const barnSomErLagtTilFnr = barnFraSaker.map((b) => b.fnr).flat();
    const barnFraSakerFødselsdato = barnFraSaker
        .filter((barn) => barn.fødselsdatoer !== undefined && barn.fødselsdatoer.length > 0)
        .map((b) => b.fødselsdatoer)
        .flat();
    const selectableBarnFraPDL = [] as SelectableBarn[];
    const registrerteBarnUtenDødeBarnMedSak = registrerteBarnMedFnr.filter(
        (b) =>
            !(
                b.dødsdato !== undefined &&
                !!barnFraSakerFødselsdato.find((dato) => dayjs(dato).isSame(dayjs(b.fødselsdato), 'day'))
            )
    );
    registrerteBarnUtenDødeBarnMedSak.forEach((regBarn) => {
        if (!barnSomErLagtTilFnr.includes(regBarn.fnr) && !erEldreEnn3ÅrOg3Måneder(regBarn.fødselsdato)) {
            const barnFødtISammePeriode = getAndreBarnFødtSammenMedBarnet(
                regBarn.fnr,
                regBarn.fødselsdato,
                registrerteBarnMedFnr
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
    //Fjerner temp fødselsnr fra barna som skal vises på forsiden
    const selectableBarn = selectableBarnFraPDL.map((b) =>
        b.fnr && b.fnr.length > 0 ? { ...b, fnr: b.fnr.filter((nr) => nr && !nr.startsWith(tempString)) } : b
    );
    return selectableBarn;
};

export const getSelectableBarnOptions = (saker: Sak[], registrerteBarn: RegistrertBarn[]) => {
    const åpneSaker = saker.filter((sak) => !sak.sakAvsluttet);
    const barnFraSaker = getSelectableBarnOptionsFromSaker(åpneSaker, registrerteBarn);
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
