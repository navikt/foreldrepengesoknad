import {
    ArrowCirclepathReverseIcon,
    ArrowUndoIcon,
    ChevronDownIcon,
    NotePencilIcon,
    TrashIcon,
} from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { ActionMenu, BodyShort, Box, Button, HStack, VStack } from '@navikt/ds-react';

import { useUttaksplanRedigering } from '../context/UttaksplanRedigeringContext';

interface Props {
    toggleAllAccordions: () => void;
}

export const UttaksplanListeKnapper = ({ toggleAllAccordions }: Props) => {
    const uttaksplanRedigering = useUttaksplanRedigering();

    if (!uttaksplanRedigering) {
        return null;
    }

    return (
        <HStack gap="space-16" justify="space-between" wrap>
            <HStack gap="space-16">
                <Button
                    size="small"
                    variant="secondary"
                    data-color="neutral"
                    onClick={
                        uttaksplanRedigering.uttaksplanVersjoner.length > 0
                            ? () => uttaksplanRedigering.angreSisteEndring()
                            : undefined
                    }
                    disabled={uttaksplanRedigering.uttaksplanVersjoner.length === 0}
                >
                    <VStack gap="space-4" align="center">
                        <ArrowUndoIcon aria-hidden height={24} width={24} />
                        <BodyShort size="small">
                            <FormattedMessage id="UttaksplanListeKnapper.Angre" />
                        </BodyShort>
                    </VStack>
                </Button>
                <Button
                    size="small"
                    variant="secondary"
                    data-color="danger"
                    onClick={() => uttaksplanRedigering.setVisFjernAltModal(true)}
                    aria-haspopup="dialog"
                    aria-expanded={uttaksplanRedigering.visFjernAltModal}
                    aria-controls={uttaksplanRedigering.visFjernAltModal ? 'FjernAltIUttaksplanModal' : undefined}
                >
                    <VStack gap="space-4" align="center">
                        <TrashIcon aria-hidden height={24} width={24} />
                        <BodyShort size="small">
                            <FormattedMessage id="UttaksplanListeKnapper.FjernAlt" />
                        </BodyShort>
                    </VStack>
                </Button>
            </HStack>
            <HStack gap="space-16" wrap>
                <ActionMenu>
                    <ActionMenu.Trigger>
                        <Button
                            variant="tertiary"
                            size="small"
                            data-color="neutral"
                            icon={<ChevronDownIcon aria-hidden />}
                            iconPosition="right"
                        >
                            <HStack gap="space-4" align="center">
                                <NotePencilIcon aria-hidden height={24} width={24} />
                                <BodyShort size="small">
                                    <FormattedMessage id="UttaksplanListeKnapper.EndrePlanen" />
                                </BodyShort>
                            </HStack>
                        </Button>
                    </ActionMenu.Trigger>
                    <ActionMenu.Content className="max-w-65 ax-md:max-w-none" align="end">
                        <VStack gap="space-16">
                            <ActionMenu.Item onClick={toggleAllAccordions} className="pt-1">
                                <HStack gap="space-8" wrap={false}>
                                    <Box
                                        padding="space-8"
                                        background="success-soft"
                                        borderRadius="8"
                                        className="self-start"
                                    >
                                        <NotePencilIcon
                                            aria-hidden
                                            height={24}
                                            width={24}
                                            className="text-ax-text-success-subtle"
                                        />
                                    </Box>
                                    <VStack gap="space-4">
                                        <BodyShort weight="semibold" size="small">
                                            <FormattedMessage id="UttaksplanListeKnapper.EndreValg" />
                                        </BodyShort>
                                        <ActionMenu.Label className="pl-0">
                                            <BodyShort size="small" color="text-ax-text-neutral-subtle">
                                                <FormattedMessage id="UttaksplanListeKnapper.EndreValg.Beskrivelse" />
                                            </BodyShort>
                                        </ActionMenu.Label>
                                    </VStack>
                                </HStack>
                            </ActionMenu.Item>

                            <ActionMenu.Item
                                onClick={
                                    uttaksplanRedigering.harEndretPlan
                                        ? () => uttaksplanRedigering.setVisTilbakestillModal(true)
                                        : undefined
                                }
                                disabled={!uttaksplanRedigering.harEndretPlan}
                                className="pt-1"
                            >
                                <HStack gap="space-8" wrap={false}>
                                    <Box
                                        padding="space-8"
                                        background="accent-soft"
                                        borderRadius="8"
                                        className="self-start"
                                    >
                                        <ArrowCirclepathReverseIcon
                                            aria-hidden
                                            height={24}
                                            width={24}
                                            className="text-ax-text-info-subtle"
                                        />
                                    </Box>
                                    <VStack gap="space-4">
                                        <BodyShort weight="semibold" size="small">
                                            <FormattedMessage id="UttaksplanListeKnapper.Tilbakestill" />
                                        </BodyShort>
                                        <ActionMenu.Label className="pl-0">
                                            <BodyShort size="small" color="text-ax-text-neutral-subtle">
                                                <FormattedMessage id="UttaksplanListeKnapper.Tilbakestill.Beskrivelse" />
                                            </BodyShort>
                                        </ActionMenu.Label>
                                    </VStack>
                                </HStack>
                            </ActionMenu.Item>
                        </VStack>
                    </ActionMenu.Content>
                </ActionMenu>
            </HStack>
        </HStack>
    );
};
