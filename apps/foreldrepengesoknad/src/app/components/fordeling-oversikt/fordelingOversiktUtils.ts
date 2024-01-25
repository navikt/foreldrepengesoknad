import { FordelingEier, DelInformasjon, getFormattedMessage, FordeligFargekode } from './FordelingOversikt';
import {
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepenger,
    getAntallUkerForeldrepengerFørFødsel,
    getAntallUkerMødrekvote,
} from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import {
    TilgjengeligStønadskonto,
    førsteOktober2021ReglerGjelder,
    getVarighetString,
    intlUtils,
    uttaksConstants,
} from '@navikt/fp-common';
import { IntlShape } from 'react-intl';
import { links } from '@navikt/fp-constants';
import { TilgjengeligeMinsterettskontoer } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { getAntallPrematurdager, skalViseInfoOmPrematuruker } from 'app/utils/uttaksplanInfoUtils';

const getBarnetTekst = (antallBarn: number, intl: IntlShape) => {
    return antallBarn === 1 ? intlUtils(intl, 'barnet') : intlUtils(intl, 'barna');
};

const getHvorLengeDisseUkeneKanBrukesTekst = (
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    antallUker: number,
    antallBarn: number,
    intl: IntlShape,
): React.ReactNode => {
    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        const varighetTekst = getVarighetString(antallUker * 5, intl);
        return getFormattedMessage('fordeling.hvorLengeAntallUkerKanBrukes.før1okt2021', { varighetTekst });
    }
    if (erAdopsjon) {
        return getFormattedMessage('fordeling.hvorLengeDisseUkeneKanBrukes.adopsjon');
    }
    const barnTekst = getBarnetTekst(antallBarn, intl);
    return getFormattedMessage('fordeling.hvorLengeDisseUkeneKanBrukes.fødsel', { barnTekst });
};

export const getFordelingDelTittel = (
    delInfo: DelInformasjon,
    erFarEllerMedmor: boolean,
    intl: IntlShape,
    navnMor: string,
    navnFarMedmor: string,
): string => {
    const varighetTekst = getVarighetString(delInfo.sumUker * 5, intl);
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
            return intlUtils(intl, 'fordeling.antallUkerFelles', { varighetTekst });
    }
};

export const getFordelingShadowClass = (erUthevet: boolean): string => {
    return erUthevet ? 'shadow' : 'no-shadow';
};

const getMorResterendeUkerTekst = (
    antallUker: number,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    antallBarn: number,
    intl: IntlShape,
) => {
    const varighetTekst = getVarighetString(antallUker * 5, intl);

    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        return getFormattedMessage('fordeling.info.mor.resterendeUker.før1okt2021', { varighetTekst });
    }
    if (erAdopsjon) {
        return getFormattedMessage('fordeling.info.mor.resterendeUker.adopsjon', { varighetTekst });
    }
    const barnTekst = getBarnetTekst(antallBarn, intl);
    return getFormattedMessage('fordeling.info.mor.resterendeUker.fødsel', { varighetTekst, barnTekst });
};

const getFellesInfoTekst = (
    ukerFelles: number,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    antallBarn: number,
    intl: IntlShape,
): React.ReactNode => {
    const varighetTekst = getVarighetString(ukerFelles * 5, intl);
    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        return getFormattedMessage('fordeling.info.felles.før1okt2021', { varighetTekst });
    }
    if (erAdopsjon) {
        return getFormattedMessage('fordeling.info.felles.adopsjon', { varighetTekst }, links.hvorLenge);
    }
    const barnTekst = getBarnetTekst(antallBarn, intl);
    return getFormattedMessage('fordeling.info.felles.fødsel', { varighetTekst, barnTekst }, links.hvorLenge);
};

const getFordelingFelles = (
    ukerFelles: number,
    erFarEllerMedmor: boolean,
    erAdopsjon: boolean,
    familiehendelsesdato: Date,
    intl: IntlShape,
    antallBarn: number,
    annenPartNavn: string,
    fødselsdato: Date | undefined,
    termindato: Date | undefined,
    annenPartHarKunRettIEØS?: boolean,
    annenPartsKvoteUker?: number,
    ukerBruktAvAnnenPart?: number,
): DelInformasjon => {
    const fordelingUker = [];
    const fordelingInfo = [getFellesInfoTekst(ukerFelles, familiehendelsesdato, erAdopsjon, antallBarn, intl)];
    const gjenståendeUker = ukerBruktAvAnnenPart ? ukerFelles - ukerBruktAvAnnenPart : ukerFelles;

    if (ukerBruktAvAnnenPart && ukerBruktAvAnnenPart > 0) {
        const varighetTekstAnnenPart = getVarighetString(ukerBruktAvAnnenPart * 5, intl);
        const fargekodeAnnenPart = erFarEllerMedmor
            ? FordeligFargekode.ANNEN_PART_MOR
            : FordeligFargekode.ANNEN_PART_FAR;
        fordelingUker.push({ antallUker: ukerBruktAvAnnenPart, fargekode: fargekodeAnnenPart });
        fordelingInfo.push(
            getFormattedMessage('fordeling.info.felles.annenForelder.del1', {
                varighet: varighetTekstAnnenPart,
                annenPartNavn,
                gjenståendeUker,
            }),
        );
        fordelingInfo.push(getFormattedMessage('fordeling.info.felles.annenForelder.del2', { annenPartNavn }));
    }
    if (gjenståendeUker > 0) {
        fordelingUker.push({ antallUker: gjenståendeUker, fargekode: FordeligFargekode.IKKE_TILDELT });
    }

    if (annenPartHarKunRettIEØS && annenPartsKvoteUker && annenPartsKvoteUker > 0) {
        const varighetAnnenPart = getVarighetString(annenPartsKvoteUker * 5, intl);
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
        fordelingInfo.push(
            getFormattedMessage(
                'fordeling.info.ekstraDagerPrematur.fellesperiode',
                {
                    varighetTekst,
                },
                links.hvorLenge,
            ),
        );
    }
    return {
        eier: FordelingEier.Felles,
        sumUker: ukerFelles,
        fordelingUker,
        fordelingInfo,
    };
};

const getFordelingTekstFedrekvote = (
    ukerFar: number,
    erAdopsjon: boolean,
    familiehendelsesdato: Date,
    antallBarn: number,
    intl: IntlShape,
) => {
    const varighetTekst = getVarighetString(ukerFar * 5, intl);
    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        return getFormattedMessage('fordeling.info.farMedmor.før1okt2021', { varighetTekst });
    }
    if (erAdopsjon) {
        return getFormattedMessage('fordeling.info.farMedmor.adopsjon', { varighetTekst });
    }
    const barnTekst = getBarnetTekst(antallBarn, intl);
    return getFormattedMessage('fordeling.info.farMedmor.fødsel', { varighetTekst, barnTekst });
};

const getFordelingFedrekvote = (
    ukerFar: number,
    ukerRundtFødsel: number,
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    erBarnetFødt: boolean,
    antallBarn: number,
    intl: IntlShape,
): DelInformasjon => {
    const fargekode = erFarEllerMedmor ? FordeligFargekode.SØKER_FAR : FordeligFargekode.ANNEN_PART_FAR;
    const fordelingInfo = [getFordelingTekstFedrekvote(ukerFar, erAdopsjon, familiehendelsesdato, antallBarn, intl)];

    if (ukerRundtFødsel > 0) {
        const terminEllerFødsel = erBarnetFødt ? intlUtils(intl, 'fødsel') : intlUtils(intl, 'termin');
        fordelingInfo.push(getFormattedMessage('fordeling.info.farMedmor.rundtFødsel', { terminEllerFødsel }));
    }
    return {
        eier: FordelingEier.FarMedmor,
        sumUker: ukerFar,
        fordelingUker: [{ antallUker: ukerFar, fargekode }],
        fordelingInfo,
    };
};

const getFordelingMor = (
    ukerMødrekvote: number,
    ukerFørFødsel: number,
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    antallBarn: number,
    ekstraDagerGrunnetPrematurFødsel: number | undefined,
    intl: IntlShape,
): DelInformasjon => {
    const fordelingUker = [];
    const fordelingInfo = [];
    const antallUkerMor = ukerMødrekvote + ukerFørFødsel;
    const ukerRettEtterFødsel = erAdopsjon ? 0 : uttaksConstants.ANTALL_UKER_MØDREKVOTE_ETTER_FØDSEL;
    const resterendeUkerMor = ukerMødrekvote - ukerRettEtterFødsel;
    const fargekode = erFarEllerMedmor ? FordeligFargekode.ANNEN_PART_MOR : FordeligFargekode.SØKER_MOR;

    if (ukerFørFødsel > 0) {
        const varighetTekst = getVarighetString(ukerFørFødsel * 5, intl);
        fordelingUker.push({
            antallUker: ukerFørFødsel,
            fargekode,
        });
        fordelingInfo.push(getFormattedMessage('fordeling.info.mor.førFødsel', { varighetTekst }));
    }
    if (ukerRettEtterFødsel > 0) {
        const varighetTekst = getVarighetString(ukerRettEtterFødsel * 5, intl);
        fordelingUker.push({
            antallUker: ukerRettEtterFødsel,
            fargekode,
        });
        fordelingInfo.push(getFormattedMessage('fordeling.info.mor.første6Uker', { varighetTekst }));
    }
    if (resterendeUkerMor > 0) {
        fordelingUker.push({
            antallUker: resterendeUkerMor,
            fargekode,
        });
        const resterendeUkerTekst = getMorResterendeUkerTekst(
            resterendeUkerMor,
            familiehendelsesdato,
            erAdopsjon,
            antallBarn,
            intl,
        );
        fordelingInfo.push(resterendeUkerTekst);
    }

    if (ekstraDagerGrunnetPrematurFødsel && ekstraDagerGrunnetPrematurFødsel > 0) {
        const varighetTekst = getVarighetString(ekstraDagerGrunnetPrematurFødsel, intl);
        fordelingInfo.push(
            getFormattedMessage(
                'fordeling.info.ekstraDagerPrematur.foreldrepenger',
                {
                    varighetTekst,
                },
                links.hvorLenge,
            ),
        );
    }
    return {
        eier: FordelingEier.Mor,
        sumUker: antallUkerMor,
        fordelingUker,
        fordelingInfo,
    };
};

const getFordelingForeldrepengerFarAleneomsorg = (
    antallUker: number,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    antallBarn: number,
    ekstraDagerGrunnetPrematurFødsel: number | undefined,
    intl: IntlShape,
) => {
    const fordelingUker = [];
    const fordelingInfo = [];
    const fargekode = FordeligFargekode.SØKER_FAR;
    fordelingUker.push({ antallUker, fargekode });
    fordelingInfo.push(
        getHvorLengeDisseUkeneKanBrukesTekst(familiehendelsesdato, erAdopsjon, antallUker, antallBarn, intl),
    );
    if (ekstraDagerGrunnetPrematurFødsel) {
        const varighetTekst = getVarighetString(ekstraDagerGrunnetPrematurFødsel, intl);
        fordelingInfo.push(
            getFormattedMessage('fordeling.info.ekstraDagerPrematur.foreldrepenger', {
                varighetTekst,
            }),
        );
    }
    return {
        eier: FordelingEier.FarMedmor,
        sumUker: antallUker,
        fordelingUker,
        fordelingInfo,
    };
};

const getFordelingForeldrepengerFar = (
    ukerForeldrepenger: number,
    dagerRundtFødsel: number,
    ukerUtenAktivitetskrav: number,
    erAleneOmsorg: boolean,
    erAdopsjon: boolean,
    familiehendelsesdato: Date,
    erBarnetFødt: boolean,
    antallBarn: number,
    ekstraDagerGrunnetPrematurFødsel: number | undefined,
    intl: IntlShape,
): DelInformasjon => {
    const fordelingUker = [];
    const fordelingInfo = [];
    const fargekode = FordeligFargekode.SØKER_FAR;

    if (erAleneOmsorg) {
        return getFordelingForeldrepengerFarAleneomsorg(
            ukerForeldrepenger,
            familiehendelsesdato,
            erAdopsjon,
            antallBarn,
            ekstraDagerGrunnetPrematurFødsel,
            intl,
        );
    }

    const ukerMedAktivitetskrav = ukerForeldrepenger - ukerUtenAktivitetskrav;
    if (ukerUtenAktivitetskrav > 0) {
        const varighetTekst = getVarighetString(ukerUtenAktivitetskrav * 5, intl);
        fordelingUker.push({ antallUker: ukerUtenAktivitetskrav, fargekode });
        fordelingInfo.push(getFormattedMessage('fordeling.info.far.utenAktivitetskrav', { varighetTekst }));
    }
    if (dagerRundtFødsel > 0) {
        const terminEllerFødsel = erBarnetFødt ? intlUtils(intl, 'fødsel') : intlUtils(intl, 'termin');
        fordelingInfo.push(getFormattedMessage('fordeling.info.farMedmor.rundtFødsel', { terminEllerFødsel }));
    }
    if (ukerMedAktivitetskrav > 0) {
        const varighetTekst = getVarighetString(ukerMedAktivitetskrav * 5, intl);
        fordelingUker.push({ antallUker: ukerMedAktivitetskrav, fargekode });
        fordelingInfo.push(
            getFormattedMessage('fordeling.info.far.medAktivitetskrav', { varighetTekst }, links.hvorLenge),
        );
    }

    if (ekstraDagerGrunnetPrematurFødsel && ekstraDagerGrunnetPrematurFødsel > 0) {
        const varighetTekst = getVarighetString(ekstraDagerGrunnetPrematurFødsel, intl);
        fordelingInfo.push(
            getFormattedMessage('fordeling.info.ekstraDagerPrematur.foreldrepenger', {
                varighetTekst,
            }),
        );
    }

    fordelingInfo.push(getFormattedMessage('fordeling.info.far.opphold'));
    return {
        eier: FordelingEier.FarMedmor,
        sumUker: ukerForeldrepenger,
        fordelingUker,
        fordelingInfo,
    };
};

export const getFordelingFraKontoer = (
    kontoer: TilgjengeligStønadskonto[],
    minsteretter: TilgjengeligeMinsterettskontoer,
    erFarEllerMedmor: boolean,
    erBarnetFødt: boolean,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
    erAleneomsorg: boolean,
    navnMor: string,
    navnFar: string,
    antallBarn: number,
    fødselsdato: Date | undefined,
    termindato: Date | undefined,
    intl: IntlShape,
    annenPartHarKunRettIEØS?: boolean,
    ukerFellesperiodeBruktAvAnnenPart?: number,
): DelInformasjon[] => {
    const fordelingsinformasjon = [];
    const ukerFørFødsel = getAntallUkerForeldrepengerFørFødsel(kontoer);
    const ukerMødrekvote = getAntallUkerMødrekvote(kontoer);
    const ukerFedrekvote = getAntallUkerFedrekvote(kontoer);
    const antallUkerFellesperiode = getAntallUkerFellesperiode(kontoer);
    const ukerForeldrepenger = getAntallUkerForeldrepenger(kontoer);

    if (ukerMødrekvote > 0) {
        const fordelingMor = getFordelingMor(
            ukerMødrekvote,
            ukerFørFødsel,
            erFarEllerMedmor,
            familiehendelsesdato,
            erAdopsjon,
            antallBarn,
            undefined,
            intl,
        );
        fordelingsinformasjon.push(fordelingMor);
    }

    if (antallUkerFellesperiode > 0) {
        const annenPartNavn = erFarEllerMedmor ? navnMor : navnFar;
        const annenPartsKvoteUker = erFarEllerMedmor ? ukerMødrekvote : ukerFedrekvote;
        const fordelingFelles = getFordelingFelles(
            antallUkerFellesperiode,
            erFarEllerMedmor,
            erAdopsjon,
            familiehendelsesdato,
            intl,
            antallBarn,
            annenPartNavn,
            fødselsdato,
            termindato,
            annenPartHarKunRettIEØS,
            annenPartsKvoteUker,
            ukerFellesperiodeBruktAvAnnenPart,
        );
        fordelingsinformasjon.push(fordelingFelles);
    }

    if (ukerFedrekvote > 0) {
        const fordelingFar = getFordelingFedrekvote(
            ukerFedrekvote,
            minsteretter.farRundtFødsel,
            erFarEllerMedmor,
            familiehendelsesdato,
            erAdopsjon,
            erBarnetFødt,
            antallBarn,
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

    if (ukerForeldrepenger > 0) {
        const ukerUtenAktivitetskrav = getAntallUkerAktivitetsfriKvote(kontoer);
        const fordeling = erFarEllerMedmor
            ? getFordelingForeldrepengerFar(
                  ukerForeldrepenger,
                  minsteretter.farRundtFødsel,
                  ukerUtenAktivitetskrav,
                  erAleneomsorg,
                  erAdopsjon,
                  familiehendelsesdato,
                  erBarnetFødt,
                  antallBarn,
                  ekstraDagerGrunnetPrematurFødsel,
                  intl,
              )
            : getFordelingMor(
                  ukerForeldrepenger,
                  ukerFørFødsel,
                  erFarEllerMedmor,
                  familiehendelsesdato,
                  erAdopsjon,
                  antallBarn,
                  ekstraDagerGrunnetPrematurFødsel,
                  intl,
              );
        fordelingsinformasjon.push(fordeling);
    }
    return fordelingsinformasjon;
};
