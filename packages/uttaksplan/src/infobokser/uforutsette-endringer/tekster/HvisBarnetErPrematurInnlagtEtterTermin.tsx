import { StethoscopeIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { InfoboksMedIkon } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';

export const HvisBarnetErPrematurInnlagtEtterTermin = () => {
    const {
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();

    const erAleneforsørger = rettighetType !== 'BEGGE_RETT';

    return (
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
};
