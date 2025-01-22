import { ContextDataType, useContextSaveAnyData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useSetSøknadsdata } from 'appData/useSetSøknadsdata';
import { useMemo } from 'react';
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
    const oppdaterDataIState = useContextSaveAnyData();
    const { oppdaterSøknadIState } = useSetSøknadsdata();

    // Denne må memoriserast, ellers får barna ulik id for kvar render => trøbbel
    const selectableBarn = useMemo(
        () => [...getSelectableBarnOptions(saker, søkerInfo.søker.barn)].sort(sorterSelectableBarnEtterYngst),
        [saker, søkerInfo.søker.barn],
    );

    const onSubmit = (values: VelkommenFormData) => {
        // Skal i utgangspunktet ikke få submitte hvis denne ikke er true
        if (!values.harForståttRettigheterOgPlikter) {
            return;
        }
        setHarGodkjentVilkår(true);

        const valgteBarn = selectableBarn.find((sb) => sb.id === values.valgteBarn);

        // Har valgt å opprette en helt ny sak
        if (valgteBarn === undefined) {
            setErEndringssøknad(false);
            setSøknadGjelderNyttBarn(true);
            return navigator.goToNextStep(SøknadRoutes.SØKERSITUASJON);
        }

        const barnFraNesteSak = getBarnFraNesteSak(valgteBarn, selectableBarn);
        oppdaterDataIState(ContextDataType.BARN_FRA_NESTE_SAK, barnFraNesteSak);
        const vilSøkeOmEndring = !!valgteBarn.kanSøkeOmEndring;

        // TODO: hvorfor lete etter sak her. Er ikke sak allerede satt på "valgteBarn"
        const valgtEksisterendeSak = vilSøkeOmEndring
            ? saker.find((sak) => sak.saksnummer === valgteBarn.sak?.saksnummer)
            : undefined;

        if (valgtEksisterendeSak) {
            const eksisterendeSak = mapSøkerensEksisterendeSakFromDTO(
                valgtEksisterendeSak,
                barnFraNesteSak?.startdatoFørsteStønadsperiode,
                valgteBarn.fødselsdatoer,
            );

            const søknad = opprettSøknadFraEksisterendeSak(
                søkerInfo.søker,
                eksisterendeSak,
                intl,
                valgtEksisterendeSak.annenPart,
                valgteBarn,
            );
            oppdaterSøknadIState(søknad, eksisterendeSak);

            setErEndringssøknad(true);
            setSøknadGjelderNyttBarn(false);
            return navigator.goToNextStep(SøknadRoutes.UTTAKSPLAN);
        }

        // Det finnes en sak som ikke kan endres. Lag derfor ny søknad fra eksisterende sak
        if (valgteBarn.sak !== undefined && valgteBarn.kanSøkeOmEndring === false) {
            const søknad = opprettSøknadFraValgteBarnMedSak(
                { ...valgteBarn, sak: valgteBarn.sak }, //TODO: usikker om dette blir peneere TS eller hacky
                intl,
                søkerInfo.søker.barn,
                søkerInfo.søker.fnr,
            );
            oppdaterSøknadIState(søknad);
        }

        // Barn er registrert, men det finnes ingen sak
        if (!valgtEksisterendeSak) {
            const søknad = opprettSøknadFraValgteBarn(valgteBarn);
            oppdaterSøknadIState(søknad);
        }

        // TODO: vurder om disse skal ligge som default, eller om vi vil ha de inn i "if" og kaste en error hvis ingen av casene slår inn.
        setErEndringssøknad(false);
        setSøknadGjelderNyttBarn(false);
        return navigator.goToNextStep(SøknadRoutes.SØKERSITUASJON);
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
                        <BarnVelger selectableBarn={selectableBarn} />
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
                            <Button type="submit" variant="primary">
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
