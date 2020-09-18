// 'use strict'

console.log('linked wheel.js');

// to tidy up code later

// Credits to SPIN WHEEL USING JS by sumeshkp18 https://codepen.io/sumeshkp18/pen/VGBPYg
// Adapted from above with following amendments:
// - Resize wheel & centre radius (done)
// - Adjust no. of segments (done)
// - Adjust segment colours & text values (done)
// - Write function to extract spin value (done)
// - Allow wheel to spin to any value (done)
// - Align page layout for wheel & playerstand (60% done)

// UPDATE: ADD GLOBAL VARIABLE
var spinValueFrWheel;


// UPDATE: AMEND PADDING
// var padding = {top:20, right:40, bottom:0, left:0},
var padding = {top:0, right:15, bottom:0, left:0},

// UPDATE: AMENDED WHEEL RADIUS
w = 225 - padding.left - padding.right,
h = 225 - padding.top  - padding.bottom,
r = Math.min(w, h)/2,
rotation = 0,s
oldrotation = 0,
picked = 100000,
oldpick = [],

// UPDATE: To set fixed colours for each value
color = d3.scale.category20();//category20c()

//randomNumbers = getRandomNumbers();
//http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results

// UPDATE: Amend/add wheel values & omit questions

// Wheel Values from winwheel.js
//1 {'fillStyle' : '#ee1c24', 'text' : '300'},
//2 {'fillStyle' : '#3cb878', 'text' : '450'},
//3 {'fillStyle' : '#f6989d', 'text' : '600'},
//4 {'fillStyle' : '#00aef0', 'text' : '750'},
//5 {'fillStyle' : '#f26522', 'text' : '500'},
//6 {'fillStyle' : '#000000', 'text' : 'BANKRUPT', 'textFontSize' : 16, 'textFillStyle' : '#ffffff'},
//7 {'fillStyle' : '#e70697', 'text' : '3000'},
//8 {'fillStyle' : '#fff200', 'text' : '600'},
//9 {'fillStyle' : '#f6989d', 'text' : '700'},
//10 {'fillStyle' : '#ee1c24', 'text' : '350'},
//11 {'fillStyle' : '#3cb878', 'text' : '500'},
//12 {'fillStyle' : '#f26522', 'text' : '800'},
//13 {'fillStyle' : '#a186be', 'text' : '300'},
//14 {'fillStyle' : '#fff200', 'text' : '400'},
//15 {'fillStyle' : '#00aef0', 'text' : '650'},
//16 {'fillStyle' : '#ee1c24', 'text' : '1000'},
//17 {'fillStyle' : '#f6989d', 'text' : '500'},
//18 {'fillStyle' : '#f26522', 'text' : '400'},
//19 {'fillStyle' : '#3cb878', 'text' : '900'},
//20 {'fillStyle' : '#000000', 'text' : 'BANKRUPT', 'textFontSize' : 16, 'textFillStyle' : '#ffffff'},
//21 {'fillStyle' : '#a186be', 'text' : '600'},
//22 {'fillStyle' : '#fff200', 'text' : '700'},
//23 {'fillStyle' : '#00aef0', 'text' : '800'},
//24 {'fillStyle' : '#ffffff', 'text' : 'LOOSE TURN', 'textFontSize' : 12}
// ],

var data = [
    {"value": 1, "label": '300', "fillColor": '#ee1c24'},
    {"value": 2, "label": '450', "fillColor": '#3cb878'}, 
    {"value": 3, "label": '600', "fillColor": '#f6989d'},
    {"value": 4, "label": '750', "fillColor": '#00aef0'},
    {"value": 5, "label": '500', "fillColor" : '#f26522'},
    {"value": 6, "label": 'BANKRUPT', "fillColor": '#000000', 'textFillStyle' : '#ffffff', 'textOrientation': 'upright'},
    {"value": 7, "label": '3000', "fillColor": '#e70697'},
    {"value": 8, "label": '600', "fillColor": '#fff200'},
    {"value": 9, "label": '700', "fillColor": '#f6989d'},
    {"value": 10, "label": '350', "fillColor": '#ee1c24'},
    {"value": 11, "label": '500', "fillColor": '#3cb878'},
    {"value": 12, "label": '800', "fillColor": '#f26522'},
    {"value": 13, "label": 'BANKRUPT', "fillColor": '#000000', 'textFontSize' : 16, 'textFillStyle' : '#ffffff', 'textOrientation': 'upright'},
    {"value": 14, "label": '300', "fillColor": '#a186be'},
    {"value": 15, "label": '400', "fillColor": '#fff200'},
    {"value": 16, "label": '650', "fillColor": '#00aef0'},
    {"value": 17, "label": '1000', "fillColor": '#ee1c24'},
    {"value": 18, "label": '500', "fillColor": '#f6989d'},
    {"value": 19, "label":'400', "fillColor": '#f26522'},
    {"value": 20, "label": '900', "fillColor": '#3cb878'},
    {"value": 21, "label": 'BANKRUPT', "fillColor": '#000000', 'textFontSize': 16, 'textFillStyle' : '#ffffff', 'textOrientation': 'upright'},
    {"value": 22, "label": '600', "fillColor": '#a186be'},
    {"value": 23, "label": '700', "fillColor": '#fff200'},
    {"value": 24, "label": '800', "fillColor": '#00aef0'}
];


// var data = [
//         {"label":"Dell LAPTOP",  "value":1,  "question":"What CSS property is used for specifying the area between the content and its border?"}, // padding
//         {"label":"IMAC PRO",  "value":2,  "question":"What CSS property is used for changing the font?"}, //font-family
//         {"label":"SUZUKI",  "value":3,  "question":"What CSS property is used for changing the color of text?"}, //color
//         {"label":"HONDA",  "value":4,  "question":"What CSS property is used for changing the boldness of text?"}, //font-weight
//         {"label":"FERRARI",  "value":5,  "question":"What CSS property is used for changing the size of text?"}, //font-size
//         {"label":"APARTMENT",  "value":6,  "question":"What CSS property is used for changing the background color of a box?"}, //background-color
//         {"label":"IPAD PRO",  "value":7,  "question":"Which word is used for specifying an HTML tag that is inside another tag?"}, //nesting
//         {"label":"LAND",  "value":8,  "question":"Which side of the box is the third number in: margin:1px 1px 1px 1px; ?"}, //bottom
//         {"label":"MOTOROLLA",  "value":9,  "question":"What are the fonts that don't have serifs at the ends of letters called?"}, //sans-serif
//         {"label":"BMW", "value":10, "question":"With CSS selectors, what character prefix should one use to specify a class?"}
// ];


var svg = d3.select('#chart')
    .append("svg")
    .data([data])
    .attr("width",  w + padding.left + padding.right)
    .attr("height", h + padding.top + padding.bottom);
    var container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
    var vis = container
    .append("g");

var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");

arcs.append("path")
    // UPDATE: REMOVE PERMANENT SEGMENT COLOUR
    // .attr("fill", function(d, i){ return color(i); })

    // UPDATE: TO CHANGE SEGMENT COLOUR
    .attr("fill", function(d, i){ 
        return data[i].fillColor; 
    })
    .attr("d", function (d) { 
        return arc(d); 
    });

// add the text
arcs.append("text").attr("transform", function(d){
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle)/2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
})

    .attr("text-anchor", "end")
    .text( function(d, i) {
        return data[i].label;
    })
    // UPDATE: TO CHANGE TEXT COLOUR, BOLD
    .attr("fill", function(d, i){ 
        return data[i].textFillStyle; 
    })
    .attr('font-weight', 'bold')
    // .attr("writing-mode", 'tb-rl') 
    .attr("text-orientation", 'upright');
    // .attr("text-orientation", function(d, i){ 
    //     return data[i].textOrientation; 
    // });

// UPDATE: LINK TO SPIN WHEEL FUNCTION
// ADD TO DOC READY FUNCTION
// container.on("click", spin);

$(document).ready(function() {

    function spin(d){

        container.on("click", null);
        //all slices have been seen, all done
        // console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
    
        // UPDATE: N.A. FOR WOF - COMMENT THIS OUT
        // if(oldpick.length == data.length){
        //     console.log("done");
        //     container.on("click", null);
        //     return;
        // }
    
        var ps = 360/data.length,
                pieslice = Math.round(1440/data.length),
                rng      = Math.floor((Math.random() * 1440) + 360);
            
        rotation = (Math.round(rng / ps) * ps);
    
        picked = Math.round(data.length - (rotation % 360)/ps);

        // UPDATE: COMMENT OUT
        // picked = picked >= data.length ? (picked % data.length) : picked;
    
        // UPDATE: CHECK IF WHEEL DOESN'T ALLOW SAME SPIN TWICE
        // UPDATE: COMMENT OUT
        // if (oldpick.indexOf(picked) !== -1){
        //     d3.select(this).call(spin);
        //     return;
        // } else {
        //     oldpick.push(picked);
        // }
    
        rotation += 90 - Math.round(ps/2);
        vis.transition()
            .duration(3000)
            .attrTween("transform", rotTween)
            .each("end", function(){
                //mark question as seen

                //UPDATE COMMENT OUT
                // d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                d3.select(".slice:nth-child(" + (picked + 1) + ") path")
    
        // UPDATE: REMOVE SELECTED SEGMENT PERMANENT FILL
                // .attr("fill", "grey");
    
                //populate question
    
        // UPDATE: REMOVE QUESTIONS
                // d3.select("#question h1")
                //     .text(data[picked].question);
                oldrotation = rotation;
            
                /* Get the result value from object "data" */
                console.log(data[picked].value)
            
                /* Comment the below line for restrict spin to single time */

                // Update: Modify to link to spinWheel function
                // container.on("click", spin);
                // container.on("click", function(){
                //     spin();
                //     // console.log('spin value: ' + spinValueFrWheel);
                //     spinWheel(spinValueFrWheel);
                // });


                // set delay to spin until letter is guessed
                setTimeout(function() {

                    container.on("click", function(){
                        spin();
                        // console.log('spin value: ' + spinValueFrWheel);
                        spinWheel(spinValueFrWheel);
                    });      

                }, timerLetter * 1000)  // chk if timer sufficient

            });

        // UPDATE: ADD Store spin value in global variable
        spinValueFrWheel = data[picked].label;
        // wheelDiv.innerHTML = 'Spin Value from Wheel: $' + spinValueFrWheel;
    
    }

    container.on("click", function(){
        spin();
        // console.log('spin value: ' + spinValueFrWheel);
        spinWheel(spinValueFrWheel);
    });

});

// MAIN SPIN FUNCTION
// function spin(d){

//     container.on("click", null);
//     //all slices have been seen, all done
//     console.log("OldPick: " + oldpick.length, "Data length: " + data.length);

//     if(oldpick.length == data.length){
//         console.log("done");
//         container.on("click", null);
//         return;
//     }

//     var ps = 360/data.length,
//             pieslice = Math.round(1440/data.length),
//             rng      = Math.floor((Math.random() * 1440) + 360);
        
//     rotation = (Math.round(rng / ps) * ps);

//     picked = Math.round(data.length - (rotation % 360)/ps);
//     picked = picked >= data.length ? (picked % data.length) : picked;

//     // UPDATE: CHECK IF WHEEL DOESN'T ALLOW SAME SPIN TWICE
//     if (oldpick.indexOf(picked) !== -1){
//         d3.select(this).call(spin);
//         return;
//     } else {
//         oldpick.push(picked);
//     }

//     rotation += 90 - Math.round(ps/2);
//     vis.transition()
//         .duration(3000)
//         .attrTween("transform", rotTween)
//         .each("end", function(){
//             //mark question as seen
//             d3.select(".slice:nth-child(" + (picked + 1) + ") path")

//     // UPDATE: REMOVE SELECTED SEGMENT PERMANENT FILL

//                 .attr("fill", "grey");

//             //populate question

//     // UPDATE: TO TRANSFER SPIN VALUE TO VAR & DISPLAY ONSCREEN
//             d3.select("#question h1")
//                 .text(data[picked].question);
//             oldrotation = rotation;
        
//             /* Get the result value from object "data" */
//             console.log(data[picked].value)

//             // UPDATE: ADD Store spin value in global variable
//             spinValueFrWheel = data[picked].label;
//             // wheelDiv.innerHTML = 'Spin Value from Wheel: $' + spinValueFrWheel;
        
//             /* Comment the below line for restrict spin to single time */
//             // container.on("click", spin);
//         });

// }


//make arrow
svg.append("g")
    .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
    .append("path")
    .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
    .style({"fill":"black"});

    //draw spin circle
    container.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 30) // UPDATE: amend spin circle radius
    .style({"fill":"white","cursor":"pointer"});

    //spin text
    container.append("text")
    .attr("x", 0)
    .attr("y", 5) // UPDATE: amend text vert alignment
    .attr("text-anchor", "middle")
    .text("SPIN")
    .style({"font-weight":"bold", "font-size":"12px"}); //UPDATE: amend fontsize


function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function(t) {
    return "rotate(" + i(t) + ")";
    };
}


function getRandomNumbers(){
    var array = new Uint16Array(1000);
    var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
    if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
        window.crypto.getRandomValues(array);
        console.log("works");
    } else {
        //no support for crypto, get crappy random numbers
        for(var i=0; i < 1000; i++){
            array[i] = Math.floor(Math.random() * 100000) + 1;
        }
    }
    return array;
}