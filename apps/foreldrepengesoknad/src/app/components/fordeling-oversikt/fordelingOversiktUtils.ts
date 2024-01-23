import { FordelingEier, DelInformasjon, getFormattedMessage, FordeligFargekode } from './FordelingOversikt';
import {
    getAntallUker,
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepenger,
    getAntallUkerMødrekvote,
} from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import {
    TilgjengeligStønadskonto,
    andreAugust2022ReglerGjelder,
    førsteOktober2021ReglerGjelder,
    getVarighetString,
    intlUtils,
    uttaksConstants,
} from '@navikt/fp-common';
import { IntlShape } from 'react-intl';
import { links } from '@navikt/fp-constants';

export const getFellesperiodeInfoTekst = (
    varighetTekst: string,
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
): React.ReactNode => {
    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        return getFormattedMessage('fordeling.info.felles.før1okt2021', { varighetTekst });
    }
    if (erAdopsjon) {
        return getFormattedMessage('fordeling.info.felles.adopsjon', { varighetTekst }, links.hvorLenge);
    }
    return getFormattedMessage('fordeling.info.felles.fødsel', { varighetTekst }, links.hvorLenge);
};

export const getHvorLengeDisseUkeneKanBrukesTekst = (
    familiehendelsesdato: Date,
    erAdopsjon: boolean,
): React.ReactNode => {
    if (!førsteOktober2021ReglerGjelder(familiehendelsesdato)) {
        return getFormattedMessage('fordeling.hvorLengeDisseUkeneKanBrukes.før1okt2021');
    }
    if (erAdopsjon) {
        return getFormattedMessage('fordeling.hvorLengeDisseUkeneKanBrukes.adopsjon');
    }
    return getFormattedMessage('fordeling.hvorLengeDisseUkeneKanBrukes.fødsel');
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

export const getFordelingFarMedmorAleneomsorg = (
    kontoer: TilgjengeligStønadskonto[],
    erAdopsjon: boolean,
    familiehendelsesdato: Date,
): DelInformasjon[] => {
    const antallUkerFar = getAntallUker(kontoer);
    const fargekode = FordeligFargekode.SØKER_FAR;
    const fordelingInfo = getHvorLengeDisseUkeneKanBrukesTekst(familiehendelsesdato, erAdopsjon);
    return [
        {
            eier: FordelingEier.FarMedmor,
            sumUker: antallUkerFar,
            fordelingUker: [{ antallUker: antallUkerFar, fargekode }],
            fordelingInfo: [fordelingInfo],
        },
    ];
};

export const getFordelingMorFødsel = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    erAleneOmsorg: boolean,
    familiehendelsesdato: Date,
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
    const resterendeUkerTekst = førsteOktober2021ReglerGjelder(familiehendelsesdato)
        ? getFormattedMessage('fordeling.info.mor.resterendeUker', { varighetTekst })
        : getFormattedMessage('fordeling.info.mor.resterendeUker.før1okt2021', { varighetTekst });
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
            resterendeUkerTekst,
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
    familiehendelsesdato: Date,
    intl: IntlShape,
): DelInformasjon => {
    const antallUkerFar = getAntallUkerFedrekvote(kontoer);
    const fargekode = erFarEllerMedmor ? FordeligFargekode.SØKER_FAR : FordeligFargekode.ANNEN_PART_FAR;
    const terminEllerFødsel = erBarnetFødt ? intlUtils(intl, 'fødsel') : intlUtils(intl, 'termin');
    const varighetTekst = getVarighetString(antallUkerFar * 5, intl);
    const fordelingInfo = førsteOktober2021ReglerGjelder(familiehendelsesdato)
        ? [getFormattedMessage('fordeling.info.farMedmor.fødsel', { varighetTekst })]
        : [getFormattedMessage('fordeling.info.farMedmor.før1okt2021', { varighetTekst })];
    if (andreAugust2022ReglerGjelder(familiehendelsesdato)) {
        fordelingInfo.push(getFormattedMessage('fordeling.info.farMedmor.rundtFødsel', { terminEllerFødsel }));
    }
    return {
        eier: FordelingEier.FarMedmor,
        sumUker: antallUkerFar,
        fordelingUker: [{ antallUker: antallUkerFar, fargekode }],
        fordelingInfo,
    };
};

export const getFordelingFarMedmorBeggeHarRettAdopsjon = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    intl: IntlShape,
): DelInformasjon => {
    const antallUkerFar = getAntallUkerFedrekvote(kontoer);
    const varighetTekst = getVarighetString(antallUkerFar * 5, intl);
    const fargekode = erFarEllerMedmor ? FordeligFargekode.SØKER_FAR : FordeligFargekode.ANNEN_PART_FAR;
    const fordelingInfo = førsteOktober2021ReglerGjelder(familiehendelsesdato)
        ? [getFormattedMessage('fordeling.info.farMedmor.adopsjon', { varighetTekst })]
        : [getFormattedMessage('fordeling.info.farMedmor.før1okt2021', { varighetTekst })];
    return {
        eier: FordelingEier.FarMedmor,
        sumUker: antallUkerFar,
        fordelingUker: [{ antallUker: antallUkerFar, fargekode }],
        fordelingInfo,
    };
};

export const getFordelingFellesperiodeBeggeHarRett = (
    kontoer: TilgjengeligStønadskonto[],
    erAdopsjon: boolean,
    familiehendelsesdato: Date,
    intl: IntlShape,
    annenPartHarKunRettIEØS?: boolean,
    annenPartsAntallUker?: number,
    annenPartNavn?: string,
): DelInformasjon => {
    const antallUkerFelles = getAntallUkerFellesperiode(kontoer);
    const varighetFelles = getVarighetString(antallUkerFelles * 5, intl);

    const fordelingInfo = [getFellesperiodeInfoTekst(varighetFelles, familiehendelsesdato, erAdopsjon)];
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
    familiehendelsesdato: Date,
    intl: IntlShape,
): DelInformasjon => {
    const antallUkerFelles = getAntallUkerFellesperiode(kontoer);
    const varighetStringFellesperiode = getVarighetString(antallUkerFelles * 5, intl);
    const gjenståendeUker = antallUkerFelles - dagerBruktAvAnnenPart / 5;
    const varighetStringAnnenPart = getVarighetString(dagerBruktAvAnnenPart, intl);
    const tekstOmFellesperiode = getFellesperiodeInfoTekst(
        varighetStringFellesperiode,
        familiehendelsesdato,
        erAdopsjon,
    );

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
            tekstOmFellesperiode,
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
    familiehendelsesdato: Date,
    intl: IntlShape,
): DelInformasjon[] => {
    if (søkerErAleneOmOmsorg) {
        return [getFordelingMorFødsel(kontoer, erFarEllerMedmor, false, familiehendelsesdato, intl)];
    } else {
        return getFordelingBeggeHarRettFødsel(kontoer, erFarEllerMedmor, erBarnetFødt, familiehendelsesdato, intl);
    }
};

export const getFordelingBeggeHarRettFødsel = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    erBarnetFødt: boolean,
    familiehendelsesdato: Date,
    intl: IntlShape,
): DelInformasjon[] => {
    const morsDel = getFordelingMorFødsel(kontoer, erFarEllerMedmor, false, familiehendelsesdato, intl);
    const farsDel = getFordelingFarMedmorFødsel(kontoer, erFarEllerMedmor, erBarnetFødt, familiehendelsesdato, intl);
    const fellesDel = getFordelingFellesperiodeBeggeHarRett(kontoer, false, familiehendelsesdato, intl, false);
    return [morsDel, fellesDel, farsDel];
};

export const getFordelingFarMedmorFørstegangssøknadMedAnnenPart = (
    kontoer: TilgjengeligStønadskonto[],
    dagerFellesperiodeBruktAvAnnenPart: number,
    navnMor: string,
    erFarEllerMedmor: boolean,
    erAdopsjon: boolean,
    erBarnetFødt: boolean,
    familiehendelsesdato: Date,
    intl: IntlShape,
): DelInformasjon[] => {
    const morsDel = erAdopsjon
        ? getFordelingMorAdopsjon(kontoer, erFarEllerMedmor, false, intl)
        : getFordelingMorFødsel(kontoer, erFarEllerMedmor, false, familiehendelsesdato, intl);
    const farsDel = erAdopsjon
        ? getFordelingFarMedmorBeggeHarRettAdopsjon(kontoer, erFarEllerMedmor, familiehendelsesdato, intl)
        : getFordelingFarMedmorFødsel(kontoer, erFarEllerMedmor, erBarnetFødt, familiehendelsesdato, intl);
    const fellesDel =
        dagerFellesperiodeBruktAvAnnenPart > 0
            ? getFordelingFellesperiodeMedAnnenPart(
                  kontoer,
                  dagerFellesperiodeBruktAvAnnenPart,
                  navnMor,
                  true,
                  erAdopsjon,
                  familiehendelsesdato,
                  intl,
              )
            : getFordelingFellesperiodeBeggeHarRett(kontoer, erAdopsjon, familiehendelsesdato, intl, false);
    return [morsDel, fellesDel, farsDel];
};

export const getFordelingBeggeHarRettAdopsjon = (
    kontoer: TilgjengeligStønadskonto[],
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    intl: IntlShape,
) => {
    const morsDel = getFordelingMorAdopsjon(kontoer, erFarEllerMedmor, false, intl);
    const farsDel = getFordelingFarMedmorBeggeHarRettAdopsjon(kontoer, erFarEllerMedmor, familiehendelsesdato, intl);
    const fellesDel = getFordelingFellesperiodeBeggeHarRett(kontoer, true, familiehendelsesdato, intl, false);
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
    familiehendelsesdato: Date,
    intl: IntlShape,
) => {
    let søkerensDel;
    let navnAnnenPart;
    let antallUkerAnnenPart;
    if (erFarEllerMedmor) {
        søkerensDel = erAdopsjon
            ? getFordelingFarMedmorBeggeHarRettAdopsjon(kontoer, erFarEllerMedmor, familiehendelsesdato, intl)
            : getFordelingFarMedmorFødsel(kontoer, erFarEllerMedmor, erBarnetFødt, familiehendelsesdato, intl);
        (navnAnnenPart = navnMor), (antallUkerAnnenPart = getAntallUkerMødrekvote(kontoer));
    } else {
        søkerensDel = erAdopsjon
            ? getFordelingMorAdopsjon(kontoer, erFarEllerMedmor, false, intl)
            : getFordelingMorFødsel(kontoer, erFarEllerMedmor, false, familiehendelsesdato, intl);
        (navnAnnenPart = navnFarMedmor), (antallUkerAnnenPart = getAntallUkerFedrekvote(kontoer));
    }
    const fellesDel = getFordelingFellesperiodeBeggeHarRett(
        kontoer,
        erAdopsjon,
        familiehendelsesdato,
        intl,
        true,
        antallUkerAnnenPart,
        navnAnnenPart,
    );
    return [søkerensDel, fellesDel];
};
