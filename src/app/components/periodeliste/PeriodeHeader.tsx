import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { måned, måned3bokstaver, år } from 'common/util/datoUtils';
import { getVarighetString } from 'common/util/intlUtils';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { InjectedIntlProps, injectIntl, InjectedIntl, FormattedMessage } from 'react-intl';
import {
    Periode,
    Periodetype,
    StønadskontoType,
    isForeldrepengerFørFødselUttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { Tidsperioden, getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';
import StønadskontoIkon from '../uttaksplan-ikon/StønadskontoIkon';
import UtsettelseIkon from '../uttaksplan-ikon/UtsettelseIkon';

import './periodeheader.less';
import getMessage from 'common/util/i18nUtils';
import { getPeriodeForelderNavn, getPeriodeTittel } from '../../util/uttaksplan';
import { NavnPåForeldre } from 'common/types';
import { ValidertPeriode } from '../../redux/reducers/uttaksplanValideringReducer';
import AriaText from 'common/components/aria/AriaText';

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
    const advarselId = `advarsel__${periode.id}`;
    const advarsel = getAdvarselForPeriode(validertPeriode, intl);
    return (
        <div>
            <AriaText>
                <FormattedMessage
                    id="periodeliste.header.ariaBeskrivelse"
                    values={{
                        periodetittel,
                        foreldernavn,
                        tidOgVarighet: visDatoer
                            ? erFpFørTerminUtenUttak
                                ? varighetString
                                : `${Tidsperioden(periode.tidsperiode).formaterString(intl)} (${varighetString})`
                            : varighetString,
                        advarsel: advarsel ? `${advarsel.beskrivelse}.` : ''
                    }}
                />
            </AriaText>

            <div
                role="presentation"
                aria-hidden={true}
                className={classnames(BEM.className, 'typo-normal', {
                    [BEM.modifier('apnet')]: isOpen
                })}>
                <div className={BEM.element('ikon')} role="presentation" aria-hidden={true}>
                    {renderPeriodeIkon(periode, navnPåForeldre)}
                </div>
                <div className={BEM.element('beskrivelse')}>
                    <Element tag="h1">{periodetittel}</Element>
                    <Normaltekst>
                        {varighetString}
                        <em className={BEM.element('hvem')}> - {foreldernavn}</em>
                    </Normaltekst>
                </div>
                {advarsel && (
                    <div className={BEM.element('advarsel')}>
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
            </div>
        </div>
    );
};

export default injectIntl(PeriodeHeader);
