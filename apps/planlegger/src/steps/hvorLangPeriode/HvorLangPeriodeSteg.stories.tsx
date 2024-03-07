import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, ContextDataType, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';

import { initAmplitude } from '@navikt/fp-metrics';

import HvorLangPeriodeSteg from './HvorLangPeriodeSteg';

export default {
    title: 'HvorLangPeriodeSteg',
    component: HvorLangPeriodeSteg,
};

const Template: StoryFn<{
    hvemPlanlegger: HvemPlanlegger;
    omBarnet: OmBarnet;
    gåTilNesteSide: (action: Action) => void;
}> = ({ hvemPlanlegger, omBarnet, gåTilNesteSide = action('button-click') }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[PlanleggerRoutes.HVOR_LANG_PERIODE]}>
            <PlanleggerDataContext
                initialState={{
                    [ContextDataType.HVEM_PLANLEGGER]: hvemPlanlegger,
                    [ContextDataType.OM_BARNET]: omBarnet,
                }}
                onDispatch={gåTilNesteSide}
            >
                <HvorLangPeriodeSteg />
            </PlanleggerDataContext>
        </MemoryRouter>
    );
};

export const FlereForsørgereEttBarn = Template.bind({});
FlereForsørgereEttBarn.args = {
    hvemPlanlegger: {
        navnPåFar: 'Espen Utvikler',
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_FAR,
    },
    omBarnet: {
        erBarnetFødt: false,
        erFødsel: true,
        termindato: '2024-01-01',
        hvorMange: 'ett',
    },
};

export const FlereForsørgereToBarn = Template.bind({});
FlereForsørgereToBarn.args = {
    hvemPlanlegger: {
        navnPåMedmor: 'Esther Utvikler',
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR_OG_MEDMOR,
    },
    omBarnet: {
        erBarnetFødt: false,
        erFødsel: true,
        termindato: '2024-01-01',
        hvorMange: 'to',
    },
};

export const AleneforsørgerEttBarn = Template.bind({});
AleneforsørgerEttBarn.args = {
    hvemPlanlegger: {
        navnPåMor: 'Klara Utvikler',
        type: SøkersituasjonEnum.MOR,
    },
    omBarnet: {
        erBarnetFødt: false,
        erFødsel: true,
        termindato: '2024-01-01',
        hvorMange: 'ett',
    },
};
