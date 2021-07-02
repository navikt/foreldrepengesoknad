import { formatDate, intlUtils } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import useSøknad from 'app/utils/hooks/useSøknad';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';

import './frilansOppsummering.less';
import AnnenInntektDetaljer from './AnnenInntektDetaljer';

const AndreInntekterOppsummering: FunctionComponent = () => {
    const intl = useIntl();
    const {
        søker: { harHattAnnenInntektSiste10Mnd, andreInntekterSiste10Mnd },
    } = useSøknad();

    if (!harHattAnnenInntektSiste10Mnd || !andreInntekterSiste10Mnd) {
        return (
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.andreInntekter.tittel')}>
                <Normaltekst>{intlUtils(intl, 'oppsummering.andreInntekter.ikkeHattAndreInntekter')}</Normaltekst>
            </OppsummeringsPunkt>
        );
    }

    return (
        <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.andreInntekter.tittel')}>
            <ul className="oppsummeringsliste">
                {andreInntekterSiste10Mnd.map((annenInntekt) => (
                    <li key={annenInntekt.type + annenInntekt.tidsperiode} className="oppsummeringsliste__element">
                        <div className="oppsummeringsliste__element__heading">
                            <Element>{intlUtils(intl, `inntektstype.${annenInntekt.type.toLowerCase()}`)}</Element>
                            <div className="høyrestiltTekst">
                                <Normaltekst>
                                    {intlUtils(intl, 'tidsintervall', {
                                        fom: formatDate(ISOStringToDate(annenInntekt.tidsperiode.fom)!),
                                        tom: annenInntekt.pågående
                                            ? 'pågående'
                                            : formatDate(ISOStringToDate(annenInntekt.tidsperiode.tom)!),
                                    })}
                                </Normaltekst>
                            </div>
                        </div>
                        <div className="oppsummeringsliste__element__content">
                            <AnnenInntektDetaljer annenInntekt={annenInntekt} />
                        </div>
                    </li>
                ))}
            </ul>
        </OppsummeringsPunkt>
    );
};

export default AndreInntekterOppsummering;
