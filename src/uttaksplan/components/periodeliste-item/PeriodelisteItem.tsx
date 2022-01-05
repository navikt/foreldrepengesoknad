import { bemUtils } from '@navikt/fp-common';
import AnnenForelder from 'app/context/types/AnnenForelder';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import React, { FunctionComponent } from 'react';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import PeriodelisteItemHeader from '../periodeliste-item-header/PeriodelisteItemHeader';
import PeriodeUtsettelseForm from '../uttaks-forms/periode-utsettelse-form/PeriodeUtsettelseForm';
import PeriodeUttakForm from '../uttaks-forms/periode-uttak-form/PeriodeUttakForm';

import './periodelisteItem.less';

interface Props {
    egenPeriode: boolean;
    periode: Periode;
    isOpen: boolean;
    toggleIsOpen: (id: string) => void;
    familiehendelsesdato: Date;
    handleUpdatePeriode: (periode: Periode) => void;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    arbeidsforhold: Arbeidsforhold[];
    handleDeletePeriode: (periodeId: string) => void;
    erFarEllerMedmor: boolean;
}

const renderPeriodeListeInnhold = (
    periode: Periode,
    familiehendelsesdato: Date,
    handleUpdatePeriode: (periode: Periode) => void,
    stønadskontoer: TilgjengeligStønadskonto[],
    navnPåForeldre: NavnPåForeldre,
    annenForelder: AnnenForelder,
    toggleIsOpen: (id: string) => void,
    arbeidsforhold: Arbeidsforhold[],
    handleDeletePeriode: (periodeId: string) => void,
    erFarEllerMedmor: boolean
) => {
    switch (periode.type) {
        case Periodetype.Uttak:
        case Periodetype.Overføring:
        case Periodetype.Opphold:
            return (
                <PeriodeUttakForm
                    periode={periode}
                    familiehendelsesdato={familiehendelsesdato}
                    handleUpdatePeriode={handleUpdatePeriode}
                    stønadskontoer={stønadskontoer}
                    navnPåForeldre={navnPåForeldre}
                    annenForelder={annenForelder}
                    toggleIsOpen={toggleIsOpen}
                    arbeidsforhold={arbeidsforhold}
                    handleDeletePeriode={handleDeletePeriode}
                />
            );
        case Periodetype.Utsettelse:
            return (
                <PeriodeUtsettelseForm
                    periode={periode}
                    familiehendelsesdato={familiehendelsesdato}
                    handleUpdatePeriode={handleUpdatePeriode}
                    erFarEllerMedmor={erFarEllerMedmor}
                    handleDeletePeriode={handleDeletePeriode}
                    toggleIsOpen={toggleIsOpen}
                />
            );
        default:
            return <div>Whatever</div>;
    }
};

const PeriodelisteItem: FunctionComponent<Props> = ({
    egenPeriode,
    periode,
    isOpen,
    toggleIsOpen,
    familiehendelsesdato,
    handleUpdatePeriode,
    stønadskontoer,
    navnPåForeldre,
    annenForelder,
    arbeidsforhold,
    handleDeletePeriode,
    erFarEllerMedmor,
}) => {
    const bem = bemUtils('periodelisteItem');

    return (
        <article className={bem.block}>
            <EkspanderbartpanelBase
                className={bem.element('header')}
                tittel={
                    <PeriodelisteItemHeader
                        egenPeriode={egenPeriode}
                        periode={periode}
                        navnPåForeldre={navnPåForeldre}
                    />
                }
                apen={isOpen}
                onClick={() => toggleIsOpen(periode.id)}
            >
                {renderPeriodeListeInnhold(
                    periode,
                    familiehendelsesdato,
                    handleUpdatePeriode,
                    stønadskontoer,
                    navnPåForeldre,
                    annenForelder,
                    toggleIsOpen,
                    arbeidsforhold,
                    handleDeletePeriode,
                    erFarEllerMedmor
                )}
            </EkspanderbartpanelBase>
        </article>
    );
};

export default PeriodelisteItem;
