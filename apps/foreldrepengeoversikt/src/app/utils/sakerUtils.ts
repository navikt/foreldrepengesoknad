import { EngangsstønadSak, EngangsstønadSakDTO } from 'app/types/EngangsstønadSak';
import { Familiehendelse } from 'app/types/Familiehendelse';
import { GruppertSak } from 'app/types/GruppertSak';
import { BarnGruppering } from 'app/types/BarnGruppering';
import { Foreldrepengesak, ForeldrepengesakDTO } from 'app/types/Foreldrepengesak';
import { SakOppslag, SakOppslagDTO } from 'app/types/SakOppslag';
import { SvangerskapspengeSak, SvangerskapspengeSakDTO } from 'app/types/SvangerskapspengeSak';
import { Ytelse } from 'app/types/Ytelse';
import dayjs from 'dayjs';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { Sak } from 'app/types/Sak';
import { Person } from 'app/types/Person';
import { getErDatoInnenEnDagFraAnnenDato, ISOStringToDate } from './dateUtils';
import { getLeverPerson } from './personUtils';
import { IntlShape } from 'react-intl';
import { formatDate, intlUtils } from '@navikt/fp-common';
import { Situasjon } from 'app/types/Situasjon';

export const getAlleYtelser = (saker: SakOppslag): Sak[] => {
    return [...saker.engangsstønad, ...saker.foreldrepenger, ...saker.svangerskapspenger];
};

export function sorterPersonEtterEldstOgNavn(p1: Person, p2: Person) {
    if (dayjs(p1.fødselsdato).isAfter(p2.fødselsdato, 'd')) {
        return 1;
    } else if (dayjs(p1.fødselsdato).isBefore(p2.fødselsdato, 'd')) {
        return -1;
    } else {
        return p1.fornavn < p2.fornavn ? -1 : 1;
    }
}

export const getFørsteUttaksdagIForeldrepengesaken = (sak: Foreldrepengesak): Date | undefined => {
    if (sak.gjeldendeVedtak && sak.gjeldendeVedtak.perioder.length > 0) {
        return ISOStringToDate(sak.gjeldendeVedtak.perioder[0].fom)!;
    } else if (sak.åpenBehandling && sak.åpenBehandling.søknadsperioder) {
        return ISOStringToDate(sak.åpenBehandling?.søknadsperioder[0].fom);
    }
    return undefined;
};

export const getBarnGrupperingFraSak = (sak: Sak, registrerteBarn: Person[] | undefined): BarnGruppering => {
    const erForeldrepengesak = sak.ytelse === Ytelse.FORELDREPENGER;
    const barnFnrFraSaken = erForeldrepengesak && sak.barn !== undefined ? sak.barn.map((b) => b.fnr).flat() : [];
    const pdlBarnMedSammeFnr =
        erForeldrepengesak && registrerteBarn ? registrerteBarn.filter((b) => barnFnrFraSaken.includes(b.fnr)) : [];
    const fødselsdatoFraSak = ISOStringToDate(sak.familiehendelse!.fødselsdato);
    const pdlBarnMedSammeFødselsdato =
        fødselsdatoFraSak !== undefined && registrerteBarn
            ? registrerteBarn.filter(
                  (barn) =>
                      getErDatoInnenEnDagFraAnnenDato(ISOStringToDate(barn.fødselsdato), fødselsdatoFraSak) &&
                      !pdlBarnMedSammeFnr?.find((pdlBarn) => pdlBarn.fnr === barn.fnr)
              )
            : [];

    const alleBarn = pdlBarnMedSammeFnr.concat(pdlBarnMedSammeFødselsdato);
    alleBarn.sort(sorterPersonEtterEldstOgNavn);
    const alleBarnFødselsdatoer = alleBarn
        .filter((b) => b.fødselsdato !== undefined)
        .map((b) => ISOStringToDate(b.fødselsdato)!);
    let fødselsdatoer = [] as Date[];
    if (alleBarnFødselsdatoer && alleBarnFødselsdatoer.length > 0) {
        fødselsdatoer = alleBarnFødselsdatoer;
    } else if (fødselsdatoFraSak) {
        fødselsdatoer = [fødselsdatoFraSak];
    }

    return {
        fornavn: alleBarn
            ?.filter((b) => b.fornavn !== undefined && b.fornavn.trim() !== '')
            .map((b) => [b.fornavn, b.mellomnavn !== undefined ? b.mellomnavn : ''].join(' ')),
        fødselsdatoer,
        alleBarnaLever: !!alleBarn?.every((barn) => getLeverPerson(barn)),
    };
};

export const grupperSakerPåBarn = (registrerteBarn: Person[] | undefined, saker: SakOppslag): GruppertSak[] => {
    const alleSaker = getAlleYtelser(saker);

    return alleSaker.reduce((result, sak) => {
        if (sak.familiehendelse) {
            const familiehendelsedato = getFamiliehendelseDato(sak.familiehendelse);
            const relevantSak = result.find((gruppertSak) => findRelevantSak(gruppertSak, familiehendelsedato));

            if (relevantSak) {
                relevantSak.saker.push(sak);
            }

            if (relevantSak && result.includes(relevantSak)) {
                return result;
            } else {
                const type = utledFamiliesituasjon(sak.familiehendelse, sak.gjelderAdopsjon!);
                const gruppertSak: GruppertSak = {
                    antallBarn: sak.familiehendelse.antallBarn,
                    familiehendelsedato,
                    saker: [sak],
                    type,
                    ytelse: sak.ytelse,
                    barn: type !== 'termin' ? getBarnGrupperingFraSak(sak, registrerteBarn) : undefined,
                };

                result.push(gruppertSak);

                return result;
            }
        } else {
            return result;
        }
    }, [] as GruppertSak[]);
};

const addYtelseToSak = (
    saker: ForeldrepengesakDTO[] | SvangerskapspengeSakDTO[] | EngangsstønadSakDTO[],
    ytelse: Ytelse
): Foreldrepengesak[] | SvangerskapspengeSak[] | EngangsstønadSak[] => {
    if (ytelse === Ytelse.ENGANGSSTØNAD) {
        return saker.map(
            (sak) =>
                ({
                    ...sak,
                    ytelse,
                } as EngangsstønadSak)
        );
    }

    if (ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return saker.map(
            (sak) =>
                ({
                    ...sak,
                    ytelse,
                } as SvangerskapspengeSak)
        );
    }

    return saker.map(
        (sak) =>
            ({
                ...sak,
                ytelse,
            } as Foreldrepengesak)
    );
};

export const mapSakerDTOToSaker = (saker: SakOppslagDTO): SakOppslag => {
    return {
        foreldrepenger: addYtelseToSak(saker.foreldrepenger, Ytelse.FORELDREPENGER) as Foreldrepengesak[],
        engangsstønad: addYtelseToSak(saker.engangsstønad, Ytelse.ENGANGSSTØNAD) as EngangsstønadSak[],
        svangerskapspenger: addYtelseToSak(
            saker.svangerskapspenger,
            Ytelse.SVANGERSKAPSPENGER
        ) as SvangerskapspengeSak[],
    };
};

export const getAntallSaker = (saker: SakOppslag) => {
    const { foreldrepenger, svangerskapspenger, engangsstønad } = saker;
    return foreldrepenger.length + svangerskapspenger.length + engangsstønad.length;
};

const findRelevantSak = (gruppertSak: GruppertSak, familiehendelsedato: string) => {
    const startdato = dayjs(familiehendelsedato).subtract(2, 'months');
    const sluttdato = dayjs(familiehendelsedato).add(3, 'weeks');

    if (gruppertSak) {
        return (
            dayjs(gruppertSak.familiehendelsedato).isAfter(startdato) &&
            dayjs(gruppertSak.familiehendelsedato).isSameOrBefore(sluttdato)
        );
    }

    return undefined;
};

export const utledFamiliesituasjon = (familiehendelse: Familiehendelse, gjelderAdopsjon: boolean | undefined) => {
    if (gjelderAdopsjon) {
        return 'adopsjon';
    }

    const { fødselsdato } = familiehendelse;

    if (fødselsdato) {
        return 'fødsel';
    }

    return 'termin';
};

export const getFamiliehendelseDato = (familiehendelse: Familiehendelse): string => {
    const { fødselsdato, termindato, omsorgsovertakelse } = familiehendelse;

    if (omsorgsovertakelse) {
        return omsorgsovertakelse;
    }

    if (fødselsdato) {
        return fødselsdato;
    }

    return termindato!;
};

export const getNavnAnnenForelder = (
    søkerinfo: SøkerinfoDTO,
    sak: Foreldrepengesak | EngangsstønadSak | SvangerskapspengeSak | undefined
) => {
    const fødselsdatoFraSak = sak && sak.familiehendelse ? sak.familiehendelse.fødselsdato : undefined;
    const barn =
        søkerinfo.søker.barn && fødselsdatoFraSak
            ? søkerinfo.søker.barn.find((b) => dayjs(b.fødselsdato).isSame(fødselsdatoFraSak, 'd'))
            : undefined;
    const annenForelderNavn = barn && barn.annenForelder ? barn.annenForelder.fornavn : undefined;
    return annenForelderNavn !== undefined && annenForelderNavn.trim() !== '' ? annenForelderNavn : 'Annen forelder';
};

export const getTekstForAntallBarn = (antallBarn: number, intl: IntlShape): string => {
    if (antallBarn === 1 || antallBarn === 0) {
        return intlUtils(intl, 'barn');
    } else if (antallBarn === 2) {
        return intlUtils(intl, 'tvillinger');
    } else if (antallBarn === 3) {
        return intlUtils(intl, 'trillinger');
    }
    return intlUtils(intl, 'flerlinger');
};

export const formaterFødselsdatoerPåBarn = (fødselsdatoer: Date[] | undefined): string | undefined => {
    if (fødselsdatoer === undefined) {
        return undefined;
    }
    const unikeFødselsdatoer = [] as Date[];
    fødselsdatoer.forEach((f) => {
        const finnesIUnikeFødselsdatoer = unikeFødselsdatoer.find((dato) => dayjs(dato).isSame(f, 'day'));
        if (finnesIUnikeFødselsdatoer === undefined) {
            unikeFødselsdatoer.push(f);
        }
    });

    if (unikeFødselsdatoer.length > 1) {
        const fødselsdatoerTekst = unikeFødselsdatoer.map((fd) => formatDate(fd));
        const førsteFødselsdaoer = fødselsdatoerTekst.slice(0, -1).join(', ');
        const sisteFødselsdato = fødselsdatoerTekst[fødselsdatoerTekst.length - 1];
        return `${førsteFødselsdaoer} og ${sisteFødselsdato}`;
    }
    return formatDate(unikeFødselsdatoer[0]);
};

export const getTittelBarnNårNavnSkalIkkeVises = (
    familiehendelsedato: Date,
    fødselsdatoer: Date[] | undefined,
    antallBarn: number,
    intl: IntlShape,
    type: Situasjon
): string => {
    const barnTekst = getTekstForAntallBarn(antallBarn, intl);
    if ((antallBarn === 0 && fødselsdatoer === undefined) || type === 'termin') {
        return intlUtils(intl, 'barnHeader.terminBarn', {
            barnTekst,
            termindato: formatDate(familiehendelsedato),
        });
    }

    if (type === 'adopsjon') {
        return intlUtils(intl, 'barnHeader.adoptertBarn', {
            adopsjonsdato: formatDate(familiehendelsedato),
        });
    } else {
        const fødselsdatoTekst = formaterFødselsdatoerPåBarn(fødselsdatoer);
        return fødselsdatoer !== undefined && fødselsdatoer.length > 0
            ? intlUtils(intl, 'barnHeader.fødtBarn', {
                  barnTekst,
                  fødselsdatoTekst,
              })
            : '';
    }
};

export const getNavnPåBarna = (fornavn: string[]): string => {
    if (fornavn.length > 1) {
        const fornavnene = fornavn
            .map((n) => n.trim())
            .slice(0, -1)
            .join(', ');
        const sisteFornavn = fornavn[fornavn.length - 1];
        return `${fornavnene} og ${sisteFornavn}`;
    } else {
        return `${fornavn[0]}`;
    }
};

export const getSakTittel = (
    fornavn: string[] | undefined,
    fødselsdatoer: Date[] | undefined,
    familiehendelsesdato: Date,
    alleBarnaLever: boolean,
    antallBarn: number,
    intl: IntlShape,
    type: Situasjon
): string => {
    if (fornavn === undefined || fornavn.length === 0 || !alleBarnaLever) {
        return getTittelBarnNårNavnSkalIkkeVises(familiehendelsesdato, fødselsdatoer, antallBarn, intl, type);
    }
    const navn = getNavnPåBarna(fornavn);

    if (type === 'fødsel') {
        const fødtDatoTekst = formaterFødselsdatoerPåBarn(fødselsdatoer);
        return `${navn} født ${fødtDatoTekst}`;
    }
    if (type === 'adopsjon') {
        return `${navn} adoptert ${formatDate(familiehendelsesdato)}`;
    }
    return '';
};
