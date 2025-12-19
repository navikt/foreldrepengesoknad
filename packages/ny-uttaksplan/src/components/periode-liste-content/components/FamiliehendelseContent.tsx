import { FormattedMessage } from 'react-intl';

import { BodyLong, BodyShort, VStack } from '@navikt/ds-react';

import { FamiliehendelseType } from '@navikt/fp-common';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';

interface Props {
    familiehendelseType: FamiliehendelseType;
}

export const FamiliehendelseContent = ({ familiehendelseType }: Props) => {
    const {
        foreldreInfo: { navnPåForeldre, søker },
    } = useUttaksplanData();

    if (familiehendelseType === FamiliehendelseType.TERM) {
        return (
            <BodyShort>
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.familiehendelse.termin"
                    values={{ navnMor: navnPåForeldre.mor, erFarEllerMedmor: søker === 'FAR_ELLER_MEDMOR' }}
                />
            </BodyShort>
        );
    }

    if (familiehendelseType === FamiliehendelseType.ADOPSJON) {
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
