import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-common';

import SøkerData from 'app/context/types/SøkerData';

import OppsummeringsPunkt from '../OppsummeringsPunkt';
import InntekterTabell from './InntekterTabell';
import Næringsdetaljer from './Næringsdetaljer';

interface Props {
    søkerData: SøkerData;
}

const SelvstendigNæringsdrivendeOppsummering: FunctionComponent<Props> = ({ søkerData }) => {
    const intl = useIntl();

    if (
        !søkerData.selvstendigNæringsdrivendeInformasjon ||
        !søkerData.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd
    ) {
        return (
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.selvstendigNæringsdrivende.tittel' })}>
                <BodyShort>
                    {intl.formatMessage({
                        id: 'oppsummering.selvstendigNæringsdrivende.ikkeSelvstendigNæringsdrivende',
                    })}
                </BodyShort>
            </OppsummeringsPunkt>
        );
    }

    return (
        <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.selvstendigNæringsdrivende.tittel' })}>
            <InntekterTabell
                list={søkerData.selvstendigNæringsdrivendeInformasjon.map((næring) => ({
                    key: næring.navnPåNæringen + næring.tidsperiode,
                    headerVenstre: næring.navnPåNæringen,
                    headerHøyre: intl.formatMessage(
                        { id: 'tidsintervall' },
                        {
                            fom: formatDate(næring.tidsperiode.fom)!,
                            tom: næring.pågående ? 'pågående' : formatDate(næring.tidsperiode.tom!),
                        },
                    ),
                    content: <Næringsdetaljer næring={næring} />,
                }))}
            />
        </OppsummeringsPunkt>
    );
};

export default SelvstendigNæringsdrivendeOppsummering;
