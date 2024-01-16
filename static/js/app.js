//create a constant for the url
const url =  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//function for populating the metadata panel
function getMetaData(sampleID)  {
     //read in the json data
    d3.json(url).then((data) => {
        //assign metadata to variable
        let sampleMetadata = 
        data.metadata.filter(selectedSample => selectedSample.id == sampleID)
         //log the data from the selected sample
        console.log(sampleMetadata[0]);
        //select the demographics panel
        let demoPanel = d3.select("#sample-metadata")
        //select each key/value pair in the metadata
        metadataEntries = Object.entries(sampleMetadata[0])
        //loop through the entries and append them to the demographics panel
        for (i=0; i < metadataEntries.length; i++) {
            demoPanel.append('p').text(`${metadataEntries[i][0]} : ${metadataEntries[i][1]}`);
        }
    });  
};

//function for drawing the bar graph
function drawBar(sampleID) {
    //read in the json data
    d3.json(url).then((data)=> {
        //filter for the sampleID
        let selectedSampleData = 
        data.samples.filter(selectedSample => selectedSample.id == sampleID);
        //filter for the top ten otu values, otu_ids and otulabels
        topTenValues = selectedSampleData[0].sample_values.slice(0,10).reverse();
        topTenIds = selectedSampleData[0].otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse();
        topTenLabels = selectedSampleData[0].otu_labels.slice(0,10).reverse();
        //set trace for top ten of sample object
        let trace1 = {
            x: topTenValues,
            y: topTenIds,
            text: topTenLabels,
            type: "bar",
            orientation: "h"
        };
        //set labels for chart and axes
        let layout = {
            title: {
                text: `Top 10 OTU_IDS for Sample #${sampleID}`
            },
            xaxis: {
                title: {
                    text: "Count"
                }
            }
        }
        // Data array
        let barData = [trace1]
        // Plot the bar chart in "bar" div
        Plotly.newPlot("bar", barData, layout)
    });
};

//function to draw the bubble chart
function drawBubble(sampleID) {
    //read in the json data
    d3.json(url).then((data)=> {
        //filter for the sampleID
        let selectedSampleData = 
        data.samples.filter(selectedSample => selectedSample.id == sampleID);
        //set trace for bubble chart
        let trace = {
            x: selectedSampleData[0].otu_ids,
            y: selectedSampleData[0].sample_values,
            text: selectedSampleData[0].otu_labels,
            mode: 'markers',
            marker: {
            colorscale: 'Jet',    
            color: selectedSampleData[0].otu_ids,
            size: selectedSampleData[0].sample_values
            }
        };
        //Set layout for x-axis title
        let layout = {
            title: {
                text: `Microbial Belly Button Population for Sample #${sampleID}`
            },
            xaxis: {
                title: {
                    text: "OTU ID"
                }
            },
            yaxis: {
                title: {
                    text: "Count"
                }
            }
        }
        // Data array
        let bubbleData = [trace];
        // Plot the bar chart in "bubble" div
        Plotly.newPlot("bubble", bubbleData, layout);

    });
};

//function to draw the gauge
function drawGauge(sampleID) {
    d3.json(url).then((data) => {
        //assign metadata to variable
        let sampleMetadata = 
        data.metadata.filter(selectedSample => selectedSample.id == sampleID)
        //build gauge chart
        let trace = {
            type: "indicator",
            mode: "gauge+number",
            value: sampleMetadata[0].wfreq,
            gauge: {
                axis: { 
                range: [0, 10], 
                ticks: '',
                tickvals: [0,1,2,3,4,5,6,7,8,9,10],
                showticklabels: true,
                },
                steps: [
                    { range: [0, 1], color: "rgb(200, 255, 200)"},
                    { range: [1, 2], color: "rgb(150, 255, 150)"},
                    { range: [2, 3], color: "rgb(100, 255, 100)"},
                    { range: [3, 4], color: "rgb(50, 255, 50)"},
                    { range: [4, 5], color: "rgb(0, 200, 0)"},
                    { range: [5, 6], color: "rgb(0, 150, 0)"},
                    { range: [6, 7], color: "rgb(0, 100, 0)"},
                    { range: [7, 8], color: "rgb(0, 50, 0)"},
                    { range: [8, 9], color: "rgb(0, 25, 0)"},
                    { range: [9, 10], color: "rgb(0, 0, 0)"},
                ],
                threshold: {
                line: { color: "red", width: 3 },
                thickness: .75,
                value: sampleMetadata[0].wfreq,
                visible: true,
                }
            }
        }
        let layout = {
            title: `Belly Button Scrubs per week (Sample #${sampleID})`
        }
        let gaugeData = [trace]
        Plotly.newPlot("gauge", gaugeData, layout)
    });
};

//function for changing the dropdown
function optionChanged() {
    //select the dropdown and create variable to hold the value
    let name = d3.select("#selDataset").property("value");
    //reset the demographics pane
    d3.select('#sample-metadata').html("");
    //run all functions with new sampleID
    getMetaData(name)
    drawBar(name)
    drawBubble(name)
    drawGauge(name)
}

//initialize page
function init() {
    //select and populate the dropdown
    let dropdownMenu = d3.select('#selDataset');
    // read in json data 
    d3.json(url).then((data)=> {
        //log the data
        console.log(data)
        //assign the "names" array to a variable and loop through to populate the dropdown
        let names = data.names;
        for (let i = 0; i < names.length; i++) {
            dropdownMenu.append("option").text(names[i]).property("value", names[i]);
        }
        //initialize the charts from the default (0) name

    getMetaData(names[0]);
    drawBar(names[0]);
    drawBubble(names[0]);
    drawGauge(names[0]);
    });
};

init();

