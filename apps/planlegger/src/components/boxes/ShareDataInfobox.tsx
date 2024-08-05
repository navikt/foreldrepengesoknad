import { BookmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { Infobox } from '@navikt/fp-ui';

const ShareDataInfobox: React.FunctionComponent = () => (
    <Infobox
        header={<FormattedMessage id="OmPlanleggerenSteg.TaVarePåHeader" />}
        color="gray"
        icon={<BookmarkIcon aria-hidden height={24} width={24} />}
    >
        <BodyShort>
            <FormattedMessage id="OmPlanleggerenSteg.TaVarePå" />
        </BodyShort>
    </Infobox>
);

export default ShareDataInfobox;
