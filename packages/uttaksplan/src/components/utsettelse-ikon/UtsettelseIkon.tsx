import { useIntl } from 'react-intl';

import { Forelder, UtsettelseÅrsakType, intlUtils } from '@navikt/fp-common';

import { getUtsettelseFarge } from '../../utils/styleUtils';
import IconBox from '../icon-box/IconBox';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';

export interface Props {
    årsak: UtsettelseÅrsakType;
    forelder: Forelder;
}

const getIkonForÅrsak = (årsak: UtsettelseÅrsakType): UttaksplanIkonKeys => {
    switch (årsak) {
        case UtsettelseÅrsakType.Ferie:
            return UttaksplanIkonKeys.ferie;
        case UtsettelseÅrsakType.Arbeid:
        case UtsettelseÅrsakType.HvØvelse:
        case UtsettelseÅrsakType.NavTiltak:
        case UtsettelseÅrsakType.Fri:
            return UttaksplanIkonKeys.arbeid;
        case UtsettelseÅrsakType.InstitusjonBarnet:
        case UtsettelseÅrsakType.InstitusjonSøker:
        case UtsettelseÅrsakType.Sykdom:
            return UttaksplanIkonKeys.sykdom;
    }
};

const UtsettelseIkon: React.FunctionComponent<Props> = ({ årsak, forelder }) => {
    const intl = useIntl();

    return (
        <IconBox color={getUtsettelseFarge(forelder)}>
            <UttaksplanIkon
                ikon={getIkonForÅrsak(årsak)}
                title={intlUtils(intl, `uttaksplan.utsettelsesårsak.${årsak || 'ukjent'}`)}
            />
        </IconBox>
    );
};

export default UtsettelseIkon;
