import { Block } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { GuidePanel } from '@navikt/ds-react';

interface Props {
    navnMor: string;
}

const MorErForSykDokumentasjonOpplastning: FunctionComponent<Props> = ({ navnMor }) => {
    return (
        <Block padBottom="l">
            <GuidePanel>
                <FormattedMessage id="uttaksplan.erMorForSykVeileder" values={{ navn: navnMor }} />
            </GuidePanel>
        </Block>
    );
};

export default MorErForSykDokumentasjonOpplastning;
