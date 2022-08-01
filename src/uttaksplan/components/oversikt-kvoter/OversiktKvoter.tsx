import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { bemUtils, intlUtils } from '@navikt/fp-common';
import { Undertittel } from 'nav-frontend-typografi';
import Personkort from 'app/components/personkort/Personkort';
import ForelderIkon from 'app/components/foreldrepar/ForelderIkon';
import { getVarighetString } from 'app/utils/dateUtils';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useSøknad from 'app/utils/hooks/useSøknad';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getNavnPåForeldre } from 'app/utils/personUtils';
import { getSituasjonForelderSvg } from 'app/utils/foreldreparSituasjonUtils';
import { ForeldreparSituasjon } from 'app/types/ForeldreparSituasjonTypes';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { Periode } from 'uttaksplan/types/Periode';
import { BrukteDager, getBrukteDager } from 'uttaksplan/utils/brukteDagerUtils';
import { getUttaksstatus, Uttaksstatus } from 'uttaksplan/utils/uttaksstatus';
import Kontostatus from './konto-status/Kontostatus';
import TilesList from './tilesList/TilesList';
import './oversiktKvoter.less';
import { Situasjon } from 'app/types/Situasjon';

const bem = bemUtils('oversiktKvoter');

interface PropsPerForelder {
    brukteDagerPerForelder: BrukteDager;
    erDeltUttak: boolean;
    foreldreparSituasjon: ForeldreparSituasjon;
    navnPåForeldre: NavnPåForeldre;
    søkerErFarEllerMedmor: boolean;
}

const OversiktPerForelder: FunctionComponent<PropsPerForelder> = ({
    brukteDagerPerForelder,
    erDeltUttak,
    foreldreparSituasjon,
    navnPåForeldre,
    søkerErFarEllerMedmor,
}) => {
    const intl = useIntl();
    const søkerErMor = !søkerErFarEllerMedmor;
    const svgInfo = getSituasjonForelderSvg(foreldreparSituasjon);

    return (
        <div className={bem.block}>
            <div className={bem.element('perForelder')}>
                <Undertittel tag="h2" className="blokk-xs">
                    {intlUtils(intl, 'uttaksplan.oversiktKvoter.tittel.foreldre')}
                </Undertittel>
                <TilesList columns={'flex'}>
                    {(erDeltUttak || søkerErMor) && (
                        <Personkort ikon={<ForelderIkon forelder={svgInfo.mor} />} tittel={navnPåForeldre.mor}>
                            <strong>{getVarighetString(brukteDagerPerForelder.mor.dagerTotalt, intl)}</strong>
                        </Personkort>
                    )}
                    {(erDeltUttak || søkerErFarEllerMedmor) && (
                        <Personkort
                            ikon={<ForelderIkon forelder={svgInfo.farMedmor} />}
                            tittel={navnPåForeldre.farMedmor}
                        >
                            <strong>{getVarighetString(brukteDagerPerForelder.farMedmor.dagerTotalt, intl)}</strong>
                        </Personkort>
                    )}
                </TilesList>
            </div>
        </div>
    );
};

interface PropsPerKvote {
    erDeltUttak: boolean;
    navnPåForeldre: NavnPåForeldre;
    erEndringssøknad: boolean;
    uttaksstatus: Uttaksstatus;
    erFarEllerMedmor: boolean;
    situasjon: Situasjon;
    erAleneOmOmsorg: boolean;
}

const OversiktPerKvote: FunctionComponent<PropsPerKvote> = ({
    erDeltUttak,
    navnPåForeldre,
    erEndringssøknad,
    uttaksstatus,
    erFarEllerMedmor,
    situasjon,
    erAleneOmOmsorg,
}) => {
    return (
        <div className={bem.element('perKvote')}>
            <Undertittel tag="h2" className="blokk-xs">
                <FormattedMessage
                    id={
                        uttaksstatus.gjelderDagerBrukt
                            ? 'uttaksplan.oversiktKvoter.tittel.kontoer.brukteDager'
                            : 'uttaksplan.oversiktKvoter.tittel.kontoer.ikkeBrukteDager'
                    }
                    values={{ antall: erDeltUttak ? 2 : 1 }}
                />
            </Undertittel>
            <TilesList columns={2}>
                {uttaksstatus.uttak.map((uttak, idx) => (
                    <Kontostatus
                        key={idx}
                        uttak={uttak}
                        navnPåForeldre={navnPåForeldre}
                        erEndringssøknad={erEndringssøknad}
                        erFarEllerMedmor={erFarEllerMedmor}
                        situasjon={situasjon}
                        erAleneOmOmsorg={erAleneOmOmsorg}
                    />
                ))}
            </TilesList>
        </div>
    );
};

interface Props {
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    uttaksplan: Periode[];
    erDeltUttak: boolean;
    foreldreparSituasjon: ForeldreparSituasjon;
    familiehendelsesdato: Date;
}

const OversiktKvoter: FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer,
    uttaksplan,
    erDeltUttak,
    foreldreparSituasjon,
    familiehendelsesdato,
}) => {
    const søker = useSøkerinfo();
    const søknad = useSøknad();
    const søkerErFarEllerMedmor = isFarEllerMedmor(søknad.søkersituasjon.rolle);
    const navnPåForeldre = getNavnPåForeldre(søker.person, søknad.annenForelder, søkerErFarEllerMedmor);
    const uttaksstatus = getUttaksstatus({
        erDeltUttak: erDeltUttak,
        erEndringssøknad: søknad.erEndringssøknad,
        harKomplettUttaksplan: true,
        erFarEllerMedmor: søkerErFarEllerMedmor,
        tilgjengeligeStønadskontoer: tilgjengeligeStønadskontoer,
        uttaksplan,
    });
    const brukteDagerPerForelder = getBrukteDager(tilgjengeligeStønadskontoer, uttaksplan, familiehendelsesdato);

    return (
        <div className={bem.block}>
            <OversiktPerForelder
                brukteDagerPerForelder={brukteDagerPerForelder}
                erDeltUttak={erDeltUttak}
                foreldreparSituasjon={foreldreparSituasjon}
                navnPåForeldre={navnPåForeldre}
                søkerErFarEllerMedmor={søkerErFarEllerMedmor}
            />
            <OversiktPerKvote
                erDeltUttak={erDeltUttak}
                navnPåForeldre={navnPåForeldre}
                erEndringssøknad={søknad.erEndringssøknad}
                uttaksstatus={uttaksstatus}
                erFarEllerMedmor={søkerErFarEllerMedmor}
                situasjon={søknad.søkersituasjon.situasjon}
                erAleneOmOmsorg={søknad.søker.erAleneOmOmsorg}
            />
        </div>
    );
};

export default OversiktKvoter;
