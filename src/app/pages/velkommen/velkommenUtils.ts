import { SakType, FagsakStatus } from 'app/types/Sak';
import { ÅpenBehandling, Sakv2 } from 'app/types/sakerv2/Sakv2';
import { guid } from 'nav-frontend-js-utils';
import { SelectableBarn, SelectableBarnType } from './components/barnVelger/BarnVelger';
import { Familiehendelse } from 'app/types/sakerv2/Familiehendelse';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { RegistrertBarn } from 'app/types/Person';
import dayjs from 'dayjs';
import { erEldreEnn3År } from 'app/utils/personUtils';

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

const getSakStatus = (sakAvsluttet: boolean, sakÅpenBehandling: undefined | ÅpenBehandling): FagsakStatus => {
    if (sakAvsluttet) {
        return FagsakStatus.AVSLUTTET;
    }
    if (sakÅpenBehandling === undefined) {
        return FagsakStatus.LOPENDE;
    }
    return FagsakStatus.UNDER_BEHANDLING;
};

const getSelectableBarnFraSak = (sak: Sakv2): SelectableBarn => {
    const barnFraSak = {
        id: guid(),
        fnr: sak.barn.map((b) => b.fødselsnummer),
        type: getSelectableBarnType(sak.gjelderAdopsjon, sak.familiehendelse),
        antallBarn: sak.familiehendelse.antallBarn,
        omsorgsovertagelse: ISOStringToDate(sak.familiehendelse.omsorgsovertagelse),
        fødselsdatoer: sak.barn.filter((ba) => ba !== undefined).map((b) => ISOStringToDate(b.fødselsdato)!),
        termindato: ISOStringToDate(sak.familiehendelse.termindato),
        fornavn: sak.barn.map((b) => b.fornavn),
        etternavn: sak.barn.map((b) => b.etternavn),
        kanSøkeOmEndring: sak.kanSøkeOmEndring,
        sak: {
            type: SakType.FPSAK,
            opprettet: '',
            status: getSakStatus(sak.sakAvsluttet, sak.åpenBehandling),
            saksnummer: sak.saksnummer,
        },
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

const getSelectableBarnFraPDL = (registrertBarn: RegistrertBarn): SelectableBarn => {
    return {
        id: guid(),
        type: SelectableBarnType.IKKE_UTFYLT,
        antallBarn: 1,
        fødselsdatoer: [registrertBarn.fødselsdato],
        fornavn: [registrertBarn.fornavn],
        etternavn: [registrertBarn.etternavn],
        fnr: [registrertBarn.fnr],
        sortableDato: registrertBarn.fødselsdato,
    };
};

const getSelectableFlerlingerFraPDL = (
    registrertBarn: RegistrertBarn,
    barnFødtISammePeriode: RegistrertBarn[]
): SelectableBarn => {
    const barnFødtISammePeriodeFødselsdatoer = barnFødtISammePeriode.map((b) => b.fødselsdato);
    const barnFødtISammePeriodeFornavn = barnFødtISammePeriode.map((b) => b.fornavn);
    const barnFødtISammePeriodeEtternavn = barnFødtISammePeriode.map((b) => b.etternavn);
    const barnFødtISammePeriodeFnr = barnFødtISammePeriode.map((b) => b.fnr);
    return {
        id: guid(),
        type: SelectableBarnType.IKKE_UTFYLT,
        antallBarn: barnFødtISammePeriode.length + 1,
        fødselsdatoer: [registrertBarn.fødselsdato].concat(barnFødtISammePeriodeFødselsdatoer),
        fornavn: [registrertBarn.fornavn].concat(barnFødtISammePeriodeFornavn),
        etternavn: [registrertBarn.etternavn].concat(barnFødtISammePeriodeEtternavn),
        fnr: [registrertBarn.fnr].concat(barnFødtISammePeriodeFnr),
        sortableDato: registrertBarn.fødselsdato,
    };
};

const getSelectableBarnOptionsFromSaker = (sakerV2: Sakv2[]) => {
    return sakerV2.map((s) => getSelectableBarnFraSak(s));
};

const registrertBarnFunnetISaker = (
    registrertBarn: RegistrertBarn,
    barnFraSaker: SelectableBarn[]
): SelectableBarn | undefined => {
    return barnFraSaker.find(
        (barn) => barn.fnr !== undefined && registrertBarn.fnr !== undefined && barn.fnr.includes(registrertBarn.fnr)
    );
};

const getSelectableBarnOptionsFraPDL = (
    registrerteBarn: RegistrertBarn[],
    barnFraSaker: SelectableBarn[]
): SelectableBarn[] => {
    const barnLagtTilFnr = [] as string[];
    const selectableBarnFraPDL = [] as SelectableBarn[];
    registrerteBarn.forEach((regBarn) => {
        if (!barnLagtTilFnr.includes(regBarn.fnr) && !erEldreEnn3År(regBarn.fødselsdato)) {
            const dagenFørFødsel = dayjs(regBarn.fødselsdato).subtract(1, 'day');
            const dagenEtterFødsel = dayjs(regBarn.fødselsdato).add(1, 'day');
            const barnFødtISammePeriode = registrerteBarn.filter(
                (b) =>
                    b.fnr !== regBarn.fnr &&
                    dayjs(b.fødselsdato).isSameOrAfter(dagenFørFødsel, 'day') &&
                    dayjs(b.fødselsdato).isSameOrBefore(dagenEtterFødsel, 'day')
            );
            if (registrertBarnFunnetISaker(regBarn, barnFraSaker) === undefined) {
                barnLagtTilFnr.push(regBarn.fnr);
                if (barnFødtISammePeriode.length === 0) {
                    const selectableBarn = getSelectableBarnFraPDL(regBarn);
                    selectableBarnFraPDL.push(selectableBarn);
                } else {
                    const selectableFlerlinger = getSelectableFlerlingerFraPDL(regBarn, barnFødtISammePeriode);
                    barnFødtISammePeriode.forEach((b) => {
                        barnLagtTilFnr.push(b.fnr);
                    });
                    selectableBarnFraPDL.push(selectableFlerlinger);
                }
            }
        }
    });

    return selectableBarnFraPDL;
};

export const getSelectableBarnOptions = (sakerV2: Sakv2[], registrerteBarn: RegistrertBarn[]) => {
    //TODO: Må man kun filtrere på foreldrepenger saker eller er det allerede gjort?
    const åpneSaker = sakerV2.filter((sak) => !sak.sakAvsluttet);
    const barnFraSaker = getSelectableBarnOptionsFromSaker(åpneSaker);
    const barnFraPDL = getSelectableBarnOptionsFraPDL(registrerteBarn, barnFraSaker);
    return barnFraSaker.concat(barnFraPDL);
};
