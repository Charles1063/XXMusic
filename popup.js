/*sign in/sign up*/
var move_img=document.getElementById("move_img");
var signup_caption=document.getElementById("signup_caption");
var signin_caption=document.getElementById("signin_caption");
var log_btn_signup=document.getElementById("log_btn_signup");
var log_btn_signin=document.getElementById("log_btn_signin");
var show_log_form=document.getElementById("show_log_form");
var page_wrap=document.getElementById("page_wrap");

function moveImgLeft(){
    move_img.className="move_left";
    signup_caption.style.visibility="hidden";
    signin_caption.style.visibility="visible";
    log_btn_signup.style.visibility="hidden";
    log_btn_signin.style.visibility="visible";
    
}

function moveImgRight(){
    move_img.className="move_right";
      signup_caption.style.visibility="visible";
    signin_caption.style.visibility="hidden";
    
    log_btn_signin.style.visibility="hidden";
    log_btn_signup.style.visibility="visible";
}

function hideForm(){
    show_log_form.className="popup_window";
    page_wrap.className="";
}

function displayForm(){
    show_log_form.className="popup_window_open";
    page_wrap.className="popup_open_page_wrap";
}

/*add to playlist*/
var add_to_playlist_popup=document.getElementById("add_to_playlist_popup");

function addtoPlaylist(){
    add_to_playlist_popup.className="popup_window_open";
     page_wrap.className="popup_open_page_wrap";
}

function hideaddtoPlaylist(){
    add_to_playlist_popup.className="popup_window";
     page_wrap.className="";
}