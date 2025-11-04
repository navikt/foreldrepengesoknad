import { useIntl } from 'react-intl';

import { BrukerRolleSak_fpoversikt, UtsettelsesÅrsak } from '@navikt/fp-types';
import { getUtsettelseFarge } from '@navikt/fp-utils';

import IconBox from '../icon-box/IconBox';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';

interface Props {
    årsak: UtsettelsesÅrsak;
    forelder: BrukerRolleSak_fpoversikt;
}

const getIkonForÅrsak = (årsak: UtsettelsesÅrsak): UttaksplanIkonKeys => {
    switch (årsak) {
        case 'LOVBESTEMT_FERIE':
            return UttaksplanIkonKeys.ferie;
        case 'ARBEID':
        case 'HV_OVELSE':
        case 'NAV_TILTAK':
        case 'FRI':
            return UttaksplanIkonKeys.arbeid;
        case 'INSTITUSJONSOPPHOLD_BARNET':
        case 'INSTITUSJONSOPPHOLD_SØKER':
        case 'SYKDOM':
            return UttaksplanIkonKeys.sykdom;
    }
};
// eslint-disable-next-line @typescript-eslint/no-restricted-types
const UtsettelseIkon: React.FunctionComponent<Props> = ({ årsak, forelder }) => {
    const intl = useIntl();

    return (
        <IconBox color={getUtsettelseFarge(forelder)}>
            <UttaksplanIkon
                ikon={getIkonForÅrsak(årsak)}
                title={intl.formatMessage({ id: `uttaksplan.utsettelsesårsak.${årsak ?? 'ukjent'}` })}
            />
        </IconBox>
    );
};
// eslint-disable-next-line import/no-default-export
export default UtsettelseIkon;
