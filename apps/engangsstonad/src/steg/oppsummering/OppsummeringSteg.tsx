import { ContextDataType, useContextGetData } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import useEsNavigator from 'appData/useEsNavigator';
import useStepConfig from 'appData/useStepConfig';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';

import { Heading } from '@navikt/ds-react';

import {
    BoIUtlandetOppsummeringspunkt,
    HendelseType,
    OppsummeringPanel,
    SøkerOppsummeringspunkt,
} from '@navikt/fp-oppsummering';
import { Søker } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { DokumentasjonOppsummering } from './DokumentasjonOppsummering';
import OmBarnetOppsummering from './OmBarnetOppsummering';

const getDatoOgHendelsetype = (barn: OmBarnet): [string, HendelseType] => {
    if (erBarnetFødt(barn)) {
        return [barn.fødselsdato, HendelseType.FØDSEL];
    }
    if (erAdopsjon(barn)) {
        return [barn.adopsjonsdato, HendelseType.ADOPSJON];
    }
    if (erBarnetIkkeFødt(barn)) {
        return [barn.termindato, HendelseType.TERMIN];
    }
    throw new Error('Informasjon om barn er feil!');
};

export interface Props {
    søker: Søker;
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    mellomlagreOgNaviger: () => Promise<void>;
}

const OppsummeringSteg: React.FunctionComponent<Props> = ({ søker, sendSøknad, mellomlagreOgNaviger }) => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const dokumentasjon = useContextGetData(ContextDataType.DOKUMENTASJON);
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="Søknad.Pageheading" />
            </Heading>
            <OppsummeringPanel
                appName="Engangsstønad"
                stepConfig={stepConfig}
                sendSøknad={sendSøknad}
                cancelApplication={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                onContinueLater={navigator.fortsettSøknadSenere}
            >
                <SøkerOppsummeringspunkt søker={søker} />
                <OmBarnetOppsummering
                    omBarnet={omBarnet}
                    onVilEndreSvar={() => navigator.goToNextStep(Path.OM_BARNET)}
                />
                <BoIUtlandetOppsummeringspunkt
                    onVilEndreSvar={() => navigator.goToNextStep(Path.UTENLANDSOPPHOLD)}
                    tidligereUtenlandsopphold={tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd ?? []}
                    senereUtenlandsopphold={senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd ?? []}
                />
                <DokumentasjonOppsummering dokumentasjon={dokumentasjon} onVilEndreSvar={navigator.goToNextStep} />
            </OppsummeringPanel>
        </ContentWrapper>
    );
};

export default OppsummeringSteg;
