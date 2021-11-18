import React, { FunctionComponent, useState } from 'react';
import { bemUtils } from '@navikt/fp-common';
import PeriodelisteItem from './../periodeliste-item/PeriodelisteItem';
import { isInfoPeriode, Periode } from 'uttaksplan/types/Periode';

import './periodeliste.less';

interface Props {
    uttaksplan: Periode[];
    familiehendelsesdato: string;
}

const Periodeliste: FunctionComponent<Props> = ({ uttaksplan, familiehendelsesdato }) => {
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
                />
            ))}
        </div>
    );
};

export default Periodeliste;
