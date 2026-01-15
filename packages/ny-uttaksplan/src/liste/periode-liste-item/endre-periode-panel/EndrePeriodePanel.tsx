import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

import { Uttaksplanperiode } from '../../../types/UttaksplanPeriode';
import { EndrePeriodePanelStep } from './steps/EndrePeriodePanelStep';
import { VelgPeriodePanelStep } from './steps/VelgPeriodePanelStep';

const ARIA_LABEL_ID = 'endre-periode-panel-heading';

interface Props {
    closePanel: () => void;
    uttaksplanperioder: Uttaksplanperiode[];
}

export const EndrePeriodePanel = ({ closePanel, uttaksplanperioder }: Props) => {
    const inneholderKunEnPeriode = uttaksplanperioder.length === 1;

    const [valgtPeriodeIndex, setValgtPeriodeIndex] = useState<number | undefined>(
        inneholderKunEnPeriode ? 0 : undefined,
    );

    return (
        <div aria-labelledby={ARIA_LABEL_ID} data-panel="endre-periode">
            <div className="mb-4">
                <HStack gap="space-8" align="center">
                    <PencilIcon aria-hidden={true} width={24} height={24} />
                    <Heading size="medium" id={ARIA_LABEL_ID}>
                        <FormattedMessage id="endrePeriodePanel.tittel" />
                    </Heading>
                </HStack>
            </div>
            <div>
                {valgtPeriodeIndex === undefined && (
                    <VelgPeriodePanelStep
                        perioder={uttaksplanperioder}
                        setValgtPeriodeIndex={setValgtPeriodeIndex}
                        closePanel={closePanel}
                    />
                )}
                {valgtPeriodeIndex !== undefined && (
                    <EndrePeriodePanelStep
                        uttaksplanperiode={notEmpty(uttaksplanperioder[valgtPeriodeIndex])}
                        setValgtPeriodeIndex={setValgtPeriodeIndex}
                        closePanel={closePanel}
                        inneholderKunEnPeriode={inneholderKunEnPeriode}
                    />
                )}
            </div>
        </div>
    );
};
