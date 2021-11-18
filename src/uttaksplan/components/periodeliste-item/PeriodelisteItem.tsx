import { bemUtils } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/fp-common/node_modules/@navikt/sif-common-formik/lib';
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
}

const renderPeriodeListeInnhold = (periode: Periode, familiehendelsesdato: string) => {
    switch (periode.type) {
        case Periodetype.Uttak:
            return <PeriodeUttakForm periode={periode} familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!} />;
        case Periodetype.Utsettelse:
            return <PeriodeUtsettelseForm />;
        default:
            return <PeriodeUttakForm periode={periode} familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!} />;
    }
};

const PeriodelisteItem: FunctionComponent<Props> = ({
    egenPeriode,
    periode,
    isOpen,
    toggleIsOpen,
    familiehendelsesdato,
}) => {
    const bem = bemUtils('periodelisteItem');

    return (
        <article className={bem.block}>
            <EkspanderbartpanelBase
                className={bem.element('header')}
                tittel={<PeriodelisteItemHeader egenPeriode={egenPeriode} periode={periode} />}
                apen={isOpen}
                onClick={() => toggleIsOpen(periode.id)}
            >
                {renderPeriodeListeInnhold(periode, familiehendelsesdato)}
            </EkspanderbartpanelBase>
        </article>
    );
};

export default PeriodelisteItem;
