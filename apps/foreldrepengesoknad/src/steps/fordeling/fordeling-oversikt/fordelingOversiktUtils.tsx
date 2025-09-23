import dayjs from 'dayjs';
import React, { ReactNode } from 'react';
import { FormattedMessage, IntlShape } from 'react-intl';
import { DelInformasjon, FordelingEier, FordelingFargekode } from 'types/FordelingOversikt';
import { getErAleneOmOmsorg, getIsDeltUttak } from 'utils/annenForelderUtils';
import { getFamiliehendelsedato } from 'utils/barnUtils';
import { førsteOktober2021ReglerGjelder, getVarighetString } from 'utils/dateUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';
import {
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepenger,
    getAntallUkerForeldrepengerFørFødsel,
    getAntallUkerMødrekvote,
} from 'utils/stønadskontoerUtils';

import { Link } from '@navikt/ds-react';

import {
    AnnenForelder,
    Barn,
    Forelder,
    NavnPåForeldre,
    Periode,
    StønadskontoType,
    isAdoptertBarn,
    isAnnenForelderOppgitt,
    isFødtBarn,
    isInfoPeriode,
    isUfødtBarn,
} from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';
import {
    SøkersituasjonFp,
    TilgjengeligeMinsterettskontoer,
    TilgjengeligeStønadskontoerForDekningsgrad,
} from '@navikt/fp-types';
import { Uttaksdagen, capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';
import { getBrukteDager, uttaksConstants } from '@navikt/fp-uttaksplan';

export const getHarFåttEllerSkalFå = (barn: Barn, intl: IntlShape) => {
    if (isFødtBarn(barn)) {
        return intl.formatMessage({ id: 'harFått' });
    }
    if (isUfødtBarn(barn)) {
        return intl.formatMessage({ id: 'skalFå' });
    }
    if (isAdoptertBarn(barn)) {
        if (dayjs().isAfter(dayjs(barn.adopsjonsdato))) {
            return intl.formatMessage({ id: 'harAdoptert' });
        }
        return intl.formatMessage({ id: 'skalAdoptere' });
    }
    throw Error('Ukjent type barn');
};

const getHvorLengeDisseUkeneKanBrukesTekst = (
    familiehendelsesdato: string,
    erAdopsjon: boolean,
    antallDager: number,
    antallBarn: number,
    intl: IntlShape,
): ReactNode => {
    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        const varighetTekst = getVarighetString(antallDager, intl);
        return (
            <FormattedMessage
                id="fordeling.hvorLengeAntallUkerKanBrukes.før1okt2021"
                values={{
                    varighetTekst,
                    b: (msg) => <b>{msg}</b>,
                }}
            />
        );
    }
    if (erAdopsjon) {
        return <FormattedMessage id="fordeling.hvorLengeDisseUkeneKanBrukes.adopsjon" />;
    }
    return (
        <FormattedMessage
            id="fordeling.hvorLengeDisseUkeneKanBrukes.fødsel"
            values={{
                antallBarn,
            }}
        />
    );
};

export const getFordelingDelTittel = (
    delInfo: DelInformasjon,
    erFarEllerMedmor: boolean,
    intl: IntlShape,
    navnMor: string,
    navnFarMedmor: string,
    erFødsel: boolean,
    harAnnenForelderKunRettIEØS: boolean | undefined,
): string => {
    let varighetTekst = '';
    const navnAnnenForelder = erFarEllerMedmor ? navnMor : navnFarMedmor;
    if (delInfo.eier === FordelingEier.Mor && erFødsel) {
        const dagerFørFødsel = uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5;
        const dagerEtterFødsel = delInfo.sumDager - dagerFørFødsel;
        let varighetUkerEtterFødsel = undefined;
        if (dagerEtterFødsel % 5 === 0) {
            varighetUkerEtterFødsel = (delInfo.sumDager - dagerFørFødsel) / 5;
        } else {
            varighetUkerEtterFødsel = getVarighetString(delInfo.sumDager - dagerFørFødsel, intl);
        }

        varighetTekst = intl.formatMessage(
            { id: 'fordeling.varighet.morFødsel' },
            { varighetUker: varighetUkerEtterFødsel },
        );
    } else {
        varighetTekst = getVarighetString(delInfo.sumDager, intl);
    }

    switch (delInfo.eier) {
        case FordelingEier.Mor:
            return !erFarEllerMedmor
                ? intl.formatMessage(
                      { id: 'fordeling.antallUkerTilDeg' },
                      {
                          varighetTekst,
                      },
                  )
                : intl.formatMessage(
                      { id: 'fordeling.antallUkerTilAnnenForelder' },
                      {
                          varighetTekst,
                          navn: navnMor,
                      },
                  );
        case FordelingEier.FarMedmor:
            return erFarEllerMedmor
                ? intl.formatMessage(
                      { id: 'fordeling.antallUkerTilDeg' },
                      {
                          varighetTekst,
                      },
                  )
                : intl.formatMessage(
                      { id: 'fordeling.antallUkerTilAnnenForelder' },
                      {
                          varighetTekst,
                          navn: navnFarMedmor,
                      },
                  );
        case FordelingEier.Felles:
            return harAnnenForelderKunRettIEØS
                ? intl.formatMessage(
                      { id: 'fordeling.antallUkerFelles.eøs' },
                      {
                          varighetTekst,
                          navnAnnenForelderEierForm: getNavnGenitivEierform(navnAnnenForelder, intl.locale),
                      },
                  )
                : intl.formatMessage({ id: 'fordeling.antallUkerFelles' }, { varighetTekst });
    }
};

const getMorResterendeDagerTekst = (
    antallDager: number,
    familiehendelsesdato: string,
    erAdopsjon: boolean,
    antallBarn: number,
    intl: IntlShape,
) => {
    const varighetTekst = getVarighetString(antallDager, intl);

    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        return (
            <FormattedMessage
                id="fordeling.info.mor.resterendeUker.før1okt2021"
                values={{
                    varighetTekst,
                    b: (msg) => <b>{msg}</b>,
                }}
            />
        );
    }
    if (erAdopsjon) {
        return (
            <FormattedMessage
                id="fordeling.info.mor.resterendeUker.adopsjon"
                values={{
                    varighetTekst,
                    b: (msg) => <b>{msg}</b>,
                }}
            />
        );
    }
    return (
        <FormattedMessage
            id="fordeling.info.mor.resterendeUker.fødsel"
            values={{
                varighetTekst,
                antallBarn,
                b: (msg) => <b>{msg}</b>,
            }}
        />
    );
};

const getFellesInfoTekst = (
    dagerFelles: number,
    familiehendelsesdato: string,
    erAdopsjon: boolean,
    antallBarn: number,
    morTekst: string,
    farTekst: string,
    intl: IntlShape,
): React.ReactNode => {
    const varighetTekst = getVarighetString(dagerFelles, intl);
    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        return (
            <FormattedMessage
                id="fordeling.info.felles.før1okt2021"
                values={{
                    varighetTekst,
                    morTekst,
                    farTekst,
                    b: (msg) => <b>{msg}</b>,
                    a: (msg) => (
                        <Link href={links.hvorLenge} rel="noreferrer" target="_blank">
                            {msg}
                        </Link>
                    ),
                }}
            />
        );
    }
    if (erAdopsjon) {
        return (
            <FormattedMessage
                id="fordeling.info.felles.adopsjon"
                values={{
                    varighetTekst,
                    morTekst,
                    farTekst,
                    b: (msg) => <b>{msg}</b>,
                    a: (msg) => (
                        <Link href={links.hvorLenge} rel="noreferrer" target="_blank">
                            {msg}
                        </Link>
                    ),
                }}
            />
        );
    }
    return (
        <FormattedMessage
            id="fordeling.info.felles.fødsel"
            values={{
                varighetTekst,
                antallBarn,
                morTekst,
                farTekst,
                b: (msg) => <b>{msg}</b>,
                a: (msg) => (
                    <Link href={links.hvorLenge} rel="noreferrer" target="_blank">
                        {msg}
                    </Link>
                ),
            }}
        />
    );
};

const getAntallDagerSøkerensKvoteBruktAvAnnenPart = (
    uttaksplanAnnenPart: Periode[] | undefined,
    kontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    erFarEllerMedmor: boolean,
    familiehendelsesdato: string,
): number => {
    if (uttaksplanAnnenPart === undefined || uttaksplanAnnenPart.length === 0) {
        return 0;
    }
    if (erFarEllerMedmor) {
        return getBrukteDager(kontoer, uttaksplanAnnenPart, dayjs(familiehendelsesdato).toDate()).mor
            .dagerAnnenForeldersKvote;
    } else {
        return getBrukteDager(kontoer, uttaksplanAnnenPart, dayjs(familiehendelsesdato).toDate()).farMedmor
            .dagerAnnenForeldersKvote;
    }
};

const getAntallDagerFellesperiodeBruktAvAnnenPart = (
    uttaksplanAnnenPart: Periode[] | undefined,
    kontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    erFarEllerMedmor: boolean,
    familiehendelsesdato: string,
): number => {
    if (uttaksplanAnnenPart === undefined || uttaksplanAnnenPart.length === 0) {
        return 0;
    }
    if (erFarEllerMedmor) {
        return getBrukteDager(kontoer, uttaksplanAnnenPart, dayjs(familiehendelsesdato).toDate()).mor
            .dagerFellesperiode;
    } else {
        return getBrukteDager(kontoer, uttaksplanAnnenPart, dayjs(familiehendelsesdato).toDate()).farMedmor
            .dagerFellesperiode;
    }
};

const getFordelingFelles = (
    kontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    søkersituasjon: SøkersituasjonFp,
    barn: Barn,
    navnPåForeldre: NavnPåForeldre,
    intl: IntlShape,
    annenPartHarKunRettIEØS?: boolean,
    annenPartsKvoteDager?: number,
    dagerBruktAvAnnenPart?: number,
): DelInformasjon => {
    const dagerFelles = getAntallUkerFellesperiode(kontoer) * 5;
    const ekstraDagerPrematur = kontoer.tillegg?.prematur;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const navnMor = navnPåForeldre.mor;
    const navnFarMedmor = navnPåForeldre.farMedmor;
    const annenPartNavn = erFarEllerMedmor ? navnMor : navnFarMedmor;
    const morTekst = getMorTekst(erFarEllerMedmor, navnMor, intl);
    const farTekst = getFarTekst(erFarEllerMedmor, navnFarMedmor, intl);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const antallBarn = barn.antallBarn;
    const fordelingDager = [];
    const fordelingInfo = [
        getFellesInfoTekst(dagerFelles, familiehendelsesdato, erAdopsjon, antallBarn, morTekst, farTekst, intl),
    ];
    const gjenståendeDager = dagerBruktAvAnnenPart ? dagerFelles - dagerBruktAvAnnenPart : dagerFelles;
    const gjenståendeVarighet = getVarighetString(gjenståendeDager, intl);

    if (dagerBruktAvAnnenPart && dagerBruktAvAnnenPart > 0) {
        const varighetTekstAnnenPart = getVarighetString(dagerBruktAvAnnenPart, intl);
        const fargekodeAnnenPart = erFarEllerMedmor
            ? FordelingFargekode.FELLESPERIODE_BRUKT_AV_MOR
            : FordelingFargekode.FELLESPERIODE_BRUKT_AV_FAR;
        fordelingDager.push({ antallDager: dagerBruktAvAnnenPart, fargekode: fargekodeAnnenPart });
        fordelingInfo.push(
            <FormattedMessage
                id="fordeling.info.felles.annenForelder.del1"
                values={{
                    varighet: varighetTekstAnnenPart,
                    annenPartNavn,
                    varighetTekst: gjenståendeVarighet,
                    b: (msg) => <b>{msg}</b>,
                }}
            />,
        );
    }
    if (gjenståendeDager > 0) {
        fordelingDager.push({ antallDager: gjenståendeDager, fargekode: FordelingFargekode.IKKE_TILDELT });
    }

    if (annenPartHarKunRettIEØS && annenPartsKvoteDager && annenPartsKvoteDager > 0) {
        const varighetAnnenPart = getVarighetString(annenPartsKvoteDager, intl);
        fordelingInfo.push(
            <FormattedMessage
                id="fordeling.info.felles.annenForelder.eøs"
                values={{
                    navn: annenPartNavn,
                    varighetAnnenPart,
                    b: (msg) => <b>{msg}</b>,
                    a: (msg) => (
                        <Link href={links.hvorLenge} rel="noreferrer" target="_blank">
                            {msg}
                        </Link>
                    ),
                }}
            />,
        );
    }

    if (ekstraDagerPrematur && ekstraDagerPrematur > 0) {
        const varighetTekst = getVarighetString(ekstraDagerPrematur, intl);
        fordelingInfo.push(
            <FormattedMessage
                id="fordeling.info.ekstraDagerPrematur.fellesperiode"
                values={{
                    varighetTekst,
                    antallBarn,
                    b: (msg) => <b>{msg}</b>,
                }}
            />,
        );
    }
    return {
        eier: FordelingEier.Felles,
        sumDager: dagerFelles,
        fordelingDager,
        fordelingInfo,
    };
};

const getFordelingTekstFedrekvote = (
    dagerFar: number,
    erAdopsjon: boolean,
    familiehendelsesdato: string,
    antallBarn: number,
    intl: IntlShape,
) => {
    const varighetTekst = getVarighetString(dagerFar, intl);
    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        return (
            <FormattedMessage
                id="fordeling.info.farMedmor.før1okt2021"
                values={{
                    varighetTekst,
                    b: (msg) => <b>{msg}</b>,
                }}
            />
        );
    }
    if (erAdopsjon) {
        return (
            <FormattedMessage
                id="fordeling.info.farMedmor.adopsjon"
                values={{
                    varighetTekst,
                    b: (msg) => <b>{msg}</b>,
                }}
            />
        );
    }
    return (
        <FormattedMessage
            id="fordeling.info.farMedmor.fødsel"
            values={{
                varighetTekst,
                antallBarn,
                b: (msg) => <b>{msg}</b>,
            }}
        />
    );
};

const getFordelingFedrekvote = (
    dagerFar: number,
    dagerRundtFødsel: number,
    søkersituasjon: SøkersituasjonFp,
    barn: Barn,
    navnPåForeldre: NavnPåForeldre,
    dagerFarsKvoteBruktAvMor: number | undefined,
    intl: IntlShape,
): DelInformasjon => {
    const fordelingDager = [];
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const navnMor = navnPåForeldre.mor;
    const navnFarMedmor = navnPåForeldre.farMedmor;
    const farTekst = getFarTekst(erFarEllerMedmor, navnFarMedmor, intl);
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const antallBarn = barn.antallBarn;
    const fargekodeFar = erFarEllerMedmor ? FordelingFargekode.SØKER_FAR : FordelingFargekode.ANNEN_PART_FAR;
    const gjenståendeDagerTilFar = dagerFarsKvoteBruktAvMor ? dagerFar - dagerFarsKvoteBruktAvMor : dagerFar;
    const fordelingInfo = [
        getFordelingTekstFedrekvote(gjenståendeDagerTilFar, erAdopsjon, familiehendelsesdato, antallBarn, intl),
    ];

    if (dagerRundtFødsel > 0) {
        const dinEllerHans = erFarEllerMedmor ? intl.formatMessage({ id: 'din' }) : intl.formatMessage({ id: 'hans' });
        const morEllerDeg = erFarEllerMedmor ? navnMor : intl.formatMessage({ id: 'deg' });
        fordelingInfo.push(
            <FormattedMessage
                id="fordeling.info.farMedmor.rundtFødsel"
                values={{
                    farTekst,
                    farTekstCapitalized: capitalizeFirstLetter(farTekst),
                    morEllerDeg,
                    dinEllerHans,
                    b: (msg) => <b>{msg}</b>,
                }}
            />,
        );
    }

    if (erFarEllerMedmor && dagerFarsKvoteBruktAvMor && dagerFarsKvoteBruktAvMor > 0) {
        const varighetTekst = getVarighetString(dagerFarsKvoteBruktAvMor, intl);
        fordelingDager.push({
            antallDager: dagerFarsKvoteBruktAvMor,
            fargekode: FordelingFargekode.FEDREKVOTE_BRUKT_AV_MOR,
        });
        fordelingInfo.push(
            <FormattedMessage
                id="fordeling.info.annenPart.brukteDagerAvDinKvote"
                values={{
                    varighetTekst,
                    navnAnnenPart: navnMor,
                    b: (msg) => <b>{msg}</b>,
                }}
            />,
        );
    }
    fordelingDager.push({ antallDager: gjenståendeDagerTilFar, fargekode: fargekodeFar });
    return {
        eier: FordelingEier.FarMedmor,
        sumDager: dagerFar,
        fordelingDager: fordelingDager,
        fordelingInfo,
    };
};

const getFordelingMor = (
    kontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    barn: Barn,
    ekstraDagerPrematur: number | undefined,
    kunMorFårForeldrepenger: boolean,
    søkersituasjon: SøkersituasjonFp,
    navnPåForeldre: NavnPåForeldre,
    intl: IntlShape,
    dagerMorsKvoteBruktAvFar?: number,
): DelInformasjon => {
    const dagerFørFødsel = getAntallUkerForeldrepengerFørFødsel(kontoer) * 5;
    const dagerMødrekvote = kunMorFårForeldrepenger
        ? getAntallUkerForeldrepenger(kontoer) * 5
        : getAntallUkerMødrekvote(kontoer) * 5;

    const fordelingDager = [];
    const fordelingInfo = [];
    const navnMor = navnPåForeldre.mor;
    const navnFar = navnPåForeldre.farMedmor;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const morTekst = getMorTekst(erFarEllerMedmor, navnMor, intl);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const antallBarn = barn.antallBarn;
    const antallDagerMor = dagerMødrekvote + dagerFørFødsel;
    const dagerRettEtterFødsel = erAdopsjon ? 0 : uttaksConstants.ANTALL_UKER_MØDREKVOTE_ETTER_FØDSEL * 5;
    const resterendeDagerMor = dagerMorsKvoteBruktAvFar
        ? dagerMødrekvote - dagerRettEtterFødsel - dagerMorsKvoteBruktAvFar
        : dagerMødrekvote - dagerRettEtterFødsel;
    const fargekode = erFarEllerMedmor ? FordelingFargekode.ANNEN_PART_MOR : FordelingFargekode.SØKER_MOR;
    if (dagerFørFødsel > 0) {
        const varighetTekst = getVarighetString(dagerFørFødsel, intl);
        fordelingDager.push({
            antallDager: dagerFørFødsel,
            fargekode,
        });
        if (kunMorFårForeldrepenger) {
            fordelingInfo.push(
                <FormattedMessage
                    id="fordeling.info.mor.førFødsel.kunMorFårForeldrepenger"
                    values={{
                        varighetTekst,
                        b: (msg) => <b>{msg}</b>,
                    }}
                />,
            );
        } else {
            const dinEllerSin = erFarEllerMedmor
                ? intl.formatMessage({ id: 'sin' })
                : intl.formatMessage({ id: 'din' });
            fordelingInfo.push(
                <FormattedMessage
                    id="fordeling.info.mor.førFødsel.deltUttak"
                    values={{
                        varighetTekst,
                        morTekst,
                        dinEllerSin,
                        b: (msg) => <b>{msg}</b>,
                    }}
                />,
            );
        }
    }
    if (dagerRettEtterFødsel > 0) {
        const varighetTekst = getVarighetString(dagerRettEtterFødsel, intl);
        fordelingDager.push({
            antallDager: dagerRettEtterFødsel,
            fargekode,
        });
        fordelingInfo.push(
            <FormattedMessage
                id="fordeling.info.mor.første6Uker"
                values={{
                    morTekst,
                    varighetTekst,
                    antallBarn,
                    b: (msg) => <b>{msg}</b>,
                }}
            />,
        );
    }

    if (!erFarEllerMedmor && dagerMorsKvoteBruktAvFar && dagerMorsKvoteBruktAvFar > 0) {
        const varighetTekst = getVarighetString(dagerMorsKvoteBruktAvFar, intl);
        fordelingDager.push({
            antallDager: dagerMorsKvoteBruktAvFar,
            fargekode: FordelingFargekode.MØDREKVOTE_BRUKT_AV_FAR,
        });
        fordelingInfo.push(
            <FormattedMessage
                id="fordeling.info.annenPart.brukteDagerAvDinKvote"
                values={{
                    varighetTekst,
                    navnAnnenPart: navnFar,
                    b: (msg) => <b>{msg}</b>,
                }}
            />,
        );
    }
    if (resterendeDagerMor > 0) {
        fordelingDager.push({
            antallDager: resterendeDagerMor,
            fargekode,
        });
        const resterendeDagerTekst = getMorResterendeDagerTekst(
            resterendeDagerMor,
            familiehendelsesdato,
            erAdopsjon,
            antallBarn,
            intl,
        );
        fordelingInfo.push(resterendeDagerTekst);
    }

    if (ekstraDagerPrematur && ekstraDagerPrematur > 0) {
        const varighetTekst = getVarighetString(ekstraDagerPrematur, intl);
        fordelingInfo.push(
            <FormattedMessage
                id="fordeling.info.ekstraDagerPrematur.foreldrepenger"
                values={{
                    varighetTekst,
                    antallBarn,
                    b: (msg) => <b>{msg}</b>,
                }}
            />,
        );
    }
    return {
        eier: FordelingEier.Mor,
        sumDager: antallDagerMor,
        fordelingDager: fordelingDager,
        fordelingInfo,
    };
};

const getFordelingForeldrepengerFarAleneomsorg = (
    antallDager: number,
    erAdopsjon: boolean,
    barn: Barn,
    ekstraDagerGrunnetPrematurFødsel: number | undefined,
    intl: IntlShape,
) => {
    const fordelingDager = [];
    const fordelingInfo = [];
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const antallBarn = barn.antallBarn;
    const fargekode = FordelingFargekode.SØKER_FAR;
    fordelingDager.push({ antallDager, fargekode });
    fordelingInfo.push(
        getHvorLengeDisseUkeneKanBrukesTekst(familiehendelsesdato, erAdopsjon, antallDager, antallBarn, intl),
    );
    if (ekstraDagerGrunnetPrematurFødsel) {
        const varighetTekst = getVarighetString(ekstraDagerGrunnetPrematurFødsel, intl);
        fordelingInfo.push(
            <FormattedMessage
                id="fordeling.info.ekstraDagerPrematur.foreldrepenger"
                values={{
                    varighetTekst,
                    antallBarn,
                    b: (msg) => <b>{msg}</b>,
                }}
            />,
        );
    }
    return {
        eier: FordelingEier.FarMedmor,
        sumDager: antallDager,
        fordelingDager,
        fordelingInfo,
    };
};

const getFordelingForeldrepengerFar = (
    kontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    erAleneOmsorg: boolean,
    erAdopsjon: boolean,
    barn: Barn,
    morTekst: string,
    intl: IntlShape,
): DelInformasjon => {
    const ekstraDagerGrunnetPrematurFødsel = kontoer.tillegg?.prematur;
    const dagerForeldrepenger = getAntallUkerForeldrepenger(kontoer) * 5;
    const dagerUtenAktivitetskrav = getAntallUkerAktivitetsfriKvote(kontoer) * 5;
    const dagerTotalt = dagerForeldrepenger + dagerUtenAktivitetskrav;
    const fordelingDager = [];
    const fordelingInfo = [];
    const fargekode = FordelingFargekode.SØKER_FAR;
    const antallBarn = barn.antallBarn;
    if (erAleneOmsorg) {
        return getFordelingForeldrepengerFarAleneomsorg(
            dagerTotalt,
            erAdopsjon,
            barn,
            ekstraDagerGrunnetPrematurFødsel,
            intl,
        );
    }

    const dagerMedAktivitetskrav = dagerTotalt - dagerUtenAktivitetskrav;
    if (dagerUtenAktivitetskrav > 0) {
        const varighetTekst = getVarighetString(dagerUtenAktivitetskrav, intl);
        fordelingDager.push({ antallDager: dagerUtenAktivitetskrav, fargekode });
        fordelingInfo.push(
            <FormattedMessage
                id="fordeling.info.far.utenAktivitetskrav"
                values={{
                    varighetTekst,
                    morNavnEierform: getNavnGenitivEierform(morTekst, intl.locale),
                    b: (msg) => <b>{msg}</b>,
                }}
            />,
        );
    }

    if (dagerMedAktivitetskrav > 0) {
        const varighetTekst = getVarighetString(dagerMedAktivitetskrav, intl);
        fordelingDager.push({ antallDager: dagerMedAktivitetskrav, fargekode });
        fordelingInfo.push(
            <FormattedMessage
                id="fordeling.info.far.medAktivitetskrav"
                values={{
                    varighetTekst,
                    morNavn: morTekst,
                    b: (msg) => <b>{msg}</b>,
                    a: (msg) => (
                        <Link href={links.hvorLenge} rel="noreferrer" target="_blank">
                            {msg}
                        </Link>
                    ),
                }}
            />,
        );
    }

    if (ekstraDagerGrunnetPrematurFødsel && ekstraDagerGrunnetPrematurFødsel > 0) {
        const varighetTekst = getVarighetString(ekstraDagerGrunnetPrematurFødsel, intl);
        fordelingInfo.push(
            <FormattedMessage
                id="fordeling.info.ekstraDagerPrematur.foreldrepenger"
                values={{
                    varighetTekst,
                    antallBarn,
                    b: (msg) => <b>{msg}</b>,
                }}
            />,
        );
    }

    fordelingInfo.push(
        <FormattedMessage
            id="fordeling.info.far.opphold"
            values={{
                morNavn: morTekst,
                morNavnEierform: getNavnGenitivEierform(morTekst, intl.locale),
                b: (msg) => <b>{msg}</b>,
            }}
        />,
    );
    return {
        eier: FordelingEier.FarMedmor,
        sumDager: dagerTotalt,
        fordelingDager,
        fordelingInfo,
    };
};

export const getMorTekst = (erFarEllerMedmor: boolean, navnMor: string, intl: IntlShape) => {
    if (erFarEllerMedmor) {
        return navnMor !== intl.formatMessage({ id: 'annen.forelder' }) ? navnMor : intl.formatMessage({ id: 'mor' });
    }
    return intl.formatMessage({ id: 'du' });
};

export const getFarTekst = (erFarEllerMedmor: boolean, navnFar: string, intl: IntlShape) => {
    if (erFarEllerMedmor) {
        return intl.formatMessage({ id: 'du' });
    }
    return navnFar !== intl.formatMessage({ id: 'annen.forelder' }) ? navnFar : intl.formatMessage({ id: 'mor' });
};

export const getFordelingFraKontoer = (
    kontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    minsteretter: TilgjengeligeMinsterettskontoer,
    søkersituasjon: SøkersituasjonFp,
    barn: Barn,
    navnPåForeldre: NavnPåForeldre,
    annenForelder: AnnenForelder,
    intl: IntlShape,
    uttaksplanAnnenPart?: Periode[],
): DelInformasjon[] => {
    const navnMor = navnPåForeldre.mor;
    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const annenPartHarKunRettIEØS = !!oppgittAnnenForelder?.harRettPåForeldrepengerIEØS;
    const erAleneomsorg = getErAleneOmOmsorg(annenForelder);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const fordelingsinformasjon = [];
    const dagerMødrekvote = getAntallUkerMødrekvote(kontoer) * 5;
    const dagerFedrekvote = getAntallUkerFedrekvote(kontoer) * 5;
    const dagerFellesperiode = getAntallUkerFellesperiode(kontoer) * 5;
    const dagerForeldrepenger = getAntallUkerForeldrepenger(kontoer) * 5;
    const dagerFellesperiodeBruktAvAnnenPart = getAntallDagerFellesperiodeBruktAvAnnenPart(
        uttaksplanAnnenPart,
        kontoer,
        erFarEllerMedmor,
        familiehendelsesdato,
    );
    const erMor = !erFarEllerMedmor;
    const erMorOgFarHarIkkeKunRettIEØS = erMor && !annenPartHarKunRettIEØS;
    const erFarOgMorHarIkkeKunRettIEØS = erFarEllerMedmor && !annenPartHarKunRettIEØS;
    const skalViseMorsDel = dagerMødrekvote > 0 && (erFarOgMorHarIkkeKunRettIEØS || erMor);
    const skalViseFarsDel = dagerFedrekvote > 0 && (erFarEllerMedmor || erMorOgFarHarIkkeKunRettIEØS);
    const morTekst = getMorTekst(erFarEllerMedmor, navnMor, intl);

    const ekstraDagerPrematur = kontoer.tillegg?.prematur;
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erDeltUttak = getIsDeltUttak(annenForelder);
    if (skalViseMorsDel) {
        const ekstraDagerPrematurSomSkalVisesIMorsDel = erDeltUttak ? 0 : ekstraDagerPrematur;
        const dagerMorsKvoteBruktAvFar = erFarEllerMedmor
            ? undefined
            : getAntallDagerSøkerensKvoteBruktAvAnnenPart(
                  uttaksplanAnnenPart,
                  kontoer,
                  erFarEllerMedmor,
                  familiehendelsesdato,
              );
        const fordelingMor = getFordelingMor(
            kontoer,
            barn,
            ekstraDagerPrematurSomSkalVisesIMorsDel,
            false,
            søkersituasjon,
            navnPåForeldre,
            intl,
            dagerMorsKvoteBruktAvFar,
        );
        fordelingsinformasjon.push(fordelingMor);
    }

    if (dagerFellesperiode > 0) {
        const annenPartsKvoteDager = erFarEllerMedmor ? dagerMødrekvote : dagerFedrekvote;
        const fordelingFelles = getFordelingFelles(
            kontoer,
            søkersituasjon,
            barn,
            navnPåForeldre,
            intl,
            annenPartHarKunRettIEØS,
            annenPartsKvoteDager,
            dagerFellesperiodeBruktAvAnnenPart,
        );
        fordelingsinformasjon.push(fordelingFelles);
    }

    if (skalViseFarsDel) {
        const dagerFarsKvoteBruktAvMor = erFarEllerMedmor
            ? getAntallDagerSøkerensKvoteBruktAvAnnenPart(
                  uttaksplanAnnenPart,
                  kontoer,
                  erFarEllerMedmor,
                  familiehendelsesdato,
              )
            : undefined;
        const fordelingFar = getFordelingFedrekvote(
            dagerFedrekvote,
            minsteretter.farRundtFødsel,
            søkersituasjon,
            barn,
            navnPåForeldre,
            dagerFarsKvoteBruktAvMor,
            intl,
        );
        fordelingsinformasjon.push(fordelingFar);
    }

    if (dagerForeldrepenger > 0) {
        const fordeling = erFarEllerMedmor
            ? getFordelingForeldrepengerFar(kontoer, erAleneomsorg, erAdopsjon, barn, morTekst, intl)
            : getFordelingMor(kontoer, barn, ekstraDagerPrematur, true, søkersituasjon, navnPåForeldre, intl);
        fordelingsinformasjon.push(fordeling);
    }
    if (erFarEllerMedmor && annenPartHarKunRettIEØS) {
        return fordelingsinformasjon.reverse();
    }
    return fordelingsinformasjon;
};

export const getBeggeHarRettGrafFordeling = (
    kontoer: TilgjengeligeStønadskontoerForDekningsgrad,
    erAdopsjon: boolean,
    erFarEllerMedmor: boolean,
    navnMor: string,
    navnFar: string,
    intl: IntlShape,
) => {
    const fordelingFørFødsel = {
        antallDager: uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        eier: FordelingEier.Mor,
        fargekode: erFarEllerMedmor ? FordelingFargekode.ANNEN_PART_MOR : FordelingFargekode.SØKER_MOR,
        beskrivelse: '',
    };
    const fordelingEtterFødselAdopsjon = [
        {
            antallDager: getAntallUkerMødrekvote(kontoer) * 5,
            konto: StønadskontoType.Mødrekvote,
            eier: FordelingEier.Mor,
            fargekode: erFarEllerMedmor ? FordelingFargekode.ANNEN_PART_MOR : FordelingFargekode.SØKER_MOR,
            beskrivelse: erFarEllerMedmor ? `${getNavnGenitivEierform(navnMor, intl.locale)} del` : 'Din del',
        },
        {
            antallDager: getAntallUkerFellesperiode(kontoer) * 5,
            konto: StønadskontoType.Fellesperiode,
            eier: FordelingEier.Felles,
            fargekode: FordelingFargekode.IKKE_TILDELT,
            beskrivelse: 'Fellesperiode',
        },
        {
            antallDager: getAntallUkerFedrekvote(kontoer) * 5,
            konto: StønadskontoType.Fedrekvote,
            eier: FordelingEier.FarMedmor,
            fargekode: erFarEllerMedmor ? FordelingFargekode.SØKER_FAR : FordelingFargekode.ANNEN_PART_FAR,
            beskrivelse: erFarEllerMedmor ? 'Din del' : `${getNavnGenitivEierform(navnFar, intl.locale)} del`,
        },
    ];

    return erAdopsjon ? fordelingEtterFødselAdopsjon : [fordelingFørFødsel, ...fordelingEtterFødselAdopsjon];
};

export const getSisteUttaksdagAnnenForelder = (
    erFarEllerMedmor: boolean,
    deltUttak: boolean,
    perioderAnnenPart: Periode[] | undefined,
): Date | undefined => {
    if (!deltUttak || !perioderAnnenPart || perioderAnnenPart.length === 0) {
        return undefined;
    }
    const annenPartForelder = erFarEllerMedmor ? Forelder.mor : Forelder.farMedmor;
    const annenForeldersFiltrertePerioder = perioderAnnenPart.filter(
        (p) => isInfoPeriode(p) && p.forelder === annenPartForelder,
    );

    const sistePeriodeAnnenForelder = annenForeldersFiltrertePerioder.at(-1);
    const sisteDagAnnenForelder =
        annenForeldersFiltrertePerioder && sistePeriodeAnnenForelder
            ? Uttaksdagen(sistePeriodeAnnenForelder.tidsperiode.tom).denneEllerForrige()
            : undefined;
    return sisteDagAnnenForelder;
};
