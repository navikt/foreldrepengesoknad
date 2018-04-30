import * as React from 'react';
import { UtenlandsoppholdData } from '../../../types/søknad/Søknad';

export interface Props {
    utenlandsopphold: UtenlandsoppholdData[];
    onVis: (opphold: UtenlandsoppholdData) => void;
    onFjern: (opphold: UtenlandsoppholdData) => void;
}

const UtenlandsoppholdListe: React.StatelessComponent<Props> = ({
    utenlandsopphold,
    onVis,
    onFjern
}) => {
    if (utenlandsopphold.length === 0) {
        return null;
    }
    return (
        <ol>
            {utenlandsopphold.map((opphold, index) => (
                <li key={index}>
                    {opphold.landkode}
                    <button type="button" onClick={() => onVis(opphold)}>
                        Endre
                    </button>
                    <button type="button" onClick={() => onFjern(opphold)}>
                        Slett
                    </button>
                </li>
            ))}
        </ol>
    );
};

export default UtenlandsoppholdListe;
