import { ArrowCirclepathIcon, ArrowUndoIcon, PencilIcon, TrashIcon, XMarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { Button, HStack } from '@navikt/ds-react';

interface Props {
    visKnapper?: boolean;
    tilbakestillPlan?: () => void;
    angreEndring?: () => void;
    fjernAltIPlanen: () => void;
    toggleAllAccordions?: () => void;
    isAllAccordionsOpen?: boolean;
}

export const UttaksplanHandlingKnapper = ({
    visKnapper = true,
    tilbakestillPlan,
    angreEndring,
    fjernAltIPlanen,
    toggleAllAccordions,
    isAllAccordionsOpen,
}: Props) => {
    const erListevisning = !!toggleAllAccordions;

    return (
        <HStack gap="space-16">
            <Button
                size="small"
                variant="secondary"
                icon={visKnapper ? <ArrowCirclepathIcon aria-hidden height={24} width={24} /> : null}
                onClick={tilbakestillPlan}
                disabled={!tilbakestillPlan}
            >
                <FormattedMessage id="UttaksplanHandlingKnapper.Tilbakestill" />
            </Button>
            <Button
                size="small"
                variant="secondary"
                icon={visKnapper ? <ArrowUndoIcon aria-hidden height={24} width={24} /> : null}
                onClick={angreEndring}
                disabled={!angreEndring}
            >
                <FormattedMessage id="UttaksplanHandlingKnapper.Angre" />
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
            <Button
                size="small"
                variant="secondary"
                icon={visKnapper ? <TrashIcon aria-hidden height={24} width={24} /> : null}
                onClick={fjernAltIPlanen}
            >
                <FormattedMessage id="UttaksplanHandlingKnapper.FjernAlt" />
            </Button>
        </HStack>
    );
};
