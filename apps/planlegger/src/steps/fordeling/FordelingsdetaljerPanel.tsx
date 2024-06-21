import { CalendarIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erMorDelAvSøknaden } from 'utils/HvemPlanleggerUtils';
import { erBarnetFødt } from 'utils/barnetUtils';
import { Uttaksdata } from 'utils/uttakUtils';

import { BodyShort } from '@navikt/ds-react';

import { Infobox } from '@navikt/fp-ui';

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
            icon={<CalendarIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            shouldFadeIn
        >
            <BodyShort>
                {erFødsel && (
                    <FormattedMessage
                        id="FordelingsdetaljerPanel.Infoboks.HvisBarnet"
                        values={{
                            erFødt,
                            dato: dato,
                            erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger),
                            erFlereBarn: antallBarn !== '1',
                        }}
                    />
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
