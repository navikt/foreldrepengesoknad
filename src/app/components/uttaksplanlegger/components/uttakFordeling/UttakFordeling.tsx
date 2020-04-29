import * as React from 'react';
import { Periode, TilgjengeligStønadskonto } from 'app/types/uttaksplan/periodetyper';
import { Søknadsinfo } from 'app/selectors/types';
import { getBrukteDager } from './brukteDagerUtils';
import { getTilgjengeligeDager } from './tilgjengeligeDagerUtils';
import FordelingGraf from 'shared/components/fordelingGraf/FordelingGraf';
import { getVarighetString } from 'common/util/intlUtils';
import { injectIntl, IntlShape } from 'react-intl';
import { getFordelingDeltOmsorg, getFordelingIkkeDeltOmsorg } from './uttakFordelingUtils';

interface Props {
    søknadsinfo: Søknadsinfo;
    perioder: Periode[];
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    intl: IntlShape;
}

const UttakFordeling: React.StatelessComponent<Props> = ({
    søknadsinfo,
    tilgjengeligeStønadskontoer,
    perioder,
    intl
}) => {
    const {
        søker,
        søknaden: { erDeltUttak, familiehendelsesdato }
    } = søknadsinfo;

    const brukteDager = getBrukteDager(tilgjengeligeStønadskontoer, perioder, familiehendelsesdato);

    const tilgjengeligeDager = getTilgjengeligeDager(
        tilgjengeligeStønadskontoer,
        erDeltUttak,
        erDeltUttak ? undefined : søker.forelder
    );

    const fordeling = erDeltUttak
        ? getFordelingDeltOmsorg(tilgjengeligeDager, brukteDager)
        : getFordelingIkkeDeltOmsorg(
              tilgjengeligeDager,
              søker.erMor ? brukteDager.mor.dagerTotalt : brukteDager.farMedmor.dagerTotalt,
              søker.forelder
          );

    const { mor, farMedmor } = brukteDager;

    if (fordeling === undefined) {
        return null;
    }

    return (
        <div>
            {
                <FordelingGraf
                    tittel={erDeltUttak ? 'Deres fordeling' : 'Dine dager'}
                    status="feil"
                    statusTekst="Whoa"
                    mor={
                        erDeltUttak || søker.erMor
                            ? {
                                  antallDager: mor.dagerTotalt,
                                  harForMangeDager: mor.dagerTotalt > tilgjengeligeDager.maksDagerMor,
                                  navn: søknadsinfo.navn.mor.fornavn,
                                  ikonRef: 'mor1',
                                  tittel: getVarighetString(mor.dagerTotalt, intl)
                              }
                            : undefined
                    }
                    farMedmor={
                        erDeltUttak || søker.erFarEllerMedmor
                            ? {
                                  antallDager: farMedmor.dagerTotalt,
                                  harForMangeDager: farMedmor.dagerTotalt > tilgjengeligeDager.maksDagerFar,
                                  navn: søknadsinfo.navn.farMedmor.fornavn,
                                  ikonRef: 'far1',
                                  tittel: getVarighetString(farMedmor.dagerTotalt, intl)
                              }
                            : undefined
                    }
                    fordeling={fordeling}
                />
            }
        </div>
    );
};

export default injectIntl(UttakFordeling);
