import { Heading } from '@navikt/ds-react';
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
import { FormattedMessage } from 'react-intl';
import { OmBarnet, erAdopsjon, erBarnetFødt, erBarnetIkkeFødt } from 'types/OmBarnet';
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

    const barnData = getDatoOgHendelsetype(omBarnet);

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
                    familiehendelseDato={barnData[0]}
                    hendelseType={barnData[1]}
                    utenlandsopphold={utenlandsopphold}
                    tidligereUtenlandsopphold={tidligereUtenlandsopphold}
                    senereUtenlandsopphold={senereUtenlandsopphold}
                />
            </OppsummeringIndex>
        </ContentWrapper>
    );
};

export default OppsummeringSteg;
