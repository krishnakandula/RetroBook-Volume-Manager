const yargs = require('yargs');
const _ = require('lodash');

const writer = require('./json_writer');

const argv = yargs
        .command('create', 'Create a json file for a volume', {
            path: {
                describe: 'File path',
                demand: true,	
                alias: 'p'
            }
        })
        .help()
        .argv;

const command = argv._[0];
if (command) {
    switch(command) {
        case 'create':
            break;
        default:
            console.error(`Command ${command} not found`);
    }
}
