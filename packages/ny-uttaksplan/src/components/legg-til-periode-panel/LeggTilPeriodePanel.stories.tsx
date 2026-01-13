import { Meta, StoryObj } from '@storybook/react-vite';

import { BarnType } from '@navikt/fp-constants';
import { Barn, KontoBeregningDto } from '@navikt/fp-types';

import { UttaksplanDataProvider } from '../../context/UttaksplanDataContext';
import { LeggTilPeriodePanel } from './LeggTilPeriodePanel';

const meta = {
    title: 'components/LeggTilPeriodePanel',
    component: LeggTilPeriodePanel,
    args: {
        onCancel: () => undefined,
        handleAddPeriode: () => undefined,
        handleDeletePerioder: () => undefined,
    },
    render: (args) => (
        <UttaksplanDataProvider
            barn={
                {
                    type: BarnType.FØDT,
                    fødselsdatoer: ['2024-06-01'],
                    antallBarn: 1,
                } satisfies Barn
            }
            foreldreInfo={{
                erMedmorDelAvSøknaden: false,
                navnPåForeldre: {
                    mor: 'Mor Test',
                    farMedmor: 'Far Test',
                },
                søker: 'MOR',
                rettighetType: 'BEGGE_RETT',
            }}
            harAktivitetskravIPeriodeUtenUttak
            valgtStønadskonto={
                {
                    kontoer: [
                        {
                            konto: 'MØDREKVOTE',
                            dager: 75,
                        },
                        {
                            konto: 'FEDREKVOTE',
                            dager: 75,
                        },
                        {
                            konto: 'FELLESPERIODE',
                            dager: 80,
                        },
                        {
                            konto: 'FORELDREPENGER_FØR_FØDSEL',
                            dager: 15,
                        },
                    ],
                    minsteretter: {
                        farRundtFødsel: 10,
                        toTette: 0,
                    },
                } satisfies KontoBeregningDto
            }
            saksperioder={[]}
        >
            <div style={{ maxWidth: '704px', margin: '2rem 4rem' }}>
                <LeggTilPeriodePanel {...args} />
            </div>
        </UttaksplanDataProvider>
    ),
} satisfies Meta<typeof LeggTilPeriodePanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const LeggTilMødrekvote: Story = {};
