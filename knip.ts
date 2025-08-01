import type { KnipConfig } from 'knip';

const config: KnipConfig = {
    ignore: ['server/**'], //bootstrap files
    ignoreBinaries: ['docker-compose'],
    ignoreDependencies: [],
};

export default config;
