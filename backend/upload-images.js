const { BlobServiceClient } = require('@azure/storage-blob');

require('dotenv').config();

/**
 * Create Blob in container
 * @param {ContainerClient} containerClient 
 * @param {File} file 
 */
const createBlobInContainer = async (containerClient, file) => {

    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadData(file, options);
}

/**
 * Upload file to Blob.
 * @param {File | null} file 
 * @returns {Promise<string[]>}
 */
const uploadFileToBlob = async (file) => {
    if (!file) return [];

    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
        `https://${process.env.storage_account_name}.blob.core.windows.net/?${process.env.storage_sas_token}`
    );

    // get Container - full public read access    
    const containerName = "image";
    const containerClient = blobService.getContainerClient(containerName);

    // upload file
    await createBlobInContainer(containerClient, file);

    // get list of blobs in container
    return getBlobsInContainer(containerClient);
}