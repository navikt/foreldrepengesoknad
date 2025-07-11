import { TasklistStartIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';

import { BodyLong, VStack } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { HvemPlanleggerType } from '@navikt/fp-types';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import {
    isAfterOrSame,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeOrSame,
    isBeforeTodayOrToday,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';

type Props = {
    hvemPlanlegger: HvemPlanlegger;
    erAlenesøker: boolean;
    erOmBarnetIkkeOppgittFraFør: boolean;
    antallBarn?: string;
};

export const Adopsjon = ({ erAlenesøker, erOmBarnetIkkeOppgittFraFør, antallBarn, hvemPlanlegger }: Props) => {
    const intl = useIntl();

    const flereBarn = antallBarn === '3' || antallBarn === '2';

    const formMethods = useFormContext<OmBarnet>();
    const fødselsdato = formMethods.watch('fødselsdato');
    const overtakelsesdato = formMethods.watch('overtakelsesdato');

    const erFarEllerMedmor =
        hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR ||
        hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR;

    return (
        <>
            <BluePanel isDarkBlue={erOmBarnetIkkeOppgittFraFør} shouldFadeIn>
                <VStack gap="8">
                    <RhfDatepicker
                        name="overtakelsesdato"
                        control={formMethods.control}
                        label={<FormattedMessage id="Adopsjon.Overtakelsesdato" values={{ erAlenesøker, flereBarn }} />}
                        minDate={dayjs().subtract(6, 'month').toDate()}
                        validate={[
                            isRequired(
                                intl.formatMessage({ id: 'Overtakelsesdato.Required' }, { erAlenesøker, flereBarn }),
                            ),
                            isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),
                            isAfterOrSameAsSixMonthsAgo(
                                intl.formatMessage({
                                    id: 'ValidationMessage.OlderThan6months',
                                }),
                            ),
                            isAfterOrSame(
                                intl.formatMessage({ id: 'ValidationMessage.FødselsdatoMåVæreFørOmsorgovertakelse' }),
                                fødselsdato,
                            ),
                            isBeforeOrSame(
                                intl.formatMessage({
                                    id: 'ValidationMessage.OmsorgsovertakelseKanIkkeVæreLengerEnn15ÅrEtterFødsel',
                                }),
                                fødselsdato ? dayjs(fødselsdato).add(15, 'years') : fødselsdato,
                            ),
                        ]}
                    />
                    <RhfDatepicker
                        name="fødselsdato"
                        control={formMethods.control}
                        label={<FormattedMessage id="Adopsjon.Fødselsdato" values={{ flereBarn }} />}
                        minDate={dayjs().subtract(15, 'years').toDate()}
                        maxDate={dayjs().toDate()}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'Fødselsdato.Required' })),
                            isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),
                            isBeforeTodayOrToday(
                                intl.formatMessage({
                                    id: 'ValidationMessage.IdagEllerTidligere',
                                }),
                            ),
                        ]}
                    />
                </VStack>
            </BluePanel>
            {overtakelsesdato && (
                <Infobox
                    header={
                        <FormattedMessage id="OmBarnetSteg.Adopsjon.ForeldrepengerInfo" values={{ erAlenesøker }} />
                    }
                    icon={<TasklistStartIcon height={24} width={24} color="#7F8900" fontSize="1.5rem" aria-hidden />}
                    shouldFadeIn
                    color="green"
                >
                    <VStack gap="2">
                        <BodyLong>
                            <FormattedMessage id="OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekst" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage
                                id="OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekstDel2Deg"
                                values={{
                                    erAlenesøker,
                                    erFarEllerMedmor,
                                    hvem: finnSøker2Tekst(intl, hvemPlanlegger),
                                }}
                            />
                        </BodyLong>
                    </VStack>
                </Infobox>
            )}
        </>
    );
};
