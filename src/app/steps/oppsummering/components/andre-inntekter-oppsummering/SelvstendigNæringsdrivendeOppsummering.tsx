import { formatDate, intlUtils } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import useSøknad from 'app/utils/hooks/useSøknad';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import InntekterTabell from './InntekterTabell';
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
            <InntekterTabell
                list={selvstendigNæringsdrivendeInformasjon.map((næring) => ({
                    key: næring.navnPåNæringen + næring.tidsperiode,
                    headerVenstre: næring.navnPåNæringen,
                    headerHøyre: intlUtils(intl, 'tidsintervall', {
                        fom: formatDate(ISOStringToDate(næring.tidsperiode.fom)!),
                        tom: næring.pågående ? 'pågående' : formatDate(ISOStringToDate(næring.tidsperiode.tom)!),
                    }),
                    content: <Næringsdetaljer næring={næring} />,
                }))}
            />
        </OppsummeringsPunkt>
    );
};

export default SelvstendigNæringsdrivendeOppsummering;
