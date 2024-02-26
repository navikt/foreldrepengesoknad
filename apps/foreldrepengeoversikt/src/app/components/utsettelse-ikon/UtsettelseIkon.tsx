import { intlUtils } from '@navikt/fp-common';

import { useIntl } from 'react-intl';
import IconBox from '../icon-box/IconBox';
import { UtsettelseÅrsakType } from 'app/types/UtsettelseÅrsakType';
import { finnTekstForUtsettelseÅrsak } from 'app/utils/periodeUtils';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';
import { UttaksplanColor } from 'app/types/UttaksplanColor';

export const getUtsettelseFarge = (): UttaksplanColor => {
    return UttaksplanColor.purple;
};

export interface Props {
    årsak: UtsettelseÅrsakType;
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

const UtsettelseIkon: React.FunctionComponent<Props> = ({ årsak }) => {
    const intl = useIntl();

    return (
        <IconBox color={getUtsettelseFarge()}>
            <UttaksplanIkon
                ikon={getIkonForÅrsak(årsak)}
                title={
                    årsak
                        ? finnTekstForUtsettelseÅrsak(intl, årsak)
                        : intlUtils(intl, 'uttaksplan.utsettelsesårsak.ukjent')
                }
            />
        </IconBox>
    );
};

export default UtsettelseIkon;
