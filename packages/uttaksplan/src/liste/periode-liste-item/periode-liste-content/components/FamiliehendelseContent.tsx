import { FormattedMessage } from 'react-intl';

import { BodyLong, BodyShort, VStack } from '@navikt/ds-react';

import { Barn, isAdoptertBarn, isUfødtBarn } from '@navikt/fp-types';

import { useUttaksplanData } from '../../../../context/UttaksplanDataContext';

interface Props {
    barn: Barn;
}

export const FamiliehendelseContent = ({ barn }: Props) => {
    const {
        foreldreInfo: { navnPåForeldre, søker, rettighetType },
    } = useUttaksplanData();

    const harBareSøkerRett = rettighetType === 'BARE_SØKER_RETT';
    const erFarEllerMedmor = søker === 'FAR_MEDMOR';
    const kunFarEllerMedmorHarRett = harBareSøkerRett && erFarEllerMedmor;

    if (isUfødtBarn(barn)) {
        return (
            <BodyShort>
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.familiehendelse.termin"
                    values={{ navnMor: navnPåForeldre.mor, erFarEllerMedmor: erFarEllerMedmor }}
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

    if (kunFarEllerMedmorHarRett) {
        return (
            <BodyShort>
                <FormattedMessage id="uttaksplan.periodeListeContent.familiehendelse.bareFarMedmorHarRett" />
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
