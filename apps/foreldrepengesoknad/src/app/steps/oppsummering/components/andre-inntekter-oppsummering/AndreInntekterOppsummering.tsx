import { BodyShort } from '@navikt/ds-react';
import { ISOStringToDate, formatDate } from '@navikt/fp-common';
import SøkerData from 'app/context/types/SøkerData';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import AnnenInntektDetaljer from './AnnenInntektDetaljer';
import InntekterTabell from './InntekterTabell';

interface Props {
    søkerData: SøkerData;
}

const AndreInntekterOppsummering: FunctionComponent<Props> = ({ søkerData }) => {
    const intl = useIntl();

    if (!søkerData.harHattAnnenInntektSiste10Mnd || !søkerData.andreInntekterSiste10Mnd) {
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
                list={søkerData.andreInntekterSiste10Mnd.map((annenInntekt) => ({
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
