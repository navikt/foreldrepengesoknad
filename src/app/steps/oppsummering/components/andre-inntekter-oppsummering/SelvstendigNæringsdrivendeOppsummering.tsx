import { formatDate, intlUtils } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import useSøknad from 'app/utils/hooks/useSøknad';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';

import './frilansOppsummering.less';
import Næringsdetaljer from './Næringsdetaljer';

const SelvstendigNæringsdrivendeOppsummering: FunctionComponent = () => {
    const intl = useIntl();
    const {
        søker: { selvstendigNæringsdrivendeInformasjon, harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd },
    } = useSøknad();

    if (!selvstendigNæringsdrivendeInformasjon || !harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd) {
        return (
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.tittel')}>
                <Normaltekst>
                    {intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.ikkeSelvstendigNæringsdrivende')}
                </Normaltekst>
            </OppsummeringsPunkt>
        );
    }

    return (
        <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.tittel')}>
            <ul className="oppsummeringsliste">
                {selvstendigNæringsdrivendeInformasjon.map((næring) => (
                    <li key={næring.navnPåNæringen + næring.tidsperiode} className="oppsummeringsliste__element">
                        <div className="oppsummeringsliste__element__heading">
                            <Element>{næring.navnPåNæringen}</Element>
                            <div className="høyrestiltTekst">
                                <Normaltekst>
                                    {intlUtils(intl, 'tidsintervall', {
                                        fom: formatDate(ISOStringToDate(næring.tidsperiode.fom)!),
                                        tom: næring.pågående
                                            ? 'pågående'
                                            : formatDate(ISOStringToDate(næring.tidsperiode.tom)!),
                                    })}
                                </Normaltekst>
                            </div>
                        </div>
                        <div className="oppsummeringsliste__element__content">
                            <Næringsdetaljer næring={næring} />
                        </div>
                    </li>
                ))}
            </ul>
        </OppsummeringsPunkt>
    );
};

export default SelvstendigNæringsdrivendeOppsummering;
