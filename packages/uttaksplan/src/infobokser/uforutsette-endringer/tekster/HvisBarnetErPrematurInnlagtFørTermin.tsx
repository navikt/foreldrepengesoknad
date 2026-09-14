import { StethoscopeIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { InfoboksMedIkon } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';

export const HvisBarnetErPrematurInnlagtFørTermin = () => {
    const {
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();

    const kunEnPartSkalHa = rettighetType !== 'BEGGE_RETT';

    return (
        <InfoboksMedIkon
            icon={StethoscopeIcon}
            tittel={<FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.PrematurBarnInnlagtFørTermin" />}
        >
            <FormattedMessage
                id="UforutsetteEndringer.UforutsetteEndringer.PrematurBarnInnlagtFørTermin.Tekst"
                values={{ erAleneforsørger: kunEnPartSkalHa }}
            />
        </InfoboksMedIkon>
    );
};
