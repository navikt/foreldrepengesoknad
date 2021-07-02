import { formatDate, intlUtils } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import useSøknad from 'app/utils/hooks/useSøknad';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';

import AnnenInntektDetaljer from './AnnenInntektDetaljer';
import InntekterTabell from './InntekterTabell';

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
            <InntekterTabell
                list={andreInntekterSiste10Mnd.map((annenInntekt) => ({
                    key: annenInntekt.type + annenInntekt.tidsperiode,
                    headerVenstre: intlUtils(intl, `inntektstype.${annenInntekt.type.toLowerCase()}`),
                    headerHøyre: intlUtils(intl, 'tidsintervall', {
                        fom: formatDate(ISOStringToDate(annenInntekt.tidsperiode.fom)!),
                        tom: annenInntekt.pågående
                            ? 'pågående'
                            : formatDate(ISOStringToDate(annenInntekt.tidsperiode.tom)!),
                    }),
                    content: <AnnenInntektDetaljer annenInntekt={annenInntekt} />,
                }))}
            />
        </OppsummeringsPunkt>
    );
};

export default AndreInntekterOppsummering;
