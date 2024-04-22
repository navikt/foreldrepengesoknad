import { CalendarIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import Infobox from 'components/boxes/Infobox';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { erBarnetFødt } from 'types/Barnet';
import { erMorDelAvSøknaden } from 'types/HvemPlanlegger';
import { Uttaksdata } from 'utils/uttakHjelper';

import { BodyLong } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

interface Props {
    uttaksdata: Uttaksdata;
    fornavnPart1: string;
    fornavnPart2?: string;
}

const FordelingsdetaljerPanel: FunctionComponent<Props> = ({ uttaksdata, fornavnPart1, fornavnPart2 }) => {
    const intl = useIntl();
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const antallBarn = barnet.antallBarn;
    const erFødsel = barnet.erFødsel;
    const erFødt = erBarnetFødt(barnet);
    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;

    const farHarIkkeRett = arbeidssituasjon.jobberAnnenPart === false;
    const kunEnPartSkalHa = !morHarIkkeRett && farHarIkkeRett;

    const { startdatoSøker1, sluttdatoSøker1, startdatoSøker2, sluttdatoSøker2, familiehendelsedato } = uttaksdata;
    const dato = dayjs(familiehendelsedato).format('D. MMMM');

    return (
        <Infobox
            header={<FormattedMessage id="FordelingsdetaljerPanel.InfoboksTittel" />}
            icon={<CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            shouldFadeIn
        >
            <BodyLong>
                <FormattedMessage
                    id="FordelingsdetaljerPanel.InfoboksTekst.FørsteDag"
                    values={{
                        hvem: fornavnPart1,
                        dag: intl.formatDate(startdatoSøker1, {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                        }),
                    }}
                />
            </BodyLong>
            <BodyLong spacing>
                <FormattedMessage
                    id="FordelingsdetaljerPanel.InfoboksTekst.SisteDag"
                    values={{
                        hvem: fornavnPart1,
                        dag: intl.formatDate(sluttdatoSøker1, {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                        }),
                    }}
                />
            </BodyLong>
            {fornavnPart2 && sluttdatoSøker2 && (
                <>
                    <BodyLong>
                        <FormattedMessage
                            id="FordelingsdetaljerPanel.InfoboksTekst.FørsteDag"
                            values={{
                                hvem: fornavnPart2,
                                dag: intl.formatDate(startdatoSøker2, {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: '2-digit',
                                }),
                            }}
                        />
                    </BodyLong>
                    <BodyLong spacing>
                        <FormattedMessage
                            id="FordelingsdetaljerPanel.InfoboksTekst.SisteDag"
                            values={{
                                hvem: fornavnPart2,
                                dag: intl.formatDate(sluttdatoSøker2, {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: '2-digit',
                                }),
                            }}
                        />
                    </BodyLong>
                </>
            )}
            <BodyLong size="small">
                {erFødsel ? (
                    <>
                        {erFødt ? (
                            <FormattedMessage
                                id="FordelingsdetaljerPanel.InfoboksTekst.HvisFødt"
                                values={{
                                    antallBarn,
                                    kunEnPartSkalHa,
                                    erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger.type),
                                    erFødsel,
                                    dato: dato,
                                }}
                            />
                        ) : (
                            <FormattedMessage
                                id="FordelingsdetaljerPanel.InfoboksTekst.HvisTermin"
                                values={{
                                    antallBarn,
                                    kunEnPartSkalHa,
                                    erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger.type),
                                    erFødsel,
                                    dato: dato,
                                }}
                            />
                        )}
                    </>
                ) : (
                    <FormattedMessage
                        id="FordelingsdetaljerPanel.InfoboksTekst.HvisAdopsjon"
                        values={{
                            antallBarn,
                            kunEnPartSkalHa,
                            erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger.type),
                            erFødsel,
                            dato: dato,
                        }}
                    />
                )}
            </BodyLong>
        </Infobox>
    );
};
export default FordelingsdetaljerPanel;
