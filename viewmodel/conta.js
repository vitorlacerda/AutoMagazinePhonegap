function initConta() {
    console.log("CONTA - Device READY");
    
    app.conta = new ContaViewModel();
    
    ko.applyBindings(app.conta, document.getElementById("page-conta"));

    $(document).delegate('#page-conta', 'pageshow', function () {
         var pg = $("#page-conta");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        //the_height_content = the_height_content - 5;
        
        
        pg.find('[data-role="content"]').height(the_height_content);
        
        $("#ContentConta2").height(the_height_content-$("#ContentConta1").height());
        
        //$("#tblItensCanc").height(the_height_content);

        //$("#tblItensCanc").width($(window).width());
        //$("#divItensPedidoCanc").width($(window).width());
        //$("#lstItensPedidoCanc").width($(window).width());
        //$("#ContentCanc2").iscrollview("scrollTo", 0, 0, 200, false);

       /* $("#lstItensPedidoConta").list({
            headerSelector : 'li.heading'
        });*/
    });
    
    $("#conta-enviar").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.conta.Confirm();
    });
    
    $("#conta-cancel").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.conta.onCancel();
    });
 
 }
   

$(document).on("deviceready", initConta);


function ParamObterPedidoContaRetorno(){

        var self = this;
        
        self.TipoNumeracao = ko.observable();

        self.NumPedido = ko.observable();

        self.PedidoItens = ko.observableArray();


        self.CancelReasons = ko.observableArray();

    };
    
    function ParamPedidoItemConta(){
        var self = this;
        
        self.ItemChecked= "";//ko.observable(false);//.extend({notify: 'always'});
        self.IdItem = "";//= ko.observable();

        self.NomeDoProduto = "";//= ko.observable();
        
        
        self.TotLiq = 0;//= ko.observable();

        self.Qtde = 0;//= ko.observable();

        self.IdProducao = "";//= ko.observable();

        self.Descriptions = [];//ko.observableArray();


    };


    function ParamPedidoItemDescriptionConta()
    {
        var self = this;

        self.ObservacaoName = "";//= ko.observable();
    };


function ContaViewModel() {
    /// <summary>
    /// A view model that represents a single tweet
    /// </summary>

    // --- properties

    var self = this;
    
    self.ActivePage= ko.observable("");
    self.NumPedido= ko.observable("");
    self.PedidoId= ko.observable("");
    self.TituloPedido = ko.observable("");
    self.TotalPedido = ko.observable("R$ 120,00");
    
    self.Pedido= ko.observable();

    self.PedidoItens =  ko.observableArray();
    
    self.TotalPedidoFormated= ko.observable("0");
    
    this.AbrePedido = function (pNumeroPedido,pPedido) {

        try{
        
            if (typeof pNumeroPedido === 'undefined')
                throw "NumeroPedido inválido";
            
            self.ActivePage($.mobile.activePage.attr("id"));
            
            //alert("passo1");
           
            
            self.PedidoId(pPedido.PedidoId);
            self.NumPedido(pNumeroPedido);
            self.TituloPedido("Mesa " + pNumeroPedido);
            
            self.PedidoItens([]); 
            //ko.applyBindings(pPedido, document.getElementById("ContentConta2"));
            var dTotal = 0;
            for (var p = 0 ; p < pPedido.PedidoItens.length ; p++) {
                var ped_item = new ParamPedidoItemConta();
                
                ped_item.IdItem = pPedido.PedidoItens[p].IdItem ;
                ped_item.NomeDoProduto = pPedido.PedidoItens[p].NomeDoProduto ;
                ped_item.TotLiq =formatCurrency(pPedido.PedidoItens[p].TotLiq) ;
                ped_item.Qtde = pPedido.PedidoItens[p].Qtde ;
                //ped_item.IdProducao(pPedido.PedidoItens[p].IdItem) ;
                
                dTotal = dTotal + pPedido.PedidoItens[p].TotLiq;
                
                for (var d = 0 ; d < pPedido.PedidoItens[p].Descriptions.length ; d++) {
                    var desc_item = new ParamPedidoItemDescriptionConta();
                    desc_item.ObservacaoName = pPedido.PedidoItens[p].Descriptions[d].ObservacaoName;
                    
                    ped_item.Descriptions.push(desc_item);
                }
                self.PedidoItens.unshift(ped_item);

            }   
            
            self.TotalPedido(formatCurrency(dTotal));
            
            
            var sHtml1="";
            sHtml1 = "<ul data-role='listview' data-inset='true'  data-theme='a' data-count-theme='b'>";
			sHtml1 += "<li style='font-size:1.5em;' data-role='list-divider' class='pad1'>" + self.TituloPedido() + "";
            sHtml1 += "<span style='font-size:1em;' class='ui-li-count ui-btn-active'>" + formatCurrency(dTotal) + "</span></li></ul>";
            
            
            $("#ContentConta1").html(sHtml1);
            
            $.mobile.changePage("#page-conta");    
            
            $("#page-conta").trigger('create');
            //alert("passo2"); 
            
            //alert("passo5");
            $("#ContentConta2").iscrollview("scrollTo", 0, 0, 500, false);
        }
        catch(err)
        {
            navigator.notification.alert("Ocorreu um erro ao AbrirPedidoConta: " + err.message, function () { }, "Operação Cancelada", 'OK');
            $.mobile.changePage("#page-pedido-home");
        }
        
    };
 
    this.Resize = function(){
       alert("Resize");
        var pg = $("#page-cancelamento");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;
        
        
        pg.find('[data-role="content"]').height(the_height_content);
        $("#ContentCanc1").height($("#ContentCanc1").height());
        $("#ContentCanc2").height(the_height_content-$("#ContentCanc1").height());
        
    };
     this.Confirm = function (e) {
         
        
        if (app.setting.isDemo()=="Sim"){
            alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");

            $.mobile.changePage("#page-pedido");
            
        }
        else{
            var sUrl = "";
            
            sUrl = "http://localhost:26633/AutoMagazineWCF.svc/ImprimirConta/1";
            sUrl = "http://" +  app.setting.ServerHost() + "/MObilePDV/AutoMagazineWCF.svc/ImprimirConta/1";
            //Preparar Data para envio
            
            var vData = {};
            
            vData.IdAreaVenda = app.setting.IdAreaVenda();
            vData.IdUser = app.login.userid();
            vData.TipoNumeracao = 'M';
            vData.NumPedido = self.NumPedido();
            vData.PedidoId = self.PedidoId();
            vData.PedidoItens = [];
            

            //alert (JSON.stringify(vData));
            var sData= JSON.stringify(vData);
            window.localStorage.setItem('ImprimirContaSend', sData);
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
                        window.localStorage.setItem('ImprimirConta', JSON.stringify(data));
                        
                        if (data.status){
                            //if (self.ActivePage()=="page-status")
                            //    $.mobile.changePage("#page-status");    
                            //else
                                $.mobile.changePage("#page-pedido");
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



    this.onCancel = function () {
        

        if (confirm('Você confirma o desistência da PRÉ-CONTA?') == true)
          {
            self.PedidoItens([]); 
              
            if (self.ActivePage()=="page-status")
                $.mobile.changePage("#page-status");    
            else
                $.mobile.changePage("#page-pedido");

          }

        
    };
    
  

 
}


