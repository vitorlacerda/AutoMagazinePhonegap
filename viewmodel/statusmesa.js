/*globals ko*/

function initStatus() {
    console.log("STATUS - Device READY");
    app.status = new StatusViewModel();
    
    ko.applyBindings(app.status, document.getElementById("page-status"));
        


    $(document).delegate('#page-status', 'pageshow', function () {
        var pg = $("#page-status");
        
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        //the_height_content = the_height_content - 5;
        
        
        the_height_content = the_height_content - (10); //retita 1 px de spacing GRID por Linha + 1px ou seja 9 Linhas + 1px = 10px
        
        pg.find('[data-role="content"]').height(the_height_content);
        
        var area_height = the_height_content * 0.08;// $("#ped-prod-1").height();
        
        $(".tdarea").height(area_height);
        area_height = $(".tdarea").height();
        $(".tdarea").width(Math.floor($(window).width()* 0.95));

        
        var nav_height = (the_height_content-area_height) * (1/8);// $("#ped-prod-1").height();
        $(".tdStatus").height(nav_height-2); //Tira as bordas da grid
        $(".tdStatus").width(Math.floor($(window).width()* 0.315));
        nav_height = $(".tdStatus").height();
        
        
        $(".tdNavStatus").height((the_height_content-area_height - ((nav_height+2)*7)));
        
//        var prod_height = (the_height_content - area_height - nav_height) * (1/7);// $("#ped-prod-1").height();




    });

    $("#page-status .Status").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.status.ItemSelect($(e.target));
    });
    
    $(".CancelarStatus").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.status.onCancel();
    });
    
    
    $("#btnPageEsq").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.status.ShowMesasPrev();
    });
    
    $("#btnPageDir").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.status.ShowMesasNext();
    });
    
    $("#page-status .FooterStatus").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(e.target).removeClass('ui-btn-active');
    });
    
    $("#page-status .FooterStatus").on("onclick", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(e.target).removeClass('ui-btn-active');
    });
    
    $("#page-status .FooterStatus").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(e.target).removeClass('ui-btn-active');
    });
    
}

$(document).on("deviceready", initStatus);

function formatCurrency(value) {
    return "R$ " + value.toFixed(2);
}


function StatusViewModel() {
    /// <summary>
    /// A view model that represents a single tweet
    /// </summary>

    // --- properties

    var self = this;

    self.StatusItens={};
    
    //alert("pedido");
    self.NomeAreaVenda = ko.observable("");
    self.TituloStatus = ko.observable("");
    
    //Controlar a TELA 


    self.intPageStatus = 0;

       
    this.AbreStatus = function () {

        try{
        
        if (app.setting.isDemo()=="Sim"){
            alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");

            $.mobile.changePage("#page-pedido");
            
        }
        else{
            var sUrl = "";
            
            sUrl = "http://localhost:26633/AutoMagazineWCF.svc/StatusMesa/1";
            sUrl = "http://" +  app.setting.ServerHost() + "/MObilePDV/AutoMagazineWCF.svc/StatusMesa/1";

            //Preparar Data para envio
            
            var vData = {};
            
            vData.IdAreaVenda = app.setting.IdAreaVenda();
            vData.IdUser = app.login.userid();
            vData.TipoNumeracao = 'M';
            vData.NumPedido = "";

            //alert (JSON.stringify(vData));
            var sData= JSON.stringify(vData);
            window.localStorage.setItem('StatusMesaSend', sData);
            $.ajax({
                    type: "PUT",
                    url: sUrl,
                    data: sData ,
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
                        window.localStorage.setItem('StatusMesa', JSON.stringify(data));
                        
                        if (data.status){
                            
                                
                            self.StatusItens= $.parseJSON(data.retorno);
                            
                            self.NomeAreaVenda(self.StatusItens.NomeAreaVenda);
                            
                            self.TituloStatus("Status Mesas");

                            //Controla o Indice do array do Cat Itens que esta selecionado
                            self.IntPageStatus= 0;


                            self.ShowMesas(eNavegacao.PrimeiraPagina);

                            $.mobile.changePage("#page-status");

                        }
                        else{
                            alert(data.erro);
                        }
                        
                    },
                    error: function (XHR, errStatus, errorThrown) {
                        alert("Ocorreu um erro durante a comunicação com o servidor");
                        alert(XHR.responseText);
                        $("#syncresult").append(XHR.responseText);
                    }
            });
        }
            
        }
        catch(err)
        {
            navigator.notification.alert("Ocorreu um erro ao AbrirStatus: " + err.message, function () { }, "Operação Cancelada", 'OK');
            $.mobile.changePage("#page-pedido-home");
        }
        
    };



    
    this.ShowMesasNext = function (pagina) {
      
        self.ShowMesas(eNavegacao.ProximaPagina);
    };
    this.ShowMesasPrev = function (pagina) {
        self.ShowMesas(eNavegacao.PaginaAnterior);
    };


    this.ShowMesas = function (nav) {

        try {
            //this.SuspendLayout();
            var intRows = 0;
            var intButtons = 21;
            var intPages = 0;
            var i = 0;
            var intNumButton = 0;
                
                intRows = self.StatusItens.Mesas.length;
                
                intPages = Math.floor(intRows / intButtons);
            
                if ((intRows % intButtons) == 0)
                    intPages = intPages - 1;

                if (intPages < 0)
                    intPages = 0;

                if (nav == eNavegacao.PrimeiraPagina) {
                    self.intPageStatus = 0;
                    $("#btnPageEsq").addClass('ui-disabled');
                    if ((self.intPageStatus + 1) <= intPages)
                        $("#btnPageDir").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnPageDir").addClass('ui-disabled');
                }
                else if (nav == eNavegacao.PaginaAnterior) {
                    self.intPageStatus -= 1;
                    if ((self.intPageStatus - 1) >= 0)
                        $("#btnPageEsq").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnPageEsq").addClass('ui-disabled');

                    if ((self.intPageStatus + 1) <= intPages)
                        $("#btnPageDir").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnPageDir").addClass('ui-disabled');
                }
                else if (nav == eNavegacao.ProximaPagina) {

                    self.intPageStatus += 1;
                    //alert("aqui");
                    if ((self.intPageStatus - 1) >= 0)
                        $("#btnPageEsq").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnPageEsq").addClass('ui-disabled');

                    if ((self.intPageStatus + 1) <= intPages)
                        $("#btnPageDir").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnPageDir").addClass('ui-disabled');
                }


                for (i = 1; i <= intButtons; i++) {
                    var index = ((self.intPageStatus ) * intButtons) + i;
                    var btn = $("#Status-" + i);
                    if (index > intRows) {
                        btn.buttonMarkup({ theme: 'b' });
                        btn.text("");
                        btn.val("");
                        btn.addClass('ui-disabled');
                        
                    }
                    else {
                        
                        btn.removeClass('ui-disabled');

                        //var categ = self.Servico.Categorias()[index - 1];
                        var mesa = self.StatusItens.Mesas[index -1];
                        btn.text(mesa.NumMesa);
                        if (mesa.Status=="L") //Livre
    					{
                            btn.buttonMarkup({ theme: "e" });
    					}
                        else if (mesa.Status=="O") //Ocupada
    					{
                            btn.buttonMarkup({ theme: 'i' });
    					}
                        else if (mesa.Status=="F") // em fechamento
    					{
                            btn.buttonMarkup({ theme: 'f' });
    					}
                        btn.val(index - 1);
                        
                    }
                }


        }
        finally {
            //this.ResumeLayout(true);
        }
    };


    this.ItemSelect = function (BtnStatus) {
       
        
        
        
        if (app.setting.isDemo()=="Sim"){
            alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");

            $.mobile.changePage("#page-pedido");
            
        }
        else{
            var sUrl = "";
            
            sUrl = "http://localhost:26633/AutoMagazineWCF.svc/StatusMesa/1";
            sUrl = "http://" +  app.setting.ServerHost() + "/MObilePDV/AutoMagazineWCF.svc/StatusMesa/1";

            //Preparar Data para envio
            
            var vData = {};
            
            vData.IdAreaVenda = app.setting.IdAreaVenda();
            vData.IdUser = app.login.userid();
            vData.TipoNumeracao = 'M';
            vData.NumPedido = BtnStatus.text();

            //alert (JSON.stringify(vData));
            var sData= JSON.stringify(vData);
            window.localStorage.setItem('StatusMesaSend', sData);
            $.ajax({
                    type: "PUT",
                    url: sUrl,
                    data: sData ,
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
                        window.localStorage.setItem('StatusMesa', JSON.stringify(data));
                        
                        if (data.status){
                            
                            var StatusItens = $.parseJSON(data.retorno);
                            if (StatusItens.Mesas[0].Status=="L"){
                                
                                
                                app.teclado.ShowPage("1");
                                app.teclado.NumInformado(StatusItens.Mesas[0].NumMesa);
                                return;
                                
                            }
                            else{
                                app.teclado.NumInformado(StatusItens.Mesas[0].NumMesa);
                                app.teclado.AbreConta();
                                return;
                            }
                            
                        }
                        else{
                            alert(data.erro);
                        }
                        
                    },
                    error: function (XHR, errStatus, errorThrown) {
                        alert("Ocorreu um erro durante a comunicação com o servidor");
                        alert(XHR.responseText);
                        $("#syncresult").append(XHR.responseText);
                    }
            });
        }
    };

    this.onCancel = function (buttonIndex) {

        if (confirm('Você deseja sair do status?') == true)
          {
            $.mobile.changePage("#page-pedido");
          }

        return;

    };

 
}


