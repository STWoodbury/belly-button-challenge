# Belly Button Challenge

## Summary:

This repository explores the [Belly Button Biodiversity Database](https://robdunnlab.com/projects/belly-button-biodiversity/), which explores one of the most diverse and mysterious habitats on earth: the human belly button. The study utilized taxonomic data from belly button swabs of 152 subjects to compare the populations of various microflora, and establish the effect of variables such as number of belly button washes per week on the variety and distribution of these microbes. The resulting JSON dataset can be found [HERE](https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json)

The website created by this repository, hosted at [This "Github Pages" Page](https://stwoodbury.github.io/belly-button-challenge/), allows users to explore the dataset through use of a dropdown menu, populated by each of the research subjects' id numbers. Users are able to view the following data for each selected subject:

 <ol>
    <li>The subject's demographic data <i>(including ethnicity, age, gender, location, belly button type("innie/outie"), and the frequency with which they wash their belly buttons)</i></li> 
    <li>A bar graph outlining the top 10 microbes observed in the sample<i>(by population)</i></li>
    <li>A bubble chart, illustrating all microbes observed in the sample<i>(with size and color of bubbles corresponding to population and taxonomy, respectively)</i></li>
    <li>A gauge chart, illustrating the subjects' wash frequency</li>
</ol>

## Coding Methodology:

### Summary:
This analysis uses the following tools to create interactive charts and to allow the user to explore the data through the [Website](https://stwoodbury.github.io/belly-button-challenge/):

<ul>
    <li>Javascript</li>
    <li>D3.JS</li>
    <li>Plotly</li>
    <li>HTML(provided)</li>
    <li>CSS(provided)</li>
</ul>

All code can be found in the [index.html](index.html), [app.js](static/js/app.js) files. The CSS was derived from [This Provided Code](https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css)

### Method:

[app.js](static/js/app.js) begins by setting a constant for the url of the JSON file from the biodiversity database for use with the contained functions.

The file contains the following functions to handle the data, and allow user interactivity:

<ol>
    <li>init
        <ul><li>The "init" function initializes the page upon loading, selecting the dropdown menu using <code>d3.select</code>, then uses <code>d3.json</code> to extract the json from the url constant. It then extracts the "data.names" object from the dataset, looping through them and populating the dropdown menu with each value using <code>dropdownmenu.append</code>. The code then passes the first value (#940) to each of the "getMetaData", "drawBar","drawBubble" and "drawGauge" functions, thus initializing each visualization with the sample "#940"</li></ul>
    </li>
    <li>getMetaData
        <ul><li>The "getMetaData" function takes the name passed from "init" or "optionChanged"(discussed below) and uses that as a parameter to filter the data from <code>d3.json</code> to match the sample id selected by the user. It then console.logs this data, uses <code>d3.select</code> to select the "#sample-metadata" div, assigns each key/value pair of the filtered data to an object, then loops through to append each of these to the 'p' text within the selected div.</li></ul>
    </li>
    <li>drawBar
        <ul><li>The "drawBar" function takes the name passed from "init" or "optionChanged"(discussed below) and uses that as a parameter to filter the data from <code>d3.json</code> to match the sample id selected by the user. The code then slices the first ten "sample_values","otu_ids" and "otu_labels" from the filtered dataset, reverses the order of the slice to go from smallest to largest, then appends 'OTU' to the name of each item in the otu_ids using mapping (for labeling purposes). These filtered and sliced datasets are then used with plotly to create a horizontal bar chart, setting the x value to "sample_values", y value to "otu_ids" and text value to "otu_labels". The resultant plotly plot is placed within the "bar" div in the HTML</li></ul>
    </li>
    <li>drawBubble
        <ul><li>The "drawBubble" function takes the name passed from "init" or "optionChanged"(discussed below) and uses that as a parameter to filter the data from <code>d3.json</code> to match the sample id selected by the user. The code then sets a trace for charting by plotly, setting x values to "otu_ids", y values to "sample_values" and text to "otu_labels". The code sets the mode to "markers", setting the color of the markers based on "otu_ids" and the marker size based on "sample_values". Finally, it adds a title and axis labels under the "layout" variable, and displays the resultant bubble chart within the "bubble" div in the HTML</li></ul>
    </li>
    <li>drawGauge
        <ul><li>he "drawGauge" function takes the name passed from "init" or "optionChanged"(discussed below) and uses that as a parameter to filter the data from <code>d3.json</code> to match the sample id selected by the user. It then creates a trace for a plotly gauge chart, setting the type to "indicator" and the mode to "gauge+number" to show the data with the gauge itself. Finally, it sets the value to the filtered data "wfreq", and sets the parameters for the gauge including the range of the gauge, colors and range of each step, and the threshold values. It sets labels and places the gauge visualization within the "gauge" div in the HTML</li></ul>
    </li>
    <li>optionChanged
        <ul><li>The optionChanged function handles the site's interactivity, and allows the user to explore each sample's data through the use of the dropdown menu. The HTML uses an onchange event listener to call the optionChanged function with (this.value) as a parameter. The function first resets the html of the "#sample-metadata" div and then uses the passed value as a parameter in the "getMetaData","drawBar","drawBubble" and "drawGauge" functions to refresh each visualization with the data from the selected sample id. </li></ul>
    </li>
    </ol>
