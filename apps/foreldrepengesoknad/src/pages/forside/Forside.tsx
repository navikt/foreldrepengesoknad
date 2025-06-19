import { ContextDataType, useContextSaveAnyData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useSetSøknadsdata } from 'appData/useSetSøknadsdata';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    lagEndringsSøknad,
    lagNySøknadForRegistrerteBarn,
    lagSøknadFraValgteBarnMedSak,
    mapSøkerensEksisterendeSakFromDTO,
} from 'utils/eksisterendeSakUtils';

import { Alert, BodyShort, Button, GuidePanel, HStack, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { RhfConfirmationPanel, RhfForm } from '@navikt/fp-form-hooks';
import { FpSak, Søkerinfo } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';

import { BarnVelger } from './BarnVelger';
import { DinePlikter } from './dine-plikter/DinePlikter';
import { getBarnFraNesteSak, getSelectableBarnOptions, sorterSelectableBarnEtterYngst } from './forsideUtils';
import { DinePersonopplysningerModal } from './modaler/DinePersonopplysningerModal';

type VelkommenFormData = {
    harForståttRettigheterOgPlikter: boolean;
    valgteBarn: string | undefined;
};

interface Props {
    saker: FpSak[];
    harGodkjentVilkår: boolean;
    søkerInfo: Søkerinfo;
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void;
    setErEndringssøknad: (erEndringssøknad: boolean) => void;
    setSøknadGjelderNyttBarn: (søknadGjelderNyttBarn: boolean) => void;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
}

export const Forside = ({
    saker,
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
            // eslint-disable-next-line no-console
            console.error(
                'harForståttRettigheterOgPlikter er falsy til tross for at formet skal ha validert den',
                values.harForståttRettigheterOgPlikter,
            );
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

        // Uklarhet: hvorfor lete etter sak her. Er ikke sak allerede satt på "valgteBarn"
        const valgtEksisterendeSak = vilSøkeOmEndring
            ? saker.find((sak) => sak.saksnummer === valgteBarn.sak?.saksnummer)
            : undefined;

        if (valgtEksisterendeSak) {
            const eksisterendeSak = mapSøkerensEksisterendeSakFromDTO(
                valgtEksisterendeSak,
                barnFraNesteSak?.startdatoFørsteStønadsperiode,
                valgteBarn.fødselsdatoer,
            );

            const søknad = lagEndringsSøknad(
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
            const søknad = lagSøknadFraValgteBarnMedSak(
                { ...valgteBarn, sak: valgteBarn.sak }, // Gjør dette slik at funksjonen slipper deale med undefined sak
                intl,
                søkerInfo.søker.barn,
                søkerInfo.søker.fnr,
            );
            oppdaterSøknadIState(søknad);
        }

        // Barn er registrert, men det finnes ingen sak
        if (!valgtEksisterendeSak) {
            const søknad = lagNySøknadForRegistrerteBarn(valgteBarn);
            oppdaterSøknadIState(søknad);
        }

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
        <ContentWrapper pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="8">
                    <GuidePanel poster>
                        <VStack gap="2">
                            <FormattedMessage id="velkommen.guidepanel.del1" />
                            <FormattedMessage
                                id="velkommen.guidepanel.del2"
                                values={{
                                    a: (msg: any) => (
                                        <Link rel="noopener noreferrer" href={links.foreldrepenger}>
                                            {msg}
                                        </Link>
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
            </RhfForm>
        </ContentWrapper>
    );
};
