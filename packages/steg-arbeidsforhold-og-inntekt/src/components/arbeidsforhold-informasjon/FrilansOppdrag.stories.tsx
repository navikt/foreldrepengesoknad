import { Meta, StoryObj } from '@storybook/react-vite';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { FrilansOppdrag } from './FrilansOppdrag';

const DEFAULT_FRILANSOPPDRAG = [
    {
        arbeidsgiverId: '123456789',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'OPPDRAGSGIVER AS',
        fom: '2024-01-15',
        tom: '2024-02-20',
        stillingsprosent: 0,
    },
] satisfies EksternArbeidsforholdDto_fpoversikt[];

const meta = {
    title: 'components/FrilansOppdrag',
    component: FrilansOppdrag,
} satisfies Meta<typeof FrilansOppdrag>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        frilansoppdrag: DEFAULT_FRILANSOPPDRAG,
    },
};
