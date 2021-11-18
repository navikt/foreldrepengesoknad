import { Block, intlUtils, Step } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { useIntl } from 'react-intl';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import Uttaksplan from 'uttaksplan/Uttaksplan';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useSøknad from 'app/utils/hooks/useSøknad';
import { getFarMedmorErAleneOmOmsorg, getKjønnFromFnr, getMorErAleneOmOmsorg } from 'app/utils/personUtils';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getForeldreparSituasjon } from 'app/utils/foreldreparSituasjonUtils';
import { Forelder } from 'app/types/Forelder';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';

const UttaksplanStep = () => {
    const intl = useIntl();

    const onValidSubmitHandler = () => [];
    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTENLANDSOPPHOLD);
    const onAvbrytSøknad = useAvbrytSøknad();

    const søkerinfo = useSøkerinfo();
    const søknad = useSøknad();

    const { person } = søkerinfo;
    const { annenForelder, søker, barn } = søknad;

    const annenForelderKjønn = getKjønnFromFnr(annenForelder);
    const erDeltUttak = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.harRettPåForeldrepenger : false;
    const erFarEllerMedmor = isFarEllerMedmor(søknad.søkersituasjon.rolle);
    const erAleneOmOmsorg = søker.erAleneOmOmsorg;
    const morErAleneOmOmsorg = getMorErAleneOmOmsorg(!erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const forelderVedAleneomsorg = erDeltUttak ? undefined : erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
    const familiehendelsesdato = getFamiliehendelsedato(barn);

    const situasjon = getForeldreparSituasjon(
        person.kjønn,
        annenForelderKjønn,
        erDeltUttak,
        morErAleneOmOmsorg,
        farMedmorErAleneOmOmsorg
    );

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            backLinkHref={getPreviousStepHref('uttaksplan')}
            activeStepId="uttaksplan"
            pageTitle={intlUtils(intl, 'søknad.uttaksplan')}
            stepTitle={intlUtils(intl, 'søknad.uttaksplan')}
            onCancel={onAvbrytSøknad}
            steps={stepConfig}
            kompakt={true}
        >
            <Uttaksplan
                situasjon={situasjon}
                forelderVedAleneomsorg={forelderVedAleneomsorg}
                erDeltUttak={erDeltUttak}
                uttaksplan={søknad.uttaksplan}
                familiehendelsesdato={familiehendelsesdato}
            />
            <Block textAlignCenter={true}>
                <Hovedknapp onClick={onValidSubmit}>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
            </Block>
        </Step>
    );
};

export default UttaksplanStep;
