import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

export const PrematurukerContent = () => {
    return (
        <>
            <BodyShort weight="semibold">
                <FormattedMessage id="uttaksplan.periodeListeContent.prematuruker1" />
            </BodyShort>
            <BodyShort>
                <FormattedMessage id="uttaksplan.periodeListeContent.prematuruker2" />
            </BodyShort>
            <BodyShort>
                <FormattedMessage id="uttaksplan.periodeListeContent.prematuruker3" />
            </BodyShort>
        </>
    );
};
