// A database service that is authentication aware and can handle bad requests/responses gracefully.
class DataStore {
    constructor() {}
    // Create a new document in a given collection.
    // Returns the provided data on success.
    static createDoc(collectionName, docId, data, onSuccess, onError) {
        fs.collection(collectionName)
            .doc(docId)
            .set(data)
            .then(() => {
                // No need to re-read from the DB; just return the data that was set.
                onSuccess(data);
            })
            .catch((error) => {
                onError(error);
            });
    }

    // Read a single document from a given collection.
    // Returns the document's data as a JSON object if found.
    static  readDoc(collectionName, docId, onSuccess, onError) {
        fs.collection(collectionName)
            .doc(docId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    onSuccess(doc.data());
                } else {
                    onError(new Error('Document does not exist'));
                }
            })
            .catch((error) => {
                onError(error);
            });
    }

    // Update an existing document in a given collection.
    // Returns the updated data on success.
    static updateDoc(collectionName, docId, data, onSuccess, onError) {
        fs.collection(collectionName)
            .doc(docId)
            .update(data)
            .then(() => {
                // Return the changes that were applied.
                onSuccess(data);
            })
            .catch((error) => {
                onError(error);
            });
    }

    // Delete a document from a given collection.
    // Returns a simple confirmation object on success.
    static deleteDoc(collectionName, docId, onSuccess, onError) {
        fs.collection(collectionName)
            .doc(docId)
            .delete()
            .then(() => {
                onSuccess({ message: 'Document successfully deleted' });
            })
            .catch((error) => {
                onError(error);
            });
    }

    // Read all documents in a collection.
    // Returns an array of JSON objects, each representing a document.
   static readCollection(collectionName, onSuccess, onError) {
        fs.collection(collectionName)
            .get()
            .then((querySnapshot) => {
                const list = [];
                querySnapshot.forEach((doc) => {
                    // Include the document id with its data.
                    list.push({ id: doc.id, ...doc.data() });
                });
                onSuccess(list);
            })
            .catch((error) => {
                onError(error);
            });
    }
}

export default new DataStore();