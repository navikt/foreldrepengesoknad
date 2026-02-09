import { PencilIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

import { Uttaksplanperiode } from '../../../types/UttaksplanPeriode';
import { harPeriodeDerMorsAktivitetIkkeErValgt } from '../../../utils/periodeUtils';
import { LeggTilEllerEndrePeriodeListPanel } from '../../legg-til-endre-periode-panel/LeggTilEllerEndrePeriodeListPanel';
import { erUttaksplanperiodeSamtidigUttak } from '../../utils/uttaksplanperiodeUtils';
import { VelgPeriodePanelStep } from './VelgPeriodePanelStep';

const ARIA_LABEL_ID = 'endre-periode-panel-heading';

interface Props {
    closePanel: () => void;
    uttaksplanperioder: Uttaksplanperiode[];
}

export const EndrePeriodePanel = ({ closePanel, uttaksplanperioder }: Props) => {
    const erSamtidigUttak = erUttaksplanperiodeSamtidigUttak(uttaksplanperioder);
    const erKunEnPeriodeEllerSamtidigUttak = uttaksplanperioder.length === 1 || erSamtidigUttak;

    const [valgtPeriodeIndex, setValgtPeriodeIndex] = useState<number | undefined>(
        erKunEnPeriodeEllerSamtidigUttak ? 0 : undefined,
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
                    <LeggTilEllerEndrePeriodeListPanel
                        uttaksplanperiode={finnUttakplanperiode(erSamtidigUttak, uttaksplanperioder, valgtPeriodeIndex)}
                        setIsLeggTilPeriodePanelOpen={closePanel}
                        setValgtPeriodeIndex={
                            !erSamtidigUttak && uttaksplanperioder.length !== 1 ? setValgtPeriodeIndex : undefined
                        }
                        erNyPeriodeModus={false}
                        harPeriodeDerMorsAktivitetIkkeErValgt={harPeriodeDerMorsAktivitetIkkeErValgt([
                            finnUttakplanperiode(erSamtidigUttak, uttaksplanperioder, valgtPeriodeIndex),
                        ])}
                    />
                )}
            </div>
        </div>
    );
};

const finnUttakplanperiode = (
    erSamtidigUttak: boolean,
    uttaksplanperioder: Uttaksplanperiode[],
    valgtPeriodeIndex: number,
): Uttaksplanperiode => {
    return erSamtidigUttak ? uttaksplanperioder.at(0)! : notEmpty(uttaksplanperioder[valgtPeriodeIndex]);
};
