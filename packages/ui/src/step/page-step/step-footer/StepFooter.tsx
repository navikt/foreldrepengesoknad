import { FloppydiskIcon, TrashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { Box, Button, HGrid } from '@navikt/ds-react';

import { AvsluttModal } from './AvsluttModal';
import { FortsettSenereModal } from './FortsettSenereModal';

interface Props {
    onAvsluttOgSlett?: () => void;
    onFortsettSenere?: () => void;
}

export const StepFooter = ({ onAvsluttOgSlett, onFortsettSenere }: Props) => {
    const [avsluttIsOpen, setAvsluttIsOpen] = useState(false);
    const [fortsettSenereIsOpen, setFortsettSenereIsOpen] = useState(false);
    const intl = useIntl();

    return (
        <HGrid gap={{ xs: '4', sm: '8 4' }} columns={{ xs: 1, sm: 2 }} width={{ sm: 'fit-content' }}>
            <AvsluttModal isOpen={avsluttIsOpen} setIsOpen={setAvsluttIsOpen} onAvsluttOgSlett={onAvsluttOgSlett} />
            <FortsettSenereModal
                isOpen={fortsettSenereIsOpen}
                setIsOpen={setFortsettSenereIsOpen}
                onFortsettSenere={onFortsettSenere}
            />
            <Box asChild marginBlock={{ xs: '4 0', sm: '0' }} onClick={() => setFortsettSenereIsOpen(true)}>
                <Button variant="tertiary" icon={<FloppydiskIcon aria-hidden />} iconPosition="left">
                    {intl.formatMessage({ id: 'StepFooter.ContinueLater' })}
                </Button>
            </Box>
            <Button
                variant="tertiary"
                icon={<TrashIcon aria-hidden />}
                iconPosition="left"
                onClick={() => setAvsluttIsOpen(true)}
            >
                {intl.formatMessage({ id: 'StepFooter.Avslutt' })}
            </Button>
        </HGrid>
    );
};

// const a = () => (
//     <VStack gap="4">
//         <HGrid
//             gap={{ xs: "4", sm: "8 4" }}
//             columns={{ xs: 1, sm: 2 }}
//             width={{ sm: "fit-content" }}
//         >
//             <Button
//                 variant="secondary"
//                 icon={<ArrowLeftIcon aria-hidden />}
//                 iconPosition="left"
//             >
//                 Forrige steg
//             </Button>
//             <Button
//                 variant="primary"
//                 icon={<PaperplaneIcon aria-hidden />}
//                 iconPosition="right"
//             >
//                 Send søknad
//             </Button>
//
//
//
//             <Button
//                 variant="tertiary"
//                 icon={<TrashIcon aria-hidden />}
//                 iconPosition="left"
//             >
//                 Slett søknaden
//             </Button>
//         </HGrid>
//     </VStack>
// </VStack>
// )
