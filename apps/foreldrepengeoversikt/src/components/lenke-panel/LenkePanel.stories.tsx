import { StrollerIcon } from '@navikt/aksel-icons';
import { StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import { Tag, VStack } from '@navikt/ds-react';

import { LenkePanel } from './LenkePanel';

// NOTE til Tor. Vet ikke om det jeg driver med her er blasfemi for en Storybook entusiast, men syntes det var litt kjekt å kunne se alle variantene i ett view.
const meta = {
    title: 'LenkePanel',
    component: LenkePanel,
    render: () => {
        return (
            <MemoryRouter>
                <VStack gap="2" className="w-[704px]">
                    <LenkePanel tittel="Bare tittel" to="#" />
                    <LenkePanel tittel="Tittel" to="#" undertittel="Undertittel" />
                    <LenkePanel tittel="Tittel" to="#" undertittel="Undertittel" Ikon={StrollerIcon} />
                    <LenkePanel
                        tittel="Tittel"
                        to="#"
                        undertittel="Undertittel"
                        Ikon={StrollerIcon}
                        tag={
                            <Tag size="small" variant="warning">
                                Ekstra tag info
                            </Tag>
                        }
                    />
                </VStack>
                <br />
                <VStack gap="2" className="w-[390px]">
                    <LenkePanel tittel="Litt lengre tittel for mobil" to="#" />
                    <LenkePanel tittel="Litt lengre tittel for mobil" to="#" undertittel="Undertittel" />
                    <LenkePanel
                        tittel="Litt lengre tittel for mobil"
                        to="#"
                        undertittel="Undertittel som er veldig lang og vil brekke over flere linjer"
                        Ikon={StrollerIcon}
                    />
                    <LenkePanel
                        tittel="Tittel"
                        to="#"
                        undertittel="Undertittel"
                        Ikon={StrollerIcon}
                        tag={
                            <Tag size="small" variant="warning">
                                Ekstra tag info
                            </Tag>
                        }
                    />
                    <LenkePanel
                        tittel="Litt lengre tittel for mobil"
                        to="#"
                        undertittel="Undertittel"
                        Ikon={StrollerIcon}
                        tag={
                            <Tag size="small" variant="warning">
                                Ekstra tag info
                            </Tag>
                        }
                    />
                </VStack>
            </MemoryRouter>
        );
    },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
    args: {},
};
