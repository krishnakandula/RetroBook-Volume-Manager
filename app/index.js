const yargs = require('yargs');
const _ = require('lodash');

const { reader } = require('./volumereader');

const argv = yargs
        .command('create', 'Create a json file for a volume', {
            path: {
                describe: 'Parent folder file path',
                demand: true,	
                alias: 'p'
            },
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
            reader(argv.path, argv.volume);
            break;
        default:
            console.error(`Command ${command} not found`);
    }
}
