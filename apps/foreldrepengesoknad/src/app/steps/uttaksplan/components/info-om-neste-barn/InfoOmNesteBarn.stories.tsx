import { StoryFn } from '@storybook/react';
import withRouter from 'storybook/decorators/withRouter';

import { BarnFraNesteSak, BarnType } from '@navikt/fp-common';

import { ContextDataType, FpDataContext } from 'app/context/FpDataContext';

import InfoOmNesteBarn from './InfoOmNesteBarn';

export default {
    title: 'components/InfoOmNesteBarn',
    component: InfoOmNesteBarn,
    decorators: [withRouter],
};

interface Props {
    barnFraNesteSak: BarnFraNesteSak | undefined;
}

const Template: StoryFn<Props> = ({ barnFraNesteSak }) => {
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
            <InfoOmNesteBarn minsterettUkerToTette={8} />
        </FpDataContext>
    );
};

export const HarToTetteBarnOgMinsterett = Template.bind({});
HarToTetteBarnOgMinsterett.args = {
    barnFraNesteSak: {
        familiehendelsesdato: new Date('2024-01-01'),
        startdatoFørsteStønadsperiode: new Date('2023-12-20'),
        fnr: undefined,
        annenForelderFnr: undefined,
    },
};

export const HarEtIkkeTettBarnEtterDenne = Template.bind({});
HarEtIkkeTettBarnEtterDenne.args = {
    barnFraNesteSak: {
        familiehendelsesdato: new Date('2024-05-01'),
        startdatoFørsteStønadsperiode: new Date('2024-05-01'),
        fnr: undefined,
        annenForelderFnr: undefined,
    },
};
