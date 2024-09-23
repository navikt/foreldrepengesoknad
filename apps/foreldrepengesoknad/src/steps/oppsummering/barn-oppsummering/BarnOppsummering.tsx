import { FormattedMessage } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { Barn, BarnType } from '@navikt/fp-common';
import { isAdoptertBarn } from '@navikt/fp-types';

import { BarnAdoptertOppsummering } from './BarnAdoptertOppsummering';
import { BarnFødselOppsummering } from './BarnFødselOppsummering';

interface Props {
    barn: Barn;
    onVilEndreSvar: () => void;
}

export const BarnOppsummering = ({ barn, onVilEndreSvar }: Props) => {
    if (barn.type === BarnType.IKKE_UTFYLT) {
        return null;
    }

    const erBarnetAdoptert = isAdoptertBarn(barn);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="BarnOppsummering.tittel" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                {!erBarnetAdoptert && <BarnFødselOppsummering barn={barn} />}
                {erBarnetAdoptert && <BarnAdoptertOppsummering barn={barn} />}
            </FormSummary.Answers>
        </FormSummary>
    );
};
