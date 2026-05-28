import { ContextDataType, useContextGetAnyData, useContextSaveAnyData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useSetSøknadsdata } from 'appData/useSetSøknadsdata';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import {
    lagEndringsSøknad,
    lagNySøknadForRegistrerteBarn,
    lagSøknadFraValgteBarnMedSak,
    mapSøkerensEksisterendeSakFromDTO,
} from 'utils/eksisterendeSakUtils';

import { Alert, BodyShort, Button, GuidePanel, HStack, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { RhfConfirmationPanel, RhfForm } from '@navikt/fp-form-hooks';
import { FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';

import { ValgtBarn } from '../../types/ValgtBarn';
import { BarnVelger, SelectableBarnOptions } from './BarnVelger';
import { DinePlikter } from './dine-plikter/DinePlikter';
import { getSelectableBarnOptions, sorterSelectableBarnEtterYngst } from './forsideUtils';
import { DinePersonopplysningerModal } from './modaler/DinePersonopplysningerModal';
import { ForsideFormValues } from './types/ForsideFormValues';

interface Props {
    saker: FpSak_fpoversikt[];
    harGodkjentVilkår: boolean;
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
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
    const getData = useContextGetAnyData();
    const { oppdaterSøknadIState } = useSetSøknadsdata();

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        if (searchParams.has('planleggerData')) {
            const oppdatert = new URLSearchParams(searchParams);
            oppdatert.delete('planleggerData');
            setSearchParams(oppdatert, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    // Denne må memoriserast, ellers får barna ulik id for kvar render => trøbbel
    const selectableBarn = useMemo(
        () => [...getSelectableBarnOptions(saker, søkerInfo.barn)].sort(sorterSelectableBarnEtterYngst),
        [saker, søkerInfo.barn],
    );

    const harPlanleggerData = !!getData(ContextDataType.KOMMER_FRA_PLANLEGGER);

    const nullstillPlanleggerTilstand = () => {
        oppdaterDataIState(ContextDataType.SØKERSITUASJON, undefined);
        oppdaterDataIState(ContextDataType.OM_BARNET, undefined);
        oppdaterDataIState(ContextDataType.PERIODE_MED_FORELDREPENGER, undefined);
        oppdaterDataIState(ContextDataType.UTTAKSPLAN, undefined);
        oppdaterDataIState(ContextDataType.KOMMER_FRA_PLANLEGGER, undefined);
    };

    const gåTilSøkersituasjonSomNySøknad = () => {
        setErEndringssøknad(false);
        setSøknadGjelderNyttBarn(true);
        return navigator.goToStep(SøknadRoutes.SØKERSITUASJON);
    };

    const finnValgtEksisterendeSak = (valgteBarn: ValgtBarn) => {
        const vilSøkeOmEndring = !!valgteBarn.kanSøkeOmEndring;
        return vilSøkeOmEndring ? saker.find((sak) => sak.saksnummer === valgteBarn.sak?.saksnummer) : undefined;
    };

    const gåTilEndringssøknad = (valgteBarn: ValgtBarn, valgtEksisterendeSak: FpSak_fpoversikt) => {
        const eksisterendeSak = mapSøkerensEksisterendeSakFromDTO(valgtEksisterendeSak, valgteBarn.fødselsdatoer);

        const søknad = lagEndringsSøknad(søkerInfo, eksisterendeSak, intl, valgtEksisterendeSak.annenPart, valgteBarn);
        oppdaterSøknadIState(søknad);

        setErEndringssøknad(true);
        setSøknadGjelderNyttBarn(false);
        return navigator.goToStep(SøknadRoutes.UTTAKSPLAN);
    };

    const opprettNySøknadBasertPåValgtBarn = (valgteBarn: ValgtBarn) => {
        if (valgteBarn.sak !== undefined && valgteBarn.kanSøkeOmEndring === false) {
            const søknad = lagSøknadFraValgteBarnMedSak(
                { ...valgteBarn, sak: valgteBarn.sak }, // Gjør dette slik at funksjonen slipper deale med undefined sak
                intl,
                søkerInfo.barn,
                søkerInfo.fnr,
            );
            oppdaterSøknadIState(søknad);
            return;
        }

        // Barn er registrert, men det finnes ingen sak
        const søknad = lagNySøknadForRegistrerteBarn(valgteBarn);
        oppdaterSøknadIState(søknad);
    };

    const onSubmit = (values: ForsideFormValues) => {
        const harBekreftetRettigheterOgPlikter = values.harForståttRettigheterOgPlikter;

        const gjelderPlanlagtBarnFraPlanlegger =
            values.valgteBarn === SelectableBarnOptions.SØKNAD_GJELDER_PLANLAGT_BARN;

        // Skal i utgangspunktet ikke få submitte hvis denne ikke er true
        if (!harBekreftetRettigheterOgPlikter) {
            // eslint-disable-next-line no-console
            console.error(
                'harForståttRettigheterOgPlikter er falsy til tross for at formet skal ha validert den',
                values.harForståttRettigheterOgPlikter,
            );
            return;
        }
        setHarGodkjentVilkår(true);

        // Bruker har valgt det planlagte barnet fra planleggeren
        if (gjelderPlanlagtBarnFraPlanlegger) {
            return gåTilSøkersituasjonSomNySøknad();
        }

        // Bruker har valgt et annet barn — nullstill eventuell mappet planlegger-tilstand
        if (harPlanleggerData) {
            nullstillPlanleggerTilstand();
        }

        const valgteBarn = selectableBarn.find((sb) => sb.id === values.valgteBarn);

        // Har valgt å opprette en helt ny sak
        if (valgteBarn === undefined) {
            return gåTilSøkersituasjonSomNySøknad();
        }

        oppdaterDataIState(ContextDataType.VALGT_EKSISTERENDE_SAKSNR, valgtBarn?.sak?.saksnummer);

        const valgtEksisterendeSak = finnValgtEksisterendeSak(valgteBarn);

        if (valgtEksisterendeSak) {
            return gåTilEndringssøknad(valgteBarn, valgtEksisterendeSak);
        }

        opprettNySøknadBasertPåValgtBarn(valgteBarn);

        setErEndringssøknad(false);
        setSøknadGjelderNyttBarn(false);
        return navigator.goToStep(SøknadRoutes.SØKERSITUASJON);
    };

    const formMethods = useForm<ForsideFormValues>({
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
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="space-32">
                    <GuidePanel poster>
                        <VStack gap="space-8">
                            <FormattedMessage id="velkommen.guidepanel.del1" />
                            <FormattedMessage
                                id="velkommen.guidepanel.del2"
                                values={{
                                    a: (msg) => (
                                        <Link rel="noopener noreferrer" href={links.foreldrepenger}>
                                            {msg}
                                        </Link>
                                    ),
                                }}
                            />
                        </VStack>
                    </GuidePanel>
                    <BarnVelger selectableBarn={selectableBarn} harPlanleggerData={harPlanleggerData} />
                    <Alert variant="info">
                        <FormattedMessage id="velkommen.lagring.info" />
                    </Alert>
                    <RhfConfirmationPanel
                        name="harForståttRettigheterOgPlikter"
                        control={formMethods.control}
                        label={intl.formatMessage({ id: 'velkommen.samtykke' })}
                        validate={[
                            (value: boolean) =>
                                value
                                    ? null
                                    : intl.formatMessage({
                                          id: 'valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd',
                                      }),
                        ]}
                    >
                        <VStack gap="space-20">
                            <HStack gap="space-4">
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
        </SkjemaRotLayout>
    );
};
