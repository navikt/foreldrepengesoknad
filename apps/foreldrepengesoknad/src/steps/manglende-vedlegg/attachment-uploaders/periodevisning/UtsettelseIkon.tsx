import { useIntl } from 'react-intl';

import { Box } from '@navikt/ds-react';

import { BrukerRolleSak_fpoversikt, UttakUtsettelseÅrsak_fpoversikt } from '@navikt/fp-types';

import { UttaksplanIkon, UttaksplanIkonKeys } from './UttaksplanIkon';

interface Props {
    årsak: UttakUtsettelseÅrsak_fpoversikt;
    forelder: BrukerRolleSak_fpoversikt;
}

const getIkonForÅrsak = (årsak: UttakUtsettelseÅrsak_fpoversikt): UttaksplanIkonKeys => {
    switch (årsak) {
        case 'LOVBESTEMT_FERIE':
            return UttaksplanIkonKeys.ferie;
        case 'ARBEID':
        case 'HV_ØVELSE':
        case 'NAV_TILTAK':
        case 'FRI':
            return UttaksplanIkonKeys.arbeid;
        case 'BARN_INNLAGT':
        case 'SØKER_INNLAGT':
        case 'SØKER_SYKDOM':
            return UttaksplanIkonKeys.sykdom;
    }
};

export const UtsettelseIkon = ({ årsak, forelder }: Props) => {
    const intl = useIntl();

    return (
        <Box
            background={forelder === 'FAR_MEDMOR' ? 'info-strong' : 'meta-lime-strong'}
            borderRadius="full"
            padding="space-4"
            width="fit-content"
        >
            <UttaksplanIkon
                ikon={getIkonForÅrsak(årsak)}
                title={intl.formatMessage({ id: `uttaksplan.utsettelsesårsak.${årsak ?? 'ukjent'}` })}
            />
        </Box>
    );
};
