function initTeclado() {
    console.log("TECLADO - Device READY");
    
    app.teclado = new TecladoViewModel();
    
    ko.applyBindings(app.teclado, document.getElementById("page-teclado-numerico"));

    $(document).delegate('#page-teclado-numerico', 'pageshow', function () {
        var pg = $("#page-teclado-numerico");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;


        pg.find('[data-role="content"]').height(the_height_content);
        //window.scrollTo(0, 0);
    });

     $("#page-teclado-numerico .num").on("touchstart", function (e) {
        //e.preventDefault();
        //e.stopPropagation();
        app.teclado.SendTecla($(e.target).attr("tecla"));
    });
    
    $("#teclado-numerico-Enviar").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.teclado.Confirm();
    });
    
    $(".Enviarteclado").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.teclado.Confirm();
    });
    
    $("#teclado-numerico-cancel").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.teclado.onCancel();
    });

}

$(document).on("deviceready", initTeclado);


function TecladoViewModel() {
    /// <summary>
    /// A view model that represents a single tweet
    /// </summary>

    // --- properties

    var self = this;

    self.PageAtive = "";
    self.Operacao = ko.observable("A");//1-Abre Mesa; 2-Consulta Mesa;3-Qtde
    self.NumMesa = ko.observable("");
    self.NumInformado = ko.observable("");
    self.Titulo = ko.observable("");
    self.Legenda = ko.observable("");
    self.LegendaBotao = ko.observable("Abrir");
    
    
    self.Confirmado = ko.observable(false);


    this.init = function (pedido) {
        //this.PedidoId(pedido.PedidoId);
        //this.NumPedido(pedido.NumPedido);
        //this.TituloPedido(pedido.TituloPedido);
        //this.PedidoItens(pedido.PedidoItens);
        //this.UltimoProduto(pedido.UltimoProduto);


    };

    this.Confirm = function (e) {
        if (self.Operacao() == "1") {
            this.AbreMesa();
        }
        else if (self.Operacao() == "2") {
            this.LancarItens();
        }
        else if (self.Operacao() == "3") {
            if (self.NumInformado()==""){
                alert("É necessário informar a QTDE!");
                return;
            }
            self.Titulo("Qtde");
            app.pedido.UltimoProduto().Qtde(self.NumInformado());
            app.pedido.AtualizaMensagem(self.NumInformado() + " x " + app.pedido.UltimoProduto().NomeDoProduto());
            $.mobile.changePage("#" + self.PageAtive, {
                transition: $.mobile.defaultPageTransition,
                reverse: false,
            });//flip
        }
        else if (self.Operacao() == "4") {
            this.AbreMesaNumeroPessoas();
        }
        else if (self.Operacao() == "5") {
            this.AbreCancelamento();
        }
        else if (self.Operacao() == "6") {
            this.AbreConta();
        }    };
    
    
    this.AbreCancelamento = function () {

        //Limpa a Mesa Anterior
        self.NumMesa("");
        
        if (self.NumInformado() == "" ) {
            
            alert("Entre com o NÚMERO DA MESA!");
            return;
        }
        //if (app.setting.isDemo()=="Sim"){
        //    alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");
        //    app.cancelamento.AbrePedido("demo","");
        //}
        //else{
            var sUrl = "";
            
            if (app.setting.isDemo()=="Não"){
                sUrl = "http://localhost:26633/AutoMagazineWCF.svc/ObterPedidoCanc/1";
                sUrl = "http://" +  app.setting.ServerHost() + "/MObilePDV/AutoMagazineWCF.svc/ObterPedidoCanc/1";
            }
            else{
                
                alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");

                sUrl = "data/obterpedidocancel.json";
            }
            
            var vData = {"IdAreaVenda": app.setting.IdAreaVenda() , "IdUser" : app.login.userid(), "NumPedido" : self.NumInformado() , "TipoNumeracao": "M"};
            window.localStorage.setItem('ObterPedidoCanc_Send', JSON.stringify(vData));
            
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
                        window.localStorage.setItem('ObterPedidoCanc', JSON.stringify(data));
                        
                        if (data.status){
                                //alert(data.retorno);                            
                                var NumPedido = self.NumInformado();
                            
                                var Pedido = $.parseJSON(data.retorno);
                                
                                //alert(Pedido.PedidoItens.length);
                                //Armazena o Número da Mesa Para Envio quando Pedir o Número de Pessoas
                                app.cancelamento.AbrePedido(NumPedido,Pedido);
                                return;

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

        //}
    };

    this.AbreConta = function () {

        //Limpa a Mesa Anterior
        self.NumMesa("");
        
        if (self.NumInformado() == "" ) {
            
            alert("Entre com o NÚMERO DA MESA!");
            return;
        }
        //if (app.setting.isDemo()=="Sim"){
        //    alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");
        //    app.conta.AbrePedido("demo","");
        //}
        //else{
            var sUrl = "";
            
            if (app.setting.isDemo()=="Não"){
                sUrl = "http://localhost:26633/AutoMagazineWCF.svc/ObterPedidoCanc/1";
                sUrl = "http://" +  app.setting.ServerHost() + "/MObilePDV/AutoMagazineWCF.svc/ObterPedidoCanc/1";
            }
            else{
                
                alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");

                sUrl = "data/obterpedidocancel.json";
            }            
            
            var vData = {"IdAreaVenda": app.setting.IdAreaVenda() , "IdUser" : app.login.userid(), "NumPedido" : self.NumInformado() , "TipoNumeracao": "M"};
            window.localStorage.setItem('ObterPedidoCanc_Send', JSON.stringify(vData));
            
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
                        window.localStorage.setItem('ObterPedidoCanc', JSON.stringify(data));
                        
                        if (data.status){
                                //alert(data.retorno);                            
                                var NumPedido = self.NumInformado();
                            
                                var Pedido = $.parseJSON(data.retorno);
                                
                                //alert(Pedido.PedidoItens.length);
                                //Armazena o Número da Mesa Para Envio quando Pedir o Número de Pessoas
                                app.conta.AbrePedido(NumPedido,Pedido);
                                return;

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

        //}
    };


    this.AbreMesa = function () {

        //Limpa a Mesa Anterior
        self.NumMesa("");
        
        if (self.NumInformado() == "" ) {
            
            alert("Entre com o NÚMERO DA MESA!");
            return;
        }
        if (app.setting.isDemo()=="Sim"){
            alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");

            app.pedido.AbrePedido("demo",self.NumInformado());
            
        }
        else{
            var sUrl = "";
            
            sUrl = "http://localhost:26633/AutoMagazineWCF.svc/AbreMesa/1";
            sUrl = "http://" +  app.setting.ServerHost() + "/MObilePDV/AutoMagazineWCF.svc/AbreMesa/1";
            
            var vData = {"IdAreaVenda": app.setting.IdAreaVenda() , "IdUser" : app.login.userid(), "Operacao" : "AbreMesa" , "NumeroMesa" : self.NumInformado() , "AbrirMesa" : "true" , "TipoNumeracao": "M"};
            
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
                        window.localStorage.setItem('AbreMesa', JSON.stringify(data));
                        //alert(JSON.stringify(data));
                        //var parsed = $.parseJSON(data);
                        
                        if (data.status){
                            var ParamAbreMesaRetorno  =$.parseJSON(data.retorno);
                            
                            //Caso retorne com ação NumeroPessoas, solicitar o Número de Pessoas
                            if (ParamAbreMesaRetorno.Acao =="NumeroPessoas")
                            {
                                //Armazena o Número da Mesa Para Envio quando Pedir o Número de Pessoas
                                self.NumMesa(self.NumInformado());
                                self.ShowPage("4") // Soliçita Numero Pessoas
                                return;
                            }
                            
                            
                            //Caso retorne com ação NumeroPessoas, solicitar o Número de Pessoas
                            else if (ParamAbreMesaRetorno.Acao =="MesaAberta")
                            {
                                //Armazena o Número da Mesa Para Envio quando Pedir o Número de Pessoas
                                app.pedido.AbrePedido(ParamAbreMesaRetorno.PedidoId,self.NumInformado());
                                
                                //app.pedido.NumeroPessoas("1");
                                
                                return;
                            }
                            //Caso retorne com ação Reabertura, perguntar se deseja REABRIR
                            else if (ParamAbreMesaRetorno.Acao =="Reabertura")
                            {
                                if (confirm("Esta mesa se encontra EM FECHAMENTO PRÉ-CONTA.\n\nVocê confirma a REABERTURA da mesa " + self.NumInformado() + "?") == true)
                                  {
                                      self.AbreMesaReabertura();
                                      return;
                                  }
                                
                                return;
                            }                            
                            else{
                                alert("Não foi possível abrir a MESA, operação cancelada! (Ação " + ParamAbreMesaRetorno.Acao +")");
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

    //Abre a Mesa Solicitando o Numero de Pessoas
    this.AbreMesaNumeroPessoas = function () {

        
        if (self.NumInformado() == "" ) {
            
            alert("Entre com o NÚMERO DE PESSOAS!");
            return;
        }
        if (app.setting.isDemo()=="Sim"){
            alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");

            app.pedido.AbrePedido("demo",self.NumMesa());
            
        }
        else{
            var sUrl = "";
            
            sUrl = "http://localhost:26633/AutoMagazineWCF.svc/AbreMesa/1";
            sUrl = "http://" +  app.setting.ServerHost() + "/MObilePDV/AutoMagazineWCF.svc/AbreMesa/1";
            
            var vData = {"IdAreaVenda": app.setting.IdAreaVenda() , "IdUser" : app.login.userid(), "Operacao" : "AbreMesa" , "NumeroMesa" : self.NumMesa() , "AbrirMesa" : "true" , "TipoNumeracao": "M", "NumeroPessoas" : self.NumInformado()};
            
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
                        window.localStorage.setItem('AbreMesaNumeroPessoas', JSON.stringify(data));
                        //alert(JSON.stringify(data));
                        //var parsed = $.parseJSON(data);
                        
                        if (data.status){
                            var ParamAbreMesaRetorno  =$.parseJSON(data.retorno);
                            
                            //Caso retorne com ação NumeroPessoas, solicitar o Número de Pessoas
                            if (ParamAbreMesaRetorno.Acao =="NumeroPessoas")
                            {
                                //Armazena o Número da Mesa Para Envio quando Pedir o Número de Pessoas
                                self.NumMesa(self.NumInformado());
                                return;
                            }
                            //Caso retorne com ação NumeroPessoas, solicitar o Número de Pessoas
                            else if (ParamAbreMesaRetorno.Acao =="MesaAberta")
                            {
                                //Armazena o Número da Mesa Para Envio quando Pedir o Número de Pessoas
                                app.pedido.AbrePedido(ParamAbreMesaRetorno.PedidoId,self.NumMesa());
                                
                                //app.pedido.NumeroPessoas("1");
                                
                                return;
                            }
                            else{
                                alert("Não foi possível abrir a MESA, operação cancelada! (Ação " + ParamAbreMesaRetorno.Acao +")");
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

    
        //Abre a Mesa Solicitando o Numero de Pessoas
    this.AbreMesaReabertura = function () {

        
        if (app.setting.isDemo()=="Sim"){
            alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");

            app.pedido.AbrePedido("demo",self.NumMesa());
            
        }
        else{
            var sUrl = "";
            
            sUrl = "http://localhost:26633/AutoMagazineWCF.svc/AbreMesa/1";
            sUrl = "http://" +  app.setting.ServerHost() + "/MObilePDV/AutoMagazineWCF.svc/AbreMesa/1";
            
            var vData = {"IdAreaVenda": app.setting.IdAreaVenda() , "IdUser" : app.login.userid(), "Operacao" : "AbreMesa" , "Acao" : "Reabertura", "NumeroMesa" : self.NumInformado() , "AbrirMesa" : "true" , "TipoNumeracao": "M", "NumeroPessoas" : ""};
            
            window.localStorage.setItem('AbreMesaReaberturaSend', JSON.stringify(vData));
            
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
                        window.localStorage.setItem('AbreMesaReabertura', JSON.stringify(data));
                        //alert(JSON.stringify(data));
                        //var parsed = $.parseJSON(data);
                        
                        if (data.status){
                            var ParamAbreMesaRetorno  =$.parseJSON(data.retorno);
                            
                            if (ParamAbreMesaRetorno.Acao =="MesaAberta")
                            {
                                //Armazena o Número da Mesa Para Envio quando Pedir o Número de Pessoas
                                app.pedido.AbrePedido(ParamAbreMesaRetorno.PedidoId,self.NumInformado());
                                
                                return;
                            }
                            else{
                                alert("Não foi possível abrir a MESA, operação cancelada! (Ação " + ParamAbreMesaRetorno.Acao +")");
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


    this.LancarItens = function () {

        if (self.NumInformado() == "" ) {
            
            alert("Entre com o NÚMERO DA MESA!");
            return;
        }
        if (app.setting.isDemo()=="Sim"){
            alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");

            app.pedido.AbrePedido("demo",self.NumInformado());
            
        }
        else{
            var sUrl = "";
            
            sUrl = "http://localhost:26633/AutoMagazineWCF.svc/AbreMesa/1";
            sUrl = "http://" +  app.setting.ServerHost() + "/MObilePDV/AutoMagazineWCF.svc/AbreMesa/1";
            
            var vData = {"IdAreaVenda": app.setting.IdAreaVenda() , "IdUser" : app.login.userid(), "Operacao" : "AbreMesa" , "NumeroMesa" : self.NumInformado() , "AbrirMesa" : "false" , "TipoNumeracao": "M"};
            
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
                        window.localStorage.setItem('LancarItens', JSON.stringify(data));
                        //alert(JSON.stringify(data));
                        //var parsed = $.parseJSON(data);
                        
                        if (data.status){
                            var ParamAbreMesaRetorno  =$.parseJSON(data.retorno);
                            
                            //Caso retorne com ação MesaAberta, Pode prosseguir
                            if (ParamAbreMesaRetorno.Acao =="MesaAberta")
                            {
                                //Armazena o Número da Mesa Para Envio quando Pedir o Número de Pessoas
                                app.pedido.AbrePedido(ParamAbreMesaRetorno.PedidoId,self.NumInformado());
                                
                                //app.pedido.NumeroPessoas(ParamAbreMesaRetorno.NumeroPessoas);
                                
                                return;
                            }
                            else{
                                alert("Não foi possível abrir a MESA para LANÇAR ITENS, operação cancelada! (Ação " + ParamAbreMesaRetorno.Acao +")");
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
    this.ShowPage = function (tipo) {
        self.PageAtive = $.mobile.activePage.attr("id");
        self.Operacao(tipo);
        self.NumInformado("");
        if (tipo == "1") {
                    
            self.Titulo("Abre Mesa");
            self.Legenda("Informe o nº da Mesa:");
            self.LegendaBotao("Abrir");
            //alert(self.Titulo());
            $.mobile.changePage("#page-teclado-numerico", {
                transition: $.mobile.defaultPageTransition,
                reverse: true,
            });//flip
            //self.Titulo("Abre Mesa");
        }
        else if (tipo == "2") {
            self.Titulo("Mesa");
            self.Legenda("Informe o nº da Mesa:");
            self.LegendaBotao("Abrir");
            $.mobile.changePage("#page-teclado-numerico", {
                transition: $.mobile.defaultPageTransition,
                reverse: true,
            });//flip
        }
        else if (tipo == "3") {
            if (app.pedido.UltimoProduto().Titulo() == "") {
                navigator.notification.alert("É necessário informar o item!", function () { }, "Operação Cancelada", 'OK');
                return;
            }
            self.Titulo("Qtde");
            self.Legenda("Informe a Qtde do Produto:");
            self.LegendaBotao("Alterar");
            self.Legenda(app.pedido.UltimoProduto().Titulo());
            
            $.mobile.changePage("#page-teclado-numerico", {
                transition: $.mobile.defaultPageTransition,
                reverse: true,
            });//flip
        }
        else if (tipo == "4") {
            self.Titulo("Mesa " + self.NumMesa());
            self.Legenda("Informe o nº de Pessoas:");
            self.LegendaBotao("Abrir");
            $.mobile.changePage("#page-teclado-numerico", {
                transition: $.mobile.defaultPageTransition,
                reverse: true,
            });//flip
        }
        else if (tipo == "5") {
            self.Titulo("Cancelamento");
            self.Legenda("Informe o nº da Mesa:");
            self.LegendaBotao("Abrir");
            $.mobile.changePage("#page-teclado-numerico", {
                transition: $.mobile.defaultPageTransition,
                reverse: true,
            });//flip
        }
        else if (tipo == "6") {
            self.Titulo("Conta");
            self.Legenda("Informe o nº da Mesa:");
            self.LegendaBotao("Abrir");
            $.mobile.changePage("#page-teclado-numerico", {
                transition: $.mobile.defaultPageTransition,
                reverse: true,
            });//flip
        }        
    };


    this.SendTecla = function (tecla) {
        
        if (tecla == "*") {
            self.NumInformado(self.NumInformado() + " x ");
        }
        else if (tecla == "-") {
            self.NumInformado(self.NumInformado().slice(0, -1));
        }
        else{
            self.NumInformado(self.NumInformado() + tecla);
        }
        
        //alert(self.InputCodebar());
    };


    this.onCancel = function () {

        this.clearForm();

        $.mobile.changePage("#" + self.PageAtive);
    };
    
  
    this.clearForm = function () {

     
        this.PedidoItens = ko.observableArray();
        this.UltimoProduto = ko.observable(new PedidoItem());
        this.ItemSelecionado = ko.observable(new PedidoItem());
        this.NumInformado("");
    };

    this.checkEnter = function (e) {
        var that = this;

        if (e.keyCode == 13) {
            $(e.target).blur();
            that.onEnviar();
        }
    };

 
}


