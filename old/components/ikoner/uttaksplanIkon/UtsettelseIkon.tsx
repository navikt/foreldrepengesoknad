import * as React from 'react';

import UttaksplanIkon, { UttaksplanIkonKeys } from './UttaksplanIkon';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, IntlShape } from 'react-intl';
import { UtsettelseÅrsakType } from 'app/types/uttaksplan/periodetyper';
import { getUtsettelseFarge } from 'app/util/uttaksplan/styleUtils';
import IconBox from './iconBox/IconBox';

export interface Props {
    årsak: UtsettelseÅrsakType;
    gradert?: boolean;
    intl: IntlShape;
}

const getIkonForKonto = (årsak: UtsettelseÅrsakType): UttaksplanIkonKeys => {
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

const UtsettelseIkon: React.FunctionComponent<Props> = ({ årsak, gradert, intl }) => (
    <IconBox color={getUtsettelseFarge()} stripes={gradert}>
        <UttaksplanIkon
            ikon={getIkonForKonto(årsak)}
            title={getMessage(intl, `utsettelsesårsak.${årsak || 'ukjent'}`)}
        />
    </IconBox>
);

export default injectIntl(UtsettelseIkon);
