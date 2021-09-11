
const axios = require('axios');
const table = require('tty-table');
const chalk = require('chalk');

const {config, options} = require('./config');
const notifier = require('node-notifier');

function slots(districtid){
    var date  = new Date();

    var todaysdate =  `${date.getDate()}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`;
    // console.log(todaysdate);
    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtid}&date=|${todaysdate}`, config)

    .then(function(response){
        
    let header = [{
        value: "center",
        headerColor: "cyan",
        color: "white",
        align: "left",
        width: 40,
        alias: "Center Name", // rewrite the current column name
      },

      {
        value: "address",
        color: "red",
        width: 60,
        alias: "Center Address",
      },
      {
        value: "available_dose1",
        width: 10,
        alias: "Dose1",
        formatter: function (value) {
            if(value>0){
                value = this.style(value,"bgGreen", "black")
                
            }
            return value
        }

      },
      {
        value: "available_dose2",
        width: 10,
        alias: "Dose2",
        formatter: function(value) {
            if(value>0){
                value  = this.style(value,"bgGreen", "black")
            }
            return value;
        }

      },
      {
        value: "vaccine",
        width: 15,
        alias: "Vaccine",
        formatter: function(value) {
            if(value==="COVISHIELD"){
                // value = this.style(value,"bgBlack", "blue")
                value  = this.style(value,"bgBlue", "black")
            }
            if(value==="COVAXIN"){
                // value = this.style(value,"bgBlack","yellow")
                value  = this.style(value,"bgYellow", "black")
            }
            else {
                // value = this.style(value,"bgBlack", "")
                value  = this.style(value,"bgRed", "black")
            }
           return value;
        }
      },
      {
        value: "date",
        color: "red",
        width: 15,
        alias: "Date",
      },
      {
        value: "fee",
        width: 15,
        alias: "Fee",
        formatter: function (value) {
            if(value==="Free"){
                value = this.style(value,"bgGreen","black")
            }
            else{
                value = this.style(value,"bgRed","black")
            }
            return value;
        }
      },


    ]

    // const out = table(header,response.data.centers,options).render()
    // console.log(response.data.centers);
        //console.log(out);
    var finalData = [];
    response.data.centers.forEach((item) =>{
        item.sessions.forEach((session) =>{
           // console.log(session);
            let ourData = {
                center : item.name,
                address: item.address,
                available_dose1: session.available_capacity_dose1,
                available_dose2: session.available_capacity_dose2,
                vaccine: session.vaccine,
                date: session.date,
                fee: item.fee_type
            };
            finalData.push(ourData);
        })
    })
    const out = table(header,finalData,options).render()
    console.log(out);
    notifier.notify({

            title: "slots are available !!! Hurry up",
            message: "Want to book your slot???",
            sound: true,
            wait: true,    
        });

    })
    .catch(function(error){
        console.log(error);
    })
}


// async function slots(districtid) {
//     var date  = new Date();

//     var todaysdate =  `${date.getDate()}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`;
//     // console.log(todaysdate);

//     try {
//       const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtid}&date=|${todaysdate}`,config);
//       console.log(response.data.centers);
//     } catch (error) {
//       console.error(error);
//     }
//   }

module.exports = slots;