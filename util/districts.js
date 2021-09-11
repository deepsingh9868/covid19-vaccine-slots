const axios = require('axios');
const table = require('tty-table'); // use to style and beautify the respose data from api


const {config, options} = require("./config"); /// make a different file for the code which you going to use again and again 

module.exports = function(stateid){
    axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateid}`,config)
    .then(function(response){
        // console.table(response.data.states);

        // tty-module 
        let header = [{
            value: "district_id",
            headerColor: "cyan",
            color: "white",
            align: "left",
            width: 20,
            alias: "District ID", // rewrite the current column name
          },
          {
            value: "district_name",
            color: "red",
            width: 40,
            alias: "District Name",
            // formatter: function (value) {
            //   let str = `$${value.toFixed(2)}`
            //   return (value > 5) ? this.style(str, "green", "bold") : 
            //     this.style(str, "red", "underline")
            // }
          }]

          // now print the respose or render it
          const out = table(header,response.data.districts,options).render()
          console.log(out); //prints output aka respose table
    })
    .catch(function (error) {
        console.log(error);
    });
};