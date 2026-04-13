import { FormattedMessage } from 'react-intl';

import { BodyLong, BodyShort, VStack } from '@navikt/ds-react';

import { Barn, isAdoptertBarn, isUfødtBarn } from '@navikt/fp-types';

import { useUttaksplanData } from '../../../../context/UttaksplanDataContext';

interface Props {
    barn: Barn;
}

export const FamiliehendelseContent = ({ barn }: Props) => {
    const {
        foreldreInfo: { navnPåForeldre, søker },
    } = useUttaksplanData();

    if (isUfødtBarn(barn)) {
        return (
            <BodyShort>
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.familiehendelse.termin"
                    values={{ navnMor: navnPåForeldre.mor, erFarEllerMedmor: søker === 'FAR_MEDMOR' }}
                />
            </BodyShort>
        );
    }

    if (isAdoptertBarn(barn)) {
        return (
            <BodyShort>
                <FormattedMessage id="uttaksplan.periodeListeContent.familiehendelse.adopsjon" />
            </BodyShort>
        );
    }

    return (
        <VStack gap="space-16">
            <BodyLong>
                <FormattedMessage id="uttaksplan.periodeListeContent.familiehendelse.fødsel1" />
            </BodyLong>
            <BodyLong>
                <FormattedMessage id="uttaksplan.periodeListeContent.familiehendelse.fødsel2" />
            </BodyLong>
        </VStack>
    );
};
