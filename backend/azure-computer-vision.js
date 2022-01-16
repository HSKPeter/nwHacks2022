// Source: https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/quickstarts-sdk/image-analysis-client-library?pivots=programming-language-javascript&tabs=visual-studio

const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
const { key, endpoint } = require('./api-keys');

const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

// computerVision();

async function computerVision(imageUrl) {

    // const describeURL = 'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/celebrities.jpg';
    // // Analyze URL image
    // console.log('Analyzing URL image to describe...', describeURL.split('/').pop());
    // const caption = (await computerVisionClient.describeImage(describeURL)).captions[0];
    // console.log(`This may be ${caption.text} (${caption.confidence.toFixed(2)} confidence)`);

    // console.log('-------------------------------------------------');
    // console.log('DETECT TAGS');
    // console.log();

    // // Image of different kind of dog.
    // const tagsURL = 'https://moderatorsampleimages.blob.core.windows.net/samples/sample16.png';

    // // Analyze URL image
    // console.log('Analyzing tags in image...', tagsURL.split('/').pop());
    // const tags = (await computerVisionClient.analyzeImage(tagsURL, { visualFeatures: ['Tags'] })).tags;
    // console.log(`Tags: ${formatTags(tags)}`);
    // 'https://www.brownsshoes.com/dw/image/v2/BFTX_PRD/on/demandware.static/-/Sites-brownsshoes-master-catalog/default/dw244fca71/257850_1.jpg';
    const brandURLImage = imageUrl;    
    // Analyze URL image
    console.log('Analyzing brands in image...', brandURLImage.split('/').pop());
    const brands = (await computerVisionClient.analyzeImage(brandURLImage, { visualFeatures: ['Brands'] })).brands;
    console.log(brands)
    // Print the brands found
    if (brands.length) {
        console.log(`${brands.length} brand${brands.length != 1 ? 's' : ''} found:`);
        for (const brand of brands) {
            console.log(`    ${brand.name} (${brand.confidence.toFixed(2)} confidence)`);
        }
    } else { console.log(`No brands found.`); }

}

// Format tags for display
function formatTags(tags) {
    return tags.map(tag => (`${tag.name} (${tag.confidence.toFixed(2)})`)).join(', ');
}

computerVision("https://i5.walmartimages.com/asr/51aaae49-934a-4c4f-9ede-8663326667a8_1.bc3476ba8052f66817453e1f68181229.jpeg");

/**
 * Image tags
 * 
    [
    { name: 'grass', confidence: 0.9957543611526489 },
    { name: 'dog', confidence: 0.9939157962799072 },
    { name: 'mammal', confidence: 0.9928356409072876 },
    { name: 'animal', confidence: 0.9918001890182495 },
    { name: 'dog breed', confidence: 0.9890419244766235 },
    { name: 'pet', confidence: 0.974603533744812 },
    { name: 'outdoor', confidence: 0.969241738319397 },
    { name: 'companion dog', confidence: 0.906731367111206 },
    { name: 'small greek domestic dog', confidence: 0.8965123891830444 },
    { name: 'golden retriever', confidence: 0.8877675533294678 },
    { name: 'labrador retriever', confidence: 0.8746421337127686 },
    { name: 'puppy', confidence: 0.872604250907898 },
    { name: 'ancient dog breeds', confidence: 0.8508287668228149 },
    { name: 'field', confidence: 0.8017748594284058 },
    { name: 'retriever', confidence: 0.6837497353553772 },
    { name: 'brown', confidence: 0.6581960916519165 }
]
 */

/**
 * Brands
    [
    {
        name: 'Microsoft',
        confidence: 0.876,
        rectangle: { x: 20, y: 97, w: 62, h: 52 }
    }
    ]
 */