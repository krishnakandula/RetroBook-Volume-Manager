const yargs = require('yargs');
const _ = require('lodash');

const { reader } = require('./volumereader');
const { writer } = require('./dbwriter');
const argv = yargs
        .command('create', 'Create a json file for a volume', {
            volume: {
                describe: 'Name of the volume',
                demand: true,
                alias: 'v'
            }
        })
        .help()
        .argv;

const command = argv._[0];
if (command) {
    switch(command) {
        case 'create':
            reader(argv.volume).then(data => {
                return writer(data);
            }).then(result => {
                console.log('Successfuly added data to database');
            }).catch(err => {
                console.error(err);
            });
            break;
        default:
            console.error(`Command ${command} not found`);
    }
}

