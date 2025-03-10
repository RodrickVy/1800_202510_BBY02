// Loads the common HTML templates

window.onload = ()=>{


     Account.addListener("mainPageAppBar",(userData)=>{
        loadTemplate("appBarPlaceholder",`<nav class="navbar navbar-expand-lg" style="background-color: #D0DDD7; height: 10vh; min-width: 100%;">
            <div class="container-fluid d-flex justify-content-between align-items-center px-3" style="height: 100%;">
                <a href="./profile.html" style="text-decoration:none; cursor:pointer;" class="d-flex flex-column align-items-center"  >
                    <div class="rounded-circle  d-flex align-items-center justify-content-center"
                        style="background:green;width: 50px; height: 50px;">
                        <div style="color:white; font-weight:bold;padding:10px">${getInitials(userData.name)}</div>
                    </div>
                </a>
               
                <div >
                    <i class="fas fa-envelope" style="font-size: 50px; cursor: pointer;"></i>
                </div>
            </div>
        </nav>`,()=>{});
     });

    loadTemplate("bottomNavPlaceholder",`
            <br><br><br><br><br>
           <footer class="footer"
        style="background-color: #D0DDD7; height: 80px; position: fixed; bottom: 0; width: 100%; left: 0;">
        <div class="container d-flex justify-content-between align-items-center" style="height: 100%;">
            <div class="footer-icons d-flex justify-content-between" style="width: 100%; text-align: center;">
                <a href="main.html" class="text-dark"
                style="flex: 1; display: flex; justify-content: center; text-decoration: none;">
                <i class="fas fa-home" style="font-size: 24px;"></i>
                </a>
                <a href="teams.html" class="text-dark"
                style="flex: 1; display: flex; justify-content: center; text-decoration: none;">
                <i class="fas fa-users" style="font-size: 24px;"></i>
                <a href="league.html" class="text-dark"
                style="flex: 1; display: flex; justify-content: center; text-decoration: none;">
                <i class="fas fa-trophy" style="font-size: 24px;"></i>
                <a href="settings.html" class="text-dark"
                style="flex: 1; display: flex; justify-content: center; text-decoration: none;">
                <i class="fas fa-cog" style="font-size: 24px;"></i>
                </a>

                <a href="./profile.html" class="text-dark"
                style="flex: 1; display: flex; justify-content: center; text-decoration: none;">
                <i class="fas fa-user" style="font-size: 24px;"></i>
                </a>
            </div>
        </div>
    </footer>
        
        `,()=>{
        
    // Start running the carousel
    const carousel =  $(".carousel");

    setInterval(function () {
        carousel.carousel("next");
    }, 2200);
    });


    
    

}


 

