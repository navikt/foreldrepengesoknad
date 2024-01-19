import { FordelingEier, DelInformasjon, getFormattedMessage, FordeligFargekode } from './FordelingOversikt';
import {
    getAntallUker,
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepenger,
    getAntallUkerMødrekvote,
} from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { TilgjengeligStønadskonto, getVarighetString, intlUtils, uttaksConstants } from '@navikt/fp-common';
import { IntlShape } from 'react-intl';
import { links } from '@navikt/fp-constants';

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

export const getFordelingFarMedmorAleneomsorg = (
    kontoer: TilgjengeligStønadskonto[],
    erAdopsjon: boolean,
): DelInformasjon[] => {
    const antallUkerFar = getAntallUker(kontoer);
    const fargekode = FordeligFargekode.SØKER_FAR;
    const fordelingInfo = [
        erAdopsjon
            ? getFormattedMessage('fordeling.info.far.aleneomsorg.adopsjon')
            : getFormattedMessage('fordeling.info.far.aleneomsorg.fødsel'),
    ];
    return [
        {
            eier: FordelingEier.Mor,
            sumUker: antallUkerFar,
            fordelingUker: [{ antallUker: antallUkerFar, fargekode }],
            fordelingInfo,
        },
    ];
};

export const getFordelingMorAleneomsorg = (
    kontoer: TilgjengeligStønadskonto[],
    erAdopsjon: boolean,
    intl: IntlShape,
): DelInformasjon[] => {
    if (erAdopsjon) {
        return [getFordelingMorAdopsjon(kontoer, false, true, intl)];
    }
    return [getFordelingMorFødsel(kontoer, false, true, intl)];
};

export const getFordelingMorFødsel = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    erAleneOmsorg: boolean,
    intl: IntlShape,
): DelInformasjon => {
    let antallUkerMorEtterFødsel;
    if (erAleneOmsorg) {
        antallUkerMorEtterFødsel = getAntallUkerForeldrepenger(kontoer);
    } else {
        antallUkerMorEtterFødsel = getAntallUkerMødrekvote(kontoer);
    }
    const antallUkerMor = antallUkerMorEtterFødsel + uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL;
    const restAntallUkerMor = antallUkerMorEtterFødsel - uttaksConstants.ANTALL_UKER_MØDREKVOTE_ETTER_FØDSEL;
    const fargekode = erFarEllerMedmor ? FordeligFargekode.ANNEN_PART_MOR : FordeligFargekode.SØKER_MOR;
    const varighetTekst = getVarighetString(restAntallUkerMor * 5, intl);
    return {
        eier: FordelingEier.Mor,
        sumUker: antallUkerMor,
        fordelingUker: [
            {
                antallUker: uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL,
                fargekode,
            },
            { antallUker: uttaksConstants.ANTALL_UKER_MØDREKVOTE_ETTER_FØDSEL, fargekode },
            { antallUker: restAntallUkerMor, fargekode },
        ],
        fordelingInfo: [
            getFormattedMessage('fordeling.info.mor.førFødsel'),
            getFormattedMessage('fordeling.info.mor.første6Uker'),
            getFormattedMessage('fordeling.info.mor.resterendeUker', { varighetTekst }),
        ],
    };
};

export const getFordelingMorAdopsjon = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    erAleneOmsorg: boolean,
    intl: IntlShape,
): DelInformasjon => {
    let antallUker;
    if (erAleneOmsorg) {
        antallUker = getAntallUkerForeldrepenger(kontoer);
    } else {
        antallUker = getAntallUkerMødrekvote(kontoer);
    }
    const fargekode = erFarEllerMedmor ? FordeligFargekode.ANNEN_PART_MOR : FordeligFargekode.SØKER_MOR;
    const varighetTekst = getVarighetString(antallUker * 5, intl);
    return {
        eier: FordelingEier.Mor,
        sumUker: antallUker,
        fordelingUker: [{ antallUker, fargekode }],
        fordelingInfo: [getFormattedMessage('fordeling.info.mor.adopsjon', { varighetTekst })],
    };
};

export const getFordelingFarMedmorFødsel = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    erBarnetFødt: boolean,
    intl: IntlShape,
): DelInformasjon => {
    const antallUkerFar = getAntallUkerFedrekvote(kontoer);
    const fargekode = erFarEllerMedmor ? FordeligFargekode.SØKER_FAR : FordeligFargekode.ANNEN_PART_FAR;
    const terminEllerFødsel = erBarnetFødt ? intlUtils(intl, 'fødsel') : intlUtils(intl, 'termin');
    const varighetTekst = getVarighetString(antallUkerFar * 5, intl);
    return {
        eier: FordelingEier.FarMedmor,
        sumUker: antallUkerFar,
        fordelingUker: [{ antallUker: antallUkerFar, fargekode }],
        fordelingInfo: [
            getFormattedMessage('fordeling.info.farMedmor.fødsel', { varighetTekst }),
            getFormattedMessage('fordeling.info.farMedmor.rundtFødsel', { terminEllerFødsel }),
        ],
    };
};

export const getFordelingFarMedmorBeggeHarRettAdopsjon = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): DelInformasjon => {
    const antallUkerFar = getAntallUkerFedrekvote(kontoer);
    const varighetTekst = getVarighetString(antallUkerFar * 5, intl);
    const fargekode = erFarEllerMedmor ? FordeligFargekode.SØKER_FAR : FordeligFargekode.ANNEN_PART_FAR;
    return {
        eier: FordelingEier.FarMedmor,
        sumUker: antallUkerFar,
        fordelingUker: [{ antallUker: antallUkerFar, fargekode }],
        fordelingInfo: [getFormattedMessage('fordeling.info.farMedmor.adopsjon', { varighetTekst })],
    };
};

export const getFordelingFellesperiodeBeggeHarRett = (
    kontoer: TilgjengeligStønadskonto[],
    erAdopsjon: boolean,
    intl: IntlShape,
    annenPartHarKunRettIEØS?: boolean,
    annenPartsAntallUker?: number,
    annenPartNavn?: string,
): DelInformasjon => {
    const antallUkerFelles = getAntallUkerFellesperiode(kontoer);
    const varighetFelles = getVarighetString(antallUkerFelles * 5, intl);
    const innen3ÅrTekst = erAdopsjon
        ? intlUtils(intl, 'innen3ÅrSidenAdopsjon')
        : intlUtils(intl, 'innenBarnetFyller3År');
    const fordelingInfo = [
        getFormattedMessage('fordeling.info.felles', { varighet: varighetFelles, innen3ÅrTekst }, links.hvorLenge),
    ];
    if (annenPartHarKunRettIEØS === true && annenPartsAntallUker) {
        const varighetAnnenPart = getVarighetString(annenPartsAntallUker * 5, intl);
        fordelingInfo.push(
            getFormattedMessage('fordeling.info.felles.annenForelder.eøs', { navn: annenPartNavn, varighetAnnenPart }),
        );
    }
    return {
        eier: FordelingEier.Felles,
        sumUker: antallUkerFelles,
        fordelingUker: [{ antallUker: antallUkerFelles, fargekode: FordeligFargekode.IKKE_TILDELT }],
        fordelingInfo,
    };
};

export const getFordelingFellesperiodeMedAnnenPart = (
    kontoer: TilgjengeligStønadskonto[],
    dagerBruktAvAnnenPart: number,
    annenPartNavn: string,
    erFarEllerMedmor: boolean,
    erAdopsjon: boolean,
    intl: IntlShape,
): DelInformasjon => {
    const antallUkerFelles = getAntallUkerFellesperiode(kontoer);
    const varighetStringFellesperiode = getVarighetString(antallUkerFelles * 5, intl);
    const gjenståendeUker = antallUkerFelles - dagerBruktAvAnnenPart / 5;
    const varighetStringAnnenPart = getVarighetString(dagerBruktAvAnnenPart, intl);
    const innen3ÅrTekst = erAdopsjon
        ? intlUtils(intl, 'innen3ÅrSidenAdopsjon')
        : intlUtils(intl, 'innenBarnetFyller3År');
    return {
        eier: FordelingEier.Felles,
        sumUker: antallUkerFelles,
        fordelingUker: [
            {
                antallUker: dagerBruktAvAnnenPart / 5,
                fargekode: erFarEllerMedmor ? FordeligFargekode.ANNEN_PART_MOR : FordeligFargekode.ANNEN_PART_FAR,
            },
            { antallUker: gjenståendeUker, fargekode: FordeligFargekode.IKKE_TILDELT },
        ],
        fordelingInfo: [
            getFormattedMessage(
                'fordeling.info.felles',
                { varighet: varighetStringFellesperiode, innen3ÅrTekst },
                links.hvorLenge,
            ),
            getFormattedMessage('fordeling.info.felles.annenForelder.del1', {
                varighet: varighetStringAnnenPart,
                annenPartNavn,
                gjenståendeUker,
            }),
            getFormattedMessage('fordeling.info.felles.annenForelder.del2', { annenPartNavn }),
        ],
    };
};

export const getFordelingMorSøkerFørstFødsel = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    erBarnetFødt: boolean,
    søkerErAleneOmOmsorg: boolean,
    intl: IntlShape,
): DelInformasjon[] => {
    if (søkerErAleneOmOmsorg) {
        return [getFordelingMorFødsel(kontoer, erFarEllerMedmor, false, intl)];
    } else {
        return getFordelingBeggeHarRettFødsel(kontoer, erFarEllerMedmor, erBarnetFødt, intl);
    }
};

export const getFordelingBeggeHarRettFødsel = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    erBarnetFødt: boolean,
    intl: IntlShape,
): DelInformasjon[] => {
    const morsDel = getFordelingMorFødsel(kontoer, erFarEllerMedmor, false, intl);
    const farsDel = getFordelingFarMedmorFødsel(kontoer, erFarEllerMedmor, erBarnetFødt, intl);
    const fellesDel = getFordelingFellesperiodeBeggeHarRett(kontoer, false, intl, false);
    return [morsDel, fellesDel, farsDel];
};

export const getFordelingFarMedmorFørstegangssøknadMedAnnenPart = (
    kontoer: TilgjengeligStønadskonto[],
    dagerFellesperiodeBruktAvAnnenPart: number,
    navnMor: string,
    erFarEllerMedmor: boolean,
    erAdopsjon: boolean,
    erBarnetFødt: boolean,
    intl: IntlShape,
): DelInformasjon[] => {
    const morsDel = erAdopsjon
        ? getFordelingMorAdopsjon(kontoer, erFarEllerMedmor, false, intl)
        : getFordelingMorFødsel(kontoer, erFarEllerMedmor, false, intl);
    const farsDel = erAdopsjon
        ? getFordelingFarMedmorBeggeHarRettAdopsjon(kontoer, erFarEllerMedmor, intl)
        : getFordelingFarMedmorFødsel(kontoer, erFarEllerMedmor, erBarnetFødt, intl);
    const fellesDel =
        dagerFellesperiodeBruktAvAnnenPart > 0
            ? getFordelingFellesperiodeMedAnnenPart(
                  kontoer,
                  dagerFellesperiodeBruktAvAnnenPart,
                  navnMor,
                  true,
                  erAdopsjon,
                  intl,
              )
            : getFordelingFellesperiodeBeggeHarRett(kontoer, erAdopsjon, intl, false);
    return [morsDel, fellesDel, farsDel];
};

export const getFordelingBeggeHarRettAdopsjon = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    intl: IntlShape,
) => {
    const morsDel = getFordelingMorAdopsjon(kontoer, erFarEllerMedmor, false, intl);
    const farsDel = getFordelingFarMedmorBeggeHarRettAdopsjon(kontoer, erFarEllerMedmor, intl);
    const fellesDel = getFordelingFellesperiodeBeggeHarRett(kontoer, true, intl, false);
    return [morsDel, fellesDel, farsDel];
};

export const getFordelingBareFarMedmorHarRett = (
    kontoer: TilgjengeligStønadskonto[],
    erAdopsjon: boolean,
    erBarnetFødt: boolean,
    intl: IntlShape,
): DelInformasjon[] => {
    const antallUker = getAntallUker(kontoer);
    const fargekode = FordeligFargekode.SØKER_FAR;
    const antallUkerMinsterett = getAntallUkerAktivitetsfriKvote(kontoer);
    const antallUkerMedAktivitetskrav = antallUker - antallUkerMinsterett;
    const varighetTekstUtenAktivitet = getVarighetString(antallUkerMinsterett * 5, intl);
    const varighetTekstMedAktivitet = getVarighetString(antallUkerMedAktivitetskrav * 5, intl);
    const fordelingInfo = [
        getFormattedMessage('fordeling.info.far.utenAktivitetskrav', { varighetTekst: varighetTekstUtenAktivitet }),
    ];
    if (!erAdopsjon) {
        const terminEllerFødsel = erBarnetFødt ? intlUtils(intl, 'fødsel') : intlUtils(intl, 'termin');
        fordelingInfo.push(getFormattedMessage('fordeling.info.farMedmor.rundtFødsel', { terminEllerFødsel }));
    }
    fordelingInfo.push(
        getFormattedMessage(
            'fordeling.info.far.medAktivitetskrav',
            { varighetTekst: varighetTekstMedAktivitet },
            links.hvorLenge,
        ),
    );
    fordelingInfo.push(getFormattedMessage('fordeling.info.far.opphold'));
    return [
        {
            eier: FordelingEier.FarMedmor,
            sumUker: antallUker,
            fordelingUker: [{ antallUker, fargekode }],
            fordelingInfo,
        },
    ];
};

export const getFordelingAnnenPartIEØS = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    erAdopsjon: boolean,
    erBarnetFødt: boolean,
    navnMor: string,
    navnFarMedmor: string,
    intl: IntlShape,
) => {
    let søkerensDel;
    let navnAnnenPart;
    let antallUkerAnnenPart;
    if (erFarEllerMedmor) {
        søkerensDel = erAdopsjon
            ? getFordelingFarMedmorBeggeHarRettAdopsjon(kontoer, erFarEllerMedmor, intl)
            : getFordelingFarMedmorFødsel(kontoer, erFarEllerMedmor, erBarnetFødt, intl);
        (navnAnnenPart = navnMor), (antallUkerAnnenPart = getAntallUkerMødrekvote(kontoer));
    } else {
        søkerensDel = erAdopsjon
            ? getFordelingMorAdopsjon(kontoer, erFarEllerMedmor, false, intl)
            : getFordelingMorFødsel(kontoer, erFarEllerMedmor, false, intl);
        (navnAnnenPart = navnFarMedmor), (antallUkerAnnenPart = getAntallUkerFedrekvote(kontoer));
    }
    const fellesDel = getFordelingFellesperiodeBeggeHarRett(
        kontoer,
        erAdopsjon,
        intl,
        true,
        antallUkerAnnenPart,
        navnAnnenPart,
    );
    return [søkerensDel, fellesDel];
};
