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

        let barData = [trace1]
        
        Plotly.newPlot("bar", barData)
    });
};

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

    getMetaData(names[0])
    drawBar(names[0]);
    });
};

function optionChanged() {
    let name = d3.select("#selDataset").property("value");
    d3.select('#sample-metadata').html("");
    getMetaData(name)
    drawBar(name)
}
init();

