import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, HStack, Heading, Radio, VStack } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { formatDate } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../../../context/UttaksplanDataContext';
import { Uttaksplanperiode, erVanligUttakPeriode } from '../../../../types/UttaksplanPeriode';
import { genererPeriodeId, getStønadskontoNavn } from '../../../utils/uttaksplanListeUtils';
import { PanelData } from '../EndrePeriodePanel';

interface Props {
    perioder: Uttaksplanperiode[];
    panelData: PanelData;
    setPanelData: (data: PanelData) => void;
    closePanel: () => void;
}

interface FormValues {
    periodeId: string | undefined;
}

export const VelgPeriodePanelStep = ({ perioder, panelData, setPanelData, closePanel }: Props) => {
    const intl = useIntl();
    const {
        foreldreInfo: { søker, navnPåForeldre },
    } = useUttaksplanData();

    const formMethods = useForm<FormValues>({
        defaultValues: {
            periodeId: genererPeriodeId(panelData.valgtPeriode),
        },
    });

    const onSubmit = (values: FormValues) => {
        const valgtPeriode = perioder.find((p) => genererPeriodeId(p) === values.periodeId);

        setPanelData({
            ...panelData,
            valgtPeriode,
            currentStep: 'step2',
        });
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="space-16">
                <Heading size="medium">
                    <FormattedMessage id="uttaksplan.hvilkeperiode" />
                </Heading>
                <RhfRadioGroup
                    name="periodeId"
                    control={formMethods.control}
                    validate={[
                        (value) => {
                            if (!value) {
                                return 'Du må velge hvilken periode du vil endre';
                            }

                            return undefined;
                        },
                    ]}
                >
                    {perioder.map((p, index) => {
                        const morsAktivitet = erVanligUttakPeriode(p) && p.morsAktivitet ? p.morsAktivitet : undefined;
                        const id = genererPeriodeId(p);
                        return (
                            <Radio key={id} value={id} autoFocus={index === 0}>
                                {`${formatDate(p.fom)} - ${formatDate(p.tom)} - ` +
                                    `${getStønadskontoNavn(
                                        intl,
                                        navnPåForeldre,
                                        søker === 'FAR_ELLER_MEDMOR',
                                        morsAktivitet,
                                        erVanligUttakPeriode(p) ? p.kontoType : undefined,
                                    )}`}
                            </Radio>
                        );
                    })}
                </RhfRadioGroup>
                <HStack justify="space-between">
                    <Button type="button" variant="secondary" onClick={closePanel}>
                        <FormattedMessage id="uttaksplan.avbryt" />
                    </Button>
                    <Button>
                        <FormattedMessage id="uttaksplan.gåVidere" />
                    </Button>
                </HStack>
            </VStack>
        </RhfForm>
    );
};
