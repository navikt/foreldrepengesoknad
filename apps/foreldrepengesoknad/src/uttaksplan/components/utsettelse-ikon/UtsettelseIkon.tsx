import { intlUtils } from '@navikt/fp-common';
import React from 'react';
import { useIntl } from 'react-intl';
import { getUtsettelseFarge } from 'uttaksplan/utils/styleUtils';
import IconBox from '../icon-box/IconBox';
import UttaksplanIkon, { UttaksplanIkonKeys } from '../uttaksplan-ikon/UttaksplanIkon';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';

export interface Props {
    årsak: UtsettelseÅrsakType;
    gradert?: boolean;
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

const UtsettelseIkon: React.FunctionComponent<Props> = ({ årsak, gradert }) => {
    const intl = useIntl();

    return (
        <IconBox color={getUtsettelseFarge()} stripes={gradert}>
            <UttaksplanIkon
                ikon={getIkonForKonto(årsak)}
                title={intlUtils(intl, `uttaksplan.utsettelsesårsak.${årsak || 'ukjent'}`)}
            />
        </IconBox>
    );
};

export default UtsettelseIkon;
