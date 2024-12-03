import { FormattedMessage } from 'react-intl';

import { Alert } from '@navikt/ds-react';

interface Props {
    annenForeldrerHarRett: boolean;
}

export const SammenhengendeUttakInformasjon = ({ annenForeldrerHarRett }: Props) => {
    return (
        <div style={{ margin: '1rem 0' }}>
            <Alert variant="info">
                {annenForeldrerHarRett && <FormattedMessage id="fordeling.sammenhengendeUttak.info.beggeHarRett" />}
                {!annenForeldrerHarRett && <FormattedMessage id="fordeling.sammenhengendeUttak.info.enHarRett" />}
            </Alert>
        </div>
    );
};
