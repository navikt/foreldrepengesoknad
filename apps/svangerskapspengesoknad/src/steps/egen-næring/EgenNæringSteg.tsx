import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { FormattedMessage } from 'react-intl';
import { getRuteVelgArbeidEllerSkjema as getRuteSkjemaEllerVelgArbeid } from 'utils/tilretteleggingUtils';

import {
    EgenNæringPanel,
    getForhåndsvalgtNæringstype,
    getPrioritertRegistrertNæring,
} from '@navikt/fp-steg-egen-naering';
import { NæringDto, SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    søkerInfo: SvpPersonopplysningerDto_fpoversikt;
};

export const EgenNæringSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, søkerInfo }: Props) => {
    const { arbeidsforhold, selvstendigNæring: registrerteNæringer } = søkerInfo;

    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);

    const harRegistrertNæring = registrerteNæringer.length > 0;
    const stepConfig = useStepConfig({ arbeidsforhold, harRegistrertNæring });
    const navigator = useSvpNavigator({
        mellomlagreOgNaviger: mellomlagreSøknadOgNaviger,
        arbeidsforhold,
        harRegistrertNæring,
    });

    const onSubmit = (values: NæringDto) => {
        oppdaterEgenNæring({
            ...values,
            organisasjonsnummer: values.organisasjonsnummer === '' ? undefined : values.organisasjonsnummer,
        });

        const nextRoute = getRuteSkjemaEllerVelgArbeid(barnet.termindato, arbeidsforhold, arbeidsforholdOgInntekt);
        return navigator.goToStep(nextRoute);
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <EgenNæringPanel
                egenNæring={egenNæring}
                initialNæringstype={getForhåndsvalgtNæringstype(registrerteNæringer)}
                registrertNæring={getPrioritertRegistrertNæring(registrerteNæringer)}
                registrerteNæringer={registrerteNæringer}
                saveOnNext={onSubmit}
                onAvsluttOgSlett={avbrytSøknad}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                appOrigin="svangerskapspengesoknad"
                onStepChange={navigator.goToStep}
            />
        </SkjemaRotLayout>
    );
};
