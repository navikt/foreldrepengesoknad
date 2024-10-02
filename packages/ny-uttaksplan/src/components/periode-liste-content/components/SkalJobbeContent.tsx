import { BriefcaseIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import Permisjonsperiode from '../../../types/Permisjonsperiode';
import { isHull, isOppholdsperiode, isUttaksperiode } from '../../../utils/periodeUtils';

interface Props {
    permisjonsperiode: Permisjonsperiode;
}

export const SkalJobbeContent = ({ permisjonsperiode }: Props) => {
    const erUtsettelse = !!permisjonsperiode.erUtsettelse;
    const erPeriodeUtenUttak = !!permisjonsperiode.erPeriodeUtenUttak;
    const samtidigUttak = !!permisjonsperiode.samtidigUttak;
    const erOpphold = permisjonsperiode.perioder.find((p) => isOppholdsperiode(p)) !== undefined;
    const erHull = permisjonsperiode.perioder.find((p) => isHull(p)) !== undefined;
    const skalJobbeIPermisjonsperioden =
        permisjonsperiode.perioder.find((p) => {
            if (isUttaksperiode(p) && p.gradering !== undefined) {
                return p;
            }

            return undefined;
        }) !== undefined;

    if (erUtsettelse || skalJobbeIPermisjonsperioden || erOpphold || erPeriodeUtenUttak || samtidigUttak || erHull) {
        return null;
    }
    return (
        <div style={{ margin: '0.5rem 0', display: 'flex' }}>
            <div>
                <BriefcaseIcon width={24} height={24} />
            </div>
            <div>
                <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                    <BodyShort>
                        <FormattedMessage id="uttaksplan.periodeListeContent.skalIkkeJobbe" />
                    </BodyShort>
                </div>
            </div>
        </div>
    );
};
