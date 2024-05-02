import { useIntl } from 'react-intl';

import { PeriodeColor } from '@navikt/fp-constants';

import { UtsettelseÅrsakType } from 'app/types/UtsettelseÅrsakType';
import { finnTekstForUtsettelseÅrsak } from 'app/utils/periodeUtils';

import IconBox from '../icon-box/IconBox';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';

export const getUtsettelseFarge = (): PeriodeColor => {
    return PeriodeColor.PURPLE;
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
                        : intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.ukjent' })
                }
            />
        </IconBox>
    );
};

export default UtsettelseIkon;
