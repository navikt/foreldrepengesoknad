import { useIntl } from 'react-intl';

import { Forelder, UtsettelseÅrsakType } from '@navikt/fp-common';
import { getUtsettelseFarge } from '@navikt/fp-utils';

import IconBox from '../icon-box/IconBox';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';

interface Props {
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
