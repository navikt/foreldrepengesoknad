import { TasklistStartIcon } from '@navikt/aksel-icons';
import GreenPanel from 'components/boxes/GreenPanel';
import Infobox from 'components/boxes/Infobox';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { finnSøker2Tekst } from 'utils/HvemPlanleggerUtils';

import { BodyLong, VStack } from '@navikt/ds-react';

import { Datepicker } from '@navikt/fp-form-hooks';
import { isAfterOrSameAsSixMonthsAgo, isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';
import { isAfterOrSame, isBeforeOrSame } from '@navikt/fp-validation/src/form/dateFormValidation';

type Props = {
    hvemPlanlegger: HvemPlanlegger;
    erAlenesøker: boolean;
    erOmBarnetIkkeOppgittFraFør: boolean;
    antallBarn?: string;
};

const Adopsjon: React.FunctionComponent<Props> = ({
    erAlenesøker,
    erOmBarnetIkkeOppgittFraFør,
    antallBarn,
    hvemPlanlegger,
}) => {
    const intl = useIntl();

    const flereBarn = antallBarn === '3' || antallBarn === '2';

    const formMethods = useFormContext<OmBarnet>();
    const fødselsdato = formMethods.watch('fødselsdato');
    const overtakelsesdato = formMethods.watch('overtakelsesdato');

    const erFarEllerMedmor =
        hvemPlanlegger.type === Situasjon.MOR_OG_FAR || hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR;

    return (
        <>
            <GreenPanel isDarkGreen={erOmBarnetIkkeOppgittFraFør} shouldFadeIn>
                <VStack gap="8">
                    <Datepicker
                        label={<FormattedMessage id="Adopsjon.Overtakelsesdato" values={{ erAlenesøker, flereBarn }} />}
                        name="overtakelsesdato"
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
                    <Datepicker
                        label={<FormattedMessage id="Adopsjon.Fødselsdato" values={{ flereBarn }} />}
                        name="fødselsdato"
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
            </GreenPanel>
            {overtakelsesdato && (
                <Infobox
                    header={
                        <FormattedMessage id="OmBarnetSteg.Adopsjon.ForeldrepengerInfo" values={{ erAlenesøker }} />
                    }
                    icon={<TasklistStartIcon height={24} width={24} color="#236B7D" fontSize="1.5rem" aria-hidden />}
                    shouldFadeIn
                >
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
                </Infobox>
            )}
        </>
    );
};

export default Adopsjon;
