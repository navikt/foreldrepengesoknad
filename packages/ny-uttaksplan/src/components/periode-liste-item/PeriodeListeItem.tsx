import { useEffect, useState } from 'react';

import { VStack } from '@navikt/ds-react';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import { PeriodeListeContent } from '../periode-liste-content/PeriodeListeContent';
import { PeriodeListeHeader } from '../periode-liste-header/PeriodeListeHeader';
import { getBorderFarge } from '../periode-liste-header/PeriodeListeHeaderUtils';

interface Props {
    isReadOnly: boolean;
    permisjonsperiode: Permisjonsperiode;
    erFamiliehendelse?: boolean;
    handleAddPeriode: (oppdatertPeriode: Planperiode) => void;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    handleDeletePeriode: (slettetPeriode: Planperiode) => void;
    handleDeletePerioder: (slettedePerioder: Planperiode[]) => void;
    isAllAccordionsOpen?: boolean;
}

export const PeriodeListeItem = ({
    isReadOnly,
    permisjonsperiode,
    erFamiliehendelse,
    handleUpdatePeriode,
    handleDeletePeriode,
    handleDeletePerioder,
    handleAddPeriode,
    isAllAccordionsOpen,
}: Props) => {
    const [erPeriodeInnholdÅpen, setErPeriodeInnholdÅpen] = useState(false);

    const borderFarge = getBorderFarge(permisjonsperiode, erFamiliehendelse);

    // Sync local state with global accordion state
    useEffect(() => {
        if (isAllAccordionsOpen !== undefined) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- TODO (TOR) - Skriv om dette
            setErPeriodeInnholdÅpen(isAllAccordionsOpen);
        }
    }, [isAllAccordionsOpen]);

    return (
        <VStack gap="0" className="border-ax-neutral-100 cursor-pointer border-t-1 border-b-1">
            <div
                className={`hover:bg-ax-accent-300 border-l-8 pt-4 pb-4 select-none ${borderFarge}`}
                onClick={() => setErPeriodeInnholdÅpen(!erPeriodeInnholdÅpen)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setErPeriodeInnholdÅpen((prev) => !prev);
                    }
                }}
            >
                <PeriodeListeHeader
                    isOpen={erPeriodeInnholdÅpen}
                    permisjonsperiode={permisjonsperiode}
                    erFamiliehendelse={erFamiliehendelse}
                />
            </div>
            <div
                className={`overflow-hidden transition-all duration-250 ${
                    erPeriodeInnholdÅpen ? 'opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div
                    // eslint-disable-next-line
                    className={`border-l-8 pt-10 pr-10 pb-10 pl-10 has-[div[data-panel='endre-periode']]:pt-0 has-[div[data-panel='slett-periode']]:pt-0 ${borderFarge}`}
                >
                    <PeriodeListeContent
                        isReadOnly={isReadOnly}
                        handleUpdatePeriode={handleUpdatePeriode}
                        handleDeletePeriode={handleDeletePeriode}
                        handleDeletePerioder={handleDeletePerioder}
                        handleAddPeriode={handleAddPeriode}
                        erFamiliehendelse={!!erFamiliehendelse}
                        permisjonsperiode={permisjonsperiode}
                    />
                </div>
            </div>
        </VStack>
    );
};
