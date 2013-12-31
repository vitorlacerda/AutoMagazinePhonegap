function initCancelamento() {
    console.log("CANCELAMENTO - Device READY");
    
    app.cancelamento = new CancelamentoViewModel();
    
    ko.applyBindings(app.cancelamento, document.getElementById("page-cancelamento"));

    $(document).delegate('#page-cancelamento', 'pageshow', function () {
         var pg = $("#page-cancelamento");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;
        
        
        pg.find('[data-role="content"]').height(the_height_content);
        
        $("#ContentCanc2").height(the_height_content-$("#ContentCanc1").height());
        
        //$("#tblItensCanc").height(the_height_content);

        //$("#tblItensCanc").width($(window).width());
        //$("#divItensPedidoCanc").width($(window).width());
        //$("#lstItensPedidoCanc").width($(window).width());
        $("#ContentCanc2").iscrollview("scrollTo", 0, 0, 200, false);
                
    });
    
    $("#cancelamento-enviar").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.cancelamento.Confirm();
    });
    
    $("#cancelamento-cancel").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.cancelamento.onCancel();
    });

    
    $("#chkTodosCanc").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.cancelamento.MarcarTodos(e);
    });

    $("#chkTodosCanc").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.cancelamento.MarcarTodos(e);
    });

 }
   

$(document).on("deviceready", initCancelamento);


function ParamObterPedidoCancRetorno(){

        var self = this;
        
        self.TipoNumeracao = ko.observable();

        self.NumPedido = ko.observable();

        self.PedidoItens = ko.observableArray();


        self.CancelReasons = ko.observableArray();

    };
    
    function ParamPedidoItemCanc(){
        var self = this;
        
        self.ItemChecked= ko.observable(false);//.extend({notify: 'always'});
        self.IdItem = ko.observable();

        self.NomeDoProduto = ko.observable();
        
        
        self.TotLiq = ko.observable();

        self.Qtde = ko.observable();

        self.IdProducao = ko.observable();

        self.Descriptions = ko.observableArray();


    };


    function ParamPedidoItemDescriptionCanc()
    {
        var self = this;

        self.ObservacaoName = ko.observable();
    };

    function ParamPedidoCancelReason()
    {
        var self = this;

        self.IdMotivoCanc = ko.observable();
        self.dsMotivoCanc = ko.observable();
    };

function CancelamentoViewModel() {
    /// <summary>
    /// A view model that represents a single tweet
    /// </summary>

    // --- properties

    var self = this;
    
    self.NumPedido= ko.observable("");
    self.PedidoId= ko.observable("");
    self.TituloPedido = ko.observable("");

    self.Pedido= ko.observable();

    self.IdMotivoCancSeleted= ko.observable().extend({notify: 'always'});
    self.CancelReasons =  ko.observableArray();
    self.PedidoItens =  ko.observableArray();
    
    self.TotalPedidoFormated= ko.observable("0");
    
    this.AbrePedido = function (pNumeroPedido,pPedido) {

        try{
        
            if (typeof pNumeroPedido === 'undefined')
                throw "NumeroPedido inválido";
            
            //alert("passo1");
           
            self.NumPedido(pNumeroPedido);
            self.PedidoId(pPedido.PedidoId);
            self.TituloPedido("Mesa " + pNumeroPedido);
            self.IdMotivoCancSeleted("");
            
            
           //
            
            //var Pedido1 = ko.mapping.fromJS(pPedido);
            
            //self.Pedido = pPedido;
            
            //ko.mapping.fromJS(pPedido, self.Pedido);

            self.CancelReasons([]); 
            self.PedidoItens([]); 
            
            //self.Pedido.TipoNumeracao("M");
            //self.Pedido.NumPedido("7");
            
            var reason_item = new ParamPedidoCancelReason();
            reason_item.IdMotivoCanc("");
            reason_item.dsMotivoCanc("Selecione um Motivo:");
            
            self.CancelReasons.push(reason_item);

            for (var c = 0 ; c < pPedido.CancelReasons.length ; c++) {
                reason_item = new ParamPedidoCancelReason();
                reason_item.IdMotivoCanc(pPedido.CancelReasons[c].IdMotivoCanc);
                reason_item.dsMotivoCanc(pPedido.CancelReasons[c].dsMotivoCanc);
                
                self.CancelReasons.push(reason_item);
                //alert(self.Pedido.CancelReasons().length);
            }

            for (var p = 0 ; p < pPedido.PedidoItens.length ; p++) {
                var ped_item = new ParamPedidoItemCanc();
                
                ped_item.IdItem(pPedido.PedidoItens[p].IdItem) ;
                ped_item.NomeDoProduto(pPedido.PedidoItens[p].NomeDoProduto );
                ped_item.TotLiq(pPedido.PedidoItens[p].TotLiq) ;
                ped_item.Qtde(pPedido.PedidoItens[p].Qtde) ;
                ped_item.IdProducao(pPedido.PedidoItens[p].IdItem) ;
                
                
                
                for (var d = 0 ; d < pPedido.PedidoItens[p].Descriptions.length ; d++) {
                    var desc_item = new ParamPedidoItemDescriptionCanc();
                    desc_item.ObservacaoName(pPedido.PedidoItens[p].Descriptions[d].ObservacaoName);
                    
                    ped_item.Descriptions.push(desc_item);
                }
                self.PedidoItens.unshift(ped_item);

            }   
            $.mobile.changePage("#page-cancelamento"); 
            //alert("passo3");
            //$("#lstItensPedidoCanc").listview('refresh');
            //alert("passo4");
            $("#page-cancelamento").trigger('create');
            //alert("passo2"); 
               
            //alert("passo5");
            $("#ContentCanc2").iscrollview("scrollTo", 0, 0, 500, false);
            //alert("passo6");
            $("#chkTodosCanc").attr("checked",false).checkboxradio("refresh");
            //alert("passo7");
        }
        catch(err)
        {
            navigator.notification.alert("Ocorreu um erro ao AbrirPedidoCancelamento: " + err.message, function () { }, "Operação Cancelada", 'OK');
            $.mobile.changePage("#page-pedido-home");
        }
        
    };
    this.MarcarTodos = function(e){
        
        
        try
        {
            // $.mobile.loading('show');
            
            //alert($(e.target).checked);
            var  bchecked = $(e.target).prop('checked');    
            //alert(bchecked);
            //$(".chk").attr("checked",bchecked).checkboxradio("refresh");
            /*
            if (bchecked==true)
                $(".chk").attr("checked",true).checkboxradio("refresh");
            else
                $(".chk").attr("checked",false).checkboxradio("refresh");
            */
            for (var p = 0 ; p < self.PedidoItens().length ; p++) {
                    var pItem =self.PedidoItens()[p];
                    pItem.ItemChecked(bchecked);
                    //pItem.valueHasMutated();
            }    
            $("#lstItensPedidoCanc").listview('refresh');
            $("#page-cancelamento").trigger('create');
            $("#ContentCanc2").iscrollview("scrollTo", 0, 0, 200, false);
           //$.mobile.loading('hide');
        }
        
        catch(err)
        {
            $.mobile.loading('hide');
            alert("Ocorreu um erro ao MarcarTodos: " + err.message);
        }
    };

/*    this.Resize = function(){
       alert("Resize");
        var pg = $("#page-cancelamento");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;
        
        
        pg.find('[data-role="content"]').height(the_height_content);
        $("#ContentCanc1").height($("#ContentCanc1").height());
        $("#ContentCanc2").height(the_height_content-$("#ContentCanc1").height());
        
    };*/
     this.Confirm = function (e) {
         
        
        if ($("#cboCancelReason").val()=="" )
                    {
            alert("É necessário selecionar o MOTIVO DO CANCELAMENTO!");
         
            return;
        }
        if (app.setting.isDemo()=="Sim"){
            alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");

            $.mobile.changePage("#page-pedido");
            
        }
        else{
            var sUrl = "";
            
            sUrl = "http://localhost:26633/AutoMagazineWCF.svc/CancelPedidoItens/1";
            sUrl = "http://" +  app.setting.ServerHost() + "/MObilePDV/AutoMagazineWCF.svc/CancelPedidoItens/1";
            //Preparar Data para envio
            
            var vData = {};
            
            vData.IdAreaVenda = app.setting.IdAreaVenda();
            vData.IdUser = app.login.userid();
            vData.TipoNumeracao = 'M';
            vData.NumPedido = self.NumPedido();
            vData.PedidoId = self.PedidoId();
            vData.IdMotivoCanc = $("#cboCancelReason").val();
            vData.PedidoItens = [];
            

            var bMarcou  = false;
            
            for (var i = 0 ; i < self.PedidoItens().length; i++){
                
                var pItem =self.PedidoItens()[i];
                var item = {};
                if (pItem.ItemChecked()){
                    bMarcou  = true;
                    item.IdItem = pItem.IdItem();

                    vData.PedidoItens.push(item);
                }
            }
            if (bMarcou  == false){
                alert("É necessário marcar pelo menos 1 ITEM DO PEDIDO!");
             
                return;
                
            }
            
            
            //alert (JSON.stringify(vData));
            var sData= JSON.stringify(vData);
            window.localStorage.setItem('CancelPedidoItensSend', sData);
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
                        window.localStorage.setItem('CancelPedidoItens', JSON.stringify(data));
                        
                        if (data.status){
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
        

        if (confirm('Você confirma o desistência do cancelamento?') == true)
          {
            self.CancelReasons([]); 
            self.PedidoItens([]); 
              
            $.mobile.changePage("#page-pedido");
          }

        
    };
    
  

 
}


