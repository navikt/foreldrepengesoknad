import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import UtenlandsoppholdPeriodeListe from '../components/utenlandsopphold-periode-liste/UtenlandsoppholdPeriodeListe';
import { UtenlandsoppholdPeriode } from '../types/søknad/Utenlandsopphold';

interface UtenlandsoppholdBolkProps {
    renderSpørsmål: () => JSX.Element;
    showLandContent: boolean;
    oppfølgingsspørsmål: string;
    perioder: UtenlandsoppholdPeriode[];
    onPeriodeLinkClick: (periode: UtenlandsoppholdPeriode) => void;
    onPeriodeTrashClick: (periode: UtenlandsoppholdPeriode) => void;
}

const UtenlandsoppholdBolk = (props: UtenlandsoppholdBolkProps) => {
    const {
        renderSpørsmål,
        showLandContent,
        oppfølgingsspørsmål,
        perioder,
        onPeriodeLinkClick,
        onPeriodeTrashClick
    } = props;

    return (
        <div className="countryPicker">
            {renderSpørsmål()}
            {showLandContent && (
                <React.Fragment>
                    <label htmlFor="">{oppfølgingsspørsmål}</label>
                    <UtenlandsoppholdPeriodeListe
                        perioder={perioder}
                        onPeriodeLinkClick={(
                            periode: UtenlandsoppholdPeriode
                        ) => onPeriodeLinkClick(periode)}
                        onPeriodeTrashClick={(
                            periode: UtenlandsoppholdPeriode
                        ) => onPeriodeTrashClick(periode)}
                    />
                    <Knapp>Legg til land</Knapp>
                </React.Fragment>
            )}
        </div>
    );
};

export default UtenlandsoppholdBolk;
