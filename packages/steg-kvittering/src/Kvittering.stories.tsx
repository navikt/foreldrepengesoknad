import { Meta, StoryObj } from '@storybook/react-vite';

import { PersonMedArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { Kvittering } from './Kvittering';

const meta = {
    component: Kvittering,
} satisfies Meta<typeof Kvittering>;
export default meta;

type Story = StoryObj<typeof meta>;

const yngreMannSøkerinfo: PersonMedArbeidsforholdDto_fpoversikt = {
    person: {
        fnr: '12345678901',
        fødselsdato: '2002-01-01',
        kjønn: 'M',
        navn: {
            fornavn: 'Test',
            etternavn: 'Testesen',
        },
        barn: [],
    },
    arbeidsforhold: [],
};

const eldreMannSøkerinfo: PersonMedArbeidsforholdDto_fpoversikt = {
    person: {
        fnr: '12345678901',
        fødselsdato: '1990-01-01',
        kjønn: 'M',
        navn: {
            fornavn: 'Test',
            etternavn: 'Testesen',
        },
        barn: [],
    },
    arbeidsforhold: [],
};

const kvinneSøkerinfo: PersonMedArbeidsforholdDto_fpoversikt = {
    person: {
        fnr: '12345678900',
        fødselsdato: '2002-01-01',
        kjønn: 'K',
        navn: {
            fornavn: 'Test',
            etternavn: 'Testesen',
        },
        barn: [],
    },
    arbeidsforhold: [],
};

export const VenterPåSvar: Story = {
    args: {
        forsendelseStatus: {
            status: 'PENDING',
        },
        pageTitle: 'Foreldrepengesøknad',
    },
};

export const KreverGoSysHandlingGåTilMinSide: Story = {
    args: {
        forsendelseStatus: {
            status: 'MIDLERTIDIG',
        },
        pageTitle: 'Foreldrepengesøknad',
    },
};
export const JournalførtGåTilInnsyn: Story = {
    args: {
        forsendelseStatus: {
            status: 'ENDELIG',
            saksnummer: '1',
        },
        pageTitle: 'Foreldrepengesøknad',
    },
};

export const YngreMannEndringssøknad: Story = {
    args: {
        forsendelseStatus: {
            status: 'ENDELIG',
            saksnummer: '1',
        },
        pageTitle: 'Foreldrepengesøknad',
        søkerinfo: yngreMannSøkerinfo,
        erEndringssøknad: true,
    },
};

export const EldreMannEndringssøknad: Story = {
    args: {
        forsendelseStatus: {
            status: 'ENDELIG',
            saksnummer: '1',
        },
        pageTitle: 'Foreldrepengesøknad',
        søkerinfo: eldreMannSøkerinfo,
        erEndringssøknad: true,
    },
};

export const KvinneEndringssøknad: Story = {
    args: {
        forsendelseStatus: {
            status: 'ENDELIG',
            saksnummer: '1',
        },
        pageTitle: 'Foreldrepengesøknad',
        søkerinfo: kvinneSøkerinfo,
        erEndringssøknad: true,
    },
};

export const YngreMannFørstegangssøknad: Story = {
    args: {
        forsendelseStatus: {
            status: 'ENDELIG',
            saksnummer: '1',
        },
        pageTitle: 'Foreldrepengesøknad',
        søkerinfo: yngreMannSøkerinfo,
        erEndringssøknad: false,
    },
};
