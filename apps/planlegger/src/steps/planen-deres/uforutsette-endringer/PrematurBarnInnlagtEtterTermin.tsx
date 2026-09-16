import { StethoscopeIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { InfoboksMedIkon } from '@navikt/fp-ui';

interface Props {
    erAleneforsørger: boolean;
}

export const PrematurBarnInnlagtEtterTermin = ({ erAleneforsørger }: Props) => (
    <InfoboksMedIkon
        icon={StethoscopeIcon}
        tittel={<FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.PrematurBarnInnlagtEtterTermin" />}
    >
        <FormattedMessage
            id="UforutsetteEndringer.UforutsetteEndringer.PrematurBarnInnlagtEtterTermin.Tekst"
            values={{ erAleneforsørger }}
        />
    </InfoboksMedIkon>
);
