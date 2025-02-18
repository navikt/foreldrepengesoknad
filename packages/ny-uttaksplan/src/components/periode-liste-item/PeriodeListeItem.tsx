import { Accordion } from '@navikt/ds-react';

import { planBemUtils } from '../../planBemUtils';
import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import { PeriodeListeContent } from '../periode-liste-content/PeriodeListeContent';
import { PeriodeListeHeader } from '../periode-liste-header/PeriodeListeHeader';
import './periode-liste-item.css';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    erFamiliehendelse?: boolean;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    handleDeletePeriode: (slettetPeriode: Planperiode) => void;
}

export const PeriodeListeItem = ({
    permisjonsperiode,
    erFamiliehendelse,
    handleUpdatePeriode,
    handleDeletePeriode,
}: Props) => {
    const bem = planBemUtils('periode-liste-item');

    return (
        <Accordion.Item>
            <Accordion.Header style={{ flexDirection: 'row-reverse' }} className={bem.element('header')}>
                <PeriodeListeHeader permisjonsperiode={permisjonsperiode} erFamiliehendelse={erFamiliehendelse} />
            </Accordion.Header>
            <Accordion.Content>
                <PeriodeListeContent
                    handleUpdatePeriode={handleUpdatePeriode}
                    handleDeletePeriode={handleDeletePeriode}
                    erFamiliehendelse={!!erFamiliehendelse}
                    permisjonsperiode={permisjonsperiode}
                />
            </Accordion.Content>
        </Accordion.Item>
    );
};
