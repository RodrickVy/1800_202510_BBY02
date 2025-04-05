document.addEventListener('DOMContentLoaded', () => {
    Account.addListener('gameDetailsLoader', async (userAccount) => {
        if (!userAccount.id) return;
        await TeamsService.getAllTeams();
        const gameId = localStorage.getItem('gameToView');
        if (!gameId) return alert('No game selected to view.');

        const game = (await GamesService.loadAllGames()).find(
            game => game.id === gameId
        );
        const captain = await Account.loadUserData(game.captainId);
        const league = await LeaguesService.getLeagueById(game.recLeague);
        const team = TeamsService.teams.filter((_team) => _team.id === game.teamId)[0];
        const userAlreadySubbed = (game.subs.includes(userAccount.id)) || (game.acceptedSubs.includes(userAccount.id));
        const subbedUserAlreadyAccepted = game.acceptedSubs.includes(userAccount.id);
        const container = document.getElementById('gameDetailsContainer');

        container.innerHTML = `
            <div class="card p-4">
                ${userAccount.id === game.captainId ? `<button id="editGameBtn" class="btn btn-warning btn-custom">Edit Details</button>` :
            userAlreadySubbed ? ' <button id="unSub" class="btn btn-custom">Un-Substitute</button>' : ' <button id="substituteBtn" class="btn btn-success btn-custom">Substitute</button>'}
              <hr>
                ${subbedUserAlreadyAccepted ? '<div class="alert alert-success" role="alert">You\'ve been approved</div>' : userAlreadySubbed ? '<div class="alert alert-primary" role="alert">Pending approval</div> ' : ''}
                <h3 class="mt-3">${toTitleCase(team.name)} - ${humanizeDateTime(new Date(game.gameTime))}</h3> 
                <p><i class="fas fa-location-dot"></i> ${game.location}</p>
            
                <p>${game.details}</p>
                <div >
                    <span class="">League: ${league.name}</span>
                    <br>
                    <span class="">Team: ${toTitleCase(team.name)}</span>
                </div>

                <div class="d-flex align-items-center my-3">
                    <img src="${captain.profileUrl}" alt="Captain" style="width: 60px; height: 60px; border-radius: 50%;">
                    <span class="ms-3">${toTitleCase(captain.name)}</span>
                    <a href="mailto:${captain.email}" class="ms-auto btn btn-outline-primary mx-1"><i class="fas fa-envelope"></i></a>
                    <a href="tel:${captain.phoneNumber}" class="btn btn-outline-primary mx-1"><i class="fas fa-phone"></i></a>
                </div>

                <h5>Accepted Subs</h5>
                <div id="acceptedSubs"></div>

                ${userAccount.id === game.captainId ? `<h5 class="mt-4">Requesting Subs</h5><div id="requestingSubs"></div>` : ''}
            </div>
        `;

        if (userAccount.id === game.captainId) {
            document.getElementById('editGameBtn').addEventListener('click', () => {
                localStorage.setItem('gameToEdit', game.id);
                navigateToRoute(___PAGES.editGameDetails);
            });
        }

        const renderUserTile = async (userId, action, targetContainer) => {
            const user = await Account.loadUserData(userId);

            const userTile = document.createElement('div');
            userTile.className = 'd-flex align-items-center my-2';
            userTile.innerHTML = `
                <img src="${user.profileUrl}" style="width: 40px; height: 40px; border-radius: 50%; ${userAccount.id === userId ? 'border: green 3px solid;' : ''}">
                <div class="ms-3 flex-grow-1">
                    <strong>${(game.captainId === Account.userAccount.id || userId === userAccount.id) ? user.name : getInitials(user.name)} ${userAccount.id === userId ? '(Me)' : ''}</strong><br>
                   ${game.captainId === Account.userAccount.id ? ' <small>' + user.email + '</small>' : ''}
                </div>

                ${action}
            `;

            targetContainer.appendChild(userTile);
        };

        const acceptedSubsContainer = document.getElementById('acceptedSubs');
        const requestingSubsContainer = document.getElementById('requestingSubs');

        for (let subId of game.acceptedSubs) {
            await renderUserTile(subId, userAccount.id === game.captainId ? `<a href="mailto:${userAccount.email}" class="ms-auto btn btn-outline-primary mx-1"><i class="fas fa-envelope"></i></a><a href="tel:${userAccount.phoneNumber}" class="btn btn-outline-primary mx-1"><i class="fas fa-phone"></i></a> <button class="btn btn-sm btn-danger" onclick="removeSub('${subId}', true)">Remove</button>  ` : '', acceptedSubsContainer);
        }

        if (userAccount.id === game.captainId) {
            for (let subId of game.subs) {
                await renderUserTile(subId, `
                  
                     <a href="mailto:${userAccount.email}" class="ms-auto btn btn-outline-primary mx-1"><i class="fas fa-envelope"></i></a>
                    <a href="tel:${userAccount.phoneNumber}" class="btn btn-outline-primary mx-1"><i class="fas fa-phone"></i></a>
                      <button class="btn btn-sm btn-success mx-1" onclick="acceptSub('${subId}')">Accept</button>
                    <button class="btn btn-sm btn-danger mx-1" onclick="removeSub('${subId}', false)">Reject</button>
                `, requestingSubsContainer);
            }
        }

        window.acceptSub = async (subId) => {
            game.acceptedSubs.push(subId);
            game.subs = game.subs.filter(id => id !== subId);
            await NotificationService.createNotification({
                id: '',
                title: `You have been approved! Playing with ${toTitleCase(team.name)} ${humanizeDateTime(new Date(game.gameTime))} `,
                body: '',
                sensitivity: 2,
                action: 'Games',
                actionData: game.id,
                userIds: [subId]
            })
            await GamesService.updateGame(gameId, {subs: game.subs, acceptedSubs: game.acceptedSubs});
            window.location.reload();
        };

        window.removeSub = async (subId, isAccepted) => {
            if (isAccepted) {
                game.acceptedSubs = game.acceptedSubs.filter(id => id !== subId);
                game.subs.push(subId);

            } else {
                game.subs = game.subs.filter(id => id !== subId);
                await NotificationService.createNotification({
                    id: '',
                    title: `You've been dropped`,
                    body: `Game: ${toTitleCase(team.name)} Time:${humanizeDateTime(new Date(game.gameTime))} `,
                    sensitivity: 2,
                    action: 'Games',
                    actionData: game.id,
                    userIds: [subId]
                })
            }

            await GamesService.updateGame(gameId, {subs: game.subs, acceptedSubs: game.acceptedSubs});
            window.location.reload();
        };

        listenToIfExists('substituteBtn', 'click', async (e) => {
            // 
            if (!(game.subs.includes(userAccount.id)) && !(game.acceptedSubs.includes(game.id))) {
                await GamesService.updateGame(gameId, {subs: [...game.subs, userAccount.id]});

                await NotificationService.createNotification({
                    id: '',
                    title: `@${userAccount.name} would like to  sub, for ${toTitleCase(team.name)} @${humanizeDateTime(new Date(game.gameTime))} `,
                    body: `Game: ${toTitleCase(team.name)} Time:${humanizeDateTime(new Date(game.gameTime))} `,
                    sensitivity: 2,
                    action: 'Games',
                    actionData: game.id,
                    userIds: [game.captainId]
                })
            } else {
                alert("You are already added as a sub")
            }

            window.location.reload();


        })

        listenToIfExists('unSub', 'click', async (e) => {

            const subs = removeItemInList(game.subs, userAccount.id);
            const acceptedSubs = removeItemInList(game.acceptedSubs, userAccount.id);

            await GamesService.updateGame(gameId, {subs: subs, acceptedSubs: acceptedSubs});
            await NotificationService.createNotification({
                id: '',
                title: `@${userAccount.name} canceled his sub role, for ${toTitleCase(team.name)} @${humanizeDateTime(new Date(game.gameTime))} `,
                body: `Game: ${toTitleCase(team.name)} Time:${humanizeDateTime(new Date(game.gameTime))}. `,
                sensitivity: 2,
                action: 'Games',
                actionData: game.id,
                userIds: [game.captainId]
            })
            window.location.reload();


        })
    });
});
