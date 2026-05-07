import { ArrowCirclepathIcon, ArrowUndoIcon, PencilIcon, TrashIcon, XMarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { Button, HStack } from '@navikt/ds-react';

interface Props {
    tilbakestillPlan?: () => void;
    angreEndring?: () => void;
    fjernAltIPlanen?: () => void;
    toggleAllAccordions?: () => void;
    isAllAccordionsOpen?: boolean;
    visFjernAltModal?: boolean;
    visTilbakestillModal?: boolean;
}

export const UttaksplanHandlingKnapper = ({
    tilbakestillPlan,
    angreEndring,
    fjernAltIPlanen,
    toggleAllAccordions,
    isAllAccordionsOpen,
    visFjernAltModal,
    visTilbakestillModal,
}: Props) => {
    const erListevisning = !!toggleAllAccordions;

    return (
        <HStack gap="space-16">
            <Button
                size="small"
                variant="secondary"
                icon={<ArrowUndoIcon aria-hidden height={24} width={24} />}
                onClick={angreEndring}
                disabled={!angreEndring}
            >
                <FormattedMessage id="UttaksplanHandlingKnapper.Angre" />
            </Button>
            <Button
                size="small"
                variant="secondary"
                icon={<ArrowCirclepathIcon aria-hidden height={24} width={24} />}
                onClick={tilbakestillPlan}
                disabled={!tilbakestillPlan}
                aria-haspopup="dialog"
                aria-expanded={visTilbakestillModal}
                aria-controls={visTilbakestillModal ? 'TilbakestillPlanModal' : undefined}
            >
                <FormattedMessage id="UttaksplanHandlingKnapper.Tilbakestill" />
            </Button>
            {erListevisning && (
                <Button
                    size="small"
                    variant={isAllAccordionsOpen ? 'primary' : 'secondary'}
                    icon={
                        isAllAccordionsOpen ? (
                            <XMarkIcon aria-hidden height={24} width={24} />
                        ) : (
                            <PencilIcon aria-hidden height={24} width={24} />
                        )
                    }
                    onClick={toggleAllAccordions}
                >
                    {isAllAccordionsOpen ? (
                        <FormattedMessage id="UttaksplanHandlingKnapper.LukkPerioder" />
                    ) : (
                        <FormattedMessage id="UttaksplanHandlingKnapper.EndrePlanen" />
                    )}
                </Button>
            )}
            {fjernAltIPlanen && (
                <Button
                    size="small"
                    variant="secondary"
                    icon={<TrashIcon aria-hidden height={24} width={24} />}
                    onClick={fjernAltIPlanen}
                    aria-haspopup="dialog"
                    aria-expanded={visFjernAltModal}
                    aria-controls={visFjernAltModal ? 'FjernAltIUttaksplanModal' : undefined}
                >
                    <FormattedMessage id="UttaksplanHandlingKnapper.FjernAlt" />
                </Button>
            )}
        </HStack>
    );
};
