import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { måned, måned3bokstaver } from 'common/util/datoUtils';
import { getVarighetString } from 'common/util/intlUtils';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { InjectedIntlProps, injectIntl, InjectedIntl } from 'react-intl';
import { Periode, Periodetype, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { getPeriodeFarge } from '../../util/uttaksplan/styleUtils';
import { Tidsperioden, getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';
import StønadskontoIkon from '../uttaksplan-ikon/StønadskontoIkon';
import UtsettelseIkon from '../uttaksplan-ikon/UtsettelseIkon';

import './periodeheader.less';
import getMessage from 'common/util/i18nUtils';
import {
    getStønadskontoNavn,
    getPeriodeForelderNavn,
    getOppholdskontoNavn,
    getForelderNavn
} from '../../util/uttaksplan';
import { NavnPåForeldre } from 'common/types';
import AriaText from 'common/components/aria/AriaText';

type AdvarselType = 'advarsel' | 'feil';

export interface Advarsel {
    tittel?: string;
    beskrivelse: string;
    type: AdvarselType;
}

export interface Props {
    periode: Periode;
    navnPåForeldre: NavnPåForeldre;
    advarsel?: Advarsel;
    isOpen?: boolean;
}

const BEM = BEMHelper('periodeheader');

const getIkonForAdvarsel = (advarsel: Advarsel): UttaksplanIkonKeys => {
    if (advarsel.type === 'advarsel') {
        return UttaksplanIkonKeys.advarsel;
    }
    return UttaksplanIkonKeys.advarsel; // Feilikon mangler
};

const getPeriodeTittel = (intl: InjectedIntl, periode: Periode, navnPåForeldre: NavnPåForeldre): string => {
    switch (periode.type) {
        case Periodetype.Uttak:
        case Periodetype.Overføring:
            return getStønadskontoNavn(intl, periode.konto, navnPåForeldre);
        case Periodetype.Utsettelse:
            if (periode.årsak) {
                return getMessage(intl, `periodeliste.utsettelsesårsak`, {
                    årsak: getMessage(intl, `utsettelsesårsak.${periode.årsak}`)
                });
            }
            return getMessage(intl, `periodeliste.utsettelsesårsak.ukjent`);
        case Periodetype.Opphold:
            return getOppholdskontoNavn(intl, periode.årsak, getForelderNavn(periode.forelder, navnPåForeldre));
    }
};

const renderDagMnd = (dato: Date): JSX.Element =>
    dato ? (
        <div className={BEM.element('dagmnd')}>
            <span className={BEM.element('dagmnd__dato')}>{dato.getDate()}.</span>
            <EtikettLiten tag="span" className={BEM.element('dagmnd__mnd')}>
                <abbr title={måned(dato)}>{måned3bokstaver(dato)}</abbr>.
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

const PeriodeHeader: React.StatelessComponent<Props & InjectedIntlProps> = ({
    periode,
    advarsel,
    navnPåForeldre,
    isOpen,
    intl
}) => {
    const gyldigTidsperiode = getValidTidsperiode(periode.tidsperiode);
    const visDatoer = periode.tidsperiode.fom || periode.tidsperiode.tom;
    const varighetString = getVarighetString(
        gyldigTidsperiode ? Tidsperioden(gyldigTidsperiode).getAntallUttaksdager() : 0,
        intl
    );
    const foreldernavn = getPeriodeForelderNavn(periode, navnPåForeldre);
    const advarselId = `advarsel__${periode.id}`;
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
                {visDatoer && (
                    <Normaltekst>
                        {varighetString}
                        <em className={BEM.element('hvem')}> - {foreldernavn}</em>
                    </Normaltekst>
                )}
            </div>
            {advarsel && (
                <div className={BEM.element('advarsel')}>
                    <AriaText id={advarselId}>
                        {advarsel.tittel ? <strong>{advarsel.tittel}</strong> : undefined}
                        {advarsel.beskrivelse}
                    </AriaText>
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
