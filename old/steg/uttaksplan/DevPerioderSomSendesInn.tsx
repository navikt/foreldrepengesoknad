import * as React from 'react';
import DevBlock from 'common/dev/DevBlock';
import Periodeliste from 'app/components/uttaksplanlegger/components/periodeliste/Periodeliste';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Søknadsinfo } from 'app/selectors/types';
import { Periode } from 'app/types/uttaksplan/periodetyper';

interface Props {
    søknadsinfo: Søknadsinfo;
    perioderSomSkalSendesInn: Periode[];
}

const DevPerioderSomSendesInn: React.FunctionComponent<Props> = ({ søknadsinfo, perioderSomSkalSendesInn }) => (
    <DevBlock alwaysActive={true}>
        <Ekspanderbartpanel tittel="Perioder som sendes inn" apen={true}>
            <Periodeliste
                erDeltUttak={søknadsinfo.søknaden.erDeltUttak}
                perioder={perioderSomSkalSendesInn}
                meldingerPerPeriode={{}}
                informasjon={undefined}
                navn={søknadsinfo.navn}
                lastAddedPeriodeId={undefined}
                onReplaceHullWithOpphold={() => null}
                onReplaceHullWithPeriode={() => null}
                deletePeriode={() => null}
                updatePeriode={() => null}
                antallFeriedager={0}
                harMidlertidigOmsorg={false}
                uttaksplanValidering={undefined as any}
            />
        </Ekspanderbartpanel>
    </DevBlock>
);

export default DevPerioderSomSendesInn;
