import { StethoscopeIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { InfoboksMedIkon } from '@navikt/fp-ui';

interface Props {
    arbeidssituasjon: Arbeidssituasjon;
}

export const PrematurBarnInnlagtFørTermin = ({ arbeidssituasjon }: Props) => {
    const kunEnPartSkalHa = utledHvemSomHarRett(arbeidssituasjon) !== 'beggeHarRett';

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
