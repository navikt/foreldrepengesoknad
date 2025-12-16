import dayjs from 'dayjs';
import orderBy from 'lodash/orderBy';
import { IntlShape } from 'react-intl';

import { BarnType } from '@navikt/fp-constants';
import {
    Barn,
    BarnDto_fpoversikt,
    EsSak_fpoversikt,
    Familiehendelse_fpoversikt,
    Familiesituasjon,
    FpSak_fpoversikt,
    PersonMedArbeidsforholdDto_fpoversikt,
    Saker_fpoversikt,
    SvpSak_fpoversikt,
    Ytelse,
} from '@navikt/fp-types';
import { formatDate, sorterPersonEtterEldstOgNavn } from '@navikt/fp-utils';

import { BarnGruppering } from '../types/BarnGruppering';
import { GruppertSak } from '../types/GruppertSak';
import { EngangsstønadSak, Foreldrepengesak, Sak, SvangerskapspengeSak } from '../types/Sak';
import { SakOppslag } from '../types/SakOppslag';
import { ISOStringToDate, getErDatoInnenEnDagFraAnnenDato } from './dateUtils';
import { getLeverPerson } from './personUtils';

export const getAlleYtelser = (saker: SakOppslag): Sak[] => {
    return [...saker.engangsstønad, ...saker.foreldrepenger, ...saker.svangerskapspenger];
};

export const getFørsteUttaksdagIForeldrepengesaken = (sak: Foreldrepengesak) => {
    if (sak.gjeldendeVedtak && sak.gjeldendeVedtak.perioder.length > 0) {
        return ISOStringToDate(sak.gjeldendeVedtak.perioder[0]!.fom);
    } else if (sak.åpenBehandling?.søknadsperioder && sak.åpenBehandling?.søknadsperioder.length > 0) {
        return ISOStringToDate(sak.åpenBehandling?.søknadsperioder[0]!.fom);
    }
    return undefined;
};

export const getBarnFraSak = (familiehendelse: Familiehendelse_fpoversikt, gjelderAdopsjon: boolean): Barn => {
    if (gjelderAdopsjon) {
        return {
            type: BarnType.ADOPTERT_STEBARN,
            adopsjonsdato: familiehendelse.omsorgsovertakelse!,
            antallBarn: familiehendelse.antallBarn,
            fødselsdatoer: [familiehendelse.fødselsdato!],
        };
    }

    if (familiehendelse.fødselsdato) {
        return {
            type: BarnType.FØDT,
            fødselsdatoer: [familiehendelse.fødselsdato],
            termindato: familiehendelse.termindato,
            antallBarn: familiehendelse.antallBarn,
        };
    }

    return {
        type: BarnType.UFØDT,
        termindato: familiehendelse.termindato!,
        antallBarn: familiehendelse.antallBarn,
    };
};

export const getBarnGrupperingFraSak = (sak: Sak, registrerteBarn: BarnDto_fpoversikt[]): BarnGruppering => {
    const erForeldrepengesak = sak.ytelse === 'FORELDREPENGER';
    const barnFnrFraSaken = erForeldrepengesak && sak.barn !== undefined ? sak.barn.flatMap((b) => b.fnr) : [];
    const pdlBarnMedSammeFnr =
        (erForeldrepengesak && registrerteBarn.filter((b) => barnFnrFraSaken.includes(b.fnr))) || [];
    const fødselsdatoFraSak = ISOStringToDate(sak.familiehendelse.fødselsdato);
    const pdlBarnMedSammeFødselsdato = fødselsdatoFraSak
        ? registrerteBarn.filter(
              (barn) =>
                  getErDatoInnenEnDagFraAnnenDato(ISOStringToDate(barn.fødselsdato), fødselsdatoFraSak) &&
                  !pdlBarnMedSammeFnr?.find((pdlBarn) => pdlBarn.fnr === barn.fnr),
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
            ?.filter((b) => b.navn?.fornavn !== undefined && b.navn.fornavn.trim() !== '')
            .map((b) => [b.navn?.fornavn, b.navn?.mellomnavn ?? ''].join(' ')),
        fødselsdatoer,
        alleBarnaLever: !!alleBarn?.every((barn) => getLeverPerson(barn)),
    };
};

export const grupperSakerPåBarn = (registrerteBarn: BarnDto_fpoversikt[], saker: SakOppslag): GruppertSak[] => {
    const alleSaker = getAlleYtelser(saker);

    const sorterteSaker = orderBy(
        alleSaker,
        (sak) => (sak.familiehendelse ? getFamiliehendelseDato(sak.familiehendelse) : ''),
        'desc',
    );

    return sorterteSaker.reduce((result, sak) => {
        if (sak.familiehendelse) {
            const familiehendelsedato = getFamiliehendelseDato(sak.familiehendelse);
            const relevantSak = result.find((gruppertSak) => findRelevantSak(gruppertSak, familiehendelsedato));

            if (relevantSak) {
                relevantSak.saker.push(sak);
            }

            if (relevantSak && result.includes(relevantSak)) {
                return result;
            } else {
                const type = utledFamiliesituasjon(
                    sak.familiehendelse,
                    'gjelderAdopsjon' in sak ? sak.gjelderAdopsjon : undefined,
                );
                const gruppertSak: GruppertSak = {
                    antallBarn: sak.familiehendelse.antallBarn,
                    familiehendelsedato,
                    saker: [sak],
                    type,
                    ytelse: sak.ytelse,
                    barn: type === 'termin' ? undefined : getBarnGrupperingFraSak(sak, registrerteBarn),
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
    saker: EsSak_fpoversikt[] | FpSak_fpoversikt[] | SvpSak_fpoversikt[],
    ytelse: Ytelse,
): Sak[] => {
    if (ytelse === 'ENGANGSSTØNAD') {
        return saker.map(
            (sak) =>
                ({
                    ...sak,
                    ytelse,
                }) as EngangsstønadSak,
        );
    }

    if (ytelse === 'SVANGERSKAPSPENGER') {
        return saker.map(
            (sak) =>
                ({
                    ...sak,
                    ytelse,
                }) as SvangerskapspengeSak,
        );
    }

    return saker.map(
        (sak) =>
            ({
                ...sak,
                ytelse,
            }) as Foreldrepengesak,
    );
};

export const mapSakerDTOToSaker = (saker: Saker_fpoversikt): SakOppslag => {
    return {
        foreldrepenger: addYtelseToSak(saker.foreldrepenger, 'FORELDREPENGER') as Foreldrepengesak[],
        engangsstønad: addYtelseToSak(saker.engangsstønad, 'ENGANGSSTØNAD') as EngangsstønadSak[],
        svangerskapspenger: addYtelseToSak(saker.svangerskapspenger, 'SVANGERSKAPSPENGER') as SvangerskapspengeSak[],
    };
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

export const utledFamiliesituasjon = (
    familiehendelse: Familiehendelse_fpoversikt,
    gjelderAdopsjon: boolean | undefined,
): Familiesituasjon => {
    if (gjelderAdopsjon) {
        return 'adopsjon';
    }

    const { fødselsdato } = familiehendelse;

    if (fødselsdato) {
        return 'fødsel';
    }

    return 'termin';
};

export const getFamiliehendelseDato = (familiehendelse: Familiehendelse_fpoversikt): string => {
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
    søkerinfo: PersonMedArbeidsforholdDto_fpoversikt,
    sak: Foreldrepengesak | EngangsstønadSak | SvangerskapspengeSak | undefined,
) => {
    const fødselsdatoFraSak = sak?.familiehendelse ? sak.familiehendelse.fødselsdato : undefined;
    const barn =
        søkerinfo.person.barn && fødselsdatoFraSak
            ? søkerinfo.person.barn.find((b) => dayjs(b.fødselsdato).isSame(fødselsdatoFraSak, 'd'))
            : undefined;
    const annenForelderNavn = barn?.annenPart ? barn.annenPart.navn.fornavn : undefined;
    return annenForelderNavn !== undefined && annenForelderNavn.trim() !== '' ? annenForelderNavn : 'Annen forelder';
};

const getTekstForAntallBarn = (antallBarn: number, intl: IntlShape): string => {
    if (antallBarn === 1 || antallBarn === 0) {
        return intl.formatMessage({ id: 'barn' });
    } else if (antallBarn === 2) {
        return intl.formatMessage({ id: 'tvillinger' });
    } else if (antallBarn === 3) {
        return intl.formatMessage({ id: 'trillinger' });
    }
    return intl.formatMessage({ id: 'flerlinger' });
};

const formaterFødselsdatoerPåBarn = (fødselsdatoer: Date[] | undefined): string | undefined => {
    if (fødselsdatoer === undefined) {
        return undefined;
    }

    const unikeFødselsdatoer = [] as Date[];

    for (const f of fødselsdatoer) {
        const finnesIUnikeFødselsdatoer = unikeFødselsdatoer.find((dato) => dayjs(dato).isSame(f, 'day'));
        if (finnesIUnikeFødselsdatoer === undefined) {
            unikeFødselsdatoer.push(f);
        }
    }

    if (unikeFødselsdatoer.length > 1) {
        const fødselsdatoerTekst = unikeFødselsdatoer.map((fd) => formatDate(fd));
        const førsteFødselsdaoer = fødselsdatoerTekst.slice(0, -1).join(', ');
        const sisteFødselsdato = fødselsdatoerTekst.at(-1);
        return `${førsteFødselsdaoer} og ${sisteFødselsdato}`;
    }
    return formatDate(unikeFødselsdatoer[0]!);
};

const getTittelBarnNårNavnSkalIkkeVises = (
    familiehendelsedato: Date,
    fødselsdatoer: Date[] | undefined,
    antallBarn: number,
    intl: IntlShape,
    type: Familiesituasjon,
): { tittel: string; undertittel: string } => {
    const barnTekst = getTekstForAntallBarn(antallBarn, intl);
    if ((antallBarn === 0 && fødselsdatoer === undefined) || type === 'termin') {
        return {
            tittel: intl.formatMessage(
                { id: 'barnHeader.terminBarn' },
                {
                    barnTekst,
                    termindato: formatDate(familiehendelsedato),
                },
            ),
            undertittel: '',
        };
    }

    if (type === 'adopsjon') {
        return {
            tittel: intl.formatMessage(
                { id: 'barnHeader.adoptertBarn' },
                {
                    adopsjonsdato: formatDate(familiehendelsedato),
                },
            ),
            undertittel: '',
        };
    } else {
        const fødselsdatoTekst = formaterFødselsdatoerPåBarn(fødselsdatoer);
        if (fødselsdatoer !== undefined && fødselsdatoer.length > 0) {
            return {
                tittel: intl.formatMessage(
                    { id: 'barnHeader.fødtBarn' },
                    {
                        barnTekst,
                        fødselsdatoTekst,
                    },
                ),
                undertittel: '',
            };
        }
        return { tittel: '', undertittel: '' };
    }
};

export const getNavnPåBarna = (fornavn: string[]): string => {
    if (fornavn.length > 1) {
        const fornavnene = fornavn
            .map((n) => n.trim())
            .slice(0, -1)
            .join(', ');
        const sisteFornavn = fornavn.at(-1);
        return `${fornavnene} og ${sisteFornavn}`;
    } else {
        return `${fornavn[0]}`;
    }
};

type SakTittelArguments = {
    barngruppering?: BarnGruppering;
    familiehendelsedato: string;
    antallBarn: number;
    intl: IntlShape;
    situasjon: Familiesituasjon;
};
export const getSakTittel = (sakTittelArguments: SakTittelArguments): { tittel: string; undertittel: string } => {
    const { barngruppering, familiehendelsedato, antallBarn, intl, situasjon } = sakTittelArguments;
    const fornavn = barngruppering?.fornavn;
    const fødselsdatoer = barngruppering?.fødselsdatoer;
    const familiehendelsesdatoIsoString = ISOStringToDate(familiehendelsedato);

    // Burde ikke skje, men håndter explicit istedenfor "!-assertion"
    if (!familiehendelsesdatoIsoString) {
        return { tittel: '', undertittel: '' };
    }

    if (fornavn === undefined || fornavn.length === 0 || !barngruppering?.alleBarnaLever) {
        return getTittelBarnNårNavnSkalIkkeVises(
            familiehendelsesdatoIsoString,
            fødselsdatoer,
            antallBarn,
            intl,
            situasjon,
        );
    }
    const navn = getNavnPåBarna(fornavn);

    if (situasjon === 'fødsel') {
        const fødtDatoTekst = formaterFødselsdatoerPåBarn(fødselsdatoer);
        return { tittel: navn, undertittel: `født ${fødtDatoTekst}` };
    }
    if (situasjon === 'adopsjon') {
        return { tittel: navn, undertittel: `adoptert ${formatDate(familiehendelsesdatoIsoString)}` };
    }
    return { tittel: '', undertittel: '' };
};
