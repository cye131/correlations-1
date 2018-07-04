$(document).ready(function() {
    
    (function() {
        
        
    })();
    
    
    $('#showLines').change(function () {
        if($(this).is(":checked")) {
            $("#minLines").removeAttr("disabled");
        }
        else {
            $("#minLines").attr("disabled", "disabled");
            $(".connectLines").remove();
        }
    });
    
    $("#submitLines").click(function(){
        $('#minLines').removeClass('is-invalid');
        //console.log('submitted');

        var x = parseFloat($("#minLines").val());

        if (x<0 || x > 1 ||$.isNumeric(x) === false) {
            $('#minLines').addClass('is-invalid');
            $( ".invalid-feedback" ).show();
            $( ".invalid-feedback" ).text('Input must be between 0 and 1');
        } else {
            $(".connectLines").remove();
            var data = $('#data').data();
            drawStrongCorrelations(data.tagsSeries,data.tagsCorrel,x);
            drawStrongCorrelationsEurope(data.tagsSeries,data.tagsCorrel,x);
        }
       
    });
    
    
});

    

    function drawMaps(tagsGFI) {
        var mapData = [];
        var gfiIndex = 0;
        var j = 0;

        for (i=0; i<tagsGFI.length; i++) {
            gfiIndex = (tagsGFI[i].code_2 === "WORLD") ? 1 : 2;
            if (tagsGFI[i]['code_' + gfiIndex].toLowerCase() === 'hk') continue;//no hk position on map
            
            mapData[j] = {}; 
            mapData[j]['hc-key']= tagsGFI[i]['code_' + gfiIndex].toLowerCase();
            mapData[j].value = tagsGFI[i].obs_end_val;
            mapData[j].name = tagsGFI[i]['name_' + gfiIndex];
            mapData[j].id = mapData[j]['hc-key'];
            mapData[j].grouping = tagsGFI[i]['grouping_' + gfiIndex];
            j++;
        }
        
        var mapDataEurope = [];
        var k = 0;
        for (i=0; i<mapData.length;i++) {
            if (mapData[i].grouping.indexOf('Europe') !== -1 ) {
                mapDataEurope[k] = mapData[i];
                k++;
            }
        }
        
        drawMap(mapData);
        drawMapEurope(mapDataEurope);
    }
    
    function drawMap (mapData) {        
        // Initiate the chart
        Highcharts.mapChart('highMap', {
            chart: {
                map: 'custom/world-robinson',
                height: 640,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
                backgroundColor: 'rgba(255,255,255,0)',
            },
            title: {
                text: 'Correlation to Global Stock Markets By Country'
            },
            subtitle: {
            },
            credits: {
                enabled:false
            },
            mapNavigation: {
                enabled: false
            },
        
            colorAxis: {
                min: -1,
                max: 1,
                reversed: false,
                stops:[
                    [0, 'rgba(0,0,255,1)'],
                    [0.5, 'rgba(251,250,182,1)'],
                    [1, 'rgba(255,0,0,1)']
                ]
            },
            legend: {
                enabled:false,
                layout:'horizontal',
                align:'center',
                verticalAlign: 'top',
                reversed:true
            },
            plotOptions: {
                series: {
                    point: {
                        events: {
                            mouseOver: function () {
                                //console.log(this);
                                code = this["hc-key"];
                                //console.log('.'+ code);
                                //$('.'+ code).css("stroke","blue");

                                $('.'+ code).each(function(){
                                    $(this).addClass('selectedLines');
                                });
                                
                                /*
                                var chart = this.series.chart;
                                if (!chart.lbl) {
                                    chart.lbl = chart.renderer.label('')
                                        .attr({
                                            padding: 10,
                                            r: 10,
                                            fill: Highcharts.getOptions().colors[1]
                                        })
                                        .css({
                                            color: '#FFFFFF'
                                        })
                                        .add();
                                }
                                chart.lbl
                                    .show()
                                    .attr({
                                        text: 'x: ' + this.x + ', y: ' + this.y
                                    });
                                    */
                                
                            }
                        },
                    },
                    events: {
                        mouseOut: function () {
                            $('.selectedLines').removeClass('selectedLines');
                            /*
                            if (this.chart.lbl) {
                                this.chart.lbl.hide();
                            }
                            */
                        }
                    }
                }
            },/*
            tooltip: {
                useHTML: true,
                formatter: function () {
                }
            }*/
            series: [{
                data: mapData,
                name: 'Correlation to Global Stock Market Index',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                },

            }]

        });
    }
    

    function drawStrongCorrelations(tagsSeries,tagsCorrel,minLines) {
        var chart = $('#highMap').highcharts();
        var points = chart.series[0].points;
        
        /*
        for (i=0;i<tagsCorrel.count;i++) {
            if ( (tagsCorrel[i].name_1 === name1 && tagsCorrel[i].name_2 === name2) || (tagsCorrel[i].name_1 === name2 && tagsCorrel[i].name_2 === name1) ) {
                console.log(tagsCorrel[i].obs_end_value);
                break;  
            }
        }*/

        
        // Puts point coordinates into tagsSeriesXY
        tagsSeriesXY = {};
        for (i=0;i<points.length;i++) {
            for (k=0;k<tagsSeries.length;k++) {
                if (tagsSeries[k].code.toLowerCase() === points[i]["hc-key"]) {
                    tagsSeriesXY[points[i]["hc-key"]] = {};                    
                    tagsSeriesXY[points[i]["hc-key"]].x = points[i].plotX;
                    tagsSeriesXY[points[i]["hc-key"]].y = points[i].plotY;
                } //else console.log(tagsSeries[k].name + ' ' + points[i].name);
            }
        }
        
        //console.log(tagsSeriesXY);
        
        for (i=0;i<tagsCorrel.length;i++) {
            if (tagsCorrel[i].obs_end_val < minLines) continue;
            //console.log(tagsCorrel[i].obs_end_val);
            
            code1 = tagsCorrel[i].code_1.toLowerCase() ;
            code2 = tagsCorrel[i].code_2.toLowerCase() ;
            
            if (code1 === 'hk' || code2 === 'hk' || code1 === 'world' || code2 === 'world') continue;
            
            chart.renderer.path(['M'+tagsSeriesXY[code1].x,tagsSeriesXY[code1].y,'Q',(tagsSeriesXY[code1].x+tagsSeriesXY[code2].x)/2,(tagsSeriesXY[code1].y + tagsSeriesXY[code2].y)/2-20,tagsSeriesXY[code2].x,tagsSeriesXY[code2].y,])
            .attr({
                'stroke-width': 1,
                zIndex: 5,
                stroke: '#696969',
                class: 'connectLines ' + code1 + '  ' + code2
            })
            .add();


            
        }
    }
    
    
    function drawMapEurope (mapDataEurope) { 
        // Initiate the chart
        Highcharts.mapChart('highMapEurope', {
            chart: {
                map: 'custom/europe',
                height: 360,
                width: 460,
                marginTop: 10,
                marginRight: 120,
                marginBottom: 10,
                marginLeft: 10,
                backgroundColor: 'rgba(255,255,255,0)',
                plotBorderWidth: 1,
                plotBorderColor: 'black'
            },
            title: {
                text: ''
            },
            credits: {
                enabled:false
            },
            mapNavigation: {
                enabled: false
            },
        
            colorAxis: {
                min: -1,
                max: 1,
                reversed: false,
                stops:[
                    [0, 'rgba(0,0,255,1)'],
                    [0.5, 'rgba(251,250,182,0)'],
                    [1, 'rgba(255,0,0,1)']
                ]
            },
            legend: {
                enabled:false,
                layout:'horizontal',
                align:'center',
                verticalAlign: 'top',
                reversed:true
            },
            plotOptions: {
                series: {
                    point: {
                        events: {
                            mouseOver: function () {
                                //console.log(this);
                                code = this["hc-key"];
                                //console.log('.'+ code);
                                
                                $('.'+ code).each(function(){
                                    $(this).addClass('selectedLines');
                                });
                                
                            }
                        },
                    },
                    events: {
                        mouseOut: function () {
                            $('.selectedLines').removeClass('selectedLines');
                        }
                    }
                }
            },

            series: [{
                data: mapDataEurope,
                name: 'Correlation to Global Stock Market Index',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }]

        });
    }
    
    function drawStrongCorrelationsEurope(tagsSeries,tagsCorrel,minLines) {
        var chart = $('#highMapEurope').highcharts();
        var points = chart.series[0].points;
        //console.log(chart);
        //console.log(points);
        // Puts point coordinates into tagsSeriesXY
        tagsSeriesXY = {};
        for (i=0;i<points.length;i++) {
            for (k=0;k<tagsSeries.length;k++) {
                if (tagsSeries[k].code.toLowerCase() === points[i]["hc-key"]) {
                    tagsSeriesXY[points[i]["hc-key"]] = {};
                    tagsSeriesXY[points[i]["hc-key"]].x = parseFloat(points[i].plotX) + chart.plotLeft;
                    tagsSeriesXY[points[i]["hc-key"]].y = parseFloat(points[i].plotY) + chart.plotTop;
                } //else console.log(tagsSeries[k].name + ' ' + points[i].name);
            }
        }
        
        //console.log(tagsSeriesXY);
        
        for (i=0;i<tagsCorrel.length;i++) {
            if (tagsCorrel[i].obs_end_val < minLines) continue;
            //console.log(tagsCorrel[i].obs_end_val);
            if (tagsCorrel[i].grouping_1 == undefined || tagsCorrel[i].grouping_2 == undefined || tagsCorrel[i].grouping_1.indexOf('Europe') == -1 ||  tagsCorrel[i].grouping_2.indexOf('Europe') == -1) continue;

            code1 = tagsCorrel[i].code_1.toLowerCase() ;
            code2 = tagsCorrel[i].code_2.toLowerCase() ;
            
            //console.log(code1);console.log(code2);
            chart.renderer.path(['M'+tagsSeriesXY[code1].x,tagsSeriesXY[code1].y,'Q',(tagsSeriesXY[code1].x+tagsSeriesXY[code2].x)/2,(tagsSeriesXY[code1].y + tagsSeriesXY[code2].y)/2-20,tagsSeriesXY[code2].x,tagsSeriesXY[code2].y,])
            .attr({
                'stroke-width': 1,
                zIndex: 5,
                stroke: '#696969',
                class: 'connectLines ' + code1 + '  ' + code2
            })
            .add();

            
        }
    }


        


