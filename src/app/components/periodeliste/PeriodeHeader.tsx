import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { måned, måned3bokstaver } from 'common/util/datoUtils';
import { getVarighetString } from 'common/util/intlUtils';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { InjectedIntlProps, injectIntl, InjectedIntl } from 'react-intl';
import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import { getPeriodeFarge } from '../../util/uttaksplan/styleUtils';
import { Tidsperioden } from '../../util/uttaksplan/Tidsperioden';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';
import StønadskontoIkon from '../uttaksplan-ikon/StønadskontoIkon';
import UtsettelseIkon from '../uttaksplan-ikon/UtsettelseIkon';

import './periodeheader.less';
import getMessage from 'common/util/i18nUtils';
import { getStønadskontoNavn } from '../../util/uttaksplan';

export type AdvarselType = 'advarsel' | 'feil';

interface Advarsel {
    beskrivelse: string;
    type: AdvarselType;
}

export interface Props {
    periode: Periode;
    advarsel?: Advarsel;
    foreldernavn: string;
    isOpen?: boolean;
}

const BEM = BEMHelper('periodeheader');

const getIkonForAdvarsel = (advarsel: Advarsel): UttaksplanIkonKeys => {
    if (advarsel.type === 'advarsel') {
        return UttaksplanIkonKeys.advarsel;
    }
    return UttaksplanIkonKeys.advarsel; // Feilikon mangler
};

const getPeriodeTittel = (periode: Periode, foreldernavn: string, intl: InjectedIntl): string => {
    if (periode.type === Periodetype.Uttak) {
        return getStønadskontoNavn(periode.konto, intl);
    }
    if (periode.type === Periodetype.Utsettelse) {
        const årsak = getMessage(intl, `utsettelsesårsak.${periode.årsak}`);
        return getMessage(intl, `periodeliste.utsettelsesårsak`, { årsak });
    }
    return '';
};

const renderDagMnd = (dato: Date): JSX.Element => (
    <div className={BEM.element('dagmnd')}>
        <span className={BEM.element('dagmnd__dato')}>{dato.getDate()}.</span>
        <EtikettLiten tag="span" className={BEM.element('dagmnd__mnd')}>
            <abbr title={måned(dato)}>{måned3bokstaver(dato)}</abbr>.
        </EtikettLiten>
    </div>
);

const renderPeriodeIkon = (periode: Periode): JSX.Element | undefined => {
    if (periode.type === Periodetype.Uttak) {
        return <StønadskontoIkon konto={periode.konto} forelder={periode.forelder} gradert={periode.gradert} />;
    } else if (periode.type === Periodetype.Utsettelse) {
        return <UtsettelseIkon årsak={periode.årsak} />;
    }
    return undefined;
};

const PeriodeHeader: React.StatelessComponent<Props & InjectedIntlProps> = ({
    periode,
    advarsel,
    foreldernavn,
    isOpen,
    intl
}) => {
    return (
        <article
            className={classnames(BEM.className, BEM.modifier(getPeriodeFarge(periode)), 'typo-normal', {
                [BEM.modifier('apnet')]: isOpen
            })}>
            <div className={BEM.element('ikon')} role="presentation" aria-hidden={true}>
                {renderPeriodeIkon(periode)}
            </div>
            <div className={BEM.element('beskrivelse')}>
                <Element tag="h1">{getPeriodeTittel(periode, foreldernavn, intl)}</Element>
                <Normaltekst>
                    {getVarighetString(Tidsperioden(periode.tidsperiode).getAntallUttaksdager(), intl)}
                    <em className={BEM.element('hvem')}> - {foreldernavn}</em>
                </Normaltekst>
            </div>
            {advarsel && (
                <div className={BEM.element('advarsel')}>
                    <UttaksplanIkon ikon={getIkonForAdvarsel(advarsel)} />
                </div>
            )}
            <div className={BEM.element('tidsrom')}>
                {renderDagMnd(periode.tidsperiode.fom)}
                -
                {renderDagMnd(periode.tidsperiode.tom)}
            </div>
        </article>
    );
};

export default injectIntl(PeriodeHeader);
