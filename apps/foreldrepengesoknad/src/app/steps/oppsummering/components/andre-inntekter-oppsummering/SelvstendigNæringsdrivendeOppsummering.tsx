import { formatDate, intlUtils } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import InntekterTabell from './InntekterTabell';
import Næringsdetaljer from './Næringsdetaljer';
import { BodyShort } from '@navikt/ds-react';
import Søker from 'app/context/types/Søker';

interface Props {
    søker: Søker;
}

const SelvstendigNæringsdrivendeOppsummering: FunctionComponent<Props> = ({ søker }) => {
    const intl = useIntl();

    if (!søker.selvstendigNæringsdrivendeInformasjon || !søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd) {
        return (
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.tittel')}>
                <BodyShort>
                    {intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.ikkeSelvstendigNæringsdrivende')}
                </BodyShort>
            </OppsummeringsPunkt>
        );
    }

    return (
        <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.tittel')}>
            <InntekterTabell
                list={søker.selvstendigNæringsdrivendeInformasjon.map((næring) => ({
                    key: næring.navnPåNæringen + næring.tidsperiode,
                    headerVenstre: næring.navnPåNæringen,
                    headerHøyre: intlUtils(intl, 'tidsintervall', {
                        fom: formatDate(næring.tidsperiode.fom)!,
                        tom: næring.pågående ? 'pågående' : formatDate(næring.tidsperiode.tom!),
                    }),
                    content: <Næringsdetaljer næring={næring} />,
                }))}
            />
        </OppsummeringsPunkt>
    );
};

export default SelvstendigNæringsdrivendeOppsummering;
