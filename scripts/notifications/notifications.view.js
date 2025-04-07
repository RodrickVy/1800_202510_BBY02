// Event listener for DOMContentLoaded to load and display notifications for the user
document.addEventListener('DOMContentLoaded', () => {
    Account.addListener('notificationsLoader', async (userAccount) => {
        if (!userAccount.id) return;
        console.log(userAccount.toJson())
        const notifications = await NotificationService.getNotificationsForUser(userAccount.id);
        const container = document.getElementById('notificationsContainer');
        const pastContainer = document.getElementById('pastNotificationsContainer');
        container.innerHTML = '';

        if (notifications.length === 0) {
            container.innerHTML = '<p class="text-muted text-sm-center">No notifications yet.</p>';
            return;
        }

        notifications.sort((a, b) => b.sensitivity - a.sensitivity);

        notifications.forEach(notification => {

            const card = document.createElement('div');
            card.className = 'card mb-3 shadow-sm';
            card.innerHTML = `
                <div id="${notification.id}" class="card-body">
                    <h5 class="card-title">${notification.title}</h5>

                    <p class="card-text">${notification.body}</p>
                    <small class="text-muted">Action: ${notification.action}</small>
                    
                </div>
            `;
            if (notification.viewed) {
                pastContainer.appendChild(card);
            } else {
                container.appendChild(card);
            }

            listenToIfExists(`${notification.id}`, 'click', (e) => {
                if (notification.action === 'Games') {
                    localStorage.setItem('gameToView', notification.actionData);
                    navigateToRoute(___PAGES.gameDetails);
                    NotificationService.updateNotification(notification.id, {
                        viewed: true
                    });
                }
            })
        });
    });
});