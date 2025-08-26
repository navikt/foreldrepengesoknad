import { useState } from 'react';

import { VStack } from '@navikt/ds-react';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import { PeriodeListeContent } from '../periode-liste-content/PeriodeListeContent';
import { PeriodeListeHeader } from '../periode-liste-header/PeriodeListeHeader';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    erFamiliehendelse?: boolean;
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
}: Props) => {
    const [erPeriodeInnholdÅpen, setErPeriodeInnholdÅpen] = useState(false);

    return (
        <VStack gap="0" className="cursor-pointer border-t-1 border-b-1 border-ax-neutral-300">
            <div
                className="select-none pt-4 pb-4 hover:bg-ax-accent-300"
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
                    erPeriodeInnholdÅpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="pt-10 pb-10 pl-10 pr-10">
                    <PeriodeListeContent
                        handleUpdatePeriode={handleUpdatePeriode}
                        handleDeletePeriode={handleDeletePeriode}
                        handleDeletePerioder={handleDeletePerioder}
                        erFamiliehendelse={!!erFamiliehendelse}
                        permisjonsperiode={permisjonsperiode}
                    />
                </div>
            </div>
        </VStack>
    );
};
