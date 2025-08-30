import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, HStack, Heading, Radio, VStack } from '@navikt/ds-react';

import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { formatDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../../context/UttaksplanDataContext';
import { Planperiode } from '../../../types/Planperiode';
import { getStønadskontoNavn } from '../../../utils/stønadskontoerUtils';
import { ModalData } from '../EndrePeriodeModal';

interface Props {
    perioder: Planperiode[];
    modalData: ModalData;
    setModalData: (data: ModalData) => void;
    closeModal: () => void;
}

interface FormValues {
    periodeId: string | undefined;
}

export const VelgPeriodePanelStep = ({ perioder, modalData, setModalData, closeModal }: Props) => {
    const intl = useIntl();
    const navnPåForeldre = notEmpty(useContextGetData(UttaksplanContextDataType.NAVN_PÅ_FORELDRE));
    const erFarEllerMedmor = notEmpty(useContextGetData(UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR));

    const formMethods = useForm<FormValues>({
        defaultValues: {
            periodeId: modalData.valgtPeriode?.id,
        },
    });

    const onSubmit = (values: FormValues) => {
        const valgtPeriode = perioder.find((p) => p.id === values.periodeId);

        setModalData({
            ...modalData,
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
                    {perioder.map((p) => {
                        return (
                            <Radio key={p.id} value={p.id}>
                                {`${formatDate(p.fom)} - ${formatDate(p.tom)} - ${getStønadskontoNavn(intl, p.kontoType!, navnPåForeldre, erFarEllerMedmor)}`}
                            </Radio>
                        );
                    })}
                </RhfRadioGroup>
                <HStack justify="space-between">
                    <Button type="button" variant="secondary" onClick={closeModal}>
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
