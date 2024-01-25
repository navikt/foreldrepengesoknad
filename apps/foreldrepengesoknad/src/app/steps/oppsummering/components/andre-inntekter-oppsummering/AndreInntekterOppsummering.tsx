import { BodyShort } from '@navikt/ds-react';
import { ISOStringToDate, formatDate } from '@navikt/fp-common';
import Søker from 'app/context/types/Søker';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import AnnenInntektDetaljer from './AnnenInntektDetaljer';
import InntekterTabell from './InntekterTabell';

interface Props {
    søker: Søker;
}

const AndreInntekterOppsummering: FunctionComponent<Props> = ({ søker }) => {
    const intl = useIntl();

    if (!søker.harHattAnnenInntektSiste10Mnd || !søker.andreInntekterSiste10Mnd) {
        return (
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.andreInntekter.tittel' })}>
                <BodyShort>
                    <FormattedMessage id="oppsummering.andreInntekter.ikkeHattAndreInntekter" />
                </BodyShort>
            </OppsummeringsPunkt>
        );
    }

    return (
        <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.andreInntekter.tittel' })}>
            <InntekterTabell
                list={søker.andreInntekterSiste10Mnd.map((annenInntekt) => ({
                    key: annenInntekt.type + annenInntekt.tidsperiode,
                    headerVenstre: intl.formatMessage({ id: `inntektstype.${annenInntekt.type.toLowerCase()}` }),
                    headerHøyre: intl.formatMessage(
                        { id: 'tidsintervall' },
                        {
                            fom: formatDate(ISOStringToDate(annenInntekt.tidsperiode.fom)!),
                            tom: annenInntekt.pågående
                                ? 'pågående'
                                : formatDate(ISOStringToDate(annenInntekt.tidsperiode.tom)!),
                        },
                    ),
                    content: <AnnenInntektDetaljer annenInntekt={annenInntekt} />,
                }))}
            />
        </OppsummeringsPunkt>
    );
};

export default AndreInntekterOppsummering;
