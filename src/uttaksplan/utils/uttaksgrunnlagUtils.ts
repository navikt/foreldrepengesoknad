import { UttaksplanRequiredProps } from 'uttaksplan/uttak/types';

export function getErDeltPermisjon(props: UttaksplanRequiredProps): boolean {
    if (!props.annenForelder) {
        return false;
    }
    return true;
}
