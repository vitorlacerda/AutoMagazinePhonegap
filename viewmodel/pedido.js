/*globals ko*/
var bPedidoPageShow = false;
function initPedido() {
    console.log("PEDIDO - Device READY");
    app.pedido = new PedidoViewModel();
    
    ko.applyBindings(app.pedido, document.getElementById("page-pedido-menu"));
    ko.applyBindings(app.pedido, document.getElementById("page-pedido-codigo"));
    ko.applyBindings(app.pedido, document.getElementById("page-pedido-itens"));
    ko.applyBindings(app.pedido, document.getElementById("page-edit-pedido-item"));
    ko.applyBindings(app.pedido, document.getElementById("page-edit-pedido-anotacao"));

    //app.pedido.ShowCategoria(eNavegacao.PrimeiraPagina);
        


    $(document).delegate('#page-pedido-menu', 'pageshow', function () {
        if (bPedidoPageShow )
            return;

        var the_height_content = ($(window).height() - $("#page-pedido-menu").find('[data-role="header"]').height() - $("#page-pedido-menu").find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;
        
        $("#page-pedido-menu").find('[data-role="content"]').height(the_height_content);
        
        $(".tdmsg").height(the_height_content * 0.10);
        $(".tdmsg").width(Math.floor($(window).width()* 0.95));


        var prod_height = the_height_content * 0.13;// $("#ped-prod-1").height();
        //alert("w=" + $(window).width());
        //alert("w=" + $(window).width()* 0.31);
        $(".tdprod").height(prod_height);
        $(".tdprod").width(Math.floor($(window).width()* 0.315));


        //var msg_height = $("#td_mensagem").height();

        //$(".tdmsg").height(msg_height);

        //var qtde_height = $("#btnQtde").height();

        //$(".tdQtde").height(qtde_height);
        $(".tdQtde").height(the_height_content * 0.09);


        //var cat_height = $("#ped-cat-1").height();

        //$(".tdcat").height(cat_height);
        $(".tdcat").height(the_height_content * 0.09);
        

        bPedidoPageShow = true;

    });

    $(document).delegate('#page-pedido-itens', 'pageshow', function () {
        var pg = $("#page-pedido-itens");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;
        
        
        pg.find('[data-role="content"]').height(the_height_content);
        
        $("#tblItens").height(the_height_content);

        $("#tblItens").width($(window).width());
        $("#divItensPedido").width($(window).width());
        $("#lstItensPedido").width($(window).width());
                
    });

    $(document).delegate('#page-pedido-codigo', 'pageshow', function () {
        var pg = $("#page-pedido-codigo");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;

        $(".tdnum").width(Math.floor($(window).width()* 0.315));
        
        pg.find('[data-role="content"]').height(the_height_content);
    });


    $(document).delegate('#page-edit-pedido-item', 'pageshow', function () {
        var pg = $("#page-edit-pedido-item");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;

        pg.find('[data-role="content"]').height(the_height_content);
        var w = $("#ulSig").width();
        
        $("#pad").width(w-30);
        
    });

        $(document).delegate('#page-edit-pedido-anotacao', 'pageshow', function () {
        var pg = $("#page-edit-pedido-item");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;

        pg.find('[data-role="content"]').height(the_height_content);
        var w = $("#ulSig").width();
        
        $("#pad").width(w-30);
        
    });

     $(document).delegate('#page-produto', 'pageshow', function () {
        var pg = $("#page-produto");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;

        pg.find('[data-role="content"]').height(the_height_content);
        $("#page-produto input[data-type='search']").trigger("click");
        $("#page-produto input[data-type='search']").trigger("focus");
        $("#page-produto input[data-type='search']").focus();
      
        $("#productList").width($(window).width()-75);
        $("#page-produto input[data-type='search']").width($(window).width()-75);
           
        //$("#productList").listview('refresh');

         console.log("unbind : #page-produto input[data-type='search'] keydown");
         
         $("#page-produto input[data-type='search']").off('keydown');
         
         console.log("bind : #page-produto input[data-type='search'] keydown");
         
         $("#page-produto input[data-type='search']").keydown(function (e) {
            var that = this;
            console.log('Value: ' + $(this).val());
            console.log('keyCode: ' + e.keyCode);
              
            
            if (e.keyCode == 13) {
                $(e.target).blur();
                //alert('Value: ' + $(this).val());
                app.pedido.ListaProdutos($(this).val());
            }

        });       

         
     });
    



    $("#page-pedido-menu .prod").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.pedido.ItemSelect($(e.target).attr("id").replace("ped-prod-",""));
    });
     $("#page-pedido-menu .categ").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.pedido.DefineCategory($(e.target).attr("id").replace("ped-categ-",""));
    });
    
    $(".EnviarPedido").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.pedido.onEnviar();
    });
    
    $(".CancelarPedido").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.pedido.onCancel();
    });
    
    
    $("#btnTipoEsq").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.pedido.ShowCategoriaPrev();
    });
    
    $("#btnTipoDir").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.pedido.ShowCategoriaNext();
    });
    
    $("#btnQtde").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.teclado.ShowPage('3');
    });
    $("#btnProdEsq").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.pedido.ShowProdutosPrev();
    });

    $("#btnProdDir").on("vclick", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.pedido.ShowProdutosNext();
    });

    $("#btnExcluirItem").on("vclick", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.pedido.onExcluirItem();
    });
  $("#btnSalvarAnotacaoItem").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.pedido.onSalvarAnotacaoItem();
    });
    $("#btnLimparAnotacaoItem").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        app.pedido.onLimparAnotacaoItem();
    });
    
     
    
    //$('#page-pedido-menu [data-role="footer"] a').on("vclick", function (e) {
    $('.footer-pedido a').on("touchstart", function (e) {
        
        //alert("click");
        e.preventDefault();
        e.stopPropagation();
        var spage = $(e.target).attr("goto");
        if ($.mobile.activePage.attr("id") != spage)
            $.mobile.changePage("#" + spage);
            
        //alert($(e.target).attr("goto"));
    });
    
     $(".Footer-Ped").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(e.target).removeClass('ui-btn-active');
    });
     $(".footer-pedido a").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(e.target).removeClass('ui-btn-active');
    });

}

$(document).on("deviceready", initPedido);

function formatCurrency(value) {
    return "R$ " + value.toFixed(2);
}


eNavegacao = { PrimeiraPagina : 0 , PaginaAnterior : 1 , ProximaPagina : 2};
eLevel  = {CategoriesItens : 0 , CategoriesItensArticles : 1 , CategoriesItensDescription : 2 };

function CategoriaItemDescription() {
    var self = this;
    self.idObservacao = ""
    self.name = "";
    self.nm_pocket = "";
};


function CategoriaItem() {
    var self = this;
    self.tipoItem = "";
    self.idItem = "";
    self.codebar = "";
    self.name = "";
    self.nm_pocket = "";
    self.imagem = "";//ko.observable();
    self.preco = ko.observable(0);
    self.idProducao = "";//ko.observable();

    self.ObsQtdeMaxima = 0 ;
    self.ObsObrigatoria = false;

    self.Descriptions = []; //ko.observableArray();

    self.precoFormated = ko.computed(function () {
        return formatCurrency(self.preco());
    });

};


function Categoria() {
    var self = this;
    self.categoryid = "";//ko.observable();
    self.name = "";//ko.observable("");
    self.nm_pocket = "";//ko.observable("");
    self.order = ko.observable(0);

    self.CategoriaItens =[];// ko.observableArray();

    self.Titulo = ko.computed(function () {
        if (self.nm_pocket == "")
            return self.name;
        else
            return self.nm_pocket;
    });


};


function AreaDeServico() {
    var self = this;
    self.AreaDeServicoid = "0";
    self.AreaDeServicoName = "";
    self.TrabalhaComProducao =true;

    self.Categorias = ko.observableArray();

   // alert("Aqui1");
    
    /*
    for (var i = 1 ; i <= 15 ; i++) {
        var item = new Categoria();
        item.categoryid = i;
        item.name = "Cat " + i;

        for (var p = 1 ; p < 50 ; p++) {
            var cat_item = new CategoriaItem();
            cat_item.tipoItem = 0; //Produto
            cat_item.idTtem = item.categoryid + '-' + p;
            cat_item.name = item.name + " - Produto " + p;
            cat_item.codebar = "CB-" + item.categoryid + "-" + p;
            cat_item.preco = p;

            if (p % 3 == 0) {
                cat_item.ObsObrigatoria = false;
                cat_item.ObsQtdeMaxima = 3;
                if (i % 2 == 0) {
                    cat_item.ObsObrigatoria = true;
                    cat_item.ObsQtdeMaxima = 1;
                }
                for (var d = 1 ; d < 5 ; d++) {
                    var desc_item = new CategoriaItemDescription();
                    desc_item.idObservacao = d;
                    desc_item.name = "Obs " + d;
                    desc_item.nm_pocket = desc_item.name;

                    cat_item.Descriptions.push(desc_item);
                }
            }
            item.CategoriaItens.push(cat_item);

        }
        //alert(item.name);
        self.Categorias.push(item);
    };*/

};

function PedidoItemDescription() {    
    
    var self = this;

    //public enum eDescriptionType {Observacao,Anotacao};
    //self.strIdItemObs= ko.observable();//= Settings.GeraID() ;
    //self.strIdItem = ko.observable();
    self.IdObservacao = ko.observable();
    //private eDescriptionType pType;
    self.ObservacaoName = ko.observable();
    //private System.Drawing.Bitmap bmpObservacao;
    //private byte[] baObservacao;

};

function PedidoItem() {
    var self = this;
    self.CodigoDoProduto = ko.observable();
    self.CodigoDeBarra = ko.observable();
    self.NomeDoProduto = ko.observable("");
    self.Preco = ko.observable();
    self.Qtde = ko.observable();
    self.IdProducao = ko.observable();
    
    self.Descriptions = ko.observableArray();//PedidoItemDescription

    //var sig = [{ lx: 20, ly: 34, mx: 20, my: 34 }, { lx: 21, ly: 33, mx: 20, my: 34 }];
    var sig = [];
    self.signature = sig;//ko.observableArray([]);
    //self.subtotal = ko.observable(1);

    self.subtotal = ko.computed(function () {
        return self.Preco() ? self.Preco() * parseInt("0" + self.Qtde(), 10) : 0;
    });
    self.subtotalFormated = ko.computed(function () {
        return self.Preco() ? formatCurrency(self.subtotal()) : ""; 
    });

    self.Titulo = ko.computed(function () {
        if (self.NomeDoProduto() == "")
            return "";
        else
            return self.Qtde() + ' x ' + self.NomeDoProduto();
    });
    
    self.dataicon = ko.computed(function () {
        if (self.signature.length == 0)
            return "none";
        else
            return "edit";
    });
};


function PedidoViewModel() {
    /// <summary>
    /// A view model that represents a single tweet
    /// </summary>

    // --- properties

    var self = this;

    //alert("pedido");
    self.PedidoId = ko.observable("");
    self.NumPedido = ko.observable("");
    self.TituloPedido = ko.observable("");
    
    self.NumeroPessoas= ko.observable("");
    
    self.InputCodebar = ko.observable(" ");
    self.Qtde = ko.observable(1);

    self.Mensagem = ko.observable("");
    self.MensagemOriginal = ko.observable("");
    self.IsObsVisible = ko.observable(false);
    
    self.UltimoProduto = ko.observable(new PedidoItem());
    self.ItemSelecionado = ko.observable(new PedidoItem());

    self.Servico = new AreaDeServico();

    //Controla o Indice do array de categorias que esta selecionado
    self.IndexCategoria = 0;
    self.NumPagCategoria = 0;
    self.MaxIndexCategoria = 0;
    //Controla o Indice do array do Cat Itens que esta selecionado
    self.IndexProduto = 0;
    self.NumPagProduto = 0;

    //self.PedidoItens = ko.observableArray([new PedidoItem()]);
    self.PedidoItens = ko.observableArray();

    self.QtdePedidoItens = ko.computed(function () {
        return self.PedidoItens().length;
    });
    self.TotalPedido = ko.computed(function () {
        var total = 0;
        $.each(self.PedidoItens(), function () { total += this.subtotal() })
        return total;
    });
    self.TotalPedidoFormated = ko.computed(function () {
        return formatCurrency(self.TotalPedido());
    });

    self.RemoveItens =function () {
        //alert("Itens: " +self.PedidoItens().length);
        $.each(self.PedidoItens(), function () {self.PedidoItens().remove(this) })
        //alert("Itens: " +self.PedidoItens().length);
    };

    self.TituloSubtotalFormated = ko.computed(function () {
        var sHtml1="";
            sHtml1 = "<ul data-role='listview' data-inset='true'  data-theme='a' data-count-theme='b'>";
			sHtml1 += "<li style='font-size:1.5em;' data-role='list-divider' class='pad1'>" + self.TituloPedido() + "";
            sHtml1 += "<span style='font-size:1em;' class='ui-li-count ui-btn-active'>" + self.TotalPedidoFormated() + "</span></li></ul>";
            
            
            //$("#ped-subtotal").html(sHtml1);
        
        return "" ;//+ self.NumPedido() + "<span style='font-size:1em;' class='ui-li-count ui-btn-active'>" + self.TotalPedidoFormated() + "</span>";
    });

    
    

    //Controlar a TELA 


    self.intLevel = eLevel.CategoriesItens;
    self.intPagCategories = 0;
    self.intSelectedCategory = 0 ;
    self.indexSelectedCategory = 0;
    self.SelectedCategory ; // Categoria Selecionada
    self.SelectedCategoryItem ; // Categoria Selecionada
    self.intSelectedProducao = 0;
    self.intItemDescriptionCount = 0;
    self.intItemDescriptionQtdeMaxima = 1;
    self.intSelectedIdQuestao = 0;

    self.intPagCategoriesItens = 0;
    self.strSelectedCategoryItem = "";
    self.strSelectedCategoryItemName = "";
    self.Calculadora = false;

    
    self.dsCategories;//lista de itens da Categoria Selecionada
    self.dsCategoriesItens;//lista de itens da Categoria Selecionada
    self.dsCategoriesItensDescriptions;
    self.dsCategoriesItensArticles;    

    // --- public functions

    this.init = function (pedido) {
        //this.PedidoId(pedido.PedidoId);
        //this.NumPedido(pedido.NumPedido);
        //this.TituloPedido(pedido.TituloPedido);
        //this.PedidoItens(pedido.PedidoItens);
        //this.UltimoProduto(pedido.UltimoProduto);


    };

       
    this.AbrePedido = function (pPedidoId, pNumeroPedido) {

        try{
        
            if (typeof pPedidoId === 'undefined')
                throw "PedidoId inválido";
            
            self.PedidoId(pPedidoId);
            self.NumPedido(pNumeroPedido);
            self.TituloPedido("Mesa " + pNumeroPedido);
            self.NumeroPessoas("");

            self.InputCodebar("");

            self.UltimoProduto(new PedidoItem());
            self.ItemSelecionado(new PedidoItem());
            
            //self.Servico = $.parseJSON(window.localStorage.getItem('area_serv' + result.rows.item(i)["idcategoria"]));
            self.Servico = new AreaDeServico();
            //self.Servico = $.parseJSON(window.localStorage.getItem('area_serv' + app.setting.IdAreaVenda()));

            //Controla o Indice do array de categorias que esta selecionado
            self.IndexCategoria = 0;
            self.NumPagCategoria = 0;
            self.MaxIndexCategoria = 0;
            //Controla o Indice do array do Cat Itens que esta selecionado
            self.IndexProduto = 0;
            self.NumPagProduto = 0;


            self.PedidoItens([]);
            //self.RemoveItens();

            //this.ShowCategoria(1);
            self.ShowCategories(eNavegacao.PrimeiraPagina);

            $.mobile.changePage("#page-pedido-menu");
        }
        catch(err)
        {
            navigator.notification.alert("Ocorreu um erro ao AbrirPedido: " + err.message, function () { }, "Operação Cancelada", 'OK');
            $.mobile.changePage("#page-pedido-home");
        }
        
    };



    
    this.ShowCategoriaNext = function (pagina) {
        //self.ShowCategoria(parseInt(self.NumPagCategoria) + 1);
        self.ShowCategories(eNavegacao.ProximaPagina);
    };
    this.ShowCategoriaPrev = function (pagina) {
        //self.ShowCategoria(parseInt(self.NumPagCategoria) - 1);
        self.ShowCategories(eNavegacao.PaginaAnterior);
    };

    this.ShowProdutosNext = function (pagina) {
        //self.ShowProdutos(parseInt(self.NumPagProduto) + 1);
        if (self.intLevel == eLevel.CategoriesItens)
            self.ShowCategoriesItens(eNavegacao.ProximaPagina);
        //else if (intLevel == eLevel.CategoriesItensArticles)
        //    self.ShowCategoriesItensArticles(eNavegacao.ProximaPagina);
        else if (intLevel == eLevel.CategoriesItensDescription)
            self.ShowCategoriesItensDescription(eNavegacao.ProximaPagina);
    };
    this.ShowProdutosPrev = function (pagina) {
        //self.ShowProdutos(parseInt(self.NumPagProduto) - 1);
        if (self.intLevel == eLevel.CategoriesItens)
            self.ShowCategoriesItens(eNavegacao.PaginaAnterior);
        //else if (intLevel == eLevel.CategoriesItensArticles)
            //self.ShowCategoriesItensArticles(eNavegacao.PaginaAnterior);
        else if (intLevel == eLevel.CategoriesItensDescription)
            self.ShowCategoriesItensDescription(eNavegacao.PaginaAnterior);
    };

    this.ShowCategories = function (nav) {

        try {
            //this.SuspendLayout();
            var intRows = 0;
            var intButtons = 6;
            var intPages = 0;
            var i = 0;
            var intNumButton = 0;
            //alert("oi");

            $.when(getCategoriesSQL(self.Servico.AreaDeServicoid)).pipe(function(dta) {
            
                self.dsCategories = dta;
                
                //intRows = self.Servico.Categorias().length;
                intRows = self.dsCategories.rows.length;
                
                //alert(intRows);
                intPages = Math.floor(intRows / intButtons);
                if ((intRows % intButtons) == 0)
                    intPages = intPages - 1;

                if (intPages < 0)
                    intPages = 0;

                if (nav == eNavegacao.PrimeiraPagina) {
                    self.intPagCategories = 0;
                    $("#btnTipoEsq").addClass('ui-disabled');
                    if ((self.intPagCategories + 1) <= intPages)
                        $("#btnTipoDir").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnTipoDir").addClass('ui-disabled');
                }
                else if (nav == eNavegacao.PaginaAnterior) {
                    self.intPagCategories -= 1;
                    if ((self.intPagCategories - 1) >= 0)
                        $("#btnTipoEsq").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnTipoEsq").addClass('ui-disabled');

                    if ((self.intPagCategories + 1) <= intPages)
                        $("#btnTipoDir").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnTipoDir").addClass('ui-disabled');
                }
                else if (nav == eNavegacao.ProximaPagina) {

                    self.intPagCategories += 1;
                    //alert("aqui");
                    if ((self.intPagCategories - 1) >= 0)
                        $("#btnTipoEsq").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnTipoEsq").addClass('ui-disabled');

                    if ((self.intPagCategories + 1) <= intPages)
                        $("#btnTipoDir").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnTipoDir").addClass('ui-disabled');
                }

                //btnTipoImage();

                //if ((intPagCategories % 2) == 1) //se pag atual é par
                //{
                //    btnTipo5.BackColor = Color.LightGoldenrodYellow;
                //    btnTipo6.BackColor = Color.MistyRose;
                //    btnTipo3.BackColor = Color.PeachPuff;
                //    btnTipo4.BackColor = Color.PaleGreen;
                //    btnTipo1.BackColor = Color.Aquamarine;
                //    btnTipo2.BackColor = Color.PaleTurquoise;
                //}
                //else {
                //    btnTipo1.BackColor = Color.LightGoldenrodYellow;
                //    btnTipo2.BackColor = Color.MistyRose;
                //    btnTipo3.BackColor = Color.PeachPuff;
                //    btnTipo4.BackColor = Color.PaleGreen;
                //    btnTipo5.BackColor = Color.Aquamarine;
                //    btnTipo6.BackColor = Color.PaleTurquoise;
                //}

                for (i = 1; i <= intButtons; i++) {
                    var index = ((self.intPagCategories ) * intButtons) + i;
                    var btn = $("#ped-categ-" + i);
                    if (index > intRows) {
                        btn.text("");
                        btn.val("");
                        btn.addClass('ui-disabled');
                    }
                    else {
                        
                        btn.removeClass('ui-disabled');

                        //var categ = self.Servico.Categorias()[index - 1];
                        var categ = self.dsCategories.rows.item(index -1);
                        
                        if (!(categ.desc_pocket ===null))
                            btn.text(categ.desc_pocket);
                        else
                            btn.text(categ.dscategoria);

                        btn.val(index - 1);
                        
                    }
                }

                if (nav == eNavegacao.PrimeiraPagina) {
                    self.DefineCategory(1);
                }

            }).done(function() {
                //alert("DONE");                
            }).fail(function(error) {
                
                alert("Não foi possível obter as categorias! erro: " + error.message);
                
            });
        }
        finally {
            //this.ResumeLayout(true);
        }
    };

    this.DefineCategory = function (NumCateg) {
        try
        {

            //this.SuspendLayout();

            self.intSelectedCategory = NumCateg;
            
            //intSelectedProducao=  Convert.ToInt32(dsCategories.Tables[0].Rows[Convert.ToInt32(btnCategoria(index).Tag.ToString())]["idproducao"].ToString())  ;

            var ptheme = $("#ped-categ-" + NumCateg).attr('data-theme');
            var indexCateg = $("#ped-categ-" + NumCateg).val();
            //alert("index " + indexCateg);
            self.indexSelectedCategory = indexCateg;

            //self.SelectedCategory = self.Servico.Categorias()[self.indexSelectedCategory];
            //alert("id " + self.Servico.Categorias[self.indexSelectedCategory].categoryid);
            
            //self.SelectedCategory = $.parseJSON(window.localStorage.getItem('cat' + self.Servico.Categorias[self.indexSelectedCategory].categoryid));
            
            //alert(self.SelectedCategory.name);
            
            self.IndexCategoria = indexCateg;
            self.IndexProduto = 0;

            
            $(".prod").buttonMarkup({ theme: ptheme });


            self.ShowCategoriesItens(eNavegacao.PrimeiraPagina);
        }
        finally
        {
            //this.ResumeLayout();
        }
    };

    this.ShowCategoriesItens = function (nav) {
    
        try
        {
            //this.SuspendLayout();
            var intRows = 0;
            var intButtons = 12;
            var intPages = 0;
            var i = 0;
            var intNumButton = 0;
            var intCateg = 0;

            var ptheme = $("#ped-categ-" + self.intSelectedCategory).attr('data-theme');
        
            

            self.intItemDescriptionCount = 0;
            self.intItemDescriptionQtdeMaxima = 1;
            self.intSelectedIdQuestao = 0;


            self.intLevel = eLevel.CategoriesItens;
            self.AtualizaMensagem("");
            
            if (self.dsCategories.rows.length > 0)
                intCateg = self.indexSelectedCategory; //Convert.ToInt32(dsCategories.Tables[0].Rows[Convert.ToInt32(btnCategoria(intSelectedCategory).Tag.ToString())]["idcategoria"].ToString());
            else
                intCateg = 0;
            
            var idcategoria = self.dsCategories.rows.item(parseInt(intCateg)).idcategoria;
            
            $.when(getCategoriesItensSQL(idcategoria)).pipe(function(dta) {
            
                self.dsCategoriesItens = dta;
                

                if (nav == eNavegacao.PrimeiraPagina)
                {
                    self.Qtde = 1;
                    
                    //dsCategoriesItens = categ.CategoriaItens();//oData.GetCategoriesItens(intCateg);
                    
                }

                //intRows = self.SelectedCategory.CategoriaItens().length;
               // alert("AQUI" + self.indexSelectedCategory);
                //self.SelectedCategory = $.parseJSON(window.localStorage.getItem('cat' + self.indexSelectedCategory));
                //alert(window.localStorage.getItem('cat' + self.indexSelectedCategory));
                //alert("OK " + self.SelectedCategory.categoryid);
                intRows = self.dsCategoriesItens.rows.length;//   self.SelectedCategory.CategoriaItens.length;
               //alert("AQUI2");
                 //alert("Prods: " + intRows);
                intPages = Math.floor(intRows / intButtons);
                if ((intRows % intButtons) == 0)
                    intPages = intPages - 1;

                if (intPages < 0)
                    intPages = 0;

                if (nav == eNavegacao.PrimeiraPagina)
                {
                    self.intPagCategoriesItens = 0;
                    $("#btnProdEsq").addClass('ui-disabled'); //btnProdEsq.Enabled = false;
                    if ((self.intPagCategoriesItens + 1) <= intPages)
                        $("#btnProdDir").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnProdDir").addClass('ui-disabled');
                   // btnProdDir.Enabled = ((self.intPagCategoriesItens + 1) <= intPages);
                }
                else if (nav == eNavegacao.PaginaAnterior)
                {
                    self.intPagCategoriesItens -= 1;
                    //btnProdEsq.Enabled = ((self.intPagCategoriesItens - 1) >= 0);
                    if ((self.intPagCategoriesItens - 1) >= 0)
                        $("#btnProdEsq").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnProdEsq").addClass('ui-disabled');
                    //btnProdDir.Enabled = ((self.intPagCategoriesItens + 1) <= intPages);
                    if ((self.intPagCategoriesItens + 1) <= intPages)
                        $("#btnProdDir").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnProdDir").addClass('ui-disabled');
                }
                else if (nav == eNavegacao.ProximaPagina)
                {
                    self.intPagCategoriesItens += 1;
                    //btnProdEsq.Enabled = ((self.intPagCategoriesItens - 1) >= 0);
                    if ((self.intPagCategoriesItens - 1) >= 0)
                        $("#btnProdEsq").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnProdEsq").addClass('ui-disabled');
                    //btnProdDir.Enabled = ((self.intPagCategoriesItens + 1) <= intPages);
                    if ((self.intPagCategoriesItens + 1) <= intPages)
                        $("#btnProdDir").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnProdDir").addClass('ui-disabled');
                }
                //btnProdImage();
                
                //$(".prod").css("background-color", "");
                
                $(".prod").buttonMarkup({ theme: ptheme });    
                
                for (i = 1; i <= intButtons; i++) {
                    var index = ((self.intPagCategoriesItens ) * intButtons) + i;
                    var btn = $("#ped-prod-" + i);
                    if (index > intRows) {
                        btn.text("");
                        btn.val("");
                        btn.addClass('ui-disabled');
                    }
                    else {
                        //$("#ped-prod-" + i).button('enable');
                        btn.removeClass('ui-disabled');
                        //var categItem = self.SelectedCategory.CategoriaItens()[index - 1];
                        var categItem = self.dsCategoriesItens.rows.item(index-1);

                        //alert(categItem.name);
                        if (!(categItem.desc_pocket ===null))
                            btn.text(categItem.desc_pocket);
                        else
                            btn.text(categItem.descricao);
                        
                        btn.val(index-1);
                    }
                }

            }).done(function() {
                //alert("DONE");                
            }).fail(function(error) {
                
                alert("Não foi possível obter os itens da categoria! erro: " + error.message);
                
            });
        }
        finally
        {
            //this.ResumeLayout(true);
        }
    };

    
    this.ShowCategoriesItensDescriptionCodigo = function (nav)
    {
        self.Calculadora = true;
        $.mobile.changePage("#page-pedido-menu");
        self.ShowCategoriesItensDescription(eNavegacao.PrimeiraPagina);
        
    };
    
    this.ShowCategoriesItensDescription = function (nav)
    {
        try
        {

            $.when(getCategoriesItensDescriptionSQL(self.strSelectedCategoryItem)).pipe(function(dta) {

                //this.SuspendLayout();
                var intRows = 0;
                var intButtons = 12;
                var intPages = 0;
                var i = 0;
                var intNumButton = 0;

                
                
                if (nav == eNavegacao.PrimeiraPagina)
                {
                    self.dsCategoriesItensDescriptions = dta;
                    //dsCategoriesItensDescriptions = oData.GetCategoriesItensDescription(strSelectedCategoryItem);
                    intRows = self.dsCategoriesItensDescriptions.rows.length;
                    //Incluir o iTem Nenhuma caso não seja entrada obrigatoria
                    if (intRows != 0)
                    {


                        self.intItemDescriptionQtdeMaxima = self.dsCategoriesItensDescriptions.rows.item(0).ObsQtdeMaxima;// self.SelectedCategoryItem().ObsQtdeMaxima;

/*                        //Acrescentar o botão NENHUM caso a obs não seja obrigatória
                        if (self.dsCategoriesItensDescriptions.rows.item(0).ObsObrigatoria == false)
                        {
                            if (self.SelectedCategoryItem().Descriptions()[1].name != "Nenhuma") {
                                var row = self.dsCategoriesItensDescriptions.rows.item(0);
                                
                                NewRow = dsCategoriesItensDescriptions.Tables[0].NewRow();
                                NewRow["iditem"] = row["iditem"];
                                NewRow["ObsObrigatoria"] = row["ObsObrigatoria"];
                                NewRow["ObsQtdeMaxima"] = row["ObsQtdeMaxima"];
                                NewRow["idobservacao"] = 0;
                                NewRow["dsobservacao"] = "Nenhuma";
                                dsCategoriesItensDescriptions.Tables[0].Rows.InsertAt(NewRow, 0);
                                
                                self.SelectedCategoryItem().Descriptions().slice(1, 0, itemDesc);
                            }
                        }
*/

                    }
                    else
                    {
                        //CASO NÃO TENHA OPÇÔES VOLTAR PARA ITENS
                        if (self.intLevel != eLevel.CategoriesItens)
                            self.ShowCategoriesItens(eNavegacao.PrimeiraPagina);
                        return;

                    }

                }

                self.intLevel = eLevel.CategoriesItensDescription;
                intRows = self.dsCategoriesItensDescriptions.rows.length;
                
                var ObsObrigatoria = self.dsCategoriesItensDescriptions.rows.item(0).ObsObrigatoria ;
                
                //alert("ObsObrigatoria = " + ObsObrigatoria );
                
                if (ObsObrigatoria == "false")
                {
                    //alert("intRows +1");
                    intRows = intRows +1; //Add opção Nenhuma
                }                

                intPages = Math.floor(intRows / intButtons);
                if ((intRows % intButtons) == 0)
                    intPages = intPages - 1;

                if (nav == eNavegacao.PrimeiraPagina)
                {
                    self.intPagCategoriesItens = 0;
                    //btnProdEsq.Enabled = false;
                    $("#btnProdEsq").addClass('ui-disabled');
                    //btnProdDir.Enabled = ((intPagCategoriesItens + 1) <= intPages);
                    if ((self.intPagCategoriesItens + 1) <= intPages)
                        $("#btnProdDir").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnProdDir").addClass('ui-disabled');
                    //AtualizaMensagemDescription();
                }
                else if (nav == eNavegacao.PaginaAnterior)
                {
                    self.intPagCategoriesItens -= 1;
                    //btnProdEsq.Enabled = ((intPagCategoriesItens - 1) >= 0);
                    if ((self.intPagCategoriesItens - 1) >= 0)
                        $("#btnProdEsq").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnProdEsq").addClass('ui-disabled');
                    //btnProdDir.Enabled = ((intPagCategoriesItens + 1) <= intPages);
                    if ((self.intPagCategoriesItens + 1) <= intPages)
                        $("#btnProdDir").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnProdDir").addClass('ui-disabled');
                }
                else if (nav == eNavegacao.ProximaPagina)
                {
                    self.intPagCategoriesItens += 1;
                    //btnProdEsq.Enabled = ((intPagCategoriesItens - 1) >= 0);
                    if ((self.intPagCategoriesItens - 1) >= 0)
                        $("#btnProdEsq").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnProdEsq").addClass('ui-disabled');
                    //btnProdDir.Enabled = ((intPagCategoriesItens + 1) <= intPages);
                    if ((self.intPagCategoriesItens + 1) <= intPages)
                        $("#btnProdDir").removeClass('ui-disabled');//Enabled
                    else
                        $("#btnProdDir").addClass('ui-disabled');
                }
                //btnProdImage();
                      
                for (i = 1; i <= intButtons; i++) {
                    var index = ((self.intPagCategoriesItens) * intButtons) + i;
                    //alert("index =" + index)                    ;
                    var btn = $("#ped-prod-" + i);
                    if (index > intRows) {
                        btn.text("");
                        btn.val("");
                        //btn.attr('data-theme','i');
                        btn.buttonMarkup({ theme: 'i' });
                        //btn.css('background-color', '#F0F0F0');//WhiteSmoke
                        btn.addClass('ui-disabled');
                        
                    }
                    else {
                        btn.removeClass('ui-disabled');

                        if (ObsObrigatoria == "false" && index==1){
                            //alert("nenhuma");
                            //btn.css('background-color', '#FFFFCC');//LightGoldenrodYellow
                            //btn.attr('data-theme','a');
                            btn.buttonMarkup({ theme: 'a' });
                            btn.text("Nenhuma");
                            btn.val(0);
                        }
                        else{
                            var DescItem ;
                            if (ObsObrigatoria == "false"){
                                DescItem = self.dsCategoriesItensDescriptions.rows.item(index-2);
                                btn.val(index - 2);
                            }
                            else{
                                DescItem = self.dsCategoriesItensDescriptions.rows.item(index-1);
                                btn.val(index - 1);
                            }

                            //btn.attr('data-theme','i');
                            btn.buttonMarkup({ theme: 'i' });
                            //btn.css('background-color', '#F0F0F0');//WhiteSmoke
                            
                            if (!(DescItem.desc_pocket ===null))
                                btn.text(DescItem.desc_pocket);
                            else
                                btn.text(DescItem.dsobservacao);

                            
                        }
                    }
                }
                    
            }).done(function() {
                //alert("DONE");                
            }).fail(function(error) {
                
                alert("Não foi possível obter as observações! erro: " + error.message);
                
            });
        }
        finally
        {
            //this.ResumeLayout(true);
        }
    };

    this.ShowCategoriesItensArticles = function (nav)
		{
            try
            {
                //this.SuspendLayout();
                var intRows = 0;
                var intButtons = 12;
                var intPages =0;
                var i = 0;
                var intNumButton =0 ;

                self.intLevel = eLevel.CategoriesItensArticles;

                //alert(self.strSelectedCategoryItem);
                $.when(getCategoriesItensArticlesSQL(self.strSelectedCategoryItem)).pipe(function(dta) {
                    //alert("WHEN");
                    self.dsCategoriesItensArticles = dta;
                    //alert("artigos " + dta.rows.length);
                    if (nav == eNavegacao.PrimeiraPagina)
                    {
                        self.dsCategoriesItensArticles = dta;

                    }

                    intRows = self.dsCategoriesItensArticles.rows.length;
                    intPages = Math.floor(intRows / intButtons);

                    if ((intRows % intButtons) == 0)
                        intPages = intPages - 1;

                    if (nav == eNavegacao.PrimeiraPagina)
                    {
                        self.intPagCategoriesItens = 0;
                        $("#btnProdEsq").addClass('ui-disabled');
                        if ((self.intPagCategoriesItens + 1) <= intPages)
                            $("#btnProdDir").removeClass('ui-disabled');//Enabled
                        else
                            $("#btnProdDir").addClass('ui-disabled');

                        if (intRows != 0)
                            self.AtualizaMensagem(self.dsCategoriesItensArticles.rows.item(0).dsQuestao);
                    }
                    else if (nav == eNavegacao.PaginaAnterior)
                    {
                        self.intPagCategoriesItens -= 1;
                        if ((self.intPagCategoriesItens - 1) >= 0)
                            $("#btnProdEsq").removeClass('ui-disabled');//Enabled
                        else
                            $("#btnProdEsq").addClass('ui-disabled');

                        if ((self.intPagCategoriesItens + 1) <= intPages)
                            $("#btnProdDir").removeClass('ui-disabled');//Enabled
                        else
                            $("#btnProdDir").addClass('ui-disabled');

                    }
                    else if (nav == eNavegacao.ProximaPagina)
                    {
                        self.intPagCategoriesItens += 1;
                        if ((self.intPagCategoriesItens - 1) >= 0)
                            $("#btnProdEsq").removeClass('ui-disabled');//Enabled
                        else
                            $("#btnProdEsq").addClass('ui-disabled');

                        if ((self.intPagCategoriesItens + 1) <= intPages)
                            $("#btnProdDir").removeClass('ui-disabled');//Enabled
                        else
                            $("#btnProdDir").addClass('ui-disabled');
                    }
                  
                    //btnProdImage();


                    for (i = 1; i <= intButtons; i++) {
                        var index = ((self.intPagCategoriesItens) * intButtons) + i;
                        var btn = $("#ped-prod-" + i);
                        if (index > intRows) {
                            btn.text("");
                            btn.val("");
                            //btn.css('background-color', '#F0F0F0');//WhiteSmoke
                            btn.addClass('ui-disabled');
                            
                        }
                        else {
                            btn.removeClass('ui-disabled');
                            //alert(self.dsCategoriesItensArticles.rows.item(index-1).descricao);
                            //alert(self.dsCategoriesItensArticles.rows.item(index-1).desc_pocket);
                            //alert(!self.dsCategoriesItensArticles.rows.item(index-1).desc_pocket);
                            if (!(self.dsCategoriesItensArticles.rows.item(index-1).desc_pocket===null))
                                btn.text(self.dsCategoriesItensArticles.rows.item(index-1).desc_pocket);
                            else
                                btn.text(self.dsCategoriesItensArticles.rows.item(index-1).descricao);

                            btn.val(index - 1);
                        }
                    }    
                    
                }).done(function() {
                    //alert("DONE");                
                }).fail(function(error) {
                    
                    alert("Não foi possível obter o artigo! erro: " + error.message);
                    
                });
                
            }
            finally
            {
                //this.ResumeLayout(true);
            }
			

		};
		
    this.AtualizaMensagem = function (texto)
    {    				
        
        self.Mensagem(texto);
        self.MensagemOriginal(texto);
        //AtualizaMensagem(strSelectedCategoryItemName);

    }; 
    
    this.AtualizaMensagemDescription = function ()
    {    				
        
         
        var intNumOpcoes = 0;
			
		intNumOpcoes = self.intItemDescriptionQtdeMaxima - self.intItemDescriptionCount;
		if (intNumOpcoes==1)
			self.Mensagem("1 Opção: " + self.MensagemOriginal());
		else
			self.Mensagem(intNumOpcoes +  " Opções: " + self.MensagemOriginal());
		
    }; 
        
    this.ItemSelectByClick = function (tipo,codigo)
    {
    
       try
            {
                var codbarra="";
                var codprod = "";

                if (codigo == "")
                {
                    alert("É necessário fornecer o CÓDIGO DE BARRA, operação cancelada.");
                    return;
                }
               // alert(codigo);
                //this.SuspendLayout();
                if (tipo=="cb")
                    codbarra=codigo;
                else
                    codprod=codigo;

                $.when(getProductCBCPSQL(codbarra,codprod)).pipe(function(dta) {

                    var strTipoItem="";
                    var strPreco="";
                    
                    

                    if (dta.rows.length == 0)
                    {
                        alert("O código de barra '" + self.InputCodebar() + "' não foi encontrado, operação cancelada.");
                        return;
                    }

                    self.InputCodebar("");
                    
                    var prod = dta.rows.item(0);
                    
                    strTipoItem = "0";
                    strPreco = prod.Preco;
                    if ((strPreco == "" || strPreco == "0") && (strTipoItem == "0"))
                    {
                        alert("Este produto está sem preço, operação cancelada.");
                        return;
                    }

                    self.strSelectedCategoryItem = prod.CodigodoProduto;
                    self.strSelectedCategoryItemName = prod.NomedoProduto;




                    if (strTipoItem == "0") //Produto
                    {
                        //Adiciona aqui a criação o ItemPedido
        				var item =new PedidoItem();

                        //Product oProd = new Product(dsCategoriesItens.Tables[0].Rows[intRowPos]);
                        item.CodigoDoProduto(prod.CodigodoProduto);
                        item.NomeDoProduto(prod.NomedoProduto);
                        item.CodigoDeBarra(prod.CodigodeBarra);
                        item.Preco(prod.Preco);
                        item.Qtde(1);

                        
                        if (self.Servico.TrabalhaComProducao ==true) 
        				{	
                            if (prod.IdProducaoFinal=="")
        					{
        						alert("Este produto não está com a ÁREA DE PRODUÇÃO definida, operação cancelada.");     
        						return;
        					}
        					else
        						item.IdProducao(parseInt(prod.IdProducaoFinal));

        				}

                        self.PedidoItens.unshift(item);
                        
                        self.UltimoProduto(item);
                        
                        self.AtualizaMensagem(prod.NomedoProduto);



                        self.IsObsVisible(false);
                        
                        if (prod.QtdeObs > 0)
                        {
                            //if (Settings.App["ObsOpcional"].ToString() == "1")
                            if (true)
                                self.IsObsVisible(true);
                            else
                                self.ShowCategoriesItensDescription(eNavegacao.PrimeiraPagina);
                            //pnlCodigo.Visible = false;
                        }
                        if ($.mobile.activePage.attr("id") == "page-produto")
                            $.mobile.changePage("#page-pedido-itens");
                    }
                    
                }).done(function() {
                    //alert("DONE");                
                }).fail(function(error) {
                    
                    alert("Não foi possível obter o produto! erro: " + error.message);
                    
                });
                
            }
            finally
            {
                //this.ResumeLayout(true);
            }
			
 
    }
    this.ItemSelect = function (numProdBtn)
    {

		
		var strTipoItem="";
		var strPreco="";
        
        
        var intRowPos = parseInt($("#ped-prod-" + numProdBtn).val());
        
        self.IndexProduto = intRowPos;
        //IdProducaoFinal
        

                
		//btnObs.Visible = false; 
		self.IsObsVisible(false);
        if (self.intLevel== eLevel.CategoriesItens )
		{
            self.SelectedCategoryItem = self.dsCategoriesItens.rows.item(self.IndexProduto);// self.SelectedCategory.CategoriaItens[self.IndexProduto];
        
			strTipoItem = self.SelectedCategoryItem.TipoItem;      
			strPreco= self.SelectedCategoryItem.PrecoFinal; //dsCategoriesItens.Tables[0].Rows[intRowPos]["preco"].ToString();
			if ((strPreco=="" || strPreco=="0") && (strTipoItem=="0") )
			{
				alert("Este produto está sem preço, operação cancelada.");     
				return;
			}
			
			self.strSelectedCategoryItem = self.SelectedCategoryItem.IdItem;// dsCategoriesItens.Tables[0].Rows[intRowPos]["iditem"].ToString();
			self.strSelectedCategoryItemName= self.SelectedCategoryItem.descricao;//dsCategoriesItens.Tables[0].Rows[intRowPos]["descricao"].ToString();
			

			
			
			if (strTipoItem=="0") //Produto
			{	
				
				
                //Adiciona aqui a criação o ItemPedido
				var item =new PedidoItem();

                //Product oProd = new Product(dsCategoriesItens.Tables[0].Rows[intRowPos]);
                item.CodigoDoProduto(self.SelectedCategoryItem.IdItem);
                item.NomeDoProduto(self.SelectedCategoryItem.NomedoProduto);
                item.CodigoDeBarra(self.SelectedCategoryItem.CodigodeBarra);
                item.Preco(self.SelectedCategoryItem.PrecoFinal);
                item.Qtde(1);

                
                if (self.Servico.TrabalhaComProducao ==true) 
				{	
                    if (self.SelectedCategoryItem.IdProducaoFinal=="")
					{
						alert("Este produto não está com a ÁREA DE PRODUÇÃO definida, operação cancelada.");     
						return;
					}
					else
						item.IdProducao(parseInt(self.SelectedCategoryItem.IdProducaoFinal));

				}

                self.PedidoItens.unshift(item);
                
                self.UltimoProduto(item);
                
                self.AtualizaMensagem(self.SelectedCategoryItem.NomedoProduto);

				//item.Qtde =Qtde;
				//Pedido.Itens.Add(item);
				//GridAddItem(item ,item.IdItem , strSelectedCategoryItemName,item.Qtde,Convert.ToDouble(strPreco));
				
				//Qtde=1;
                //TODO
                //btnObs.Visible = false;
                self.IsObsVisible(false);
                if (self.SelectedCategoryItem.QtdeObs >0)
                    if (true)
                        self.IsObsVisible(true); //TODO//btnObs.Visible = true;
                    else
                        self.ShowCategoriesItensDescription(eNavegacao.PrimeiraPagina);
                //item = null;
			}
			else
			{
				self.AtualizaMensagem(self.strSelectedCategoryItemName);
				self.ShowCategoriesItensArticles(eNavegacao.PrimeiraPagina); 
			}
		}

        else if (self.intLevel== eLevel.CategoriesItensDescription )
		{
			//Adiciona aqui a criação o ItemPedidoDescription
			//var intQtdeMaxima = parseInt(self.dsCategoriesItensDescriptions.rows.item(0).obsQtdeMaxima);

            
            if ($("#ped-prod-" + numProdBtn).text() == "Nenhuma")
            {
                self.ShowCategoriesItens(eNavegacao.PrimeiraPagina);
                if (self.Calculadora)
                    $.mobile.changePage("#page-pedido-codigo");
            }
            else
            {
                var itemdesc = new PedidoItemDescription();
                itemdesc.ObservacaoName(self.dsCategoriesItensDescriptions.rows.item(intRowPos).dsobservacao);
                itemdesc.IdObservacao(self.dsCategoriesItensDescriptions.rows.item(intRowPos).idobservacao);
                
                
                self.UltimoProduto().Descriptions.unshift(itemdesc);
                self.intItemDescriptionCount = self.intItemDescriptionCount +1;
                self.AtualizaMensagemDescription();
                //Pedido.Itens.Current.Descriptions.Add(item, PedidoItemDescription.eDescriptionType.Observacao);

                
                //itemdesc = null;
                if (self.intItemDescriptionCount >= self.intItemDescriptionQtdeMaxima )
                {
                    self.ShowCategoriesItens(eNavegacao.PrimeiraPagina);
                    if (self.Calculadora)
                        $.mobile.changePage("#page-pedido-codigo");
                        
                }
            }

		}

        else if (self.intLevel== eLevel.CategoriesItensArticles )
		{
            //alert("TipoItem=" + self.dsCategoriesItensArticles.rows.item(intRowPos).TipoItem);
            //alert("descricao=" + self.dsCategoriesItensArticles.rows.item(intRowPos).descricao);
                    
            strTipoItem = self.dsCategoriesItensArticles.rows.item(intRowPos).TipoItem;      
			strPreco = self.dsCategoriesItensArticles.rows.item(intRowPos).preco;
			
			if ((strPreco=="" || strPreco=="0" ) && (strTipoItem=="0") )
			{
				alert("Este produto está sem preço, operação cancelada.");     
				return;
			}
			self.strSelectedCategoryItem = self.dsCategoriesItensArticles.rows.item(intRowPos).IdItem;
			self.strSelectedCategoryItemName = self.dsCategoriesItensArticles.rows.item(intRowPos).descricao;
            
            //alert("strSelectedCategoryItem=" + self.strSelectedCategoryItem ); 
            
            self.AtualizaMensagem(self.strSelectedCategoryItemName);

			if (strTipoItem=="0") //Produto
			{	//Adiciona aqui a criação o ItemPedido
				var itemartigo =new PedidoItem();
                
                //Product oProd = new Product(dsCategoriesItens.Tables[0].Rows[intRowPos]);
                itemartigo.CodigoDoProduto(self.dsCategoriesItensArticles.rows.item(intRowPos).IdItem);
                itemartigo.NomeDoProduto(self.dsCategoriesItensArticles.rows.item(intRowPos).NomedoProduto);
                itemartigo.CodigoDeBarra(self.dsCategoriesItensArticles.rows.item(intRowPos).CodigodeBarra);
                itemartigo.Preco(self.dsCategoriesItensArticles.rows.item(intRowPos).PrecoFinal);
                itemartigo.Qtde(1);


				if (self.Servico.TrabalhaComProducao ==true) 
				{	
					if (self.dsCategoriesItensArticles.rows.item(intRowPos).IdProducaoFinal=="")
					{
						alert("Este produto está ÁREA DE PRODUÇÃO definida, operação cancelada.");     
						return;
					}
					else
						itemartigo.IdProducao(parseInt(self.dsCategoriesItensArticles.rows.item(intRowPos).IdProducaoFinal));

				}
                self.PedidoItens.unshift(itemartigo);
                
                self.UltimoProduto(itemartigo);

                //item.Qtde =Qtde;
				//Pedido.Itens.Add(item);
				
				//GridAddItem(item,item.IdItem , strSelectedCategoryItemName,item.Qtde,Convert.ToDouble(strPreco));
				
				//Qtde=1;
                self.IsObsVisible(false); 
                //alert("qtde obs" + self.dsCategoriesItensArticles.rows.item(intRowPos).QtdeObs);
                if (self.dsCategoriesItensArticles.rows.item(intRowPos).QtdeObs > 0)
                    //if (Settings.App["ObsOpcional"].ToString() == "1")
                    if (true)
                        self.IsObsVisible(true);//btnObs.Visible = true;
                    else
                        self.ShowCategoriesItensDescription(eNavegacao.PrimeiraPagina);
                //itemartigo = null;
			}
			else
				self.ShowCategoriesItensArticles(eNavegacao.PrimeiraPagina); 

		}
	
    }

    this.ChangeCategory = function (NumCateg) {
        var ptheme = $("#ped-categ-" + NumCateg).attr('data-theme');
        var indexCateg = $("#ped-categ-" + NumCateg).val();

        self.IndexCategoria = indexCateg;
        self.IndexProduto = 0;

        this.ShowProdutos(1);
        $(".prod").buttonMarkup({ theme: ptheme });
    };

    this.adicionarItemMenu = function (NumProd) {
        //alert(NumProd);
        var indexProd = $("#ped-prod-" + NumProd).val();
        //alert("indexProd=" + indexProd);
        self.IndexProduto = indexProd;
        
        //var categ = self.Servico.Categorias()[self.IndexCategoria];
        var categ = self.Servico.Categorias[self.IndexCategoria];
        
        //alert(categ.name);
        //var categItem = categ.CategoriaItens()[self.IndexProduto];
        var categItem = categ.CategoriaItens[self.IndexProduto];

        self.SelectedCategoryItem = categItem;

        //alert(categItem.name);

        var item = new PedidoItem();
        item.category("");
        item.NomeDoProduto(categItem.name);
        item.CodigoDeBarra(categItem.codebar);
        item.Preco(categItem.preco);
        item.Qtde(1);

        self.PedidoItens.unshift(item);
        //self.PedidoItens.push(item);
        self.UltimoProduto(item);
        //alert("ok");
        //console.log(JSON.stringify(self));
        //alert("ok2");
        //var mapping = {  'ignore': ["UltimoProduto", "Servico","ItemSelecionado","SelectedCategory","SelectedCategoryItem"]};
        
        //var mapping = {'include': ["PedidoId", "PedidoItens"]};
        
        //console.log(ko.mapping.toJSON(self, mapping));
        //alert("ok3");
        //navigator.notification.beep(1);
        //navigator.notification.vibrate(30);
        
        //$("lstUltimoProduto").listview('refresh');
       // $("lstItensPedido").listview('refresh');


    };

    this.SendTecla = function (tecla) {
        
        if (tecla == "*") {
            self.InputCodebar(self.InputCodebar() + " x ");
        }
        else if (tecla == "-") {
            self.InputCodebar(self.InputCodebar().slice(0, -1));
        }
        else{
            self.InputCodebar(self.InputCodebar() + tecla);
        }
        
        //alert(self.InputCodebar());
    };

    this.SearchProd = function(){
        
         $.mobile.changePage("#page-produto", {
            transition: $.mobile.defaultPageTransition,
            reverse: true,
        });//slideup
        return;
    };

    this.checkEnterSearch = function (e) {
        var that = this;
        
        if (e.keyCode == 13) {
            alert("enter")
            $(e.target).blur();
            //alert($(e.target).text());
            that.ListaProdutos($(e.target).text());
        }
    };
    this.ListaProdutos = function (filter) {
        //alert("Inicio: " + filter);
        app.db.transaction(function (tx) {
            var sql = "SELECT CodigodoProduto, CodigodeBarra , NomedoProduto,Preco FROM Products WHERE NomedoProduto LIKE '%" + $.trim(filter) + "%' ORDER BY NomedoProduto LIMIT 100";
           // alert(sql);
            tx.executeSql(sql, [],
               function (tx, result) {
                   console.log("achou " + result.rows.length);
                   if (result.rows.length==0)
                   {
                      alert("não existe produtos com este filtro");                     
                   }
                   else{
                       //$.mobile.showPageLoadingMsg(true);
                       var len = result.rows.length;
                       var htmlData = "";
                       $("#productList").html('');
                       for (var i = 0; i < len; i++) {
                           var row = result.rows.item(i);
                           //htmlData = htmlData + '<li id="' + row["id"] + '"><a href="#"><h2>' + row["name"] + '</h2><p class="ui-li-aside">' + row["nickName"] + '</p></a></li>';
                           //htmlData = htmlData + "<li class='lp'><a class='ui-btn ui-icon-plus ui-btn-icon-left' cp='" + row["CodigodoProduto"] + "'><h1 ><strong>" + row["NomedoProduto"] + "</strong></h1><span class='ui-li-count ui-btn-active'>" + formatCurrency(row["Preco"]) + "</span></a></li>";
                            htmlData = htmlData + "<li class='lp'><a class='ui-btn ui-icon-plus ui-btn-icon-left' cp='" + row["CodigodeBarra"] + "'><h1 cp='" + row["CodigodeBarra"] + "'>" + row["NomedoProduto"] + "</h1><span cp='" + row["CodigodeBarra"] + "' class='ui-li-count ui-btn-active'>" + formatCurrency(row["Preco"]) + "</span></a></li>";

                       }
                       //alert("fim");
                       $("#productList").html(htmlData);
                       //alert("fim1");
                       $(".lp").width($(window).width());
                       
                       $("#productList").listview('refresh');
                       
                       $('#productList a').on("vclick", function (e) {
                            
                            //alert("click");
                           
                                var target = $( e.target );
                                //alert(e.target.nodeName );
                                var svclick = target.attr("cp");
                                //if (typeof svclick === "undefined") {
                                    //alert("something is undefined");
                                   //svclick = target.parent().attr("cp");
                                //}
                                //alert(svclick);
                               app.pedido.ItemSelectByClick("cb",svclick);
                               //alert("sim");
                            //e.preventDefault();
                            //e.stopPropagation();
                                
                            //alert($(e.target).attr("goto"));
                        });
                                           //alert("fim2");
                       //$.mobile.changePage($("#index"), { transition: "slide" });
                       //$.mobile.hidePageLoadingMsg();
                       //alert("fim");
                   }
               },
               function (tx, error) {
                   alert("Não Encontrado");
               }
            );

        });
        
    };


        
    this.adCamera = function (codebar) {
        try {
                
             
			window.plugins.barcodeScanner.scan(
                function (result) {
                    if (!result.cancelled) {
                        
                        self.ItemSelectByClick("cb",result.text);
                        //self.adicionarProdLista(result.text);
                    }
                },
                function (error) {
                    navigator.notification.alert("O Scaneamento falhou: " + error, function () { }, "Operação Cancelada", 'OK');
                    console.log("Scanning failed: " + error);
                });

        }
        catch (err)  {
          navigator.notification.alert("O Scaneamento falhou: " + err.message, function () { }, "Operação Cancelada", 'OK');
        }
    };
    
    
    this.adicionarProdLista = function (codprod) {
        this.adicionarProduct('cp', codprod);
        $.mobile.changePage("#page-pedido-itens", {
            transition: $.mobile.defaultPageTransition,
            reverse: true,
        });//slideup
        return;
    };

    this.adicionarProduct = function (tipo,valor) {
        var filtro = valor;
        var tp_filtro = tipo;//'cb' = código de barra ou 'cp' = código do produto
        
        //alert("code= " + cb);
        app.db.transaction(function (tx) {
            var sql ="";
            if (tp_filtro=="cb")
                sql = "SELECT CodigodoProduto, NomedoProduto,CodigodeBarra,Preco FROM Products,ProductsOtherCode WHERE Products.CodigodoProduto  = ProductsOtherCode.CodigoProduto AND ProductsOtherCode.CodigoBarra = '" + $.trim(filtro) + "'";
            else
                 sql = "SELECT CodigodoProduto, NomedoProduto,CodigodeBarra,Preco FROM Products WHERE CodigodoProduto = '" + $.trim(filtro) + "'";
            
            //alert(sql);
            tx.executeSql(sql, [],
               function (tx, result) {
                   //console.log(result.rows);
                   if (result.rows.length > 0) {
                       //alert("Encontrado");
                       //console.log(result.rows.length);
                       console.log(result.rows.item(0)["CodigodoProduto"] + " encontrou " + result.rows.item(0)["NomedoProduto"]);
                       //navigator.notification.vibrate(30);
                       //navigator.notification.beep(1);
                       var item = new PedidoItem();
                       item.CodigoDoProduto(result.rows.item(0)["CodigodoProduto"]);
                       item.NomeDoProduto(result.rows.item(0)["NomedoProduto"]);
                       item.CodigoDeBarra(result.rows.item(0)["CodigodeBarra"]);
                       item.Preco(result.rows.item(0)["Preco"]);
                       item.Qtde(1);

                       //self.PedidoItens.push(item);
                       self.PedidoItens.unshift(item);
                       self.UltimoProduto(item);
                       self.
                       self.InputCodebar("");
                   }
                   else {
                       self.InputCodebar("");
                       alert("Código '" + valor + "' não Encontrado");
                   }
               },
               function (tx, error) {
                   alert("Não Encontrado");
               }
            );

        });

    };

    this.adicionarItemCodBarra = function () {
        this.ItemSelectByClick('cb',self.InputCodebar());
        return;
        this.adicionarProduct('cb',self.InputCodebar());
    };


    this.onEditarItemQtde = function () {
        
        
        self.UltimoProduto(self.ItemSelecionado());
        self.ShowCategories(eNavegacao.PrimeiraPagina);
        app.teclado.ShowPage('3');
    };

    this.onEditarItem = function (item) {
        self.ItemSelecionado(item);

        //$( "#popupMenu").popup( "open" );
        //return;
        //$("#tabPedidoItem").trigger("click");
        //$("#tabs").tabs("select" , "#one");
        
       
       // $('.sigPad').signaturePad({ drawOnly: true, lineWidth: 0 }).regenerate(self.ItemSelecionado().signature);
        
        
        $.mobile.changePage("#page-edit-pedido-item",{
        transition: $.mobile.defaultPageTransition,
        reverse: false,
        });//flip
        //$("#page-edit-pedido-item").trigger('create');
            
    };
    this.onExcluirItem = function () {

       // alert('oi');
        //alert(self.PedidoItens().length );
        self.PedidoItens.remove(self.ItemSelecionado());
        //alert(self.PedidoItens().length);

        self.ItemSelecionado(new PedidoItem());
        
        
        $.mobile.changePage("#page-pedido-itens", {
            transition:$.mobile.defaultPageTransition,
            reverse: true,
        });//flip
    };

    this.onExcluirItemObs = function (item) {

        //alert('oi');
        //alert(self.ItemSelecionado().Descriptions.length );
        self.ItemSelecionado().Descriptions.remove(item)
        //alert(self.ItemSelecionado().Descriptions.length);


        $.mobile.changePage("#page-edit-pedido-item", {
            transition:$.mobile.defaultPageTransition,
            reverse: true,
        });//flip
    };

    this.onSalvarAnotacaoItem = function () {

        var api = $('.sigPad').signaturePad();
        var sig = api.getSignature();

        self.ItemSelecionado().signature = sig;
        
        //alert('ok');
        //alert(JSON.stringify(sig, null, "\t"));
        $.mobile.changePage("#page-edit-pedido-item", {
            transition: $.mobile.defaultPageTransition,
            reverse: true,
        });//flip
    };

    this.onLimparAnotacaoItem = function () {

        alert("W=" + $("#pad").width());
        alert("H=" + $("#pad").height());
        alert($("#pad").attr("style"));

        $("#pad").width("270px");
        alert($("#pad").attr("style"));

        var api = $('.sigPad').signaturePad();
        api.clearCanvas();
        //$.mobile.changePage("#page-edit-pedido-item", {
        //    transition: "flip",
        //    reverse: false,
        //});
    };

    this.onEnviar = function () {
       
        if (self.PedidoItens().length == 0) {
            navigator.notification.alert("É necessário informar pelo menos 1 item!", function () { }, "Operação Cancelada", 'OK');
            return;
        }
        
        if (app.setting.isDemo()=="Sim"){
            alert("Você esta utilizando o MODO DEMOSTRAÇÃO!\n\nNenhum dado será gravado!");

            $.mobile.changePage("#page-pedido");
            
        }
        else{
            var sUrl = "";
            
            sUrl = "http://localhost:26633/AutoMagazineWCF.svc/SalvarPedido/1";
            sUrl = "http://" +  app.setting.ServerHost() + "/MObilePDV/AutoMagazineWCF.svc/SalvarPedido/1";
            //Preparar Data para envio
            
            var vData = {};
            
            vData.IdAreaVenda = app.setting.IdAreaVenda();
            vData.IdUser = app.login.userid();
            vData.TipoNumeracao = 'M';
            vData.PedidoId = self.PedidoId();
            vData.NumPedido = self.NumPedido();
            vData.PedidoItens = [];

            
            for (var i = 0 ; i < self.PedidoItens().length; i++){
                
                var pItem =self.PedidoItens()[i];
                var item = {};

                item.CodigoDoProduto = pItem.CodigoDoProduto();
                item.IdProducao = pItem.IdProducao();
                item.Qtde = pItem.Qtde();
                item.Preco = pItem.Preco();
                item.signature =JSON.stringify(pItem.signature);
                item.Descriptions= [];
                
                for (var j = 0 ; j < pItem.Descriptions().length; j++){
                    var pItemDesc = pItem.Descriptions()[j];
                    var itemdesc = {};
                    itemdesc.IdObservacao = pItemDesc.IdObservacao();
                    itemdesc.ObservacaoName = pItemDesc.ObservacaoName();
                    item.Descriptions.push(itemdesc);
                }
                 
                vData.PedidoItens.push(item);
            }
            
            
            //alert (JSON.stringify(vData));
            var sData= JSON.stringify(vData);
            window.localStorage.setItem('SalvarPedidoSend', sData);
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
                        window.localStorage.setItem('SalvarPedido', JSON.stringify(data));
                        
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

    this.onCancel = function (buttonIndex) {

        if (confirm('Você confirma o desistência do pedido?') == true)
          {
            self.clearForm();
            $.mobile.changePage("#page-pedido");
          }
        return;

    };

  
    this.clearForm = function () {

     
        this.PedidoItens([]);
        this.UltimoProduto(new PedidoItem());
        this.ItemSelecionado(new PedidoItem());
        this.InputCodebar("");
    };

    this.checkEnter = function (e) {
        var that = this;

        if (e.keyCode == 13) {
            $(e.target).blur();
            that.onEnviar();
        }
    };

 
}


