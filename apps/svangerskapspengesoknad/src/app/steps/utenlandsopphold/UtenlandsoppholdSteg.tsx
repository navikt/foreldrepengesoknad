import { FormattedMessage, useIntl } from 'react-intl';
import { Heading } from '@navikt/ds-react';
import { UtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { getNextRouteForUtenlandsopphold, getPreviousStep, useStepConfig } from '../stepsConfig';
import { ContentWrapper } from '@navikt/fp-ui';
import { Utenlandsopphold } from '@navikt/fp-types';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { Søkerinfo } from 'app/types/Søkerinfo';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
};

const UtenlandsoppholdSteg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    søkerInfo,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, søkerInfo.arbeidsforhold).map((config) => ({
        ...config,
        isSelected: config.id === 'utenlandsopphold',
    }));
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const utenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD);

    const oppdaterUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const onSubmit = (values: Utenlandsopphold) => {
        oppdaterUtenlandsopphold({
            iNorgeSiste12Mnd: !values.harBoddUtenforNorgeSiste12Mnd,
            iNorgeNeste12Mnd: !values.skalBoUtenforNorgeNeste12Mnd,
        });

        oppdaterAppRoute(getNextRouteForUtenlandsopphold(values));

        return mellomlagreSøknadOgNaviger();
    };

    const goToPreviousStep = () => {
        oppdaterAppRoute(getPreviousStep('utenlandsopphold'));
        mellomlagreSøknadOgNaviger();
    };
    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <UtenlandsoppholdPanel
                utenlandsopphold={
                    utenlandsopphold
                        ? {
                              harBoddUtenforNorgeSiste12Mnd: !utenlandsopphold.iNorgeSiste12Mnd,
                              skalBoUtenforNorgeNeste12Mnd: !utenlandsopphold.iNorgeNeste12Mnd,
                          }
                        : undefined
                }
                saveOnNext={onSubmit}
                saveOnPrevious={saveOnPrevious}
                cancelApplication={avbrytSøknad}
                onContinueLater={onFortsettSøknadSenere}
                goToPreviousStep={goToPreviousStep}
                stepConfig={stepConfig}
                stønadstype="Svangerskapspenger"
            />
        </ContentWrapper>
    );
};

export default UtenlandsoppholdSteg;
