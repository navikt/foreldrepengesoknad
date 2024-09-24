import { InformationSquareIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack } from '@navikt/ds-react';

import { FamiliehendelseType } from '@navikt/fp-common';

import { UttaksplanContextDataType, useContextGetData } from '../../../context/UttaksplanDataContext';

interface Props {
    familiehendelseType: FamiliehendelseType;
}

const FamiliehendelseContent: FunctionComponent<Props> = ({ familiehendelseType }) => {
    const erFarEllerMedmor = useContextGetData(UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR);

    if (familiehendelseType === FamiliehendelseType.TERM) {
        return (
            <HStack>
                <div style={{ margin: '1rem', display: 'flex', gap: '1rem' }}>
                    <FormattedMessage
                        id="uttaksplan.periodeListeContent.familiehendelse.termin"
                        values={{ erFarEllerMedmor }}
                    />
                </div>
            </HStack>
        );
    }

    if (familiehendelseType === FamiliehendelseType.ADOPSJON) {
        return (
            <HStack>
                <div style={{ margin: '1rem', display: 'flex', gap: '1rem' }}>Adopsjon</div>
            </HStack>
        );
    }

    return (
        <HStack gap={'4'}>
            <div style={{ display: 'flex' }}>
                <div>
                    <InformationSquareIcon width={24} height={24} />
                </div>
                <div
                    style={{
                        marginLeft: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <BodyLong>
                        Mor får 3 uker foreldrepenger som er satt av til å brukes før termin. Hvis barnet blir født før
                        termin, vil man miste dagene av denne perioden, og starte på mødrekvoten av foreldrepengene den
                        dagen barnet blir født.
                    </BodyLong>
                    <BodyLong>
                        Hvis barnet blir født etter termin vil mor bruke noen dager av fellesperioden før fødselen, men
                        starter ikke med mødrekvoten før barnet blir født.
                    </BodyLong>
                </div>
            </div>
        </HStack>
    );
};

export default FamiliehendelseContent;
