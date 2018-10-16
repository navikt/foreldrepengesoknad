import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { måned, måned3bokstaver, år } from 'common/util/datoUtils';
import { getVarighetString } from 'common/util/intlUtils';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { InjectedIntlProps, injectIntl, InjectedIntl } from 'react-intl';
import {
    Periode,
    Periodetype,
    StønadskontoType,
    isForeldrepengerFørFødselUttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { getPeriodeFarge } from '../../util/uttaksplan/styleUtils';
import { Tidsperioden, getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';
import StønadskontoIkon from '../uttaksplan-ikon/StønadskontoIkon';
import UtsettelseIkon from '../uttaksplan-ikon/UtsettelseIkon';

import './periodeheader.less';
import getMessage from 'common/util/i18nUtils';
import { getPeriodeForelderNavn, getPeriodeTittel } from '../../util/uttaksplan';
import { NavnPåForeldre } from 'common/types';
import AriaText from 'common/components/aria/AriaText';
import { ValidertPeriode } from '../../redux/reducers/uttaksplanValideringReducer';

type AdvarselType = 'advarsel' | 'feil';

export interface Advarsel {
    tittel?: string;
    beskrivelse: string;
    type: AdvarselType;
}

export interface Props {
    periode: Periode;
    validertPeriode: ValidertPeriode;
    navnPåForeldre: NavnPåForeldre;
    advarsel?: Advarsel;
    isOpen?: boolean;
}

const BEM = BEMHelper('periodeheader');

const getIkonForAdvarsel = (advarsel: Advarsel): UttaksplanIkonKeys => {
    if (advarsel.type === 'advarsel') {
        return UttaksplanIkonKeys.advarsel;
    }
    return UttaksplanIkonKeys.feil;
};

const renderDagMnd = (dato: Date): JSX.Element =>
    dato ? (
        <div className={BEM.element('dagmnd')}>
            <span className={BEM.element('dagmnd__dato')}>
                {dato.getDate()}. {måned3bokstaver(dato)}.
            </span>
            <EtikettLiten tag="span" className={BEM.element('dagmnd__mnd')}>
                <abbr title={`${måned(dato)} ${år(dato)}`}>{år(dato)}</abbr>
            </EtikettLiten>
        </div>
    ) : (
        <div className={BEM.element('dagmnd')}>-</div>
    );

const renderPeriodeIkon = (periode: Periode, navnPåForeldre: NavnPåForeldre): JSX.Element | undefined => {
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
    if (isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin === true) {
        varighetString = getMessage(intl, 'periodeliste.header.skalIkkeHaUttakFørTermin');
    } else {
        varighetString = getVarighetString(
            gyldigTidsperiode ? Tidsperioden(gyldigTidsperiode).getAntallUttaksdager() : 0,
            intl
        );
    }
    const foreldernavn = getPeriodeForelderNavn(periode, navnPåForeldre);
    const advarselId = `advarsel__${periode.id}`;
    const advarsel = getAdvarselForPeriode(validertPeriode, intl);
    return (
        <article
            className={classnames(BEM.className, BEM.modifier(getPeriodeFarge(periode)), 'typo-normal', {
                [BEM.modifier('apnet')]: isOpen
            })}>
            <div className={BEM.element('ikon')} role="presentation" aria-hidden={true}>
                {renderPeriodeIkon(periode, navnPåForeldre)}
            </div>
            <div className={BEM.element('beskrivelse')}>
                <Element tag="h1">{getPeriodeTittel(intl, periode, navnPåForeldre)}</Element>
                <Normaltekst>
                    {varighetString}
                    <em className={BEM.element('hvem')}> - {foreldernavn}</em>
                </Normaltekst>
            </div>
            {advarsel && (
                <div className={BEM.element('advarsel')}>
                    <AriaText id={advarselId}>{advarsel.beskrivelse}</AriaText>
                    <span role="presentation">
                        <UttaksplanIkon
                            ikon={getIkonForAdvarsel(advarsel)}
                            aria-labeledby={advarselId}
                            title={advarsel.beskrivelse}
                        />
                    </span>
                </div>
            )}
            {visDatoer && (
                <div className={BEM.element('tidsrom')}>
                    {renderDagMnd(periode.tidsperiode.fom)}
                    -
                    {renderDagMnd(periode.tidsperiode.tom)}
                </div>
            )}
        </article>
    );
};

export default injectIntl(PeriodeHeader);
