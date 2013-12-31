/*globals ko*/
function initSetting() {
    console.log("SETTING - Device READY");
    app.setting = new SettingViewModel();
    
    ko.applyBindings(app.setting, document.getElementById("page-config"));
    ko.applyBindings(app.setting, document.getElementById("page-config-app"));

    
    
    $(document).delegate('#page-config', 'pageshow', function () {
        var pg = $("#page-login");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;


        pg.find('[data-role="content"]').height(the_height_content);
        
    });
     $(document).delegate('#page-config-app', 'pageshow', function () {
        var pg = $("#page-login");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;


        pg.find('[data-role="content"]').height(the_height_content);
        
    });
    
    
}

$(document).on("deviceready", initSetting);

function SettingViewModel() {
    /// <summary>
    /// A view model that represents a single tweet
    /// </summary>
    var self = this;
    
    // --- properties
    self.IdAreaVenda = ko.observable("0");
    
    
    self.HasConfigRow = ko.observable(false);
    self.ConfigRow;
    self.PageAtive="";
    self.template = "SettingViewModel";
    self.isDemo = ko.observable();
    self.isAutoSyncDB = ko.observable();
    self.SliderValues = ["Não","Sim"];
    self.IsServerHostAvaiable = ko.observable(false);
    self.ServerHost = ko.observable("");
    
    
    self.IdAreaServico = ko.observable("0");

    self.TrabalhaComProducao = ko.observable(true);
    self.Servicos = ko.observableArray();
   
    self.DemoEnabled = ko.computed(function () {
        if (self.isDemo()=="Sim") 
            return "true";
        else
            return "false";
    });

    self.ServerHostAvaiable = ko.computed(function () {
        if (self.IsServerHostAvaiable()) 
            return "true";
        else
            return "false";
    });


    
    
    this.CheckHostAvaiable = function () {
        try{
                //alert("teste");
                if (self.isDemo()=="Sim"){
                     
                    //alert("isDemo");
                    
                    self.IdAreaVenda("0");
                    self.IdAreaServico("0");
                    var sDemo = new AreaDeServico();
                    sDemo.AreaDeServicoid = "0";
                    sDemo.AreaDeServicoName = "Demo";
                    
                    //self.Servicos([]);
                    
                    self.Servicos.push(sDemo);
                    
                    //$("#cboAreaServico").selectmenu('refresh');
                    self.IsServerHostAvaiable(true);   
                     //Verificar DB
                    $.mobile.changePage("#page-config-app");                                            
                    return;                    
                }
                else{
                    self.IsServerHostAvaiable(false);
                    if (self.ServerHost()=="")
                    {
                        alert("É necessário informar o SERVIDOR!");
                        return;
                    }
                    else{
                        //Chamar getService e verificar se servidor OK
                        var sUrl =  "http://" + self.ServerHost() + "/MobilePDV/AutoMagazineWCF.svc/getServices/";
                        $.ajax({
                            type: "GET",
                            url: sUrl,
                            data: "{}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            processdata: true,
                            crossDomain: true,
                            beforeSend : function() {
                                $.mobile.loading('show');
                            },
                            complete   : function() {
                                $.mobile.loading('hide');
                            },
                            success: function (data) {
                                //alert(data.getServicesResult);
                                var parsed = $.parseJSON(data.getServicesResult);
                                if (!parsed.status){
                                     alert(parsed.erro);   
                                }
                                else{
                                    var jsonServices = $.parseJSON(parsed.retorno);
                                    
                                    var totalServicos = jsonServices.length; 
                                    console.log(totalServicos + " Áreas de Serviço");
                                    self.Servicos.removeAll();
                                    for (var i = 0 ; i<totalServicos;i++){
                                        
                                        var item = new AreaDeServico();
                                        item.AreaDeServicoid = jsonServices[i].idareavenda;
                                        item.AreaDeServicoName = jsonServices[i].dsareavenda;
                                        self.Servicos.push(item);
                                    }
                                    self.IsServerHostAvaiable(true);
                                    //alert("Conexão realizada com sucesso!");
                                    $.mobile.changePage("#page-config-app");                                            
                                }
                            },
                            error: function (XHR, errStatus, errorThrown) {
                                alert("Ocorreu um erro durante a comunicação com o servidor.\n\nSTATUS: " + XHR.status);
                                alert(sUrl);
                                //alert(XHR.responseText);
                                //alert(errStatus);
                                //alert(errorThrown.message);

                                //$("#erro").html(XHR.responseText);
                                //$.mobile.changePage("#page-erro");
                            }
                        });
                    
                   }
                }
            }     
         catch(err){
              var txt="Ocorreu um erro durante a obtenção das configurações do sistema.\n\n" + err.message;
              alert(txt);
             alert(sUrl);
              //$("#erro").html(err.message);
              //$.mobile.changePage("#page-erro");
            }
    
    };
    
    this.LoadSettings = function (gotoPage) {
        try{
                $.when(getConfigSQL()).pipe(function(dta) {
                
                    
                    
                    if (dta.rows.length==0)
                    {
                        if (gotoPage == "#page-config")
                        {
                            self.IdAreaVenda("0");
                            self.IdAreaServico("0");
                            
                            var sDemo = new AreaDeServico();
                            sDemo.AreaDeServicoid = "0";
                            sDemo.AreaDeServicoName = "Demo";
                        
                            self.Servicos.push(sDemo);
                            self.IsServerHostAvaiable(true);   
   
                            self.isDemo("Sim");
                        
                        
                            self.ServerHost("Demo");
                            self.IdAreaVenda("0"); 
                            self.IdAreaServico("0");
    
                        
                            self.isAutoSyncDB("Sim");
                        
                            self.HasConfigRow(false);
                            
                            if (gotoPage!=""){
                                $.mobile.changePage(gotoPage, {
                                    transition: $.mobile.defaultPageTransition,
                                    reverse: false,
                                });
                            }
                        }
                        else
                        {
                            alert("É necessário configurar o sistema antes de entrar pela primeira vez no sistema.");
                        }
                        return;                                       
                    }
                    else {
                        self.ConfigRow = dta.rows.item(0);
                        
                        if (self.ConfigRow.DemoMode=="false")
                            self.isDemo("Não");
                        else
                            self.isDemo("Sim");
                        
                        
                        self.ServerHost(self.ConfigRow.ServerHost);
                        self.IdAreaVenda("" + self.ConfigRow.idareavenda); 
                        self.IdAreaServico("" + self.ConfigRow.idareavenda); 
                        
                        if (self.ConfigRow.AutoSyncDB=="false")
                            self.isAutoSyncDB("Não");
                        else
                            self.isAutoSyncDB("Sim");
                        
                        self.IsServerHostAvaiable(true);
                        self.HasConfigRow(true);

                        if (gotoPage=="IniciarSistema"){ //Ao iniciar o sistema
                            
                            //Verificar informações e sincronizar dados
                    
                            $.mobile.changePage("#page-sync", {
                                transition: $.mobile.defaultPageTransition,
                                reverse: false,
                            });
                            app.sync.syncdatabase(false);

                        }                        
                        else if (gotoPage!=""){
                            $.mobile.changePage(gotoPage, {
                                transition: $.mobile.defaultPageTransition,
                                reverse: false,
                            });
                        }
                    }
                }).done(function() {
                    //alert("DONE");                
                }).fail(function(error) {
                    
                    alert("Não foi possível obter as configurações! erro: " + error.message);
                    
                });    
            }     
            catch(err){
              var txt="Ocorreu um erro durante a obtenção das configurações do sistema.\n\n" + err.message;
              alert(txt);
              //$("#erro").html(err.message);
              //$.mobile.changePage("#page-erro");
            }
    
    };
    
    this.AoEntrarNoSistema = function () {
        try{

            app.login.onLogout();
            app.setting.LoadSettings("IniciarSistema");
            

            }     
         catch(err){
              var txt="Ocorreu um erro durante a obtenção das configurações do sistema.\n\n" + err.message;
              alert(txt);
              //$("#erro").html(err.message);
              //$.mobile.changePage("#page-erro");
            }
    
    };
        
    this.AoEntrarNoSistema2 = function () {
        try{

                $.when(getConfigSQL()).pipe(function(dta) {
                
                    
                    
                    if (dta.rows.length==0)
                    {
                    
                        self.IdAreaVenda("0");
                        self.IdAreaServico("0");
                        var sDemo = new AreaDeServico();
                        sDemo.AreaDeServicoid = "0";
                        sDemo.AreaDeServicoName = "Demo";
                    
                        self.Servicos.push(sDemo);
                        self.IsServerHostAvaiable(true);   
                    }
                    else {
                        self.ConfigRow = dta.rows.item(0);
                        
                        if (self.ConfigRow.DemoMode=="false")
                            self.isDemo("Não");
                        else
                            self.isDemo("Sim");
                        
                        
                        self.ServerHost(self.ConfigRow.ServerHost);
                        self.IdAreaVenda(self.ConfigRow.idareavenda); 
                        self.IdAreaServico(self.ConfigRow.idareavenda); 
                        
                        if (self.ConfigRow.AutoSyncDB=="false")
                            self.isAutoSyncDB("Não");
                        else
                            self.isAutoSyncDB("Sim");
                        
                        self.IsServerHostAvaiable(true);
                        self.HasConfigRow(true);
                    }
                    
                    //Verificar informações e sincronizar dados
                    
                    $.mobile.changePage("#page-sync", {
                                transition: $.mobile.defaultPageTransition,
                                reverse: false,
                            });
                    app.sync.syncdatabase(false);
                    
                    //
                }).done(function() {
                    //alert("DONE");                
                }).fail(function(error) {
                    
                    alert("Não foi possível obter as configurações! erro: " + error.message);
                    
                });    

            }     
         catch(err){
              var txt="Ocorreu um erro durante a obtenção das configurações do sistema.\n\n" + err.message;
              alert(txt);
              //$("#erro").html(err.message);
              //$.mobile.changePage("#page-erro");
            }
    
    };
    
    this.onSave = function () {
        
        
        try{

                
                if (self.isDemo()=="Não"){
                    
                    if (self.ServerHost()=="")
                    {
                        alert("É necessário informar o SERVIDOR!");
                        
                        return;
                    }
                    if ($("#cboAreaServico").val()=="" )
                    {
                        alert("É necessário informar a ÁREA DE SERVIÇO!");
                     
                        return;
                    }
 
                }
                var pDemoMode = (self.isDemo()=="Sim");
                var pServerHost =self.ServerHost();
                var pidareavenda =$("#cboAreaServico").val();
                var pAutoSyncDB= (self.isAutoSyncDB()=="Sim");
                $.when(getConfigSQL()).pipe(function(dta) {
                
                    
                    //intRows = self.Servico.Categorias().length;
                    if (dta.rows.length==0)
                    {
                        $.when(insertConfigSQL(pDemoMode,pServerHost,pidareavenda,pAutoSyncDB)).pipe(function(dta) {
                        
                            
                            alert("Configurações gravadas com sucesso!");                                                                   
                            $.mobile.changePage("#page-start", {
                                transition: $.mobile.defaultPageTransition,
                                reverse: false,
                            });

                        }).done(function() {
                            //alert("DONE insert");                
                        }).fail(function(error) {
                            
                            alert("Não foi possível inserir as configurações! erro: " + error.message);
                            
                        });
                    }
                    else
                    {
                        $.when(updateConfigSQL(pDemoMode,pServerHost,pidareavenda,pAutoSyncDB)).pipe(function(dta) {
                        
                            
                            alert("Configurações gravadas com sucesso!");                                       
                            $.mobile.changePage("#page-start", {
                                transition: $.mobile.defaultPageTransition,
                                reverse: false,
                            });

                        }).done(function() {
                            //alert("DONE update");                
                        }).fail(function(error) {
                            
                            alert("Não foi possível atualizar as configurações! erro: " + error.message);
                            
                        });
                    }
                    
                    

                }).done(function() {
                    //alert("DONE");                
                }).fail(function(error) {
                    
                    alert("Não foi possível obter as configurações! erro: " + error.message);
                    
                });
            
            }     
         catch(err){
              var txt="Ocorreu um erro durante a gravação das configurações do sistema.\n\n";
              alert(txt);
              $("#erro").html(err.message);
              $.mobile.changePage("#page-erro");
            }
        
    };

    this.onCancel=  function () {
        var that = this;

        
        $.mobile.changePage("#" + self.PageAtive);
        
    };

    this.clearForm = function () {
        var that = this;

    };

    this.checkEnter = function (e) {
        var that = this;

        if (e.keyCode == 13) {
            $(e.target).blur();
            that.onLogin();
        }
    };

    this.ShowPage = function () {
        self.PageAtive = $.mobile.activePage.attr("id");
        self.LoadSettings("#page-config");
        //$.mobile.changePage("#page-config", {
        //    transition: $.mobile.defaultPageTransition,
        //    reverse: false,
        //});
    
    };

}


