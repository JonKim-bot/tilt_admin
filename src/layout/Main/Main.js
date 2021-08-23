import { Link } from 'react-router-dom';


const Main = (props) => {
    const handleLogout = ()=>{
        localStorage.clear()
        window.location.reload();
      }
    return (
        <>
            <div class="header-navbar-shadow"></div>
            <nav class="header-navbar main-header-navbar navbar-expand-lg navbar navbar-with-menu fixed-top ">
                <div class="navbar-wrapper">
                    <div class="navbar-container content">
                        <div class="navbar-collapse" id="navbar-mobile">
                            <div class="mr-auto float-left bookmark-wrapper d-flex align-items-center">
                         
                              
                            </div>

                            <ul class="nav navbar-nav float-right">
                               
                                <li class="dropdown dropdown-user nav-item" onClick={handleLogout}>
                                    <div class="user-nav d-sm-flex d-none"><span class="user-name">Logout</span>
                                 </div>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
                <div class="navbar-header">
                    <ul class="nav navbar-nav flex-row">
                        <li class="nav-item mr-auto"><a class="navbar-brand"
                            href="../../../html/ltr/vertical-menu-template/index.html">
                            <div class="brand-logo">

                            </div>
                            <h2 class="brand-text mb-0">KK admin panel</h2>
                        </a></li>
                      
                    </ul>
                </div>
                <div class="shadow-bottom"></div>
                <div class="main-menu-content">
                    <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation"
                        data-icon-style="lines">
                     
                     
                        <li class=" nav-item">
                            <Link to="/games_leaderboard?gameId=testGame" ><span class="menu-title text-truncate"
                                    data-i18n="Email">Games</span>
                            </Link>
                        </li>

                   
                      
                    </ul>
                </div>
            </div>


            <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper">
                    <div class="content-body">
                            {props.children}
                    </div>
                </div>
            </div>

            <div class="sidenav-overlay"></div>
            <div class="drag-target"></div>

            <footer class="footer footer-static footer-light">
                <p class="clearfix mb-0"><span class="float-left d-inline-block">2021 &copy; PIXINVENT</span><span
                    class="float-right d-sm-inline-block d-none">Crafted with<i
                        class="bx bxs-heart pink mx-50 font-small-3"></i>by<a class="text-uppercase"
                            href="https://1.envato.market/pixinvent_portfolio" target="_blank">Pixinvent</a></span>
                    <button class="btn btn-primary btn-icon scroll-top" type="button"><i
                        class="bx bx-up-arrow-alt"></i></button>
                </p>
            </footer>
        </>
    );
};


export default Main;