import { formatDate, intlUtils } from '@navikt/fp-common';
import { ISOStringToDate } from 'app/utils/dateUtils';
import useSøknad from 'app/utils/hooks/useSøknad';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';

import AnnenInntektDetaljer from './AnnenInntektDetaljer';
import InntekterTabell from './InntekterTabell';
import { BodyShort } from '@navikt/ds-react';

const AndreInntekterOppsummering: FunctionComponent = () => {
    const intl = useIntl();
    const {
        søker: { harHattAnnenInntektSiste10Mnd, andreInntekterSiste10Mnd },
    } = useSøknad();

    if (!harHattAnnenInntektSiste10Mnd || !andreInntekterSiste10Mnd) {
        return (
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.andreInntekter.tittel')}>
                <BodyShort>{intlUtils(intl, 'oppsummering.andreInntekter.ikkeHattAndreInntekter')}</BodyShort>
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
