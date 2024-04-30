export default {
    development: {
        client: 'postgresql',
        connection: {
            host: 'localhost',
            user: 'admin',
            password: 'admin',
            port: '5433',
            database: 'bla_bla_furg'
        },
        migrations: {
            directory: './migrations'
        }
    }
}