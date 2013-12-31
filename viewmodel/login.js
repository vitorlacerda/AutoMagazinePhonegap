/*globals ko*/
function initLogin() {
    console.log("LOGIN - Device READY");
    app.login = new LoginViewModel();
    
    ko.applyBindings(app.login, document.getElementById("page-login"));

    $(document).delegate('#page-login', 'pageshow', function () {
        var pg = $("#page-login");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;


        pg.find('[data-role="content"]').height(the_height_content);
        

        $("#pg-login-txt-username").trigger("click");
        $("#pg-login-txt-username").trigger("focus");
        if (app.setting.isDemo()=="Sim")
            app.login.NomeServidor("Demostração");
        else
            app.login.NomeServidor(app.setting.ServerHost());

    });
   
    $("#pg-login-txt-username").keydown(function (e) {
        var that = this;
        //console.log('Value: ' + $(this).val());
        //console.log('keyCode: ' + e.keyCode);
        if (e.keyCode == 13) {
            //$(e.target).blur();
            $("#pg-login-txt-senha").val("");
            $("#pg-login-txt-senha").trigger("click");
            $("#pg-login-txt-senha").trigger("focus");
            
        }

    });

    $("#pg-login-txt-senha").keydown(function (e) {
        var that = this;
        //console.log('Value: ' + $(this).val());
        //console.log('keyCode: ' + e.keyCode);
        if (e.keyCode == 13) {
            $(e.target).blur();
            app.login.checkEnter(e);
        }

    });

    
    
    $('#pg-login-bt-voltar').on("vclick", function (e) {
        
        e.preventDefault();
        e.stopPropagation();
        var spage = $(e.target).attr("goto");
        $.mobile.changePage("#" + spage);
            
        //alert($(e.target).attr("goto"));
    });
    
    $("#pg-login-bt-login").on("vclick", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.login.onLogin();
    });
    
    $("#pg-login-bt-logout").on("vclick", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.login.onLogout();
    });

}

$(document).on("deviceready", initLogin);

function LoginViewModel() {
    /// <summary>
    /// A view model that represents a single tweet
    /// </summary>

    // --- properties
    var self = this;
    
    this.template = "LoginView";
    this.isLoggedIn = ko.observable(false);
    this.userid = ko.observable();
    this.username = ko.observable("");
    this.password = ko.observable("");
    this.name = ko.observable("");
    this.IdFilial = ko.observable("");
    this.IdDeposito = ko.observable("");
    
    
    self.NomeServidor =  ko.observable("");

    // --- public functions

    this.init = function (login) {
        this.isLoggedIn(login.isLoggedIn);
        this.userid(login.userid);
        this.username(login.username);
        this.password(login.password);
    };

    this.onLogin = function () {
        
        if ($("#pg-login-txt-username").val() == "" || $("#pg-login-txt-senha").val() == "") {
            
            navigator.notification.alert("Entre com o usuário e senha!", function () { }, "Login falhou", 'OK');
            return;
        }
        if (app.setting.isDemo()=="Sim"){
            alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");
            this.isLoggedIn(true);
            $.mobile.changePage("#page-menu-home");

        }
        else{
            var sUrl = "";
            
            sUrl = "http://localhost:26633/AutoMagazineWCF.svc/getUserByLogin/1";
            sUrl = "http://" +  app.setting.ServerHost() + "/MObilePDV/AutoMagazineWCF.svc/getUserByLogin/1";
            var vData = {"login": "Caixa" , "password" : "9999"};
            
            $.ajax({
                    type: "PUT",
                    url: sUrl,
                    data: JSON.stringify(vData) ,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    processdata:true,
                    crossDomain: true,
                    beforeSend : function() {
                        $.mobile.loading('show');
                    },
                    complete   : function() {
                        $.mobile.loading('hide');
                    },
                    success: function (data) {
                        //alert("funcionou");
                       // window.localStorage.setItem('getUserByLogin', JSON.stringify(data));
                       // alert(JSON.stringify(data));
                        //var parsed = $.parseJSON(data);
                        
                        if (data.status){
                            
                            var oUser  =$.parseJSON(data.retorno);
                            //alert(oUser.UserName);
                            
                            self.userid(oUser.IdUser);
                            self.name(oUser.UserName);
                            self.IdFilial(oUser.IdFilial);
                            self.IdDeposito(oUser.IdDeposito);
                            self.isLoggedIn(true);
                            
                            $.mobile.changePage("#page-menu-home");

                        }
                        else{
                            alert(data.erro);
                        }
                        //alert("inicio");
                        // Put the object into storage
                        //window.localStorage.setItem('JSONData2Result', JSON.stringify(parsed));
                        //alert("FIM");
                        
                       
                        
                    },
                    error: function (XHR, errStatus, errorThrown) {
                        alert("Ocorreu um erro durante a comunicação com o servidor");
                        alert(XHR.responseText);
                        $("#syncresult").append(XHR.responseText);
                    }
                });

        }
    };

    
    this.onLogout =  function () {
        var that = this;

        that.clearForm();
        this.isLoggedIn(false);
        $.mobile.changePage("#page-start");
        
    };

    this.clearForm = function () {
        var that = this;

        that.username("");
        that.password("");
    };

    this.checkEnter = function (e) {
        var that = this;

        if (e.keyCode == 13) {
            $(e.target).blur();
            that.onLogin();
        }
    };

    this.ForceClick = function () {
        //$("#pg-login-txt-senha").trigger("blur");
        //$("#pg-login-txt-senha").trigger("focus");
        $("#pg-login-txt-senha").trigger("click");
        $("#pg-login-txt-senha").trigger("focus");
    }
    
    this.ForceTap = function () {
        $("#pg-login-txt-senha").trigger("tap");
        $("#pg-login-txt-senha").trigger("focus");
    }

    this.Forcetouchend = function () {
        
        $("#pg-login-txt-senha").trigger("touchend");
        $("#pg-login-txt-senha").trigger("focus");
    }

}


