import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';
import { action } from 'storybook/actions';
import { ForeldreInfo } from 'types/ForeldreInfo';

import { BarnType } from '@navikt/fp-constants';
import { Barn } from '@navikt/fp-types';

import { UttaksplanDataProvider } from '../../context/UttaksplanDataContext';
import { HvaErMulig } from './HvaErMulig';

const MINSTERETTER = {
    farRundtFødsel: 10,
    toTette: 0,
};

const DEFAULT_FORELDREINFO = {
    søker: 'MOR',
    navnPåForeldre: {
        mor: 'Olga',
        farMedmor: 'Espen',
    },
    rettighetType: 'BEGGE_RETT',
    erMedmorDelAvSøknaden: false,
    erIkkeSøkerSpesifisert: true,
} satisfies ForeldreInfo;

const DEFAULT_BARN_FØDSEL = {
    type: BarnType.FØDT,
    fødselsdatoer: ['2022-01-01'],
    termindato: '2022-01-01',
    antallBarn: 1,
} satisfies Barn;

type StoryArgs = ComponentProps<typeof UttaksplanDataProvider> & ComponentProps<typeof HvaErMulig>;

const meta = {
    title: 'HvaErMulig',
    component: HvaErMulig,
    args: {
        foreldreInfo: DEFAULT_FORELDREINFO,
        barn: DEFAULT_BARN_FØDSEL,
        erFarOgFar: false,
        uttakPerioder: [],
        erPeriodeneTilAnnenPartLåst: false,
        harAktivitetskravIPeriodeUtenUttak: false,
        aktiveArbeidsforhold: [],
        loggExpansionCardOpen: () => action('loggExpansionCardOpen'),
        valgtStønadskonto: {
            kontoer: [
                { konto: 'MØDREKVOTE', dager: 95 },
                { konto: 'FEDREKVOTE', dager: 95 },
                { konto: 'FELLESPERIODE', dager: 101 },
                { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
            ],
            minsteretter: MINSTERETTER,
        },
        children: <></>,
    },
    render: ({
        barn,
        foreldreInfo,
        erFarOgFar,
        loggExpansionCardOpen,
        uttakPerioder,
        harAktivitetskravIPeriodeUtenUttak,
        erPeriodeneTilAnnenPartLåst,
        aktiveArbeidsforhold,
        valgtStønadskonto,
    }) => {
        return (
            <UttaksplanDataProvider
                barn={barn}
                foreldreInfo={foreldreInfo}
                valgtStønadskonto={valgtStønadskonto}
                harAktivitetskravIPeriodeUtenUttak={harAktivitetskravIPeriodeUtenUttak}
                uttakPerioder={uttakPerioder}
                erPeriodeneTilAnnenPartLåst={erPeriodeneTilAnnenPartLåst}
                aktiveArbeidsforhold={aktiveArbeidsforhold}
            >
                <HvaErMulig erFarOgFar={erFarOgFar} loggExpansionCardOpen={loggExpansionCardOpen} />
            </UttaksplanDataProvider>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FødselMorOgFarBeggeHarRett: Story = {};

export const FødselMorOgFarBeggeHarRettTvilling: Story = {
    args: {
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2022-01-01'],
            termindato: '2022-01-01',
            antallBarn: 2,
        },
    },
};

export const FødselMorOgFarKunMorHarRett: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            rettighetType: 'BARE_SØKER_RETT',
        },
    },
};

export const FødselMorOgFarKunFarHarRett: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            søker: 'FAR_MEDMOR',
            rettighetType: 'BARE_SØKER_RETT',
        },
    },
};

export const FødselMorOgMedmorBeggeHarRett: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            søker: 'MOR',
            erMedmorDelAvSøknaden: true,
            navnPåForeldre: {
                mor: 'Olga',
                farMedmor: 'Hege',
            },
        },
    },
};

export const FødselMorOgMedmorKunMorHarRett: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            søker: 'MOR',
            erMedmorDelAvSøknaden: true,
            navnPåForeldre: {
                mor: 'Olga',
                farMedmor: 'Hege',
            },
            rettighetType: 'BARE_SØKER_RETT',
        },
    },
};

export const FødselMorOgMedmorKunMedmorHarRett: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            søker: 'FAR_MEDMOR',
            erMedmorDelAvSøknaden: true,
            navnPåForeldre: {
                mor: 'Olga',
                farMedmor: 'Hege',
            },
            rettighetType: 'BARE_SØKER_RETT',
        },
    },
};

// TODO (TOR) Usikker på korleis dette skal settast opp
export const FødselFarOgFarBeggeHarRett: Story = {
    args: {
        erFarOgFar: true,
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            søker: 'MOR',
            erMedmorDelAvSøknaden: true,
            navnPåForeldre: {
                mor: 'Espen',
                farMedmor: 'Jan',
            },
        },
    },
};

// TODO (TOR) Usikker på korleis dette skal settast opp
export const FødselFarOgFarKunFar1HarRett: Story = {
    args: {
        erFarOgFar: true,
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            søker: 'MOR',
            erMedmorDelAvSøknaden: true,
            navnPåForeldre: {
                mor: 'Espen',
                farMedmor: 'Jan',
            },
            rettighetType: 'BARE_SØKER_RETT',
        },
    },
};

export const FødselAleneforsørgerMor: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            rettighetType: 'ALENEOMSORG',
        },
    },
};

export const FødselAleneforsørgerFar: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            søker: 'FAR_MEDMOR',
            rettighetType: 'ALENEOMSORG',
        },
    },
};

export const AdopsjonMorOgFarBeggeHarRett: Story = {
    args: {
        barn: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: ['2022-01-01'],
            adopsjonsdato: '2022-01-01',
            antallBarn: 1,
        },
    },
};

export const AdopsjonMorOgFarBeggeHarRettTvilling: Story = {
    args: {
        barn: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: ['2022-01-01'],
            adopsjonsdato: '2022-01-01',
            antallBarn: 2,
        },
    },
};
