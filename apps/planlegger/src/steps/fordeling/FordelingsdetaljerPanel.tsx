import { CalendarIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { erBarnetFødt } from 'types/Barnet';
import { erMorDelAvSøknaden } from 'types/HvemPlanlegger';
import { Uttaksdata } from 'utils/uttakHjelper';

import { BodyShort } from '@navikt/ds-react';

interface Props {
    barnet: OmBarnet;
    hvemPlanlegger: HvemPlanlegger;
    uttaksdata: Uttaksdata;
    fornavnSøker1: string;
    fornavnSøker2?: string;
}

const FordelingsdetaljerPanel: FunctionComponent<Props> = ({
    barnet,
    hvemPlanlegger,
    uttaksdata,
    fornavnSøker1,
    fornavnSøker2,
}) => {
    const intl = useIntl();
    const antallBarn = barnet.antallBarn;
    const erFødsel = barnet.erFødsel;
    const erFødt = erBarnetFødt(barnet);

    const { startdatoPeriode1, sluttdatoPeriode1, startdatoPeriode2, sluttdatoPeriode2, familiehendelsedato } =
        uttaksdata;
    const dato = intl.formatDate(familiehendelsedato, { day: 'numeric', month: 'short', year: 'numeric' });

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
                        {antallBarn !== '1' ? (
                            <FormattedMessage
                                id="FordelingsdetaljerPanel.Infoboks.HvisBarnetFlereBarn"
                                values={{
                                    erFødt,
                                    dato: dato,
                                    erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger),
                                }}
                            />
                        ) : (
                            <FormattedMessage
                                id="FordelingsdetaljerPanel.Infoboks.HvisBarnet"
                                values={{
                                    erFødt,
                                    dato: dato,
                                    erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger),
                                }}
                            />
                        )}
                    </>
                )}
                {!erFødsel && (
                    <FormattedMessage
                        id="FordelingsdetaljerPanel.Infoboks.HvisAdopsjon"
                        values={{
                            antallBarn,
                            dato: dato,
                            erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger),
                        }}
                    />
                )}
            </BodyShort>
            <BodyShort>
                <FormattedMessage
                    id="FordelingsdetaljerPanel.Infoboks.Periode"
                    values={{
                        hvem: fornavnSøker1,
                        fom: intl.formatDate(startdatoPeriode1, { day: 'numeric', month: 'short', year: 'numeric' }),
                        tom: intl.formatDate(sluttdatoPeriode1, { day: 'numeric', month: 'short', year: 'numeric' }),
                        b: (b) => <b>{b}</b>,
                    }}
                />
            </BodyShort>
            {fornavnSøker2 && sluttdatoPeriode2 && (
                <BodyShort>
                    <FormattedMessage
                        id="FordelingsdetaljerPanel.Infoboks.Periode"
                        values={{
                            hvem: fornavnSøker2,
                            fom: intl.formatDate(startdatoPeriode2, {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            }),
                            tom: intl.formatDate(sluttdatoPeriode2, {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            }),
                            b: (b) => <b>{b}</b>,
                        }}
                    />
                </BodyShort>
            )}
        </Infobox>
    );
};
export default FordelingsdetaljerPanel;
