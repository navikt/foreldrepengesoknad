import React, { FunctionComponent, useState } from 'react';
import { bemUtils } from '@navikt/fp-common';
import PeriodelisteItem from './../periodeliste-item/PeriodelisteItem';
import { isInfoPeriode, Periode } from 'uttaksplan/types/Periode';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';

import './periodeliste.less';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import AnnenForelder from 'app/context/types/AnnenForelder';

interface Props {
    uttaksplan: Periode[];
    familiehendelsesdato: string;
    handleOnPeriodeChange: (periode: Periode) => void;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
}

const Periodeliste: FunctionComponent<Props> = ({
    uttaksplan,
    familiehendelsesdato,
    handleOnPeriodeChange,
    stønadskontoer,
    navnPåForeldre,
    annenForelder,
}) => {
    const [openPeriodeId, setOpenPeriodeId] = useState<string>(null!);
    const bem = bemUtils('periodeliste');

    const toggleIsOpen = (id: string) => {
        if (openPeriodeId === id) {
            setOpenPeriodeId(null!);
        } else {
            setOpenPeriodeId(id);
        }
    };

    return (
        <div className={bem.block}>
            {uttaksplan.map((p) => (
                <PeriodelisteItem
                    key={p.id}
                    egenPeriode={!isInfoPeriode(p)}
                    periode={p}
                    isOpen={openPeriodeId === p.id}
                    toggleIsOpen={toggleIsOpen}
                    familiehendelsesdato={familiehendelsesdato}
                    handleOnPeriodeChange={handleOnPeriodeChange}
                    stønadskontoer={stønadskontoer}
                    navnPåForeldre={navnPåForeldre}
                    annenForelder={annenForelder}
                />
            ))}
        </div>
    );
};

export default Periodeliste;
