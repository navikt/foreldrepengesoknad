import { useEffect, useId, useState } from 'react';

import { VStack } from '@navikt/ds-react';

import { Uttaksplanperiode } from '../../types/UttaksplanPeriode';
import { PeriodeListeContent } from './periode-liste-content/PeriodeListeContent';
import { PeriodeListeHeader } from './periode-liste-header/PeriodeListeHeader';
import { getBorderFarge } from './periode-liste-header/PeriodeListeHeaderUtils';

const HEADER_KNAPP_KLASSER = [
    'hover:bg-ax-accent-300 w-full cursor-pointer border-l-8 pt-4 pb-4 text-left select-none',
    'focus-visible:outline-ax-border-focus focus-visible:-outline-offset-3 focus-visible:outline-3 focus-visible:outline-solid',
].join(' ');

interface Props {
    isReadOnly: boolean;
    uttaksplanperioder: Uttaksplanperiode[];
    isAllAccordionsOpen?: boolean;
}

export const PeriodeListeItem = ({ isReadOnly, uttaksplanperioder, isAllAccordionsOpen }: Props) => {
    const [erPeriodeInnholdÅpen, setErPeriodeInnholdÅpen] = useState(false);
    const innholdId = useId();

    const borderFarge = getBorderFarge(uttaksplanperioder);

    // Sync local state with global accordion state
    useEffect(() => {
        if (isAllAccordionsOpen !== undefined) {
            // eslint-disable-next-line @eslint-react/set-state-in-effect -- TODO (TOR) - Skriv om dette
            setErPeriodeInnholdÅpen(isAllAccordionsOpen);
        }
    }, [isAllAccordionsOpen]);

    return (
        <VStack gap="space-0" className="border-ax-neutral-100 cursor-pointer border-t border-b">
            <button
                type="button"
                className={`${HEADER_KNAPP_KLASSER} ${borderFarge}`}
                onClick={() => setErPeriodeInnholdÅpen(!erPeriodeInnholdÅpen)}
                aria-expanded={erPeriodeInnholdÅpen}
                aria-controls={innholdId}
            >
                <PeriodeListeHeader isOpen={erPeriodeInnholdÅpen} uttaksplanperioder={uttaksplanperioder} />
            </button>
            <div id={innholdId} hidden={!erPeriodeInnholdÅpen}>
                <div
                    // eslint-disable-next-line
                    className={`border-l-8 pt-10 pr-10 pb-10 pl-10 has-[div[data-panel='endre-periode']]:pt-0 has-[div[data-panel='slett-periode']]:pt-0 ${borderFarge}`}
                >
                    <PeriodeListeContent isReadOnly={isReadOnly} uttaksplanperioder={uttaksplanperioder} />
                </div>
            </div>
        </VStack>
    );
};
