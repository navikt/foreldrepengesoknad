import { useIntl } from 'react-intl';

import { Forelder } from '@navikt/fp-common';
import { UttakUtsettelseÅrsak_fpoversikt } from '@navikt/fp-types';
import { getUtsettelseFarge } from '@navikt/fp-utils';

import IconBox from '../icon-box/IconBox';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';

interface Props {
    årsak: UttakUtsettelseÅrsak_fpoversikt;
    forelder: Forelder;
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
// eslint-disable-next-line @typescript-eslint/no-restricted-types
const UtsettelseIkon: React.FunctionComponent<Props> = ({ årsak, forelder }) => {
    const intl = useIntl();

    return (
        <IconBox color={getUtsettelseFarge(forelder)}>
            <UttaksplanIkon
                ikon={getIkonForÅrsak(årsak)}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
                title={intl.formatMessage({ id: `uttaksplan.utsettelsesårsak.${årsak ?? 'ukjent'}` })}
            />
        </IconBox>
    );
};
// eslint-disable-next-line import/no-default-export
export default UtsettelseIkon;
