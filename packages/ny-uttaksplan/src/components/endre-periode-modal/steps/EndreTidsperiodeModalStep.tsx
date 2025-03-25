import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { HStack, Heading, VStack } from '@navikt/ds-react';

import { RhfDatepicker, RhfForm } from '@navikt/fp-form-hooks';
import { UtsettelseÅrsakType } from '@navikt/fp-types';

import { PeriodeHullType, Planperiode } from '../../../types/Planperiode';
import { getMaxDate, getMinDate } from '../../../utils/dateLimits';
import { getFomValidators, getTomValidators } from '../../../utils/dateValidators';
import { ModalButtons } from '../../modal-buttons/ModalButtons';
import { ModalData } from '../EndrePeriodeModal';

interface Props {
    modalData: ModalData;
    setModalData: (data: ModalData) => void;
    closeModal: () => void;
    familiehendelsedato: string;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    inneholderKunEnPeriode: boolean;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
}

interface FormValues {
    fom: string | undefined;
    tom: string | undefined;
}

export const EndreTidsperiodeModalStep = ({
    modalData,
    setModalData,
    closeModal,
    familiehendelsedato,
    handleUpdatePeriode,
    inneholderKunEnPeriode,
    erBarnetFødt,
    gjelderAdopsjon,
}: Props) => {
    const { valgtPeriode } = modalData;
    const intl = useIntl();
    const formMethods = useForm<FormValues>({
        defaultValues: {
            fom: modalData.valgtPeriode?.fom,
            tom: modalData.valgtPeriode?.tom,
        },
    });

    const onSubmit = (values: FormValues) => {
        handleUpdatePeriode({
            ...valgtPeriode!,
            fom: values.fom ?? valgtPeriode!.fom,
            tom: values.tom ?? valgtPeriode!.tom,
        });
        closeModal();
    };

    const fomValue = formMethods.watch('fom');
    const tomValue = formMethods.watch('tom');

    const getÅrsak = () => {
        if (valgtPeriode?.utsettelseÅrsak && valgtPeriode.utsettelseÅrsak === UtsettelseÅrsakType.Ferie) {
            return valgtPeriode.utsettelseÅrsak;
        }

        if (valgtPeriode?.periodeHullÅrsak && valgtPeriode.periodeHullÅrsak === PeriodeHullType.PERIODE_UTEN_UTTAK) {
            return valgtPeriode.periodeHullÅrsak;
        }

        return undefined;
    };

    const årsak = getÅrsak();
    const minDate = getMinDate({ årsak, kontoType: valgtPeriode?.kontoType, familiehendelsedato, gjelderAdopsjon });
    const maxDate = getMaxDate({ familiehendelsedato, kontoType: valgtPeriode?.kontoType });

    return (
        <>
            <Heading size="medium">Hvilke datoer skal perioden være?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <VStack gap="4">
                    <HStack gap="4">
                        <RhfDatepicker
                            showMonthAndYearDropdowns
                            minDate={minDate}
                            maxDate={maxDate}
                            label="Fra og med dato"
                            name="fom"
                            disableWeekends={true}
                            validate={getFomValidators({
                                intl,
                                familiehendelsedato,
                                kontoType: valgtPeriode?.kontoType,
                                tomValue,
                                erBarnetFødt,
                                minDate,
                                maxDate,
                                årsak,
                                gjelderAdopsjon,
                            })}
                        />
                        <RhfDatepicker
                            validate={getTomValidators({
                                intl,
                                familiehendelsedato,
                                kontoType: valgtPeriode?.kontoType,
                                fomValue,
                                erBarnetFødt,
                                minDate,
                                maxDate,
                                årsak,
                                gjelderAdopsjon,
                            })}
                            label="Til og med dato"
                            name="tom"
                            disableWeekends={true}
                            minDate={fomValue}
                            maxDate={maxDate}
                        />
                    </HStack>
                    <ModalButtons
                        onCancel={closeModal}
                        onGoPreviousStep={
                            inneholderKunEnPeriode
                                ? undefined
                                : () => {
                                      setModalData({ ...modalData, currentStep: 'step1' });
                                  }
                        }
                        isFinalStep={true}
                    />
                </VStack>
            </RhfForm>
        </>
    );
};
