import * as React from 'react';
import BEMHelper from 'common/util/bem';
import { getVarighetString } from 'common/util/intlUtils';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
    Periode,
    Periodetype,
    StønadskontoType,
    isForeldrepengerFørFødselUttaksperiode,
    isUtsettelseAnnenPart
} from '../../../../../types/uttaksplan/periodetyper';
import { Tidsperioden, getValidTidsperiode } from '../../../../../util/uttaksplan/Tidsperioden';
import getMessage from 'common/util/i18nUtils';
import { getPeriodeForelderNavn, getPeriodeTittel } from '../../../../../util/uttaksplan';
import { NavnPåForeldre, Forelder } from 'common/types';
import PeriodelisteItemHeader from './PeriodelisteItemHeader';
import { VeilederMessage } from 'app/components/veilederInfo/types';
import StønadskontoIkon from 'app/components/ikoner/uttaksplanIkon/StønadskontoIkon';
import UtsettelseIkon from 'app/components/ikoner/uttaksplanIkon/UtsettelseIkon';

export interface Props {
    periode: Periode;
    navnPåForeldre: NavnPåForeldre;
    annenForelderSamtidigUttakPeriode?: Periode;
    melding?: VeilederMessage;
    isOpen?: boolean;
}

const BEM = BEMHelper('periodelisteItemHeader');

export const getPeriodeIkon = (periode: Periode, navnPåForeldre: NavnPåForeldre): JSX.Element | undefined => {
    switch (periode.type) {
        case Periodetype.Uttak:
            return (
                <StønadskontoIkon
                    konto={periode.konto}
                    forelder={periode.forelder}
                    gradert={periode.gradert}
                    navnPåForeldre={navnPåForeldre}
                />
            );
        case Periodetype.Overføring:
            return (
                <StønadskontoIkon konto={periode.konto} forelder={periode.forelder} navnPåForeldre={navnPåForeldre} />
            );
        case Periodetype.Utsettelse:
            return <UtsettelseIkon årsak={periode.årsak} />;
        case Periodetype.Opphold:
            return (
                <StønadskontoIkon
                    konto={StønadskontoType.Foreldrepenger}
                    forelder={periode.forelder}
                    navnPåForeldre={navnPåForeldre}
                />
            );
        case Periodetype.Info:
            if (isUtsettelseAnnenPart(periode)) {
                return <UtsettelseIkon årsak={periode.årsak} />;
            } else {
                return (
                    <StønadskontoIkon
                        konto={StønadskontoType.Foreldrepenger}
                        forelder={periode.forelder}
                        navnPåForeldre={navnPåForeldre}
                    />
                );
            }
    }
    return undefined;
};

const PeriodeHeader: React.StatelessComponent<Props & InjectedIntlProps> = ({
    periode,
    navnPåForeldre,
    isOpen,
    melding,
    annenForelderSamtidigUttakPeriode,
    intl
}) => {
    const gyldigTidsperiode = getValidTidsperiode(periode.tidsperiode);
    const visDatoer = periode.tidsperiode.fom || periode.tidsperiode.tom;
    let varighetString;
    const erFpFørTerminUtenUttak =
        isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin === true;
    if (erFpFørTerminUtenUttak) {
        varighetString = getMessage(intl, 'periodeliste.header.skalIkkeHaUttakFørTermin');
    } else {
        varighetString = getVarighetString(
            gyldigTidsperiode ? Tidsperioden(gyldigTidsperiode).getAntallUttaksdager() : 0,
            intl
        );
    }
    let samtidigUttakAnnenForelderVarighet;
    if (annenForelderSamtidigUttakPeriode) {
        const annenForelderTidsperiode = annenForelderSamtidigUttakPeriode.tidsperiode;
        samtidigUttakAnnenForelderVarighet = getVarighetString(
            getValidTidsperiode(annenForelderTidsperiode)
                ? Tidsperioden(annenForelderTidsperiode).getAntallUttaksdager()
                : 0,
            intl
        );
    }
    const foreldernavn = getPeriodeForelderNavn(periode, navnPåForeldre);
    const periodetittel = getPeriodeTittel(intl, periode, navnPåForeldre);

    let navnAnnenForelder;
    if (
        periode.type === Periodetype.Utsettelse ||
        periode.type === Periodetype.Uttak ||
        periode.type === Periodetype.Overføring ||
        periode.type === Periodetype.Opphold ||
        periode.type === Periodetype.Info
    ) {
        navnAnnenForelder = periode.forelder === Forelder.mor ? navnPåForeldre.farMedmor : navnPåForeldre.mor;
    }

    return (
        <PeriodelisteItemHeader
            type="periode"
            isOpen={isOpen}
            melding={melding}
            tittel={periodetittel}
            annenForelderSamtidigUttakPeriode={annenForelderSamtidigUttakPeriode}
            navnAnnenForelder={navnAnnenForelder}
            beskrivelse={
                <>
                    {varighetString}
                    <em className={BEM.element('hvem')}> - {foreldernavn}</em>
                </>
            }
            beskrivelseSamtidigUttak={
                <>
                    {samtidigUttakAnnenForelderVarighet}
                    <em className={BEM.element('hvem')}> - {navnAnnenForelder}</em>
                </>
            }
            ikon={getPeriodeIkon(periode, navnPåForeldre)}
            tidsperiode={visDatoer && periode.tidsperiode}
        />
    );
};

export default injectIntl(PeriodeHeader);
