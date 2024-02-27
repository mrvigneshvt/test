const mongoose = require('mongoose');

// Connection URI

const uri = ''/*uriGoesHere*/
async function deleteAllCollections(uri) {
    try {
        // Connect to the MongoDB server
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Get all collection names
        const collections = await mongoose.connection.db.collections();

        // Delete each collection
        for (let collection of collections) {
            await collection.drop();
            console.log(`Collection '${collection.collectionName}' deleted.`);
        }

        console.log('All collections deleted successfully.');
    } catch (error) {
        console.error('Error deleting collections:', error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
    }
}

// Call the function to delete all collections
deleteAllCollections(uri);
