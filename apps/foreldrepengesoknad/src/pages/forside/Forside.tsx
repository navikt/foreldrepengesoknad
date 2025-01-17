import { ContextDataType, useContextSaveAnyData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useSetSøknadsdata } from 'appData/useSetSøknadsdata';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    mapSøkerensEksisterendeSakFromDTO,
    opprettSøknadFraEksisterendeSak,
    opprettSøknadFraValgteBarn,
    opprettSøknadFraValgteBarnMedSak,
} from 'utils/eksisterendeSakUtils';

import { Alert, BodyShort, Button, GuidePanel, HStack, Heading, VStack } from '@navikt/ds-react';

import { Sak } from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';
import { RhfConfirmationPanel, RhfForm } from '@navikt/fp-form-hooks';
import { LocaleNo, Søkerinfo } from '@navikt/fp-types';
import { ContentWrapper, LanguageToggle } from '@navikt/fp-ui';

import { BarnVelger } from './BarnVelger';
import { DinePlikter } from './dine-plikter/DinePlikter';
import { getBarnFraNesteSak, getSelectableBarnOptions, sorterSelectableBarnEtterYngst } from './forsideUtils';
import { DinePersonopplysningerModal } from './modaler/DinePersonopplysningerModal';

type VelkommenFormData = {
    harForståttRettigheterOgPlikter: boolean;
    valgteBarn: string | undefined;
};

interface Props {
    onChangeLocale: (locale: LocaleNo) => void;
    locale: LocaleNo;
    saker: Sak[];
    harGodkjentVilkår: boolean;
    søkerInfo: Søkerinfo;
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void;
    setErEndringssøknad: (erEndringssøknad: boolean) => void;
    setSøknadGjelderNyttBarn: (søknadGjelderNyttBarn: boolean) => void;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
}

export const Forside = ({
    locale,
    saker,
    onChangeLocale,
    harGodkjentVilkår,
    søkerInfo,
    setHarGodkjentVilkår,
    setErEndringssøknad,
    setSøknadGjelderNyttBarn,
    mellomlagreSøknadOgNaviger,
}: Props) => {
    const intl = useIntl();

    const navigator = useFpNavigator(søkerInfo.arbeidsforhold, mellomlagreSøknadOgNaviger);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const oppdaterDataIState = useContextSaveAnyData();
    const { oppdaterSøknadIState } = useSetSøknadsdata();

    // Denne må memoriserast, ellers får barna ulik id for kvar render => trøbbel
    const selectableBarn = useMemo(
        () => getSelectableBarnOptions(saker, søkerInfo.søker.barn),
        [saker, søkerInfo.søker.barn],
    );
    const sortedSelectableBarn = [...selectableBarn].sort(sorterSelectableBarnEtterYngst);

    const onSubmit = (values: VelkommenFormData) => {
        if (!values.harForståttRettigheterOgPlikter) {
            return;
        }

        setIsSubmitting(true);

        const valgteBarn = selectableBarn.find((sb) => sb.id === values.valgteBarn);
        const vilSøkeOmEndring = !!valgteBarn?.kanSøkeOmEndring;

        let barnFraNesteSak = undefined;
        if (valgteBarn !== undefined) {
            barnFraNesteSak = getBarnFraNesteSak(valgteBarn, sortedSelectableBarn);
            oppdaterDataIState(ContextDataType.BARN_FRA_NESTE_SAK, barnFraNesteSak);
        }

        const valgtEksisterendeSak = vilSøkeOmEndring
            ? saker.find((sak) => sak.saksnummer === valgteBarn.sak?.saksnummer)
            : undefined;

        const endringssøknad = vilSøkeOmEndring && valgtEksisterendeSak;
        const nySøknadPåAlleredeSøktBarn = valgteBarn?.sak !== undefined && valgteBarn?.kanSøkeOmEndring === false;
        const nySøknadPåValgteRegistrerteBarn =
            !endringssøknad && !nySøknadPåAlleredeSøktBarn && valgteBarn !== undefined;

        let nextRoute = SøknadRoutes.SØKERSITUASJON;
        let søknadGjelderNyttBarn = false;

        if (endringssøknad) {
            const eksisterendeSak = mapSøkerensEksisterendeSakFromDTO(
                valgtEksisterendeSak,
                barnFraNesteSak?.startdatoFørsteStønadsperiode,
                valgteBarn.fødselsdatoer,
            );

            nextRoute = SøknadRoutes.UTTAKSPLAN;

            const søknad = opprettSøknadFraEksisterendeSak(
                søkerInfo.søker,
                eksisterendeSak,
                intl,
                valgtEksisterendeSak.annenPart,
                valgteBarn,
            );
            oppdaterSøknadIState(søknad, eksisterendeSak);
        } else if (nySøknadPåAlleredeSøktBarn) {
            const søknad = opprettSøknadFraValgteBarnMedSak(
                valgteBarn,
                intl,
                søkerInfo.søker.barn,
                søkerInfo.søker.fnr,
            );
            oppdaterSøknadIState(søknad);
        } else if (nySøknadPåValgteRegistrerteBarn) {
            const søknad = opprettSøknadFraValgteBarn(valgteBarn);
            oppdaterSøknadIState(søknad);
        } else {
            søknadGjelderNyttBarn = true;
        }

        setHarGodkjentVilkår(true);
        setErEndringssøknad(vilSøkeOmEndring);
        setSøknadGjelderNyttBarn(søknadGjelderNyttBarn);

        return navigator.goToNextStep(nextRoute);
    };

    const formMethods = useForm<VelkommenFormData>({
        defaultValues: {
            harForståttRettigheterOgPlikter: harGodkjentVilkår,
        },
    });

    const valgtBarnId = formMethods.watch('valgteBarn');
    const valgtBarn = selectableBarn.find((barn) => barn.id === valgtBarnId);
    const knapptekst =
        valgtBarn?.kanSøkeOmEndring === true
            ? intl.formatMessage({ id: 'velkommen.endreSøknad' })
            : intl.formatMessage({ id: 'velkommen.begynnMedSøknad' });

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="10">
                <LanguageToggle locale={locale} availableLocales={['nb', 'nn']} toggleLanguage={onChangeLocale} />
                <ContentWrapper>
                    <VStack gap="8">
                        <HStack justify="center">
                            <Heading size="xlarge">
                                <FormattedMessage id="velkommen.tittel" />
                            </Heading>
                        </HStack>
                        <GuidePanel poster>
                            <VStack gap="2">
                                <FormattedMessage id="velkommen.guidepanel.del1" />
                                <FormattedMessage
                                    id="velkommen.guidepanel.del2"
                                    values={{
                                        a: (msg: any) => (
                                            <a className="lenke" rel="noopener noreferrer" href={links.foreldrepenger}>
                                                {msg}
                                            </a>
                                        ),
                                    }}
                                />
                            </VStack>
                        </GuidePanel>
                        <BarnVelger selectableBarn={sortedSelectableBarn} />
                        <Alert variant="info">
                            <FormattedMessage id="velkommen.lagring.info" />
                        </Alert>
                        <RhfConfirmationPanel
                            name="harForståttRettigheterOgPlikter"
                            label={intl.formatMessage({ id: 'velkommen.samtykke' })}
                            validate={[
                                (value: boolean) =>
                                    value !== true
                                        ? intl.formatMessage({
                                              id: 'valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd',
                                          })
                                        : null,
                            ]}
                        >
                            <VStack gap="5">
                                <HStack gap="1">
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.samtykkeIntro.del1" />
                                    </BodyShort>
                                    <DinePlikter />
                                </HStack>
                            </VStack>
                        </RhfConfirmationPanel>
                        <HStack justify="center">
                            <Button type="submit" variant="primary" disabled={isSubmitting} loading={isSubmitting}>
                                {knapptekst}
                            </Button>
                        </HStack>
                        <DinePersonopplysningerModal />
                    </VStack>
                </ContentWrapper>
            </VStack>
        </RhfForm>
    );
};
