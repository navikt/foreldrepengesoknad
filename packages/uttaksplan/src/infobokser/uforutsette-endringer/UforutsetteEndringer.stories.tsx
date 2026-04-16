import { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';
import { action } from 'storybook/actions';
import { ForeldreInfo } from 'types/ForeldreInfo';

import { BarnType } from '@navikt/fp-constants';
import { Barn } from '@navikt/fp-types';

import { UttaksplanDataProvider } from '../../context/UttaksplanDataContext';
import { UforutsetteEndringer } from './UforutsetteEndringer';

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
    fnr: ['12345678901'],
    antallBarn: 1,
} satisfies Barn;

type StoryArgs = ComponentProps<typeof UttaksplanDataProvider> & ComponentProps<typeof UforutsetteEndringer>;

const meta = {
    title: 'UforutsetteEndringer',
    component: UforutsetteEndringer,
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
        erEndringssøknad,
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
                erEndringssøknad={erEndringssøknad}
            >
                <UforutsetteEndringer erFarOgFar={erFarOgFar} loggExpansionCardOpen={loggExpansionCardOpen} />
            </UttaksplanDataProvider>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const AdopsjonMorOgFarBeggeHarRett: Story = {
    args: {
        barn: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: ['2022-01-01'],
            adopsjonsdato: '2022-01-01',
            fnr: ['12345678901'],
            antallBarn: 1,
        },
        erEndringssøknad: false,
    },
};

export const AdopsjonMorOgFarKunMorHarRett: Story = {
    args: {
        ...AdopsjonMorOgFarBeggeHarRett.args,
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            rettighetType: 'BARE_SØKER_RETT',
        },
    },
};

export const FødselMorOgFarBeggeHarRett: Story = {
    args: {
        erEndringssøknad: false,
    },
};

export const FødselMorOgFarKunMorHarRett: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            rettighetType: 'BARE_SØKER_RETT',
        },
        erEndringssøknad: false,
    },
};

export const FødselMorOgFarKunFarHarRett: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            søker: 'FAR_MEDMOR',
            rettighetType: 'BARE_SØKER_RETT',
        },
        erEndringssøknad: false,
    },
};

export const FødselMorOgMedmorBeggeHarRett: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            erMedmorDelAvSøknaden: true,
            navnPåForeldre: {
                mor: 'Olga',
                farMedmor: 'Hanne',
            },
        },
        erEndringssøknad: false,
    },
};

export const FødselMorOgMedmorKunMorHarRett: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            erMedmorDelAvSøknaden: true,
            navnPåForeldre: {
                mor: 'Olga',
                farMedmor: 'Hanne',
            },
            rettighetType: 'BARE_SØKER_RETT',
        },
        erEndringssøknad: false,
    },
};

export const FødselMorOgMedmorKunMedmorHarRett: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            erMedmorDelAvSøknaden: true,
            navnPåForeldre: {
                mor: 'Olga',
                farMedmor: 'Hanne',
            },
            rettighetType: 'BARE_SØKER_RETT',
            søker: 'FAR_MEDMOR',
        },
        erEndringssøknad: false,
    },
};

// TODO (TOR) Usikker på korleis dette skal settast opp
export const FødselFarOgFarBeggeHarRett: Story = {
    args: {
        erFarOgFar: true,
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            erMedmorDelAvSøknaden: true,
            navnPåForeldre: {
                mor: 'Peder',
                farMedmor: 'Hans',
            },
            søker: 'FAR_MEDMOR',
        },
        erEndringssøknad: false,
    },
};

// TODO (TOR) Usikker på korleis dette skal settast opp
export const FødselFarOgFarKunFarHarRett: Story = {
    args: {
        erFarOgFar: true,
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            erMedmorDelAvSøknaden: true,
            navnPåForeldre: {
                mor: 'Peder',
                farMedmor: 'Hans',
            },
            søker: 'FAR_MEDMOR',
            rettighetType: 'BARE_SØKER_RETT',
        },
        erEndringssøknad: false,
    },
};

// TODO (TOR) Usikker på korleis dette skal settast opp
export const FødselFarOgFarKunMedfarHarRett: Story = {
    args: {
        erFarOgFar: true,
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            erMedmorDelAvSøknaden: true,
            navnPåForeldre: {
                mor: 'Peder',
                farMedmor: 'Hans',
            },
            søker: 'FAR_MEDMOR',
            rettighetType: 'BARE_SØKER_RETT',
        },
        erEndringssøknad: false,
    },
};

export const FødselMorAleneomsorg: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            erMedmorDelAvSøknaden: false,
            navnPåForeldre: {
                mor: 'Olga',
                farMedmor: 'Hans',
            },
            søker: 'MOR',
            rettighetType: 'ALENEOMSORG',
        },
        erEndringssøknad: false,
    },
};

export const FødselFarAleneomsorg: Story = {
    args: {
        foreldreInfo: {
            ...DEFAULT_FORELDREINFO,
            erMedmorDelAvSøknaden: false,
            navnPåForeldre: {
                mor: 'Olga',
                farMedmor: 'Hans',
            },
            søker: 'FAR_MEDMOR',
            rettighetType: 'ALENEOMSORG',
        },
        erEndringssøknad: false,
    },
};
