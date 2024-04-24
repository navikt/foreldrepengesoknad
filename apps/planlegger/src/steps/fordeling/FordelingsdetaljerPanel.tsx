import { CalendarIcon } from '@navikt/aksel-icons';
import Infobox from 'components/boxes/Infobox';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erMorDelAvSøknaden } from 'utils/HvemPlanleggerUtils';
import { erBarnetFødt } from 'utils/barnetUtils';
import { Uttaksdata } from 'utils/uttakUtils';

import { BodyLong } from '@navikt/ds-react';

interface Props {
    barnet: OmBarnet;
    hvemPlanlegger: HvemPlanlegger;
    uttaksdata: Uttaksdata;
    fornavnPart1: string;
    fornavnPart2?: string;
}

const FordelingsdetaljerPanel: FunctionComponent<Props> = ({
    barnet,
    hvemPlanlegger,
    uttaksdata,
    fornavnPart1,
    fornavnPart2,
}) => {
    const intl = useIntl();
    const antallBarn = barnet.antallBarn;
    const erFødsel = barnet.erFødsel;
    const erFødt = erBarnetFødt(barnet);

    const { startdatoSøker1, sluttdatoSøker1, startdatoSøker2, sluttdatoSøker2, familiehendelsedato } = uttaksdata;
    const dato = intl.formatDate(familiehendelsedato, { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <Infobox
            header={<FormattedMessage id="FordelingsdetaljerPanel.InfoboksTittel" />}
            icon={<CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
            shouldFadeIn
        >
            <BodyLong>
                {erFødsel && (
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
            </BodyLong>
            <BodyLong>
                <FormattedMessage
                    id="FordelingsdetaljerPanel.Infoboks.Periode"
                    values={{
                        hvem: fornavnPart1,
                        fom: intl.formatDate(startdatoSøker1, { day: 'numeric', month: 'short', year: 'numeric' }),
                        tom: intl.formatDate(sluttdatoSøker1, { day: 'numeric', month: 'short', year: 'numeric' }),
                        b: (b) => <b>{b}</b>,
                    }}
                />
            </BodyLong>
            {fornavnPart2 && sluttdatoSøker2 && (
                <BodyLong>
                    <FormattedMessage
                        id="FordelingsdetaljerPanel.Infoboks.Periode"
                        values={{
                            hvem: fornavnPart2,
                            fom: intl.formatDate(startdatoSøker2, { day: 'numeric', month: 'short', year: 'numeric' }),
                            tom: intl.formatDate(sluttdatoSøker2, { day: 'numeric', month: 'short', year: 'numeric' }),
                            b: (b) => <b>{b}</b>,
                        }}
                    />
                </BodyLong>
            )}
        </Infobox>
    );
};
export default FordelingsdetaljerPanel;
