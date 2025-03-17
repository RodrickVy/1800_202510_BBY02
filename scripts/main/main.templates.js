// Loads the common HTML templates

window.onload = ()=>{


     Account.addListener("mainPageAppBar",(userData)=>{
        loadTemplate("appBarPlaceholder",`<nav class="navbar navbar-expand-lg" style="background-color: #D0DDD7; height: 10vh; min-width: 100%;">
            <div class="container-fluid d-flex justify-content-between align-items-center px-3" style="height: 100%;">
                <a href="./account.html" style="text-decoration:none; cursor:pointer;" class="d-flex flex-column align-items-center"  >
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
            <div class="footer-icons d-flex justify-content-between" style="width: 100%; padding-top:15px; text-align: center;">
                <a href="main.html" class="text-dark routeItem" >
                <i class="fas fa-home" ></i>
                <p>  Home</p>
                </a>
                <a href="teams.html" class="text-dark routeItem" >
                <i class="fas fa-users" ></i>
                <p>Teams</p>
                </a>
                
                
                <a href="league.html" class="text-dark routeItem" >
                <i class="fas fa-trophy" ></i>
                <p>Leagues</p>
                </a>
               <a href="games.html" class="text-dark routeItem">
                <i class="fas fa-flag-checkered" ></i>
                <p>Games</p>
                </a>
                

                <a href="./account.html" class="text-dark routeItem" >
                <i class="fas fa-user" ></i>
                 <p >Account</p>
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




