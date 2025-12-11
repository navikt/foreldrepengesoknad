import { ArrowRightIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';

import { Alert, BodyLong, Button, Heading, Loader, Pagination, SortState, Table, VStack } from '@navikt/ds-react';

import { DokumentDto_fpoversikt } from '@navikt/fp-types';
import { formatDateExtended, useDocumentTitle } from '@navikt/fp-utils';

import { hentDokumenterOptions } from '../../api/queries.ts';
import { DokumenterHeader } from '../../components/header/Header';
import { NoeGikkGalt } from '../../components/noe-gikk-galt/NoeGikkGalt';
import { useSetBackgroundColor } from '../../hooks/useBackgroundColor';
import { useSetSelectedRoute } from '../../hooks/useSelectedRoute';
import { PageRouteLayout } from '../../routes/ForeldrepengeoversiktRoutes';
import { OversiktRoutes } from '../../routes/routes';
import { DokumentAvsender } from './components/DokumentAvsender';
import { DokumentLenke } from './components/DokumentLenke';

export const DokumenterPage = () => {
    useSetBackgroundColor('white');
    useSetSelectedRoute(OversiktRoutes.DOKUMENTER);

    const intl = useIntl();
    const title = intl.formatMessage({ id: 'dokumenter' });
    useDocumentTitle(`${title} - ${intl.formatMessage({ id: 'dineForeldrepenger' })}`);

    return (
        <PageRouteLayout header={<DokumenterHeader />}>
            <DokumenterPageInner />
        </PageRouteLayout>
    );
};

interface ScopedSortState extends SortState {
    orderBy: keyof DokumentDto_fpoversikt;
}

const DokumenterPageInner = () => {
    const params = useParams();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<ScopedSortState | undefined>();
    const dokumenterQuery = useQuery(hentDokumenterOptions(params.saksnummer!));

    if (dokumenterQuery.isPending) {
        return <Loader size="large" aria-label="Henter dokumenter" />;
    }

    const rowsPerPage = 6;
    const dokumenter = dokumenterQuery.data ?? [];

    const handleSort = (sortKey: ScopedSortState['orderBy']) => {
        setSort(
            sortKey === sort?.orderBy && sort.direction === 'descending'
                ? undefined
                : {
                      orderBy: sortKey,
                      direction:
                          sortKey === sort?.orderBy && sort.direction === 'ascending' ? 'descending' : 'ascending',
                  },
        );
    };

    const comparator = (a: string, b: string): number => {
        if (dayjs(a).isBefore(b)) {
            return -1;
        }
        if (dayjs(a).isAfter(b)) {
            return 1;
        }
        return 0;
    };

    const sortedDokumenter = [...dokumenter].sort((a, b) => {
        if (sort) {
            return sort.direction === 'ascending' ? comparator(b.mottatt, a.mottatt) : comparator(a.mottatt, b.mottatt);
        }
        return 1;
    });
    const paginatedSortedDokumenter = sortedDokumenter.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <>
            <Button
                icon={<ArrowRightIcon aria-hidden />}
                iconPosition="right"
                as={Link}
                variant="primary"
                className="mb-8"
                to={`../${OversiktRoutes.ETTERSEND}`}
            >
                <FormattedMessage id="lastOppDokumenter" />
            </Button>
            {!dokumenterQuery.isError && (
                <>
                    <div className="mb-10">
                        <VStack gap="4">
                            <Table
                                size="medium"
                                sort={sort}
                                onSortChange={(sortKey) => handleSort(sortKey as ScopedSortState['orderBy'])}
                            >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell scope="col">
                                            <FormattedMessage id="dokumenter.tabell.navn" />
                                        </Table.HeaderCell>
                                        <Table.ColumnHeader sortKey="mottatt" sortable={true} scope="col">
                                            <FormattedMessage id="dokumenter.mottatt" />
                                        </Table.ColumnHeader>
                                        <Table.HeaderCell scope="col">
                                            <FormattedMessage id="dokumenter.tabell.avsender" />
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {paginatedSortedDokumenter.map((dokument) => {
                                        return (
                                            <Table.Row key={dokument.dokumentId}>
                                                <Table.DataCell className="max-w-70" scope="row">
                                                    <DokumentLenke dokument={dokument} />
                                                </Table.DataCell>
                                                <Table.DataCell scope="row">
                                                    {formatDateExtended(dokument.mottatt)}
                                                </Table.DataCell>
                                                <Table.DataCell scope="row">
                                                    <DokumentAvsender dokumentType={dokument.type} />
                                                </Table.DataCell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table>
                            <Pagination
                                page={page}
                                onPageChange={setPage}
                                count={Math.ceil(dokumenter.length / rowsPerPage)}
                                size="small"
                            />
                        </VStack>
                    </div>
                    <Alert variant="info" className="mb-8">
                        <Heading level="3" size="small">
                            <FormattedMessage id="dokumenter.savner" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="dokumenter.savner.detaljer" />
                        </BodyLong>
                    </Alert>
                </>
            )}
            {dokumenterQuery.isError && (
                <NoeGikkGalt className="mb-8">
                    <FormattedMessage id="dokumenter.feil" />
                </NoeGikkGalt>
            )}
        </>
    );
};
