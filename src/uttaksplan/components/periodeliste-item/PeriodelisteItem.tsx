import { bemUtils } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/fp-common/node_modules/@navikt/sif-common-formik/lib';
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
    familiehendelsesdato: string;
    handleOnPeriodeChange: (periode: Periode) => void;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
}

const renderPeriodeListeInnhold = (
    periode: Periode,
    familiehendelsesdato: string,
    handleOnPeriodeChange: (periode: Periode) => void,
    stønadskontoer: TilgjengeligStønadskonto[],
    navnPåForeldre: NavnPåForeldre
) => {
    switch (periode.type) {
        case Periodetype.Uttak:
        case Periodetype.Overføring:
        case Periodetype.Opphold:
            return (
                <PeriodeUttakForm
                    periode={periode}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    handleOnPeriodeChange={handleOnPeriodeChange}
                    stønadskontoer={stønadskontoer}
                    navnPåForeldre={navnPåForeldre}
                />
            );
        case Periodetype.Utsettelse:
            return <PeriodeUtsettelseForm />;
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
    handleOnPeriodeChange,
    stønadskontoer,
    navnPåForeldre,
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
                    handleOnPeriodeChange,
                    stønadskontoer,
                    navnPåForeldre
                )}
            </EkspanderbartpanelBase>
        </article>
    );
};

export default PeriodelisteItem;
