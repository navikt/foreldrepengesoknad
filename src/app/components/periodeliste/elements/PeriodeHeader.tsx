import * as React from 'react';
import BEMHelper from 'common/util/bem';
import { getVarighetString } from 'common/util/intlUtils';
import { InjectedIntlProps, injectIntl, InjectedIntl } from 'react-intl';
import {
    Periode,
    Periodetype,
    StønadskontoType,
    isForeldrepengerFørFødselUttaksperiode
} from '../../../types/uttaksplan/periodetyper';
import { Tidsperioden, getValidTidsperiode } from '../../../util/uttaksplan/Tidsperioden';
import StønadskontoIkon from '../../uttaksplan-ikon/StønadskontoIkon';
import UtsettelseIkon from '../../uttaksplan-ikon/UtsettelseIkon';
import getMessage from 'common/util/i18nUtils';
import { getPeriodeForelderNavn, getPeriodeTittel } from '../../../util/uttaksplan';
import { NavnPåForeldre } from 'common/types';
import { ValidertPeriode } from '../../../redux/reducers/uttaksplanValideringReducer';
import PeriodelisteItemHeader, { Advarsel } from './../elements/PeriodelisteItemHeader';

export interface Props {
    periode: Periode;
    validertPeriode: ValidertPeriode;
    navnPåForeldre: NavnPåForeldre;
    advarsel?: Advarsel;
    isOpen?: boolean;
}

const BEM = BEMHelper('periodelisteItemHeader');

export const getPeriodeIkon = (periode: Periode, navnPåForeldre: NavnPåForeldre): JSX.Element | undefined => {
    if (periode.type === Periodetype.Uttak) {
        return (
            <StønadskontoIkon
                konto={periode.konto}
                forelder={periode.forelder}
                gradert={periode.gradert}
                navnPåForeldre={navnPåForeldre}
            />
        );
    } else if (periode.type === Periodetype.Overføring) {
        return <StønadskontoIkon konto={periode.konto} forelder={periode.forelder} navnPåForeldre={navnPåForeldre} />;
    } else if (periode.type === Periodetype.Utsettelse) {
        return <UtsettelseIkon årsak={periode.årsak} />;
    } else if (periode.type === Periodetype.Opphold) {
        return (
            <StønadskontoIkon
                konto={StønadskontoType.Foreldrepenger}
                forelder={periode.forelder}
                navnPåForeldre={navnPåForeldre}
            />
        );
    }
    return undefined;
};

const getAdvarselForPeriode = (validertPeriode: ValidertPeriode, intl: InjectedIntl): Advarsel | undefined => {
    if (validertPeriode === undefined) {
        return;
    }

    if (validertPeriode.valideringsfeil.length > 0) {
        return {
            type: 'feil',
            beskrivelse: getMessage(intl, `uttaksplan.validering.feil.${validertPeriode.valideringsfeil[0].feilKey}`)
        };
    }
    if (validertPeriode.overlappendePerioder.length > 0) {
        return {
            type: 'feil',
            beskrivelse: getMessage(intl, `periodeliste.overlappendePeriode`)
        };
    }
    if (validertPeriode.advarsler.length > 0) {
        const advarsel = validertPeriode.advarsler[0];
        return {
            type: 'advarsel',
            beskrivelse: getMessage(intl, `uttaksplan.validering.advarsel.${advarsel.advarselKey}`)
        };
    }
    return undefined;
};

const PeriodeHeader: React.StatelessComponent<Props & InjectedIntlProps> = ({
    periode,
    navnPåForeldre,
    validertPeriode,
    isOpen,
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
    const foreldernavn = getPeriodeForelderNavn(periode, navnPåForeldre);
    const periodetittel = getPeriodeTittel(intl, periode, navnPåForeldre);
    const advarsel = getAdvarselForPeriode(validertPeriode, intl);
    return (
        <PeriodelisteItemHeader
            type="periode"
            ariaTekst={getMessage(intl, 'periodeliste.header.ariaBeskrivelse', {
                periodetittel,
                foreldernavn,
                tidOgVarighet: visDatoer
                    ? erFpFørTerminUtenUttak
                        ? varighetString
                        : `${Tidsperioden(periode.tidsperiode).formaterString(intl)} (${varighetString})`
                    : varighetString,
                advarsel: advarsel ? `${advarsel.beskrivelse}.` : ''
            })}
            isOpen={isOpen}
            advarsel={advarsel}
            tittel={periodetittel}
            beskrivelse={
                <>
                    {varighetString}
                    <em className={BEM.element('hvem')}> - {foreldernavn}</em>
                </>
            }
            ikon={getPeriodeIkon(periode, navnPåForeldre)}
            tidsperiode={visDatoer && periode.tidsperiode}
        />
    );
};

export default injectIntl(PeriodeHeader);
