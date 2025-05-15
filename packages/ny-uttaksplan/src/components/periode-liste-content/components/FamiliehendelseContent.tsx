import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack } from '@navikt/ds-react';

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
            <HStack>
                <div style={{ margin: '1rem', display: 'flex', gap: '1rem' }}>
                    <FormattedMessage
                        id="uttaksplan.periodeListeContent.familiehendelse.termin"
                        values={{ navnMor: navnPåForeldre.mor, erFarEllerMedmor }}
                    />
                </div>
            </HStack>
        );
    }

    if (familiehendelseType === FamiliehendelseType.ADOPSJON) {
        return (
            <HStack>
                <div style={{ margin: '1rem', display: 'flex', gap: '1rem' }}>
                    <FormattedMessage id="uttaksplan.periodeListeContent.familiehendelse.adopsjon" />
                </div>
            </HStack>
        );
    }

    return (
        <HStack gap={'4'}>
            <div style={{ display: 'flex' }}>
                <div
                    style={{
                        marginLeft: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <BodyLong>
                        <FormattedMessage id="uttaksplan.periodeListeContent.familiehendelse.fødsel1" />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage id="uttaksplan.periodeListeContent.familiehendelse.fødsel2" />
                    </BodyLong>
                </div>
            </div>
        </HStack>
    );
};
