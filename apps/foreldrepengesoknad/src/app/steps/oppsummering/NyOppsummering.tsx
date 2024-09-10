import { FormattedMessage, useIntl } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { isAnnenForelderOppgitt } from '@navikt/fp-common';
import { BoIUtlandetOppsummeringspunkt, OppsummeringPanel } from '@navikt/fp-steg-oppsummering';
import { Søkerinfo } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData } from 'app/appData/FpDataContext';
import SøknadRoutes from 'app/appData/routes';
import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';

export interface Props {
    søkerInfo: Søkerinfo;
    erEndringssøknad: boolean;
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
}

export const NyOppsummering = ({
    sendSøknad,
    avbrytSøknad,
    søkerInfo,
    erEndringssøknad,
    mellomlagreSøknadOgNaviger,
}: Props) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold, erEndringssøknad);
    const navigator = useFpNavigator(søkerInfo.arbeidsforhold, mellomlagreSøknadOgNaviger, erEndringssøknad);
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    console.log(tidligereUtenlandsopphold);
    const erEndringssøknadOgAnnenForelderHarRett =
        erEndringssøknad && isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge;
    const ekstraSamtykketekst = erEndringssøknadOgAnnenForelderHarRett
        ? intl.formatMessage(
              { id: 'oppsummering.harGodkjentOppsummering.endringssøknadMedAnnenForelder' },
              {
                  navnAnnenForelder: annenForelder.fornavn,
              },
          )
        : '';

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <OppsummeringPanel
                appName="Foreldrepenger"
                stepConfig={stepConfig}
                sendSøknad={sendSøknad}
                cancelApplication={avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                onContinueLater={navigator.fortsettSøknadSenere}
                ekstraSamtykketekst={ekstraSamtykketekst}
            >
                {erEndringssøknad ? null : (
                    <BoIUtlandetOppsummeringspunkt
                        onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.UTENLANDSOPPHOLD)}
                        tidligereUtenlandsopphold={tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd ?? []}
                        senereUtenlandsopphold={senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd ?? []}
                    />
                )}
            </OppsummeringPanel>
        </ContentWrapper>
    );
};
