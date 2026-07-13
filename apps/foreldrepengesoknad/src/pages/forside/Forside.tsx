import { ContextDataType, useContextGetAnyData } from 'appData/FpDataContext';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyShort, Button, GuidePanel, HStack, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { RhfConfirmationPanel, RhfForm } from '@navikt/fp-form-hooks';
import { FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';

import { BarnVelger } from './BarnVelger';
import { DinePlikter } from './dine-plikter/DinePlikter';
import { DinePersonopplysningerModal } from './modaler/DinePersonopplysningerModal';
import { ForsideFormValues } from './types/ForsideFormValues';
import { getSelectableBarnOptions, sorterSelectableBarnEtterYngst } from './utils/forsideUtils';
import { useFjernPlanleggerDataFraUrl } from './utils/useFjernPlanleggerDataFraUrl';
import { Søknadsmetadata, useStartSøknad } from './utils/useStartSøknad';

interface Props {
    saker: FpSak_fpoversikt[];
    harGodkjentVilkår: boolean;
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    oppdaterSøknadsmetadata: (metadata: Søknadsmetadata) => void;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
}

export const Forside = ({
    saker,
    harGodkjentVilkår,
    søkerInfo,
    oppdaterSøknadsmetadata,
    mellomlagreSøknadOgNaviger,
}: Props) => {
    const intl = useIntl();

    const getData = useContextGetAnyData();

    useFjernPlanleggerDataFraUrl();

    // Denne må memoriserast, ellers får barna ulik id for kvar render => trøbbel
    const selectableBarn = useMemo(
        () => [...getSelectableBarnOptions(saker, søkerInfo.barn)].sort(sorterSelectableBarnEtterYngst),
        [saker, søkerInfo.barn],
    );

    const harPlanleggerData = !!getData(ContextDataType.KOMMER_FRA_PLANLEGGER);

    const { startSøknad } = useStartSøknad({
        saker,
        selectableBarn,
        søkerInfo,
        harPlanleggerData,
        oppdaterSøknadsmetadata,
        mellomlagreSøknadOgNaviger,
    });

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
            <RhfForm formMethods={formMethods} onSubmit={startSøknad}>
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
                        <VStack gap="space-4">
                            <BodyShort>
                                <FormattedMessage id="velkommen.samtykkeIntro.del1" />
                            </BodyShort>
                            <DinePlikter />
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
