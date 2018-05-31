import * as React from 'react';

import { UtenlandsoppholdPeriode } from '../../types/søknad/Utenlandsopphold';
import UtenlandsoppholdPeriodeListeElement from '../utenlandsopphold-periode-liste-element/UtenlandsoppholdPeriodeListeElement';

interface UtenlandsoppholdPeriodeListeProps {
    perioder: UtenlandsoppholdPeriode[];
    onPeriodeLinkClick: (
        periode: UtenlandsoppholdPeriode,
        index: number
    ) => void;
    onPeriodeTrashClick: (
        periode: UtenlandsoppholdPeriode,
        index: number
    ) => void;
}

const UtenlandsoppholdPeriodeListe: React.StatelessComponent<
    UtenlandsoppholdPeriodeListeProps
> = (props) => {
    const { perioder } = props;
    if (perioder.length > 0) {
        const { onPeriodeLinkClick, onPeriodeTrashClick } = props;
        return (
            <ul className="countryList">
                {props.perioder.map((periode, index) => (
                    <UtenlandsoppholdPeriodeListeElement
                        key={index}
                        periode={periode}
                        onLinkClick={() => onPeriodeLinkClick(periode, index)}
                        onTrashClick={() => onPeriodeTrashClick(periode, index)}
                    />
                ))}
            </ul>
        );
    }
    return null;
};

export default UtenlandsoppholdPeriodeListe;
