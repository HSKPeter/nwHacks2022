const { BlobServiceClient } = require('@azure/storage-blob');
const { storage_account_name,  storage_sas_token} = require('../api-keys');
const { v1: uuidv1 } = require('uuid');

/**
 * Create Blob in container
 * @param {ContainerClient} containerClient 
 * @param {File} file 
 */
const createBlobInContainer = async (containerClient, file) => {
    const id = uuidv1();
    const originalFilename = file.name;
    const fileExtension = originalFilename.split('.').pop();
    const newFilename = id + "." + fileExtension
    const fileToBeUploaded = new File([file], newFilename);

    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(fileToBeUploaded.name);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: fileToBeUploaded.type } };

    // upload file
    await blobClient.uploadData(fileToBeUploaded, options);
    return newFilename;
}

/**
 * Upload file to Blob.
 * @param {File | null} file 
 * @returns {Promise<string[]>}
 */
export default async function uploadFileToBlob(file) {
    if (!file) return [];

    // const blobService = BlobServiceClient.fromConnectionString(storage_connection_string);
    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const azureUrl = `https://${storage_account_name}.blob.core.windows.net/`
    const blobService = new BlobServiceClient(
        `${azureUrl}?${storage_sas_token}`
    );

    // get Container - full public read access    
    const containerName = "image";
    const containerClient = blobService.getContainerClient(containerName);

    // upload file
    const filename = await createBlobInContainer(containerClient, file);
    console.log(azureUrl + "image/" + filename);
    // get list of blobs in container
    return azureUrl + "image/" + filename;
}

