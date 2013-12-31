/*globals $, ko, document, SearchResultsViewModel, TweetViewModel, TwitterSearchViewModel */

ko.virtualElements.allowedBindings.updateListviewOnChange = true;
ko.bindingHandlers.updateListviewOnChange = {
    update: function (element, valueAccessor) {
        //alert("chamou");
        ko.utils.unwrapObservable(valueAccessor());  //grab dependency
        
        var listview = $(element).parents()
                                 .andSelf()
                                 .filter("[data-role='listview']");

        if (listview) {
            try {
                $(listview).listview('refresh');
            } catch (e) {
                // if the listview is not initialised, the above call with throw an exception
                // there doe snot appear to be any way to easily test for this state, so
                // we just swallow the exception here.
            }
        }
    }
};

 ko.bindingHandlers.updatecontrolgroupOnChange = {
    update: function (element, valueAccessor) {
        //alert("chamou");
        ko.utils.unwrapObservable(valueAccessor());  //grab dependency
        
        var controlgroup = $(element).parents()
                                 .andSelf()
                                 .filter("[data-role='controlgroup']");

        if (controlgroup) {
            try {
                $(controlgroup).controlgroup('refresh');
            } catch (e) {
                // if the listview is not initialised, the above call with throw an exception
                // there doe snot appear to be any way to easily test for this state, so
                // we just swallow the exception here.
            }
        }
    }
};


ko.bindingHandlers.jqmRefreshList = {
    update: function (element, valueAccessor) {
        //alert("chamou2");
        ko.utils.unwrapObservable(valueAccessor());
        try {
            $(element).listview("refresh")
        } catch (ex) { }
    }
}

// create the various view models
//var twitterSearchViewModel = new TwitterSearchViewModel(),
//searchResultsViewModel = new SearchResultsViewModel(),
//tweetViewModel = new TweetViewModel();
//var _LoginViewModel = new LoginViewModel();
var _AlertViewModel = new AlertViewModel();
//var _TecladoViewModel = new TecladoViewModel();
// load the stored state (recent searches)
//twitterSearchViewModel.loadState();

$.mobile.defaultPageTransition = "none";// "slide";
$.mobile.theme = 'a';
$('html').addClass('noscroll');


//document.addEventListener("deviceready", init, false);
//Deviceready function
document.addEventListener('deviceready', function () {

    document.addEventListener("backbutton", go_back, false);

}, false);


//Function for back button function
function go_back() {
    //if ($.mobile.activePage.attr("id") == "page-start")
    //    navigator.app.exitApp();
    //else if ($.mobile.activePage.attr("id") == "page-pedido-menu")
    //    navigator.app.exitApp();
    switch($.mobile.activePage.attr("id"))
    {
        case "page-start":
            navigator.app.exitApp();
            break;
        case "page-pedido-menu","page-pedido-codigo","page-pedido-itens","page-pedido-cliente":
            app.pedido.onCancel("1");
            break;
        default:
            break;
    }
}

var app = {};
app.db = null;
//app.pedido = new PedidoViewModel();
//app.teclado = new TecladoViewModel();
//app.login  = new LoginViewModel();


app.gotopage = function (page_name) {
    //alert(page_name);
    $.mobile.changePage("#" + page_name);
    
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}


app.openDb = function () {
    //if (window.sqlitePlugin !== undefined) {
    //    app.db = window.sqlitePlugin.openDatabase("My Database");
    //    alert("check DEVICE");
    //} else {
    //    // For debugging in simulator fallback to native SQL Lite
    //    app.db = window.openDatabase("My Database", "1.0", "Cordova Demo", 5 * 1024 * 1024);
    //    alert("check SIMULATOR");
    //}
    //alert("inicio");
    //alert("uuid : " + device.uuid);
    if (device.uuid == "e0101010d38bde8e6740011221af335301010333" || device.uuid == "e0908060g38bde8e6740011221af335301010333") {
        // For debugin in simulator fallback to native SQL Lite
        console.log("Use built in SQL Lite");
        app.db = window.openDatabase("My Database", "1.0", "Cordova Demo", 5 * 1024 * 1024);
        //alert("open SIMULATOR");
    }
    else {
        //app.db = window.sqlitePlugin.openDatabase("My Database");
        app.db = window.openDatabase("My Database", "1.0", "Cordova Demo", 5 * 1024 * 1024);
        //alert("open DEVICE");
    }
}

app.createTableSettings = function (drop) {
    app.db.transaction(function (tx) {
        if (drop){
            tx.executeSql('DROP TABLE IF EXISTS Settings');
            }
        
        tx.executeSql("CREATE TABLE IF NOT EXISTS Settings (id INTEGER PRIMARY KEY AUTOINCREMENT,DemoMode NUMERIC , ServerHost TEXT, idareavenda INTEGER, AutoSyncDB NUMERIC, LastSyncDB NUMERIC)", [] ,
            function (tx, result) {
                console.log("create Settings");
            },
            function (tx, error) {
                console.log("error create Settings - Code: " + error.code + " - " + error.message);
                alert("Ocorreu um erro durante a criação das configurações, o sistemas deve ser abortado!");
                navigator.app.exitApp();
                }
            );

    });
}

app.dropTableSettings = function () {
     navigator.notification.confirm(
        'Você confirma a exclusão dos dados locais?',  // message
        function (buttonIndex) { 
            
            if (buttonIndex=='1')
            {
                app.db.transaction(function (tx) {
                    tx.executeSql("DROP TABLE IF EXISTS Settings", [] ,
                        function (tx, result) {
                            console.log("drop Settings");
                            alert("Base de Dados local excluída com sucesso! \n\nEntre no sistema novamente.");
                            navigator.app.exitApp();
                        },
                        function (tx, error) {
                            console.log("error drop Settings - Code: " + error.code + " - " + error.message);
                            alert("Ocorreu um erro durante a exclusão da base de dados local, o sistemas deve ser abortado!");
                            navigator.app.exitApp();
                            }
                        );

                });

            }
        },              // callback to invoke with index of button pressed
        'Pedido',            // title
        'Sim,Não'          // buttonLabels
        );    
}
function init() {
    try
        {
        app.openDb();
        app.createTableSettings(false);
    }
    catch(err){
      var txt="Ocorreu um erro durante a inicialização do sistema.\n\n";
      txt+="Erro: " + err.message + "\n\n";
      txt+="Click OK para continuar.\n\n";
      alert(txt);
    }

}

$(document).on("vclick", "button", function (e) {
   
    //$(e.target).trigger('click');
    alert("vclick button");
    app.pedido.SendTecla('W');
    e.stopPropagation();
    e.preventDefault();

});
$(document).on("touchstart", "a[goto]", function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    //alert(this.name);
    //alert("goto");
    var spage = $(e.target).attr("goto");
    $.mobile.changePage("#" + spage);
    

});

$(document).on("touchstart", "a[vclick]", function (e) {
    try
        {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
            
        var target = $( e.target );
        //alert(e.target.nodeName );
        var svclick = target.attr("vclick");
        if (typeof svclick === "undefined") {
            //alert("something is undefined");
            svclick = target.parent().attr("vclick");
        }
        //e.stopImmediatePropagation();
        //alert(this.name);
        
        
        //alert("vclick att " + svclick);
        jQuery.globalEval( svclick + ";" )
        
    }
    catch(err){
      var txt="There was an error on this page.\n\n";
      txt+="Error description: " + err.message + "\n\n";
      txt+="Click OK to continue.\n\n";
      alert(txt);
    }

});
$(document).on("vclick", "a1", function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    //alert(this.name);
    alert("vclick");
    $(e.target).trigger('click');
    //app.pedido.SendTecla('W');
    

});


/* detect device */
//var ua = navigator.userAgent,
//    iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
//    ipad = ~ua.indexOf('iPad'),
//    ios = iphone || ipad,
//    android = ~ua.indexOf('Android');


document.addEventListener("deviceready", init, false);
//Activate :active state on device
document.addEventListener("touchstart", function() {}, false);

/*    $(document).ready(function () {

        init();
        
     
    });
*/



















