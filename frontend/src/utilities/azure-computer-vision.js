// Source: https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/quickstarts-sdk/image-analysis-client-library?pivots=programming-language-javascript&tabs=visual-studio

const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
const { key, endpoint } = require('../api-keys');

const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

export default async function computerVision(imageUrl) {
    const tags = (await computerVisionClient.analyzeImage(imageUrl, { visualFeatures: ['Tags'] })).tags;
    const confidenceScoreThreshold = 0.7;
    const result = tags.filter(tag => tag.confidence > confidenceScoreThreshold);
    return result;
}