import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Søker from '../../../../../types/søknad/Søker';
import Oppsummeringsseksjon from 'app/steg/oppsummering/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import Feltoppsummering from 'app/steg/oppsummering/components/feltoppsummering/Feltoppsummering';
import AndreInntekterOppsummeringsliste from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/lister/AndreInntekterOppsummeringsliste';

interface AndreInntekterOppsummeringProps {
    søker: Søker;
}

type Props = AndreInntekterOppsummeringProps;

const AndreInntekterOppsummering = ({ søker }: Props) => {
    const { harHattAnnenInntektSiste10Mnd, andreInntekterSiste10Mnd } = søker;
    const intl = useIntl();

    if (andreInntekterSiste10Mnd && harHattAnnenInntektSiste10Mnd) {
        return (
            <Oppsummeringsseksjon tittel={getMessage(intl, 'oppsummering.andreInntekter.tittel')}>
                <AndreInntekterOppsummeringsliste andreInntekter={andreInntekterSiste10Mnd} />
            </Oppsummeringsseksjon>
        );
    }

    return (
        <Oppsummeringsseksjon>
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.andreInntekter.tittel')}
                verdi={getMessage(intl, 'oppsummering.andreInntekter.ikkeHattAndreInntekter')}
            />
        </Oppsummeringsseksjon>
    );
};

export default AndreInntekterOppsummering;
