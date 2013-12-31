/*globals ko*/


var deactivator = function(event){ 
    //alert('click');
    event.preventDefault();e.stopPropagation(); return false;
};



function initSync() {

    console.log("SYNC - Device READY");
    app.sync = new SyncViewModel();
    
    ko.applyBindings(app.sync, document.getElementById("page-sync"));

    $(document).delegate('#page-sync', 'pageshow', function () {
        var pg = $("#page-sync");
        var the_height_content = ($(window).height() - pg.find('[data-role="header"]').height() - pg.find('[data-role="footer"]').height());

        the_height_content = the_height_content - 5;


        pg.find('[data-role="content"]').height(the_height_content);
        app.sync.ShowQtde();
    });
   
    //$('#page-sync :radio, :checkbox').click(deactivator);
    $("#page-sync :checkbox").on("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    
   $("#page-sync :checkbox").on("click", deactivator);
   
/*   $("#page-sync :label").on("click", function(event){ 
       alert("deactivatorLabel");
       event.preventDefault();
       event.stopPropagation(); 
       return false;
    });*/

    
    
  
}

$(document).on("deviceready", initSync);

function SyncViewModel() {
    /// <summary>
    /// A view model that represents a single tweet
    /// </summary>

    var self = this;
    
    // --- properties

    self.IsShowPage = false;
    this.template = "SyncView";
    this.isRunningSync = ko.observable(false);
    
    this.CategoriesChecked = ko.observable(false);
    this.CategoriesItensChecked = ko.observable(false);
    this.CategoriesItensArticlesChecked = ko.observable(false);
    this.CategoriesItensDescriptionChecked = ko.observable(false);
    this.ProductsChecked = ko.observable(false);
    this.ProductsOtherCodeChecked = ko.observable(false);
    this.PreparationCenterChecked = ko.observable(false);
    this.ServicesChecked = ko.observable(false);
    this.ServicesCouvertChecked = ko.observable(false);
    
    this.CategoriesQtde = ko.observable(0);
    this.CategoriesItensQtde = ko.observable(0);
    this.CategoriesItensArticlesQtde = ko.observable(0);
    this.CategoriesItensDescriptionQtde = ko.observable(0);
    this.ProductsQtde = ko.observable(0);
    this.ProductsOtherCodeQtde = ko.observable(0);
    this.PreparationCenterQtde = ko.observable(0);
    this.ServicesQtde = ko.observable(0);
    this.ServicesCouvertQtde = ko.observable(0);
    

    
    // --- public functions

    this.init = function (login) {
        this.isRunningSync(login.isRunningSync);
    };

    this.ShowQtde = function () {
        app.db.transaction(function (tx) {
            tx.executeSql("SELECT COUNT(*) as c FROM Categories", [],
               function (tx, result) {
                   self.CategoriesQtde(result.rows.item(0)["c"]);
               },
               function (tx, error) {
                   // error occured
                   //alert("error");
               }
            );
            tx.executeSql("SELECT COUNT(*) as c FROM CategoriesItens", [],
               function (tx, result) {
                   self.CategoriesItensQtde(result.rows.item(0)["c"]);
               },
               function (tx, error) {
                   // error occured
                   //alert("error");
               }
            );            
            tx.executeSql("SELECT COUNT(*) as c FROM CategoriesItensArticles", [],
               function (tx, result) {
                   self.CategoriesItensArticlesQtde(result.rows.item(0)["c"]);
               },
               function (tx, error) {
                   // error occured
                   //alert("error");
               }
            );            
            tx.executeSql("SELECT COUNT(*) as c FROM CategoriesItensDescription", [],
               function (tx, result) {
                   self.CategoriesItensDescriptionQtde(result.rows.item(0)["c"]);
               },
               function (tx, error) {
                   // error occured
                   //alert("error");
               }
            );            

            tx.executeSql("SELECT COUNT(*) as c FROM Products", [],
               function (tx, result) {
                   self.ProductsQtde(result.rows.item(0)["c"]);
               },
               function (tx, error) {
                   // error occured
                   //alert("error");
               }
            );            

            tx.executeSql("SELECT COUNT(*) as c FROM ProductsOtherCode", [],
               function (tx, result) {
                   self.ProductsOtherCodeQtde(result.rows.item(0)["c"]);
               },
               function (tx, error) {
                   // error occured
                   //alert("error");
               }
            );    
            
            tx.executeSql("SELECT COUNT(*) as c FROM PreparationCenter", [],
               function (tx, result) {
                   self.PreparationCenterQtde(result.rows.item(0)["c"]);
               },
               function (tx, error) {
                   // error occured
                   //alert("error");
               }
            );            

            tx.executeSql("SELECT COUNT(*) as c FROM Services", [],
               function (tx, result) {
                   self.ServicesQtde(result.rows.item(0)["c"]);
               },
               function (tx, error) {
                   // error occured
                   //alert("error");
               }
            );            

            tx.executeSql("SELECT COUNT(*) as c FROM ServicesCouvert", [],
               function (tx, result) {
                   self.ServicesCouvertQtde(result.rows.item(0)["c"]);
               },
               function (tx, error) {
                   // error occured
                   //alert("error");
               }
            );            


        });
            
    };

    
    this.ShowPage = function () {
        
         $.mobile.changePage("#page-sync", {
                                transition: $.mobile.defaultPageTransition,
                                reverse: false,
                            });
        self.syncdatabase(true);
 
    };
    
    this.syncdatabase = function (pIsShowPage) {
        
        self.IsShowPage = pIsShowPage;
        
        this.isRunningSync(true);
        
        self.CategoriesChecked(false);
        self.CategoriesChecked(false);
        self.CategoriesItensChecked(false);
        self.CategoriesItensArticlesChecked(false);
        self.CategoriesItensDescriptionChecked(false);
        self.ProductsChecked(false);
        self.ProductsOtherCodeChecked(false);
        self.PreparationCenterChecked(false);
        self.ServicesChecked(false);
        self.ServicesCouvertChecked(false);
        
        //$("#tab_categ").attr("checked",false).checkboxradio("refresh");
        $("#tab_categ_artigos").attr("checked",false).checkboxradio("refresh");
        $("#tab_categ_prod").attr("checked",false).checkboxradio("refresh");
        $("#tab_categ_desc").attr("checked",false).checkboxradio("refresh");
        $("#tab_prod").attr("checked",false).checkboxradio("refresh");
        $("#tab_codebar").attr("checked",false).checkboxradio("refresh");
        $("#tab_area_prod").attr("checked",false).checkboxradio("refresh");
        $("#tab_area_serv").attr("checked",false).checkboxradio("refresh");
        $("#tab_couvert").attr("checked",false).checkboxradio("refresh");
    
        this.SyncCategories();

    };
    
    this.SyncCategories = function () {
    var bResult = false;
    
    //alert("CREATE Categories");
 
    //CATEGORIAS
    app.db.transaction(function (tx) {
        
            //alert("CREATE Categories2");
        
            self.CategoriesQtde(0);
            self.CategoriesItensQtde(0);
            self.CategoriesItensArticlesQtde(0);        
            
            tx.executeSql('DROP TABLE IF EXISTS Categories');
            tx.executeSql("CREATE TABLE IF NOT EXISTS Categories (idcategoria INTEGER PRIMARY KEY ASC, idareavenda INTEGER, dscategoria TEXT, desc_pocket TEXT, ordenacao INTEGER)", [],
            function (tx, result) {
                console.log("create Categories");
            },
            function (tx, error) {
                console.log("error create Categories - Code: " + error.code + " - " + error.message);
                }
            );
        
            tx.executeSql("CREATE INDEX Categories_IDX1 ON Categories (idareavenda) ", [],
            function (tx, result) {
              console.log("create Categories INDEX");  
            },
            function (tx, error) {
                console.log("error create Categories INDEX - Code: " + error.code + " - " + error.message);
                }
            );

            tx.executeSql('DROP TABLE IF EXISTS CategoriesItens');
            tx.executeSql("CREATE TABLE IF NOT EXISTS CategoriesItens (id INTEGER PRIMARY KEY AUTOINCREMENT, idcategoria INTEGER, dscategoria TEXT,TipoItem INTEGER, IdItem TEXT, descricao TEXT , desc_pocket TEXT, desc_producao TEXT , desc_pdv TEXT , imagem TEXT, preco REAL, idproducao INTEGER, ordenacao INTEGER ) ", [],
            function (tx, result) {
              console.log("create CategoriesItens");  
            },
            function (tx, error) {
                console.log("error create CategoriesItens - Code: " + error.code + " - " + error.message);
                }
            );

            tx.executeSql("CREATE INDEX CategoriesItens_IDX1 ON CategoriesItens (idcategoria) ", [],
            function (tx, result) {
              console.log("create CategoriesItens INDEX");  
            },
            function (tx, error) {
                console.log("error create CategoriesItens INDEX - Code: " + error.code + " - " + error.message);
                }
            );
            
        
            tx.executeSql('DROP TABLE IF EXISTS CategoriesItensArticles');
            tx.executeSql("CREATE TABLE IF NOT EXISTS CategoriesItensArticles (id INTEGER PRIMARY KEY AUTOINCREMENT, IdArtigo TEXT, IdQuestao INTEGER, dsQuestao TEXT, obrigatoria INTEGER, QtdeMaxima INTEGER, IdItem TEXT,TipoItem INTEGER, descricao TEXT , desc_pocket TEXT, desc_producao TEXT , desc_pdv TEXT , imagem TEXT, preco REAL, idproducao INTEGER) ", [] ,
            function (tx, result) {
                console.log("create CategoriesItensArticles");
            },
            function (tx, error) {
                console.log("error create CategoriesItensArticles - Code: " + error.code + " - " + error.message);
                }
            );

            tx.executeSql("CREATE INDEX CategoriesItensArticles_IDX1 ON CategoriesItensArticles (IdItem) ", [],
            function (tx, result) {
              console.log("create CategoriesItensArticles INDEX");  
            },
            function (tx, error) {
                console.log("error create CategoriesItensArticles INDEX - Code: " + error.code + " - " + error.message);
                }
            );
        
            tx.executeSql("CREATE INDEX CategoriesItensArticles_IDX2 ON CategoriesItensArticles (IdArtigo) ", [],
            function (tx, result) {
              console.log("create CategoriesItensArticles INDEX 2");  
            },
            function (tx, error) {
                console.log("error create CategoriesItensArticles INDEX 2 - Code: " + error.code + " - " + error.message);
                }
            );

            tx.executeSql('DROP TABLE IF EXISTS CategoriesItensDescription');
            tx.executeSql("CREATE TABLE IF NOT EXISTS CategoriesItensDescription (id INTEGER PRIMARY KEY AUTOINCREMENT, iditem TEXT, ObsObrigatoria INTEGER, ObsQtdeMaxima INTEGER, idobservacao INTEGER, dsobservacao TEXT, desc_pocket TEXT, desc_producao TEXT , desc_pdv TEXT , idproducao INTEGER)", [],
            function (tx, result) {
                console.log("create CategoriesItensDescription");
            },
            function (tx, error) {
                console.log("error create CategoriesItensDescription - Code: " + error.code + " - " + error.message);
                }
            );

            tx.executeSql("CREATE INDEX CategoriesItensDescription_IDX1 ON CategoriesItensDescription (IdItem) ", [],
            function (tx, result) {
              console.log("create CategoriesItensDescription INDEX");  
            },
            function (tx, error) {
                console.log("error create CategoriesItensDescription INDEX - Code: " + error.code + " - " + error.message);
                }
            );
        
            tx.executeSql('DROP TABLE IF EXISTS Products');
            tx.executeSql("CREATE TABLE IF NOT EXISTS Products (CodigodoProduto TEXT PRIMARY KEY ASC, Edicao TEXT, CodigodeBarra TEXT, NomedoProduto TEXT, TituloResumido TEXT, QuantidadedeDecimais INTEGER, ID_IMPOSTO INTEGER, ID_UNIDADE_DE_MEDIDA INTEGER , Preco REAL ,ID_LISTA_PRECO INTEGER, idproducao INTEGER, IdProducaoFinal INTEGER, QtdeObs INTEGER)", [],
            function (tx, result) {
                console.log("create Products");
            },
            function (tx, error) {
                console.log("error create Products - Code: " + error.code + " - " + error.message);
                }
            );
        


            tx.executeSql('DROP TABLE IF EXISTS ProductsOtherCode');
            tx.executeSql("CREATE TABLE IF NOT EXISTS ProductsOtherCode (CodigoBarra TEXT PRIMARY KEY ASC, CodigoProduto TEXT)", [],
            function (tx, result) {
                console.log("create ProductsOtherCode");
            },
            function (tx, error) {
                console.log("error create ProductsOtherCode - Code: " + error.code + " - " + error.message);
                }
            );
        
            tx.executeSql("CREATE INDEX ProductsOtherCode_IDX1 ON ProductsOtherCode (CodigoProduto) ", [],
            function (tx, result) {
              console.log("create ProductsOtherCode INDEX");  
            },
            function (tx, error) {
                console.log("error create ProductsOtherCode INDEX - Code: " + error.code + " - " + error.message);
                }
            );

            tx.executeSql('DROP TABLE IF EXISTS PreparationCenter');
            tx.executeSql("CREATE TABLE IF NOT EXISTS PreparationCenter (idproducao INTEGER PRIMARY KEY ASC, dsproducao TEXT, impressora TEXT, tipo_impressora INTEGER, modelo TEXT, nmcomputador TEXT, numlinha INTEGER, Ativo INTEGER , fgImprimeCliente INTEGER ,fgImprimeNumOrc INTEGER, fgImprimePedido INTEGER, fgImprimeItensAgrupados INTEGER)", [],
            function (tx, result) {
                console.log("create PreparationCenter");
            },
            function (tx, error) {
                console.log("error create PreparationCenter - Code: " + error.code + " - " + error.message);
                }
            );

            tx.executeSql('DROP TABLE IF EXISTS Services');
            tx.executeSql("CREATE TABLE IF NOT EXISTS Services (idareavenda INTEGER PRIMARY KEY ASC, dsareavenda TEXT, fgInformarPessoas INTEGER, MinNumMesa INTEGER, MaxNumMesa INTEGER, IdProducaoConta INTEGER, TxServico REAL, fgTrabProducao INTEGER )", [],
            function (tx, result) {
                console.log("create Services");
            },
            function (tx, error) {
                console.log("error create Services - Code: " + error.code + " - " + error.message);
                }
            );

            tx.executeSql('DROP TABLE IF EXISTS ServicesCouvert');
            tx.executeSql("CREATE TABLE IF NOT EXISTS ServicesCouvert (id INTEGER PRIMARY KEY ASC, CodigodoProduto TEXT, idareavenda INTEGER, QtdeCouvert REAL, TipoCouvert INTEGER )", [],
            function (tx, result) {
                console.log("create ServicesCouvert");
            },
            function (tx, error) {
                console.log("error create ServicesCouvert - Code: " + error.code + " - " + error.message);
                }
            );

            tx.executeSql('DROP TABLE IF EXISTS ServicesProducts');
            tx.executeSql("CREATE TABLE IF NOT EXISTS ServicesProducts (id INTEGER PRIMARY KEY ASC, CodigodoProduto TEXT, idareavenda INTEGER, idproducao INTEGER )", [],
            function (tx, result) {
                console.log("create ServicesProducts");
            },
            function (tx, error) {
                console.log("error create ServicesProducts - Code: " + error.code + " - " + error.message);
                }
            );
        
        }
        ,this.SyncCreateError,this.SyncCreateSucess
        
       
        );
    

    
    return bResult;
    }
    this.SyncCreateSucess2 = function () {
    
          alert("DONE");  
        $.mobile.changePage("#page-login", {
                                transition: $.mobile.defaultPageTransition,
                                reverse: false,
                            });
    };
    
    this.SyncCreateSucess = function () {
            //alert("Sucess");
            var sUrl = "";
            
            if (app.setting.isDemo()=="Não"){
                sUrl = "http://" +  app.setting.ServerHost() + "/MObilePDV/AutoMagazineWCF.svc/json2/";
            }
            else{
                sUrl = "data/demodata.json";
            }
        
            $.ajax({
                    type: "GET",
                    url: sUrl,
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: true,
                    crossDomain: true,
                    beforeSend : function() {
                        // $.mobile.showPageLoadingMsg();
                        $.mobile.loading('show');
                    },
                    complete   : function() {
                        $.mobile.loading('hide');
                        //$.mobile.hidePageLoadingMsg();
                    },
                    success: function (data) {
                        //alert(data.JSONData2Result);
                        var parsed = $.parseJSON(data.JSONData2Result);
                        
                        //alert("inicio");
                        // Put the object into storage
                        window.localStorage.setItem('JSONData2Result', JSON.stringify(parsed));
                        //alert("FIM");
                        
                        var pos = 0;
                        
                        
                        var totalCategories = parsed.Categories.length; 
                        console.log(totalCategories + " Categories");
                        
                        $('#progress-bar').val(0);
                        $('#progress-bar').slider('refresh');
                        
                            
                        app.db.transaction(function (tx) {
                            
                            $.each(parsed.Categories, function (i, jsondata) {
                                //INSERIR REGISTRO    
                                //alert("EXEC " +  jsondata.dscategoria);
                                tx.executeSql("INSERT INTO Categories(idcategoria, idareavenda  , dscategoria , desc_pocket , ordenacao) VALUES (?,?,?,?,?)",
                                              [jsondata.idcategoria, jsondata.idareavenda , jsondata.dscategoria, jsondata.desc_pocket,jsondata.ordenacao],
                                              function (tx, result) {
                                                  // do the html stuff to push this value to div
                                                  //console.log("insert Categories '" + jsondata.dscategoria + "'");

                                                  var pos = Math.floor((i /  + (totalCategories-1))*100);
                                                  if (pos !=$('#progress-bar').val()){
                                                      //console.log(pos + "%");    
                                                      $('#progress-bar').val(pos );
                                                      $('#progress-bar').slider('refresh');
                                                  }

                                                  if (i ==totalCategories-1){
                                                      self.CategoriesQtde(totalCategories);
                                                      $("#tab_categ").attr("checked",true).checkboxradio("refresh");
                                                      self.CategoriesChecked(true);
                                                      $("#page-sync").trigger("create");
                                                  }
                                              },
                                               function (tx, error) {
                                                   // error occured
                                                   alert("error insert Categories" + error.message);
                                                   console.log("error insert Categories" + error.message);
                                               }
                               );

                            });
                            
                            if (totalCategoriesItens==0)
                            {
                                    $("#tab_categ").attr("checked",true).checkboxradio("refresh");
                                    self.CategoriesChecked(true);
                                    $("#page-sync").trigger("create");
                            }

                            var totalCategoriesItens = parsed.CategoriesItens.length;
                            
                            console.log(totalCategoriesItens + " CategoriesItens");
                            $('#progress-bar').val(0);
                            $('#progress-bar').slider('refresh');
                            
                            $.each(parsed.CategoriesItens, function (i, jsondata) {
                                //INSERIR REGISTRO    
                                //alert("EXEC " +  jsondata.descricao);
                                tx.executeSql("INSERT INTO CategoriesItens (idcategoria , dscategoria ,TipoItem , IdItem , descricao , desc_pocket , desc_producao , desc_pdv , imagem , preco , idproducao , ordenacao ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                                              [jsondata.idcategoria, jsondata.dscategoria , jsondata.TipoItem, jsondata.IdItem,jsondata.descricao,jsondata.desc_pocket,jsondata.desc_producao,jsondata.desc_pdv,jsondata.imagem,jsondata.preco,jsondata.idproducao,jsondata.ordenacao],
                                              function (tx, result) {
                                                  // do the html stuff to push this value to div
                                                  //console.log("insert CategoriesItens  " + i + " / " + (qtdeCategoriesItens-1) + " '" + jsondata.descricao + "'");
                                                  var pos = Math.floor((i /  + (totalCategoriesItens-1))*100);
                                                  if (pos !=$('#progress-bar').val()){
                                                      //console.log(pos + "%");    
                                                      $('#progress-bar').val(pos );
                                                      $('#progress-bar').slider('refresh');
                                                      //alert("oi");
                                                      //$("#page-sync").trigger("create");
                                                      //alert("oi2");
                                                  }

                                                  if (i ==totalCategoriesItens-1){
                                                     self.CategoriesItensQtde(totalCategoriesItens);
                                                        
                                                     $("#tab_categ_prod").attr("checked",true).checkboxradio("refresh");
                                                     self.CategoriesItensChecked(true);
                                                     $("#page-sync").trigger("create");
                                                  }

                                              },
                                               function (tx, error) {
                                                   // error occured
                                                   console.log("error insert CategoriesItens" + error);
                                               }
                               );

                            });
                            
                            if (totalCategoriesItens==0)
                            {
                                self.CategoriesItensQtde(totalCategoriesItens);
                                self.CategoriesItensChecked(true);
                                 $("#tab_categ_prod").attr("checked",true).checkboxradio("refresh");
                                 $("#page-sync").trigger("create");
                            }
                            
                            
                        
                            var totalCategoriesItensArticles = parsed.CategoriesItensArticles.length;
                            $('#progress-bar').val(0);
                            $('#progress-bar').slider('refresh');
                        
                            console.log(totalCategoriesItensArticles + " CategoriesItensArticles");
                        
                            $.each(parsed.CategoriesItensArticles, function (i, jsondata) {
               
                                //alert("EXEC " +  jsondata.descricao);
                                tx.executeSql("INSERT INTO CategoriesItensArticles ( IdArtigo , IdQuestao , dsQuestao , obrigatoria , QtdeMaxima , IdItem ,TipoItem , descricao , desc_pocket , desc_producao , desc_pdv , imagem , preco , idproducao ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                                              [jsondata.IdArtigo, jsondata.IdQuestao , jsondata.dsQuestao, jsondata.obrigatoria,jsondata.QtdeMaxima,jsondata.IdItem,jsondata.TipoItem,jsondata.descricao,jsondata.desc_pocket,jsondata.desc_producao,jsondata.desc_pdv,jsondata.imagem,jsondata.preco,jsondata.idproducao],
                                              function (tx, result) {
                                                  // do the html stuff to push this value to div
                                                  //console.log("insert CategoriesItensArticles " + i + " / " + (qtdeCategoriesItensArticles-1) + " '" + jsondata.descricao + "'");
                                                  
                                                  
                                                  pos = Math.floor((i /  + (totalCategoriesItensArticles-1))*100);
                                                  //if (pos !=$('#progress-bar').val()){
                                                      //console.log(pos + "%");    
                                                      $('#progress-bar').val(pos);
                                                      $('#progress-bar').slider('refresh');
                                                      //$("#page-sync").trigger("create");
                                                  //}

                                                  if (i ==totalCategoriesItensArticles-1){
                                                      self.CategoriesItensArticlesQtde(totalCategoriesItensArticles);
                                                      $("#tab_categ_artigos").attr("checked",true).checkboxradio("refresh");
                                                      self.CategoriesItensArticlesChecked(true);
                                                      $("#page-sync").trigger("create");
                                                    }
                                              },
                                               function (tx, error) {
                                                   // error occured
                                                   console.log("error insert CategoriesItens" + error);
                                               }
                               );

                            });
                            
                            if (totalCategoriesItensArticles==0)
                            {
                                self.CategoriesItensArticlesQtde(totalCategoriesItensArticles);
                                $("#tab_categ_artigos").attr("checked",true).checkboxradio("refresh");
                                self.CategoriesItensArticlesChecked(true);
                                $("#page-sync").trigger("create");

                            }
                            var totalCategoriesItensDescription = parsed.CategoriesItensDescription.length;
                            $('#progress-bar').val(0);
                            $('#progress-bar').slider('refresh');
                            
                            console.log(totalCategoriesItensDescription + " CategoriesItensDescription");
                        
                        
                            
                            $.each(parsed.CategoriesItensDescription, function (i, jsondata) {
                            //INSERIR REGISTRO    

                            //alert("EXEC " +  jsondata.descricao);
                                tx.executeSql("INSERT INTO CategoriesItensDescription (iditem , ObsObrigatoria , ObsQtdeMaxima , idobservacao , dsobservacao , desc_pocket , desc_producao , desc_pdv , idproducao ) VALUES (?,?,?,?,?,?,?,?,?)",
                                              [jsondata.iditem, jsondata.ObsObrigatoria , jsondata.ObsQtdeMaxima, jsondata.idobservacao,jsondata.dsobservacao,jsondata.desc_pocket,jsondata.desc_producao,jsondata.desc_pdv,jsondata.idproducao],
                                              function (tx, result) {
                                                  // do the html stuff to push this value to div
                                                  //console.log("insert CategoriesItensDescription " + i + " / " + (qtdeCategoriesItensArticles-1) + " '" + jsondata.dsobservacao + "'");
                                                  
                                                  
                                                  pos = Math.floor((i /  + (totalCategoriesItensDescription-1))*100);
                                                  //if (pos !=$('#progress-bar').val()){
                                                      //console.log(pos + "%");    
                                                      $('#progress-bar').val(pos);
                                                      $('#progress-bar').slider('refresh');
                                                      //$("#page-sync").trigger("create");
                                                  //}

                                                  if (i ==totalCategoriesItensDescription-1){
                                                      self.CategoriesItensDescriptionQtde(totalCategoriesItensDescription);
                                                      $("#tab_categ_desc").attr("checked",true).checkboxradio("refresh");
                                                      self.CategoriesItensDescriptionChecked(true);
                                                      $("#page-sync").trigger("create");

                                                  }
                                              },
                                               function (tx, error) {
                                                   // error occured
                                                   console.log("error insert CategoriesItensDescription" + error);
                                               }
                               );

                            });
                            
                            
                            if (totalCategoriesItensDescription==0)
                            {
                                self.CategoriesItensDescriptionQtde(totalCategoriesItensDescription);
                                $("#tab_categ_desc").attr("checked",true).checkboxradio("refresh");
                                  self.CategoriesItensDescriptionChecked(true);
                                ("#divsync").trigger("create");      
                            }
                        
                        

                            var totalProducts = parsed.Products.length;
                            $('#progress-bar').val(0);
                            $('#progress-bar').slider('refresh');
                            
                            console.log(totalProducts + " Products");
                        
                        
                            $.each(parsed.Products, function (i, jsondata) {
                                //INSERIR REGISTRO    
                                //alert("EXEC " +  jsondata.descricao);
                                tx.executeSql("INSERT INTO Products (CodigodoProduto , Edicao , CodigodeBarra , NomedoProduto , TituloResumido , QuantidadedeDecimais , ID_IMPOSTO , ID_UNIDADE_DE_MEDIDA , Preco ,ID_LISTA_PRECO , idproducao , IdProducaoFinal , QtdeObs ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                                              [jsondata.CodigodoProduto, jsondata.Edicao , jsondata.CodigodeBarra, jsondata.NomedoProduto,jsondata.TituloResumido,jsondata.QuantidadedeDecimais,jsondata.ID_IMPOSTO,jsondata.ID_UNIDADE_DE_MEDIDA,jsondata.Preco,jsondata.ID_LISTA_PRECO,jsondata.idproducao,jsondata.IdProducaoFinal,jsondata.QtdeObs],
                                              function (tx, result) {
                                                  // do the html stuff to push this value to div
                                                  //console.log("insert Products " + i + " / " + (qtdeCategoriesItensArticles-1) + " '" + jsondata.dsobservacao + "'");
                                                  
                                                  
                                                  pos = Math.floor((i /  + (totalProducts-1))*100);
                                                  //if (pos !=$('#progress-bar').val()){
                                                      //console.log(pos + "%");    
                                                      $('#progress-bar').val(pos);
                                                      $('#progress-bar').slider('refresh');
                                                      //$("#page-sync").trigger("create");
                                                  //}

                                                  if (i ==totalProducts-1){
                                                      self.ProductsQtde(totalProducts);
                                                      $("#tab_prod").attr("checked",true).checkboxradio("refresh");
                                                    self.ProductsChecked(true);
                                                    $("#page-sync").trigger("create");
                                                      
                                                  }
                                              },
                                               function (tx, error) {
                                                   // error occured
                                                   console.log("error insert Products" + error);
                                               }
                               );

                            });
                            
                            if (totalProducts==0)
                            {
                                self.ProductsQtde(totalProducts);
                                $("#tab_prod").attr("checked",true).checkboxradio("refresh");
                                self.ProductsChecked(true);
                                $("#page-sync").trigger("create");
                                                       
                            }
                            
                        

                            var totalProductsOtherCode = parsed.ProductsOtherCode.length;
                            $('#progress-bar').val(0);
                            $('#progress-bar').slider('refresh');
                            
                            console.log(totalProductsOtherCode + " ProductsOtherCode");
                        
                        
                            $.each(parsed.ProductsOtherCode, function (i, jsondata) {
                                //INSERIR REGISTRO    
                                //alert("EXEC " +  jsondata.descricao);
                                tx.executeSql("INSERT INTO ProductsOtherCode (CodigoBarra , CodigoProduto ) VALUES (?,?)",
                                              [jsondata.CodigoBarra, jsondata.CodigoProduto ],
                                              function (tx, result) {
                                                  // do the html stuff to push this value to div
                                                  //console.log("insert Products " + i + " / " + (qtdeCategoriesItensArticles-1) + " '" + jsondata.dsobservacao + "'");
                                                  
                                                  
                                                  pos = Math.floor((i /  + (totalProductsOtherCode-1))*100);
                                                  //if (pos !=$('#progress-bar').val()){
                                                      //console.log(pos + "%");    
                                                      $('#progress-bar').val(pos);
                                                      $('#progress-bar').slider('refresh');
                                                  //}

                                                  if (i ==totalProductsOtherCode-1){
                                                      self.ProductsOtherCodeQtde(totalProductsOtherCode);
                                                      $("#tab_codebar").attr("checked",true).checkboxradio("refresh");
                                                    self.ProductsOtherCodeChecked(true);
                                                    $("#page-sync").trigger("create");                                                      
                                                  }
                                              },
                                               function (tx, error) {
                                                   // error occured
                                                   console.log("error insert select * from order_total where order_i" + error);
                                               }
                               );

                            });
                            
                            if (totalProductsOtherCode==0)
                            {    
                                self.ProductsOtherCodeQtde(totalProductsOtherCode);
                                $("#tab_codebar").attr("checked",true).checkboxradio("refresh");
                                self.ProductsOtherCodeChecked(true);
                                $("#page-sync").trigger("create");
                            }
                        
                        
                            var totalPreparationCenter = parsed.PreparationCenter.length;
                            $('#progress-bar').val(0);
                            $('#progress-bar').slider('refresh');
                            
                            console.log(totalPreparationCenter + " PreparationCenter");
                        
                        
                            $.each(parsed.PreparationCenter, function (i, jsondata) {
                                //INSERIR REGISTRO    
                                //alert("EXEC " +  jsondata.descricao);
                                tx.executeSql("INSERT INTO PreparationCenter (idproducao , dsproducao , impressora , tipo_impressora , modelo , nmcomputador , numlinha , Ativo , fgImprimeCliente ,fgImprimeNumOrc , fgImprimePedido , fgImprimeItensAgrupados  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                                              [jsondata.idproducao, jsondata.dsproducao , jsondata.impressora, jsondata.tipo_impressora,jsondata.modelo,jsondata.nmcomputador,jsondata.numlinha,jsondata.Ativo,jsondata.fgImprimeCliente,jsondata.fgImprimeNumOrc,jsondata.fgImprimePedido,jsondata.fgImprimeItensAgrupados],
                                              function (tx, result) {
                                                  // do the html stuff to push this value to div
                                                  //console.log("insert Products " + i + " / " + (qtdeCategoriesItensArticles-1) + " '" + jsondata.dsobservacao + "'");
                                                  
                                                  
                                                  pos = Math.floor((i /  + (totalPreparationCenter-1))*100);
                                                  //if (pos !=$('#progress-bar').val()){
                                                      //console.log(pos + "%");    
                                                      $('#progress-bar').val(pos);
                                                      $('#progress-bar').slider('refresh');
                                                  //}

                                                  if (i ==totalPreparationCenter-1){
                                                      self.PreparationCenterQtde(totalPreparationCenter);
                                                      $("#tab_area_prod").attr("checked",true).checkboxradio("refresh");
                                                    self.PreparationCenterChecked(true);
                                                    $("#page-sync").trigger("create");

                                                  }
                                              },
                                               function (tx, error) {
                                                   // error occured
                                                   console.log("error insert PreparationCenter" + error);
                                               }
                               );

                            });
                            
                            if (totalPreparationCenter==0)
                            {
                                self.PreparationCenterQtde(totalPreparationCenter);
                                $("#tab_area_prod").attr("checked",true).checkboxradio("refresh");
                                self.PreparationCenterChecked(true);
                                $("#page-sync").trigger("create");
                            }

                        
                            var totalServices = parsed.Services.length;
                            $('#progress-bar').val(0);
                            $('#progress-bar').slider('refresh');
                            
                            console.log(totalServices + " Services");
                        
                        
                            $.each(parsed.Services, function (i, jsondata) {
                                //INSERIR REGISTRO    
                                //alert("EXEC " +  jsondata.descricao);
                                tx.executeSql("INSERT INTO Services (idareavenda , dsareavenda , fgInformarPessoas , MinNumMesa , MaxNumMesa , IdProducaoConta , TxServico , fgTrabProducao ) VALUES (?,?,?,?,?,?,?,?)",
                                              [jsondata.idareavenda, jsondata.dsareavenda , jsondata.fgInformarPessoas, jsondata.MinNumMesa,jsondata.MaxNumMesa,jsondata.IdProducaoConta,jsondata.TxServico,jsondata.fgTrabProducao],
                                              function (tx, result) {
                                                  // do the html stuff to push this value to div
                                                  //console.log("insert Products " + i + " / " + (qtdeCategoriesItensArticles-1) + " '" + jsondata.dsobservacao + "'");
                                                  
                                                  
                                                  pos = Math.floor((i /  + (totalServices-1))*100);
                                                  //if (pos !=$('#progress-bar').val()){
                                                      //console.log(pos + "%");    
                                                      $('#progress-bar').val(pos);
                                                      $('#progress-bar').slider('refresh');
                                                  //}

                                                  if (i ==totalServices-1){
                                                      self.ServicesQtde(totalServices);
                                                      $("#tab_area_serv").attr("checked",true).checkboxradio("refresh");
                                                        self.ServicesChecked(true);
                                                        $("#page-sync").trigger("create");

                                                  }
                                              },
                                               function (tx, error) {
                                                   // error occured
                                                   console.log("error insert Services" + error);
                                               }
                               );

                            });
                            
                            if (totalServices==0)
                            {
                                self.ServicesQtde(totalServices);
                                $("#tab_area_serv").attr("checked",true).checkboxradio("refresh");
                                self.ServicesChecked(true);
                                $("#page-sync").trigger("create");
                         
                            }
                        
                        
                            var totalServicesCouvert = parsed.ServicesCouvert.length;
                            $('#progress-bar').val(0);
                            $('#progress-bar').slider('refresh');
                            
                            console.log(totalServicesCouvert + " ServicesCouvert");
                        
                            $.each(parsed.ServicesCouvert, function (i, jsondata) {
                                //INSERIR REGISTRO    
                                //alert("EXEC " +  jsondata.descricao);
                                tx.executeSql("INSERT INTO ServicesCouvert (id , CodigodoProduto , idareavenda , QtdeCouvert , TipoCouvert ) VALUES (?,?,?,?,?)",
                                              [jsondata.id, jsondata.CodigodoProduto , jsondata.idareavenda, jsondata.QtdeCouvert,jsondata.TipoCouvert],
                                              function (tx, result) {
                                                  // do the html stuff to push this value to div
                                                  //console.log("insert Products " + i + " / " + (qtdeCategoriesItensArticles-1) + " '" + jsondata.dsobservacao + "'");
                                                  
                                                  
                                                  pos = Math.floor((i /  + (totalServicesCouvert-1))*100);
                                                  //if (pos !=$('#progress-bar').val()){
                                                      //console.log(pos + "%");    
                                                      $('#progress-bar').val(pos);
                                                      $('#progress-bar').slider('refresh');
                                                  //}

                                                  if (i ==totalServicesCouvert-1){
                                                      self.ServicesCouvertQtde(totalServicesCouvert);
                                                      $("#tab_couvert").attr("checked",true).checkboxradio("refresh");
                                                    self.ServicesCouvertChecked(true);
                                                    $("#page-sync").trigger("create");

                                                  }
                                              },
                                               function (tx, error) {
                                                   // error occured
                                                   console.log("error insert ServicesCouvert" + error);
                                               }
                               );

                            });
                            
                            if (totalServices==0)
                            {    
                                self.ServicesCouvertQtde(totalServicesCouvert);
                                $("#tab_couvert").attr("checked",true).checkboxradio("refresh");
                                self.ServicesCouvertChecked(true);
                                $("#page-sync").trigger("create");
                            }
                           
                            
                            tx.executeSql("select * from Settings where id = 0",
                                  [],
                                  function (tx, result) {
                                        //alert("DONE");  
                                        if ( self.IsShowPage==true){
                                            $.mobile.changePage("#page-menu-home", {
                                                transition: $.mobile.defaultPageTransition,
                                                reverse: false});
                                        }
                                        else{
                                            $.mobile.changePage("#page-login", {
                                                transition: $.mobile.defaultPageTransition,
                                                reverse: false});
                                          
                                      }
                                       
                                  },
                                   function (tx, error) {
                                       // error occured
                                       console.log("error insert ServicesCouvert" + error);
                                   }
                                );
                            
                        }
                        ,this.SyncCreateError,this.SyncCreateSucess2
                        );


                        bResult=true;
                        return true;
                    },
                    error: function (XHR, errStatus, errorThrown) {
                        alert("Ocorreu um erro durante a comunicação com o servidor");
                        $("#erro").html(XHR.responseText);
                        $.mobile.changePage("#page-erro");

                        //alert(XHR.responseText);
                        
                    }
                }
       
               );
    
    }
    
    
    this.SyncCreateError = function (error) {
            alert("Ocorreu um erro durante a geração do DB - Code: " + error.code + " - " + error.message);
            console.log("Ocorreu um erro durante a geração do DB - Code: " + error.code + " - " + error.message);
    }
 

    this.CreateAreaServico = function () {
        //alert("inicio");
        var oArea = new AreaDeServico();
        oArea.AreaDeServicoid="0";
       // alert("inicio1");
        oArea.Categorias = [];// ko.observableArray();
        //alert("inicio2");
            
            app.db.transaction(function (tx) {
                //alert("aqui");
                //var sql = "SELECT * FROM Categories where idareavenda=" + oArea.AreaDeServicoid;
                var sql = "SELECT Services.idareavenda, Services.IdProducaoConta, Services.dsareavenda, Services.fgInformarPessoas, Services.MinNumMesa, Services.MaxNumMesa, Services.TxServico, Services.fgTrabProducao,  ";
                sql = sql + " Categories.idcategoria, Categories.dscategoria, Categories.desc_pocket, Categories.ordenacao";
                sql = sql + " FROM     Categories INNER JOIN Services ON Categories.idareavenda = Services.idareavenda";
                sql = sql + " WHERE  (Services.idareavenda = " + oArea.AreaDeServicoid + ")";
                sql = sql + " ORDER BY Categories.ordenacao                ";
                
                //alert(sql);
                tx.executeSql(sql, [],
                   function (tx, result) {
                       //alert("QTDE " + result.rows.length);
                       if ( result.rows.length>0 ){
                           oArea.dsareavenda=result.rows.item(0)["dsareavenda"];
                           oArea.InformarPessoas=result.rows.item(0)["fgInformarPessoas"];
                           oArea.MinNumMesa=result.rows.item(0)["MinNumMesa"];
                           oArea.MaxNumMesa=result.rows.item(0)["MaxNumMesa"];
                           oArea.TxServico=result.rows.item(0)["TxServico"];
                           oArea.TrabalhaComProducao=result.rows.item(0)["fgTrabProducao"];

                           for (var i = 0 ; i < result.rows.length ; i++) {
                               
                               var item = new Categoria();
                               item.categoryid = result.rows.item(i)["idcategoria"];
                               item.name = "" + result.rows.item(i)["dscategoria"];
                               item.nm_pocket = "" + result.rows.item(i)["desc_pocket"];
                               
                               //alert(item.name);
                              // alert("cat = " + oArea.Categorias.length);
                               
                               oArea.Categorias.push(item);
                               window.localStorage.setItem('cat' + item.categoryid , JSON.stringify(item));
                               // alert("cat = " + oArea.Categorias.length);
                           }
                           window.localStorage.setItem('area_serv' + oArea.AreaDeServicoid , JSON.stringify(oArea));
                           //alert("Gravou");
/*                       for (var i = 1 ; i <= oArea.Categorias.length ; i++) {
                            var c = oArea.Categorias[i];
                            var sql2 = "SELECT *   FROM CategoriesItens WHERE idcategoria=" + c.categoryid + " ORDER BY idcategoria,ordenacao";
                            alert(sql2);
                           tx.executeSql(sql2, [],
                               function (tx, result) {
                                   alert("QTDE ITENS" + result.rows.length);
                                   var cat = oArea.Categorias()[i];
                                   
                                   for (var i = 0 ; i < result.rows.length ; i++) {
                                       
                                       var cat_item = new CategoriaItem();
                                        cat_item.tipoItem = result.rows.item(i)["TipoItem"]; //Produto
                                        cat_item.idTtem = result.rows.item(i)["IdItem"];
                                        cat_item.name = result.rows.item(i)["descricao"];
                                        cat_item.nm_pocket = result.rows.item(i)["desc_pocket"];
                                        cat_item.codebar = ""//;result.rows.item(i)["desc_pocket"];
                                        cat_item.preco = result.rows.item(i)["Preco"];

                                        alert(cat_item.name);
                                        alert("cat_item = " + cat.CategoriaItens.length);
                                        cat.CategoriaItens.push(cat_item);
                                        alert("cat_item = " + cat.CategoriaItens.length);
 
                                       
                                   }
                                   window.localStorage.setItem('cat' + cat.categoryid , JSON.stringify(cat));
                                   alert("Gravou");
                               },
                               function (tx, error) {
                                   // error occured
                                   alert("error");
                               });

                        }
                       alert("Gravou");
                           
*/                 
                       }
                   },
                   function (tx, error) {
                       // error occured
                       alert("error Categories: " + error.message);
                   }

                );
                       
                //sql = "SELECT * FROM CategoriesItens ORDER BY idcategoria,ordenacao";
                sql = "SELECT CategoriesItens.*, Products.IdProducaoFinal AS IdProducaoFinal, Products.QtdeObs";
                sql = sql + " FROM     CategoriesItens LEFT OUTER JOIN Products ON CategoriesItens.IdItem = Products.CodigodoProduto ";
                sql = sql + " ORDER BY CategoriesItens.idcategoria, CategoriesItens.ordenacao";
                //alert(sql);
               tx.executeSql(sql, [],
                   function (tx, result) {
                       //alert("QTDE ITENS" + result.rows.length);
                       var cat = new Categoria();
                       var catid = -1;
                       for (var i = 0 ; i < result.rows.length ; i++) {
                           if (catid !=result.rows.item(i)["idcategoria"])
                           {   
                               if (catid != -1){
                                  window.localStorage.setItem('cat' + cat.categoryid , JSON.stringify(cat));                       
                                  //alert("Gravou " + cat.name);
                               }

                               //alert( result.rows.item(i)["idcategoria"]);
                               cat = $.parseJSON(window.localStorage.getItem('cat' + result.rows.item(i)["idcategoria"]));
                               cat.CategoriaItens=[];
                               //alert("new"+ cat.categoryid);
                               catid = cat.categoryid
                           }
                           
                           var cat_item = new CategoriaItem();
                            cat_item.tipoItem = result.rows.item(i)["TipoItem"]; //Produto
                            cat_item.idTtem = result.rows.item(i)["IdItem"];
                            cat_item.name = result.rows.item(i)["descricao"];
                            cat_item.nm_pocket = result.rows.item(i)["desc_pocket"];
                            cat_item.codebar = ""//;result.rows.item(i)["desc_pocket"];
                            cat_item.preco = result.rows.item(i)["Preco"];
                            cat_item.IdProducao = result.rows.item(i)["IdProducaoFinal"];
                            cat_item.QtdeObs =parseInt(result.rows.item(i)["QtdeObs"]) || 0;
                            
                            //alert(cat_item.name);
                            //alert("cat_item = " + cat.CategoriaItens.length);
                            cat.CategoriaItens.push(cat_item);
                            //alert("cat_item = " + cat.CategoriaItens.length);

                           
                       }
                       window.localStorage.setItem('cat' + cat.categoryid , JSON.stringify(cat));                       
                       //alert("Gravou" + cat.name);
                        //alert("atribuiu");
                         app.pedido.Servico =oArea           ;
                        //alert("sim");
                   },
                   function (tx, error) {
                       // error occured
                       alert("error CategoriesItens: " + error.message);
                   });

           //alert("Gravou");


            });
       
    }

}


