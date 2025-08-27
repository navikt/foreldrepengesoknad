import { useEffect, useState } from 'react';

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
    openAccordions?: boolean;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    handleDeletePeriode: (slettetPeriode: Planperiode) => void;
    handleDeletePerioder: (slettedePerioder: Planperiode[]) => void;
}

export const PeriodeListeItem = ({
    permisjonsperiode,
    erFamiliehendelse,
    handleUpdatePeriode,
    handleDeletePeriode,
    handleDeletePerioder,
    openAccordions,
}: Props) => {
    const bem = planBemUtils('periode-liste-item');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(openAccordions || false);
    }, [openAccordions]);

    return (
        <Accordion.Item open={isOpen}>
            <Accordion.Header
                style={{ flexDirection: 'row-reverse' }}
                className={bem.element('header')}
                onClick={() => setIsOpen(!isOpen)}
            >
                <PeriodeListeHeader permisjonsperiode={permisjonsperiode} erFamiliehendelse={erFamiliehendelse} />
            </Accordion.Header>
            <Accordion.Content>
                <PeriodeListeContent
                    handleUpdatePeriode={handleUpdatePeriode}
                    handleDeletePeriode={handleDeletePeriode}
                    handleDeletePerioder={handleDeletePerioder}
                    erFamiliehendelse={!!erFamiliehendelse}
                    permisjonsperiode={permisjonsperiode}
                />
            </Accordion.Content>
        </Accordion.Item>
    );
};
