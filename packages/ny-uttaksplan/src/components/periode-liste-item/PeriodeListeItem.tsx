import { useEffect, useState } from 'react';

import { VStack } from '@navikt/ds-react';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import { PeriodeListeContent } from '../periode-liste-content/PeriodeListeContent';
import { PeriodeListeHeader } from '../periode-liste-header/PeriodeListeHeader';
import { getBorderFarge } from '../periode-liste-header/PeriodeListeHeaderUtils';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    erFamiliehendelse?: boolean;
    handleAddPeriode: (oppdatertPeriode: Planperiode) => void;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    handleDeletePeriode: (slettetPeriode: Planperiode) => void;
    handleDeletePerioder: (slettedePerioder: Planperiode[]) => void;
    isAllAccordionsOpen?: boolean;
    erMedmorDelAvSøknaden: boolean;
}

export const PeriodeListeItem = ({
    permisjonsperiode,
    erFamiliehendelse,
    handleUpdatePeriode,
    handleDeletePeriode,
    handleDeletePerioder,
    handleAddPeriode,
    isAllAccordionsOpen,
    erMedmorDelAvSøknaden,
}: Props) => {
    const [erPeriodeInnholdÅpen, setErPeriodeInnholdÅpen] = useState(false);

    const borderFarge = getBorderFarge(permisjonsperiode, erFamiliehendelse);

    // Sync local state with global accordion state
    useEffect(() => {
        if (isAllAccordionsOpen !== undefined) {
            setErPeriodeInnholdÅpen(isAllAccordionsOpen);
        }
    }, [isAllAccordionsOpen]);

    return (
        <VStack gap="0" className="border-t-1 border-b-1 border-ax-neutral-100 cursor-pointer">
            <div
                className={`hover:bg-ax-accent-300 select-none border-l-8 pb-4 pt-4 ${borderFarge}`}
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
                className={`duration-250 overflow-hidden transition-all ${
                    erPeriodeInnholdÅpen ? 'opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div
                    // eslint-disable-next-line
                    className={`border-l-8 pb-10 pl-10 pr-10 pt-10 has-[div[data-panel='endre-periode']]:pt-0 has-[div[data-panel='slett-periode']]:pt-0 ${borderFarge}`}
                >
                    <PeriodeListeContent
                        handleUpdatePeriode={handleUpdatePeriode}
                        handleDeletePeriode={handleDeletePeriode}
                        handleDeletePerioder={handleDeletePerioder}
                        handleAddPeriode={handleAddPeriode}
                        erFamiliehendelse={!!erFamiliehendelse}
                        permisjonsperiode={permisjonsperiode}
                        erMedmorDelAvSøknaden={erMedmorDelAvSøknaden}
                    />
                </div>
            </div>
        </VStack>
    );
};
