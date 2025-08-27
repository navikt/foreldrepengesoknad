import { FormattedMessage } from 'react-intl';

import { BodyLong, BodyShort, VStack } from '@navikt/ds-react';

import { FamiliehendelseType } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../../context/UttaksplanDataContext';

interface Props {
    familiehendelseType: FamiliehendelseType;
}

export const FamiliehendelseContent = ({ familiehendelseType }: Props) => {
    const erFarEllerMedmor = notEmpty(useContextGetData(UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR));
    const navnPåForeldre = notEmpty(useContextGetData(UttaksplanContextDataType.NAVN_PÅ_FORELDRE));

    if (familiehendelseType === FamiliehendelseType.TERM) {
        return (
            <BodyShort>
                <FormattedMessage
                    id="uttaksplan.periodeListeContent.familiehendelse.termin"
                    values={{ navnMor: navnPåForeldre.mor, erFarEllerMedmor }}
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
