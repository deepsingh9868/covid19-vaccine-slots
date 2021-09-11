#! /usr/bin/env node    

const states =require('../util/states');
const districts =require('../util/districts');
const slots=require('../util/slots');
const program = require('commander');
const pincode = require('../util/pincode');
// const pincalender = require('../util/pincalender');

// pincode(110030);
// slots(670)
// pincalender(110030);

program
 .command('states')
 .description("List down all the states")
 .action(states);

 program
 .command('districts <stateid>')
 .description("Filter out district  using state id")
 .action(districts);

 program
 .command('slots <districtid>')
 .description("Available slots in your district")
 .action(slots);

 program
 .command('pincode <pincode>')
 .description("Available slots in your area")
 .action(pincode);

 program.parse();

