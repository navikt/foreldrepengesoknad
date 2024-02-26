import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { Arbeidsforhold, UtenlandsoppholdSenere } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { SenereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';
import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: Arbeidsforhold[];
};

const SenereUtenlandsoppholdSteg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
}) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const utenlandsopphold = notEmpty(useContextGetData(ContextDataType.UTENLANDSOPPHOLD));
    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const oppdaterSenereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const lagredeSenereUtenlandsopphold =
        senereUtenlandsopphold && senereUtenlandsopphold.senereOpphold.length > 0
            ? {
                  utenlandsoppholdNeste12Mnd: senereUtenlandsopphold.senereOpphold.map((so) => ({
                      fom: so.tidsperiode.fom,
                      tom: so.tidsperiode.tom,
                      landkode: so.land,
                  })),
              }
            : undefined;

    const save = (values: UtenlandsoppholdSenere) => {
        oppdaterSenereUtenlandsopphold({
            senereOpphold: values.utenlandsoppholdNeste12Mnd.map((un) => ({
                land: un.landkode,
                tidsperiode: {
                    fom: un.fom,
                    tom: un.tom,
                },
            })),
        });

        return navigator.goToNextDefaultStep();
    };

    const goToPreviousStep = () => {
        const appRoute = utenlandsopphold.iNorgeSiste12Mnd
            ? SøknadRoutes.UTENLANDSOPPHOLD
            : SøknadRoutes.HAR_BODD_I_UTLANDET;
        navigator.goToPreviousStep(appRoute);
    };
    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <SenereUtenlandsoppholdPanel
                senereUtenlandsopphold={lagredeSenereUtenlandsopphold}
                saveOnNext={save}
                saveOnPrevious={saveOnPrevious}
                cancelApplication={avbrytSøknad}
                onContinueLater={navigator.fortsettSøknadSenere}
                goToPreviousStep={goToPreviousStep}
                stepConfig={stepConfig}
            />
        </ContentWrapper>
    );
};

export default SenereUtenlandsoppholdSteg;
