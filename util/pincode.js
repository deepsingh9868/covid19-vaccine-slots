// const axios = require('axios');
// const table = require('tty-table');
// const {config, options} = require('./config')

// function pincode(pin) {
//     var date = new Date();

//     var todaysdate = `${date.getDate()}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`;


//     axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${todaysdate}`,config)

//     // https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=110001&date=31-03-2021

   

//     .then(function(response) {
//         // console.log(response.data.sessions)
//         let header = [{
//             value: "center",
//             headerColor: "cyan",
//             color: "white",
//             align: "left",
//             width: 40,
//             alias: "Center Name", // rewrite the current column name
//           },
    
//           {
//             value: "address",
//             color: "red",
//             width: 60,
//             alias: "Center Address",
//           },
//           {
//             value: "available_dose1",
//             width: 10,
//             alias: "Dose1",
//             formatter: function (value) {
//                 if(value>0){
//                     value = this.style(value,"bgGreen", "black")
//                 }
//                 return value
//             }
    
//           },
//           {
//             value: "available_dose2",
//             width: 10,
//             alias: "Dose2",
//             formatter: function(value) {
//                 if(value>0){
//                     value  = this.style(value,"bgGreen", "black")
//                 }
//                 return value;
//             }
    
//           },
//           {
//             value: "vaccine",
//             width: 15,
//             alias: "Vaccine",
//             formatter: function(value) {
//                 if(value==="COVISHIELD"){
//                     // value = this.style(value,"bgBlack", "blue")
//                     value  = this.style(value,"bgBlue", "black")
//                 }
//                 if(value==="COVAXIN"){
//                     // value = this.style(value,"bgBlack","yellow")
//                     value  = this.style(value,"bgYellow", "black")
//                 }
//                 else {
//                     // value = this.style(value,"bgBlack", "")
//                     value  = this.style(value,"bgRed", "black")
//                 }
//                return value;
//             }
//           },
//           {
//             value: "date",
//             color: "red",
//             width: 15,
//             alias: "Date",
//           },
//           {
//             value: "fee",
//             width: 15,
//             alias: "Fee",
//             formatter: function (value) {
//                 if(value==0){
//                     value = this.style("Free","bgGreen","black")
//                 }
//                 else{
//                     value = this.style(value,"bgRed","black")
//                 }
//                 return value;
//             }
//           },
    
    
//         ]
    
//         // const out = table(header,response.data.centers,options).render()
//         // console.log(response.data.centers);
//             //console.log(out);
//         var finalData = [];
//         response.data.sessions.forEach((item) =>{
//                // console.log(session);
//             let ourData = {
//                 center : item.name,
//                 address: item.address,
//                 available_dose1: item.available_capacity_dose1,
//                 available_dose2: item.available_capacity_dose2,
//                 vaccine: item.vaccine,
//                 date: item.date,
//                 fee : item.fee,
//             };
//             finalData.push(ourData);
//         })
//         const out = table(header,finalData,options).render()
//         console.log(out);

//     })
//     .catch(function (error) {
//         console.log(error);
//     })
// }



// module.exports  = pincode;



const axios = require('axios');
const table = require('tty-table');
const {config, options} = require('./config');
const notifier = require('node-notifier');
// const path = require('./'); // for custom photo in notification 


async function pincode(pincode){
    var date = new Date();
    var todaysdate = `${date.getDate()}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`;
    try{        
        const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${todaysdate}`,config);
        
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
        // console.log(response.data.centers);
        var finalData =  [];
        response.data.centers.forEach((item) =>{
            item.sessions.forEach((session) =>{
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
            const out = table(header,finalData,options).render()
            console.log(out);
        })  
        notifier.notify({

            title: "Wanna book your slot???",
            message: "happy vaccination !!",
            // icon: path.join(__dirname, 'covid_vaccine.jpg'),
            sound: true,
            wait: true,    
        });

    }
    catch(error){
        console.log(error);
    }
}

module.exports = pincode;



