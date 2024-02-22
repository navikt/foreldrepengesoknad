import {
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepenger,
    getAntallUkerForeldrepengerFørFødsel,
    getAntallUkerMødrekvote,
} from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import {
    Barn,
    ISOStringToDate,
    Periode,
    StønadskontoType,
    TilgjengeligStønadskonto,
    capitalizeFirstLetter,
    førsteOktober2021ReglerGjelder,
    getNavnGenitivEierform,
    getVarighetString,
    intlUtils,
    isAdoptertBarn,
    isFarEllerMedmor,
    isFødtBarn,
    isUfødtBarn,
    uttaksConstants,
} from '@navikt/fp-common';
import { IntlShape } from 'react-intl';
import { links } from '@navikt/fp-constants';
import { TilgjengeligeMinsterettskontoer } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getAntallPrematurdager, skalViseInfoOmPrematuruker } from 'app/utils/uttaksplanInfoUtils';
import { getFormattedMessage } from './FordelingOversikt';
import { DelInformasjon, FordelingEier, FordelingFargekode } from 'app/types/FordelingOversikt';
import { getFamiliehendelsedato, getFødselsdato, getTermindato } from 'app/utils/barnUtils';
import { SøkersituasjonFp } from '@navikt/fp-types';
import { getBrukteDager } from '@navikt/uttaksplan/src/utils/brukteDagerUtils';
import dayjs from 'dayjs';

export const getHarFåttEllerSkalFå = (barn: Barn, intl: IntlShape) => {
    if (isFødtBarn(barn)) {
        return intlUtils(intl, 'harFått');
    }
    if (isUfødtBarn(barn)) {
        return intlUtils(intl, 'skalFå');
    }
    if (isAdoptertBarn(barn)) {
        if (dayjs().isAfter(dayjs(barn.adopsjonsdato))) {
            return intlUtils(intl, 'skalAdoptere');
        }
        return intlUtils(intl, 'harAdoptert');
    }
    throw Error('Ukjent type barn');
};

export const getBarnetEllerBarnaTekst = (antallBarn: number, intl: IntlShape): string => {
    return antallBarn === 1 ? intlUtils(intl, 'barnet') : intlUtils(intl, 'barna');
};

export const getDegEllerMorTekst = (erFarEllerMedmor: boolean, navnMor: string, intl: IntlShape): string => {
    return erFarEllerMedmor ? navnMor : intlUtils(intl, 'deg');
};

export const getDuEllerDereTekst = (deltUttak: boolean, intl: IntlShape): string => {
    return deltUttak ? intlUtils(intl, 'dere') : intlUtils(intl, 'du');
};

export const getDinEllerFarGenitivEierformTekst = (
    erFarEllerMedmor: boolean,
    navnFar: string,
    intl: IntlShape,
): string => {
    return erFarEllerMedmor ? intlUtils(intl, 'din') : getNavnGenitivEierform(navnFar, intl.locale);
};

export const getDegEllerSegTekst = (erFarEllerMedmor: boolean, intl: IntlShape) => {
    return erFarEllerMedmor ? intlUtils(intl, 'seg') : intlUtils(intl, 'deg');
};

const getHvorLengeDisseUkeneKanBrukesTekst = (
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    antallDager: number,
    antallBarn: number,
    intl: IntlShape,
): React.ReactNode => {
    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        const varighetTekst = getVarighetString(antallDager, intl);
        return getFormattedMessage('fordeling.hvorLengeAntallUkerKanBrukes.før1okt2021', { varighetTekst });
    }
    if (erAdopsjon) {
        return getFormattedMessage('fordeling.hvorLengeDisseUkeneKanBrukes.adopsjon');
    }
    const barnTekst = getBarnetEllerBarnaTekst(antallBarn, intl);
    return getFormattedMessage('fordeling.hvorLengeDisseUkeneKanBrukes.fødsel', { barnTekst });
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
        const varighetUkerEtterFødsel = (delInfo.sumDager - dagerFørFødsel) / 5;
        varighetTekst = intlUtils(intl, 'fordeling.varighet.morFødsel', { varighetUker: varighetUkerEtterFødsel });
    } else {
        varighetTekst = getVarighetString(delInfo.sumDager, intl);
    }

    switch (delInfo.eier) {
        case FordelingEier.Mor:
            return !erFarEllerMedmor
                ? intlUtils(intl, 'fordeling.antallUkerTilDeg', {
                      varighetTekst,
                  })
                : intlUtils(intl, 'fordeling.antallUkerTilAnnenForelder', {
                      varighetTekst,
                      navn: navnMor,
                  });
        case FordelingEier.FarMedmor:
            return erFarEllerMedmor
                ? intlUtils(intl, 'fordeling.antallUkerTilDeg', {
                      varighetTekst,
                  })
                : intlUtils(intl, 'fordeling.antallUkerTilAnnenForelder', {
                      varighetTekst,
                      navn: navnFarMedmor,
                  });
        case FordelingEier.Felles:
            return harAnnenForelderKunRettIEØS
                ? intlUtils(intl, 'fordeling.antallUkerFelles.eøs', { varighetTekst, navnAnnenForelder })
                : intlUtils(intl, 'fordeling.antallUkerFelles', { varighetTekst });
    }
};

export const getFordelingShadowClass = (erUthevet: boolean): string => {
    return erUthevet ? 'shadow' : 'no-shadow';
};

const getMorResterendeDagerTekst = (
    antallDager: number,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    antallBarn: number,
    intl: IntlShape,
) => {
    const varighetTekst = getVarighetString(antallDager, intl);

    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        return getFormattedMessage('fordeling.info.mor.resterendeUker.før1okt2021', { varighetTekst });
    }
    if (erAdopsjon) {
        return getFormattedMessage('fordeling.info.mor.resterendeUker.adopsjon', { varighetTekst });
    }
    const barnTekst = getBarnetEllerBarnaTekst(antallBarn, intl);
    return getFormattedMessage('fordeling.info.mor.resterendeUker.fødsel', { varighetTekst, barnTekst });
};

const getFellesInfoTekst = (
    dagerFelles: number,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    antallBarn: number,
    morTekst: string,
    farTekst: string,
    intl: IntlShape,
): React.ReactNode => {
    const varighetTekst = getVarighetString(dagerFelles, intl);
    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        return getFormattedMessage('fordeling.info.felles.før1okt2021', { varighetTekst, morTekst, farTekst });
    }
    if (erAdopsjon) {
        return getFormattedMessage(
            'fordeling.info.felles.adopsjon',
            { varighetTekst, morTekst, farTekst },
            links.hvorLenge,
        );
    }
    const barnTekst = getBarnetEllerBarnaTekst(antallBarn, intl);
    return getFormattedMessage(
        'fordeling.info.felles.fødsel',
        { varighetTekst, barnTekst, morTekst, farTekst },
        links.hvorLenge,
    );
};

const getAntallDagerSøkerensKvoteBruktAvAnnenPart = (
    uttaksplanAnnenPart: Periode[] | undefined,
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
): number => {
    if (uttaksplanAnnenPart === undefined || uttaksplanAnnenPart.length === 0) {
        return 0;
    }
    if (erFarEllerMedmor) {
        return getBrukteDager(kontoer, uttaksplanAnnenPart, familiehendelsesdato).mor.dagerAnnenForeldersKvote;
    } else {
        return getBrukteDager(kontoer, uttaksplanAnnenPart, familiehendelsesdato).farMedmor.dagerAnnenForeldersKvote;
    }
};

const getAntallDagerFellesperiodeBruktAvAnnenPart = (
    uttaksplanAnnenPart: Periode[] | undefined,
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
): number => {
    if (uttaksplanAnnenPart === undefined || uttaksplanAnnenPart.length === 0) {
        return 0;
    }
    if (erFarEllerMedmor) {
        return getBrukteDager(kontoer, uttaksplanAnnenPart, familiehendelsesdato).mor.dagerFellesperiode;
    } else {
        return getBrukteDager(kontoer, uttaksplanAnnenPart, familiehendelsesdato).farMedmor.dagerFellesperiode;
    }
};

const getFordelingFelles = (
    dagerFelles: number,
    erFarEllerMedmor: boolean,
    erAdopsjon: boolean,
    familiehendelsesdato: Date,
    intl: IntlShape,
    antallBarn: number,
    annenPartNavn: string,
    fødselsdato: Date | undefined,
    termindato: Date | undefined,
    morTekst: string,
    farTekst: string,
    annenPartHarKunRettIEØS?: boolean,
    annenPartsKvoteDager?: number,
    dagerBruktAvAnnenPart?: number,
): DelInformasjon => {
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
            getFormattedMessage('fordeling.info.felles.annenForelder.del1', {
                varighet: varighetTekstAnnenPart,
                annenPartNavn,
                varighetTekst: gjenståendeVarighet,
            }),
        );
    }
    if (gjenståendeDager > 0) {
        fordelingDager.push({ antallDager: gjenståendeDager, fargekode: FordelingFargekode.IKKE_TILDELT });
    }

    if (annenPartHarKunRettIEØS && annenPartsKvoteDager && annenPartsKvoteDager > 0) {
        const varighetAnnenPart = getVarighetString(annenPartsKvoteDager, intl);
        fordelingInfo.push(
            getFormattedMessage(
                'fordeling.info.felles.annenForelder.eøs',
                {
                    navn: annenPartNavn,
                    varighetAnnenPart,
                },
                links.hvorLenge,
            ),
        );
    }
    const situasjon = erAdopsjon ? 'adopsjon' : 'fødsel';
    const visInfoOmPrematuruker = skalViseInfoOmPrematuruker(fødselsdato, termindato, situasjon);
    const ekstraDagerGrunnetPrematurFødsel =
        visInfoOmPrematuruker && fødselsdato && termindato
            ? getAntallPrematurdager(fødselsdato, termindato)
            : undefined;
    if (ekstraDagerGrunnetPrematurFødsel && ekstraDagerGrunnetPrematurFødsel > 0) {
        const varighetTekst = getVarighetString(ekstraDagerGrunnetPrematurFødsel, intl);
        const barnetEllerBarna = getBarnetEllerBarnaTekst(antallBarn, intl);
        fordelingInfo.push(
            getFormattedMessage(
                'fordeling.info.ekstraDagerPrematur.fellesperiode',
                {
                    varighetTekst,
                    barnetEllerBarna,
                },
                links.hvorLenge,
            ),
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
    familiehendelsesdato: Date,
    antallBarn: number,
    intl: IntlShape,
) => {
    const varighetTekst = getVarighetString(dagerFar, intl);
    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        return getFormattedMessage('fordeling.info.farMedmor.før1okt2021', { varighetTekst });
    }
    if (erAdopsjon) {
        return getFormattedMessage('fordeling.info.farMedmor.adopsjon', { varighetTekst });
    }
    const barnTekst = getBarnetEllerBarnaTekst(antallBarn, intl);
    return getFormattedMessage('fordeling.info.farMedmor.fødsel', { varighetTekst, barnTekst });
};

const getFordelingFedrekvote = (
    dagerFar: number,
    dagerRundtFødsel: number,
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    antallBarn: number,
    navnMor: string,
    farTekst: string,
    dagerFarsKvoteBruktAvMor: number | undefined,
    intl: IntlShape,
): DelInformasjon => {
    const fordelingDager = [];
    const fargekodeFar = erFarEllerMedmor ? FordelingFargekode.SØKER_FAR : FordelingFargekode.ANNEN_PART_FAR;
    const gjenståendeDagerTilFar = dagerFarsKvoteBruktAvMor ? dagerFar - dagerFarsKvoteBruktAvMor : dagerFar;
    const fordelingInfo = [
        getFordelingTekstFedrekvote(gjenståendeDagerTilFar, erAdopsjon, familiehendelsesdato, antallBarn, intl),
    ];

    if (dagerRundtFødsel > 0) {
        const dinEllerHans = getDinEllerHansTekst(erFarEllerMedmor, intl);
        const morEllerDeg = getDegEllerMorTekst(erFarEllerMedmor, navnMor, intl);
        fordelingInfo.push(
            getFormattedMessage('fordeling.info.farMedmor.rundtFødsel', {
                farTekst,
                farTekstCapitalized: capitalizeFirstLetter(farTekst),
                morEllerDeg,
                dinEllerHans,
            }),
        );
    }

    if (erFarEllerMedmor && dagerFarsKvoteBruktAvMor && dagerFarsKvoteBruktAvMor > 0) {
        const varighetTekst = getVarighetString(dagerFarsKvoteBruktAvMor, intl);
        fordelingDager.push({
            antallDager: dagerFarsKvoteBruktAvMor,
            fargekode: FordelingFargekode.FEDREKVOTE_BRUKT_AV_MOR,
        });
        fordelingInfo.push(
            getFormattedMessage('fordeling.info.annenPart.brukteDagerAvDinKvote', {
                varighetTekst,
                navnAnnenPart: navnMor,
            }),
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
    dagerMødrekvote: number,
    dagerFørFødsel: number,
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    antallBarn: number,
    ekstraDagerGrunnetPrematurFødsel: number | undefined,
    kunMorFårForeldrepenger: boolean,
    morTekst: string,
    intl: IntlShape,
    navnFar?: string,
    dagerMorsKvoteBruktAvFar?: number,
): DelInformasjon => {
    const fordelingDager = [];
    const fordelingInfo = [];
    const antallDagerMor = dagerMødrekvote + dagerFørFødsel;
    const dagerRettEtterFødsel = erAdopsjon ? 0 : uttaksConstants.ANTALL_UKER_MØDREKVOTE_ETTER_FØDSEL * 5;
    const resterendeDagerMor = dagerMorsKvoteBruktAvFar
        ? dagerMødrekvote - dagerRettEtterFødsel - dagerMorsKvoteBruktAvFar
        : dagerMødrekvote - dagerRettEtterFødsel;
    const fargekode = erFarEllerMedmor ? FordelingFargekode.ANNEN_PART_MOR : FordelingFargekode.SØKER_MOR;
    const barnetEllerBarna = getBarnetEllerBarnaTekst(antallBarn, intl);
    if (dagerFørFødsel > 0) {
        const varighetTekst = getVarighetString(dagerFørFødsel, intl);
        fordelingDager.push({
            antallDager: dagerFørFødsel,
            fargekode,
        });
        if (kunMorFårForeldrepenger) {
            fordelingInfo.push(
                getFormattedMessage('fordeling.info.mor.førFødsel.kunMorFårForeldrepenger', { varighetTekst }),
            );
        } else {
            const dinEllerSin = erFarEllerMedmor ? intlUtils(intl, 'sin') : intlUtils(intl, 'din');
            fordelingInfo.push(
                getFormattedMessage('fordeling.info.mor.førFødsel.deltUttak', { varighetTekst, morTekst, dinEllerSin }),
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
            getFormattedMessage('fordeling.info.mor.første6Uker', { morTekst, varighetTekst, barnetEllerBarna }),
        );
    }

    if (!erFarEllerMedmor && dagerMorsKvoteBruktAvFar && dagerMorsKvoteBruktAvFar > 0) {
        const varighetTekst = getVarighetString(dagerMorsKvoteBruktAvFar, intl);
        fordelingDager.push({
            antallDager: dagerMorsKvoteBruktAvFar,
            fargekode: FordelingFargekode.MØDREKVOTE_BRUKT_AV_FAR,
        });
        fordelingInfo.push(
            getFormattedMessage('fordeling.info.annenPart.brukteDagerAvDinKvote', {
                varighetTekst,
                navnAnnenPart: navnFar,
            }),
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

    if (ekstraDagerGrunnetPrematurFødsel && ekstraDagerGrunnetPrematurFødsel > 0) {
        const varighetTekst = getVarighetString(ekstraDagerGrunnetPrematurFødsel, intl);
        fordelingInfo.push(
            getFormattedMessage(
                'fordeling.info.ekstraDagerPrematur.foreldrepenger',
                {
                    varighetTekst,
                    barnetEllerBarna,
                },
                links.hvorLenge,
            ),
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
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    antallBarn: number,
    ekstraDagerGrunnetPrematurFødsel: number | undefined,
    intl: IntlShape,
) => {
    const fordelingDager = [];
    const fordelingInfo = [];
    const fargekode = FordelingFargekode.SØKER_FAR;
    fordelingDager.push({ antallDager, fargekode });
    fordelingInfo.push(
        getHvorLengeDisseUkeneKanBrukesTekst(familiehendelsesdato, erAdopsjon, antallDager, antallBarn, intl),
    );
    if (ekstraDagerGrunnetPrematurFødsel) {
        const varighetTekst = getVarighetString(ekstraDagerGrunnetPrematurFødsel, intl);
        const barnetEllerBarna = getBarnetEllerBarnaTekst(antallBarn, intl);
        fordelingInfo.push(
            getFormattedMessage('fordeling.info.ekstraDagerPrematur.foreldrepenger', {
                varighetTekst,
                barnetEllerBarna,
            }),
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
    dagerForeldrepenger: number,
    dagerRundtFødsel: number,
    dagerUtenAktivitetskrav: number,
    erAleneOmsorg: boolean,
    erAdopsjon: boolean,
    familiehendelsesdato: Date,
    antallBarn: number,
    ekstraDagerGrunnetPrematurFødsel: number | undefined,
    farTekst: string,
    morTekst: string,
    erFarEllerMedmor: boolean,
    intl: IntlShape,
    annenForelderHarRettIEØS: boolean | undefined,
): DelInformasjon => {
    const fordelingDager = [];
    const fordelingInfo = [];
    const fargekode = FordelingFargekode.SØKER_FAR;

    if (erAleneOmsorg) {
        return getFordelingForeldrepengerFarAleneomsorg(
            dagerForeldrepenger,
            familiehendelsesdato,
            erAdopsjon,
            antallBarn,
            ekstraDagerGrunnetPrematurFødsel,
            intl,
        );
    }

    const dagerMedAktivitetskrav = dagerForeldrepenger - dagerUtenAktivitetskrav;
    if (dagerUtenAktivitetskrav > 0) {
        const varighetTekst = getVarighetString(dagerUtenAktivitetskrav, intl);
        fordelingDager.push({ antallDager: dagerUtenAktivitetskrav, fargekode });
        fordelingInfo.push(
            getFormattedMessage('fordeling.info.far.utenAktivitetskrav', {
                varighetTekst,
                morNavnEierform: getNavnGenitivEierform(morTekst, intl.locale),
            }),
        );
    }
    if (dagerRundtFødsel > 0) {
        const morEllerDeg = morTekst === intlUtils(intl, 'du') ? intlUtils(intl, 'deg') : morTekst;
        const dinEllerHans = erFarEllerMedmor ? intlUtils(intl, 'din') : intlUtils(intl, 'hans');
        if (annenForelderHarRettIEØS) {
            fordelingInfo.push(
                getFormattedMessage('fordeling.info.farMedmor.rundtFødsel.eøs', {
                    farTekst,
                    farTekstCapitalized: capitalizeFirstLetter(farTekst),
                    dinEllerHans,
                }),
            );
        } else {
            fordelingInfo.push(
                getFormattedMessage('fordeling.info.farMedmor.rundtFødsel', {
                    farTekst,
                    farTekstCapitalized: capitalizeFirstLetter(farTekst),
                    morEllerDeg,
                    dinEllerHans,
                }),
            );
        }
    }
    if (dagerMedAktivitetskrav > 0) {
        const varighetTekst = getVarighetString(dagerMedAktivitetskrav, intl);
        fordelingDager.push({ antallDager: dagerMedAktivitetskrav, fargekode });
        fordelingInfo.push(
            getFormattedMessage(
                'fordeling.info.far.medAktivitetskrav',
                { varighetTekst, morNavn: morTekst },
                links.hvorLenge,
            ),
        );
    }

    if (ekstraDagerGrunnetPrematurFødsel && ekstraDagerGrunnetPrematurFødsel > 0) {
        const varighetTekst = getVarighetString(ekstraDagerGrunnetPrematurFødsel, intl);
        const barnetEllerBarna = getBarnetEllerBarnaTekst(antallBarn, intl);
        fordelingInfo.push(
            getFormattedMessage('fordeling.info.ekstraDagerPrematur.foreldrepenger', {
                varighetTekst,
                barnetEllerBarna,
            }),
        );
    }

    fordelingInfo.push(
        getFormattedMessage('fordeling.info.far.opphold', {
            morNavn: morTekst,
            morNavnEierform: getNavnGenitivEierform(morTekst, intl.locale),
        }),
    );
    return {
        eier: FordelingEier.FarMedmor,
        sumDager: dagerForeldrepenger,
        fordelingDager,
        fordelingInfo,
    };
};

const getDinEllerHansTekst = (erFarEllerMedmor: boolean, intl: IntlShape) => {
    return erFarEllerMedmor ? intlUtils(intl, 'din') : intlUtils(intl, 'hans');
};

export const getMorTekst = (erFarEllerMedmor: boolean, navnMor: string, intl: IntlShape) => {
    if (erFarEllerMedmor) {
        return navnMor !== intlUtils(intl, 'annen.forelder') ? navnMor : intlUtils(intl, 'mor');
    }
    return intlUtils(intl, 'du');
};

export const getFarTekst = (erFarEllerMedmor: boolean, navnFar: string, intl: IntlShape) => {
    if (erFarEllerMedmor) {
        return intlUtils(intl, 'du');
    }
    return navnFar !== intlUtils(intl, 'annen.forelder') ? navnFar : intlUtils(intl, 'mor');
};

export const getFordelingFraKontoer = (
    kontoer: TilgjengeligStønadskonto[],
    minsteretter: TilgjengeligeMinsterettskontoer,
    søkersituasjon: SøkersituasjonFp,
    barn: Barn,
    erAleneomsorg: boolean,
    navnMor: string,
    navnFar: string,
    intl: IntlShape,
    annenPartHarKunRettIEØS?: boolean,
    uttaksplanAnnenPart?: Periode[],
): DelInformasjon[] => {
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn))!;
    const termindato = getTermindato(barn);
    const fødselsdato = getFødselsdato(barn);
    const antallBarn = barn.antallBarn;
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const fordelingsinformasjon = [];
    const dagerFørFødsel = getAntallUkerForeldrepengerFørFødsel(kontoer) * 5;
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
    const annenPartNavn = erFarEllerMedmor ? navnMor : navnFar;
    const skalViseMorsDel =
        dagerMødrekvote > 0 && ((erFarEllerMedmor && !annenPartHarKunRettIEØS) || !erFarEllerMedmor);
    const skalViseFarsDel =
        dagerFedrekvote > 0 && (erFarEllerMedmor || (!erFarEllerMedmor && !annenPartHarKunRettIEØS));
    const morTekst = getMorTekst(erFarEllerMedmor, navnMor, intl);
    const farTekst = getFarTekst(erFarEllerMedmor, navnFar, intl);
    if (skalViseMorsDel) {
        const dagerMorsKvoteBruktAvFar = erFarEllerMedmor
            ? undefined
            : getAntallDagerSøkerensKvoteBruktAvAnnenPart(
                  uttaksplanAnnenPart,
                  kontoer,
                  erFarEllerMedmor,
                  familiehendelsesdato,
              );
        const fordelingMor = getFordelingMor(
            dagerMødrekvote,
            dagerFørFødsel,
            erFarEllerMedmor,
            familiehendelsesdato,
            erAdopsjon,
            antallBarn,
            undefined,
            false,
            morTekst,
            intl,
            navnFar,
            dagerMorsKvoteBruktAvFar,
        );
        fordelingsinformasjon.push(fordelingMor);
    }

    if (dagerFellesperiode > 0) {
        const annenPartsKvoteDager = erFarEllerMedmor ? dagerMødrekvote : dagerFedrekvote;
        const fordelingFelles = getFordelingFelles(
            dagerFellesperiode,
            erFarEllerMedmor,
            erAdopsjon,
            familiehendelsesdato,
            intl,
            antallBarn,
            annenPartNavn,
            fødselsdato,
            termindato,
            morTekst,
            farTekst,
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
            erFarEllerMedmor,
            familiehendelsesdato,
            erAdopsjon,
            antallBarn,
            annenPartNavn,
            farTekst,
            dagerFarsKvoteBruktAvMor,
            intl,
        );
        fordelingsinformasjon.push(fordelingFar);
    }
    const situasjon = erAdopsjon ? 'adopsjon' : 'fødsel';
    const visInfoOmPrematuruker = skalViseInfoOmPrematuruker(fødselsdato, termindato, situasjon);
    const ekstraDagerGrunnetPrematurFødsel =
        visInfoOmPrematuruker && fødselsdato && termindato
            ? getAntallPrematurdager(fødselsdato, termindato)
            : undefined;

    if (dagerForeldrepenger > 0) {
        const dagerUtenAktivitetskrav = getAntallUkerAktivitetsfriKvote(kontoer) * 5;
        const dagerTotalt = dagerForeldrepenger + dagerUtenAktivitetskrav;
        const fordeling = erFarEllerMedmor
            ? getFordelingForeldrepengerFar(
                  dagerTotalt,
                  minsteretter.farRundtFødsel,
                  dagerUtenAktivitetskrav,
                  erAleneomsorg,
                  erAdopsjon,
                  familiehendelsesdato,
                  antallBarn,
                  ekstraDagerGrunnetPrematurFødsel,
                  farTekst,
                  morTekst,
                  erFarEllerMedmor,
                  intl,
                  annenPartHarKunRettIEØS,
              )
            : getFordelingMor(
                  dagerForeldrepenger,
                  dagerFørFødsel,
                  erFarEllerMedmor,
                  familiehendelsesdato,
                  erAdopsjon,
                  antallBarn,
                  ekstraDagerGrunnetPrematurFødsel,
                  true,
                  morTekst,
                  intl,
              );
        fordelingsinformasjon.push(fordeling);
    }
    return fordelingsinformasjon;
};

export const getBeggeHarRettGrafFordeling = (
    kontoer: TilgjengeligStønadskonto[],
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
