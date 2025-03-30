// Notification Model
class Notification {
    constructor({
                    id = '',
                    title = '',
                    body = '',
                    sensitivity = 2,
                    action = '',
                    actionData = {},
                    userIds = [],
                    viewed = false
                } = {}) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.sensitivity = sensitivity;
        this.action = action;
        this.actionData = actionData;
        this.userIds = userIds;
        this.viewed = viewed
    }

    static fromJson(json) {
        return new Notification({
            id: json.id,
            title: json.title,
            body: json.body,
            sensitivity: json.sensitivity ?? 2,
            action: json.action,
            actionData: json.actionData ?? {},
            userIds: json.userIds ?? [],
            viewed: json.viewed || false
        });
    }

    toJson() {
        return {
            id: this.id,
            title: this.title,
            body: this.body,
            sensitivity: this.sensitivity,
            action: this.action,
            actionData: this.actionData,
            userIds: this.userIds,
            viewed: this.viewed
        };
    }
}

// Notification Service
class NotificationService {
    static collection = Account.fs.collection("notifications");

    static async createNotification(notificationData) {
        const notification = new Notification(notificationData);
        const docRef = await this.collection.add(notification.toJson());
        await docRef.update({id: docRef.id});
        return docRef.id;
    }

    static async getNotificationById(notificationId) {
        const snapshot = await this.collection.doc(notificationId).get();
        if (!snapshot.exists) throw new Error('Notification not found');
        return Notification.fromJson(snapshot.data());
    }

    static async updateNotification(notificationId, updatedFields) {
        await this.collection.doc(notificationId).update(updatedFields);
        return true;
    }

    static async deleteNotification(notificationId) {
        await this.collection.doc(notificationId).delete();
        return true;
    }

    static async getNotificationsForUser(userId) {
        const snapshot = await this.collection.where('userIds', 'array-contains', userId).get();
        return snapshot.docs.map(doc => Notification.fromJson(doc.data()));
    }

    static async removeUserFromNotification(notificationId, userIdToRemove) {
        const docRef = this.collection.doc(notificationId);
        const doc = await docRef.get();

        if (!doc.exists) throw new Error('Notification not found');

        const data = doc.data();
        const updatedUserIds = (data.userIds || []).filter(id => id !== userIdToRemove);

        await docRef.update({userIds: updatedUserIds});
        return true;
    }
}
