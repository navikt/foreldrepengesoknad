import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { ComponentProps } from 'react';

import { BarnFraNesteSak, BarnType } from '@navikt/fp-common';

import { InfoOmNesteBarn } from './InfoOmNesteBarn';

type StoryArgs = {
    barnFraNesteSak: BarnFraNesteSak | undefined;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof InfoOmNesteBarn>;

const meta = {
    title: 'steps/uttaksplan/InfoOmNesteBarn',
    component: InfoOmNesteBarn,
    render: ({ barnFraNesteSak, ...rest }) => {
        return (
            <FpDataContext
                initialState={{
                    [ContextDataType.OM_BARNET]: {
                        type: BarnType.FØDT,
                        fødselsdatoer: ['2023-03-15'],
                        antallBarn: 1,
                    },
                    [ContextDataType.BARN_FRA_NESTE_SAK]: barnFraNesteSak,
                }}
            >
                <InfoOmNesteBarn {...rest} />
            </FpDataContext>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const HarToTetteBarnOgMinsterett: Story = {
    args: {
        minsterettUkerToTette: 8,
        barnFraNesteSak: {
            familiehendelsesdato: new Date('2024-01-01'),
            startdatoFørsteStønadsperiode: new Date('2023-12-20'),
            fnr: undefined,
            annenForelderFnr: undefined,
        },
    },
};

export const HarEtIkkeTettBarnEtterDenne: Story = {
    args: {
        minsterettUkerToTette: 8,
        barnFraNesteSak: {
            familiehendelsesdato: new Date('2024-05-01'),
            startdatoFørsteStønadsperiode: new Date('2024-05-01'),
            fnr: undefined,
            annenForelderFnr: undefined,
        },
    },
};
