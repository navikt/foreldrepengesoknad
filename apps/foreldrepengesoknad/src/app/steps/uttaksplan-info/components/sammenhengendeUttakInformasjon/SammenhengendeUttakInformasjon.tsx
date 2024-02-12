import { Alert } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';

interface Props {
    annenForeldrerHarRett: boolean;
}
const SammenhengendeUttakInformasjon: React.FunctionComponent<Props> = ({ annenForeldrerHarRett }) => {
    return (
        <Block padBottom="l">
            <Alert variant="info">
                {annenForeldrerHarRett && <FormattedMessage id="fordeling.sammenhengendeUttak.info.beggeHarRett" />}
                {!annenForeldrerHarRett && <FormattedMessage id="fordeling.sammenhengendeUttak.info.enHarRett" />}
            </Alert>
        </Block>
    );
};

export default SammenhengendeUttakInformasjon;
