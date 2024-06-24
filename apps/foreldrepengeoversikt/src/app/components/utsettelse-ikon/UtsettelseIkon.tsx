import { useIntl } from 'react-intl';

import { getUtsettelseFarge } from '@navikt/fp-utils';

import { Forelder } from 'app/types/Forelder';
import { UtsettelseÅrsakType } from 'app/types/UtsettelseÅrsakType';
import { finnTekstForUtsettelseÅrsak } from 'app/utils/periodeUtils';

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
