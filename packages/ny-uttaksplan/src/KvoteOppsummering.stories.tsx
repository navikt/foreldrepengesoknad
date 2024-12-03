import { Meta, StoryObj } from '@storybook/react';

import { Forelder, RettighetType } from '@navikt/fp-common';
import { StønadskontoType } from '@navikt/fp-constants';
import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';

import { KvoteOppsummering } from '.';

const meta = {
    component: KvoteOppsummering,
} satisfies Meta<typeof KvoteOppsummering>;
export default meta;

type Story = StoryObj<typeof meta>;

const konto = {
    kontoer: [
        {
            konto: StønadskontoType.Fellesperiode,
            dager: 80,
        },
        {
            konto: StønadskontoType.Mødrekvote,
            dager: 75,
        },
        {
            konto: StønadskontoType.Fedrekvote,
            dager: 75,
        },
        {
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            dager: 15,
        },
    ],
    minsteretter: {
        farRundtFødsel: 0,
        toTette: 0,
    },
    tillegg: {
        flerbarn: 0,
        prematur: 0,
    },
} satisfies TilgjengeligeStønadskontoerForDekningsgrad;

export const Default: Story = {
    args: {
        konto,
        perioder: [],
        rettighetType: RettighetType.BEGGE_RETT,
        forelder: Forelder.mor,
    },
};
