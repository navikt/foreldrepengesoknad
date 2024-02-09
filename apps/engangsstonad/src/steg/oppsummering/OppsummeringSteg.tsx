import {
    BoIUtlandetOppsummeringspunkt,
    DegOppsummeringspunkt,
    HendelseType,
    OppsummeringIndex,
} from '@navikt/fp-oppsummering';
import { Person } from '@navikt/fp-types';
import { ContentWrapper, useCustomIntl } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'appData/EsDataContext';
import useEsNavigator from 'appData/useEsNavigator';
import useStepConfig from 'appData/useStepConfig';
import React from 'react';
import { erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';
import OmBarnetOppsummering from './OmBarnetOppsummering';
import { Heading } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';

export interface Props {
    person: Person;
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    mellomlagreOgNaviger: () => Promise<void>;
}

const OppsummeringSteg: React.FunctionComponent<Props> = ({ person, sendSøknad, mellomlagreOgNaviger }) => {
    const { i18n } = useCustomIntl();

    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const utenlandsopphold = notEmpty(useContextGetData(ContextDataType.UTENLANDSOPPHOLD));
    const dokumentasjon = useContextGetData(ContextDataType.DOKUMENTASJON);
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const fødselsdato = erBarnetFødt(omBarnet) ? omBarnet.fødselsdato : undefined;
    const termindato = erBarnetIkkeFødt(omBarnet) ? omBarnet.termindato : undefined;

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="Søknad.Pageheading" />
            </Heading>
            <OppsummeringIndex
                appName="Engangsstønad"
                stepConfig={stepConfig}
                sendSøknad={sendSøknad}
                cancelApplication={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                onContinueLater={navigator.fortsettSøknadSenere}
            >
                <DegOppsummeringspunkt person={person} />
                <OppsummeringIndex.Punkt tittel={i18n('OppsummeringSteg.OmBarnet')}>
                    <OmBarnetOppsummering omBarnet={omBarnet} dokumentasjon={dokumentasjon} />
                </OppsummeringIndex.Punkt>
                <BoIUtlandetOppsummeringspunkt
                    familiehendelseDato={notEmpty(fødselsdato || termindato)}
                    hendelseType={fødselsdato ? HendelseType.FØDSEL : HendelseType.TERMIN}
                    utenlandsopphold={utenlandsopphold}
                    tidligereUtenlandsopphold={tidligereUtenlandsopphold}
                    senereUtenlandsopphold={senereUtenlandsopphold}
                />
            </OppsummeringIndex>
        </ContentWrapper>
    );
};

export default OppsummeringSteg;
