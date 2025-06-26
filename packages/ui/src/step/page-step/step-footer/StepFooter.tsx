import { HGrid } from '@navikt/ds-react';

import { AvsluttModal } from './AvsluttModal';
import { FortsettSenereModal } from './FortsettSenereModal';

interface Props {
    onAvsluttOgSlett?: () => void;
    onFortsettSenere?: () => void;
}

export const StepFooter = ({ onAvsluttOgSlett, onFortsettSenere }: Props) => {
    return (
        <HGrid gap={{ xs: '4', sm: '8 4' }} columns={{ xs: 1, sm: 2 }} width={{ sm: 'fit-content' }}>
            <FortsettSenereModal onFortsettSenere={onFortsettSenere} />
            <AvsluttModal onAvsluttOgSlett={onAvsluttOgSlett} />
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
