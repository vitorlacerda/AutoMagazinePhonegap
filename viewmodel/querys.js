var SelectedProduct = {};
var SelectedCateory = {};


    //Order Header
    var getConfigStatement = "select * from Settings where id = 0";
    var insertConfigStatement = "INSERT INTO Settings (id , DemoMode  , ServerHost , idareavenda , AutoSyncDB ) VALUES (0, ?, ? ,?, ?)";
    var updateConfigStatement = "UPDATE Settings SET DemoMode = ?, ServerHost = ?, idareavenda = ?, AutoSyncDB = ? WHERE id=0";
    var updateConfigLastSyncDBStatement = "UPDATE Settings SET LastSyncDB = ? WHERE id=0";
 
    var getProductStatement = "select * from Products where CodigodoProduto= ? ";
    //var getProductCPStatement = "select * from Products where CodigodeBarra= ? ";
    var getProductCBStatement = "SELECT Products.* FROM Products INNER JOIN ProductsOtherCode ON Products.CodigodoProduto = ProductsOtherCode.CodigoProduto where ProductsOtherCode.CodigoBarra = ? ";
    
    var getCategoriesStatement="select * from Categories where idareavenda = ? order by ordenacao, dscategoria";

    //var getCategoriesItensStatement="select * from categoriesItens where idcategoria = ? order by ordenacao, descricao";
    var getCategoriesItensStatement="select categoriesItens.*, Products.Preco as PrecoFinal, Products.CodigodeBarra, Products.NomedoProduto, Products.IdProducaoFinal , Products.QtdeObs  ";
    getCategoriesItensStatement = getCategoriesItensStatement + " FROM  categoriesItens LEFT OUTER JOIN Products ON categoriesItens.IdItem = Products.CodigodoProduto where idcategoria = ? order by ordenacao, descricao";
    
    var getCategoriesItensDescriptionStatement = "select * from CategoriesItensDescription where iditem = ? ";
     
    //var getCategoriesItensArticlesStatement = "select * from categoriesItensArticles where idartigo = ? order by IdQuestao,descricao ";

    var getCategoriesItensArticlesStatement = "SELECT CategoriesItensArticles.*, Products.CodigodeBarra, Products.NomedoProduto, Products.IdProducaoFinal ,Products.Preco as PrecoFinal, Products.QtdeObs ";
        getCategoriesItensArticlesStatement =getCategoriesItensArticlesStatement + " FROM     CategoriesItensArticles LEFT OUTER JOIN Products ON CategoriesItensArticles.IdItem = Products.CodigodoProduto where idartigo = ? order by IdQuestao,descricao";


    function onQueryCreateSuccess() // Function for Handling Error...

    {

        console.log('success creating');

    }

    function onQueryInsertSuccess() // Function for Handling Error...

    {

        return true

    }

    function onQueryError(tx, error) // Function for Handeling Error...

    {
        alert(error.message);
    }




// var orderArray = [];
    
    /*
    Thanks to Josh Ross's answer here for how to do SQL transactions that return a deferred object
    http://stackoverflow.com/questions/8058679/wrapping-websql-executesql-calls-in-a-jquery-deferred-promise

    */
    function successWrapper2(d) {
        //console.log(d);
        return (function (tx, data) {
            alert("successWrapper2");
            alert("ROWS " + data.rows.length);
            
            d.resolve(data)
                    
        })
    };

    function successWrapper(d) {
        //console.log(d);
        return (function (tx, data) {
            d.resolve(data)
                    
        })
    };

    function failureWrapper(d) {
        
        //console.log(d);
        return (function (tx, error) {
            //console.log("Sql failed");
            console.log("Sql failed - " + error.message);
            d.reject(error)
        })
    };    


    function getConfigSQL() {
        return $.Deferred(function (d) {
            app.db.transaction(function (tx) {
                            tx.executeSql(getConfigStatement, [], 
                            successWrapper(d), failureWrapper(d));
                        });
            });
    }

    function insertConfigSQL(DemoMode , ServerHost , idareavenda , AutoSyncDB) {
        return $.Deferred(function (d) {
            app.db.transaction(function (tx) {
                            tx.executeSql(insertConfigStatement, [DemoMode , ServerHost , idareavenda , AutoSyncDB], 
                            successWrapper(d), failureWrapper(d));
                        });
            });
    }
    function updateConfigSQL(DemoMode , ServerHost , idareavenda , AutoSyncDB) {
        return $.Deferred(function (d) {
            app.db.transaction(function (tx) {
                            tx.executeSql(updateConfigStatement, [DemoMode , ServerHost , idareavenda , AutoSyncDB], 
                            successWrapper(d), failureWrapper(d));
                        });
            });
    }

    function updateConfigLastSyncDBSQL(LastSyncDB) {
        return $.Deferred(function (d) {
            app.db.transaction(function (tx) {
                            tx.executeSql(updateConfigLastSyncDBStatement, [LastSyncDB], 
                            successWrapper(d), failureWrapper(d));
                        });
            });
    }

    function getProductSQL(codprod) {
        return $.Deferred(function (d) {
            app.db.transaction(function (tx) {
                            tx.executeSql(getProductStatement, [codprod], 
                            successWrapper(d), failureWrapper(d));
                        });
            });
    }

    function getProductCBCPSQL(codbarra,codprod) {
        return $.Deferred(function (d) {
            if (codbarra!=""){
                app.db.transaction(function (tx) {
                                tx.executeSql(getProductCBStatement, [codbarra], 
                                successWrapper(d), failureWrapper(d));
                            });
                
            }
            else{
                        app.db.transaction(function (tx) {
                                tx.executeSql(getProductStatement, [codprod], 
                                successWrapper(d), failureWrapper(d));
                            });
                
                }    
            });
            
    }
    function getProductCBSQL(codbarra) {
        return $.Deferred(function (d) {
            app.db.transaction(function (tx) {
                            tx.executeSql(getProductCBStatement, [codbarra], 
                            successWrapper(d), failureWrapper(d));
                        });
            });
    }

    function getProductSQL2(codprod) {
        return $.Deferred(function (d) {
            app.db.transaction(function (tx) {
                            alert("getProductSQL2 " + codprod)
                            tx.executeSql(getProductStatement, [codprod], 
                            successWrapper2(d), failureWrapper(d));
                        });
            });
    }

    function getCategoriesSQL(idareavenda) {
        return $.Deferred(function (d) {
            app.db.transaction(function (tx) {
                            tx.executeSql(getCategoriesStatement, [idareavenda], 
                            successWrapper(d), failureWrapper(d));
                        });
            });
    }

    function getCategoriesItensSQL(categoryid) {
        return $.Deferred(function (d) {
            app.db.transaction(function (tx) {
                            tx.executeSql(getCategoriesItensStatement, [categoryid], 
                            successWrapper(d), failureWrapper(d));
                        });
            });
    }


    function getCategoriesItensDescriptionSQL(IdItem) {
        return $.Deferred(function (d) {
            app.db.transaction(function (tx) {
                            tx.executeSql(getCategoriesItensDescriptionStatement, [IdItem], 
                            successWrapper(d), failureWrapper(d));
                        });
            });
    }

    function getCategoriesItensArticlesSQL(IdItem) {
        return $.Deferred(function (d) {
            app.db.transaction(function (tx) {
                            tx.executeSql(getCategoriesItensArticlesStatement, [IdItem], 
                            successWrapper(d), failureWrapper(d));
                        });
            });
    }


    function onSelectedProduct2(){
            codprod="GERAL/625";
            getProduct(codprod);
            return;
        
            
            SelectedProduct = {};
            alert("PROD"+ codprod);
            
            $.when.apply(null, getProductSQL2(codprod)); //run all the deferred functions

    /*     
        if (SelectedProduct.hasProduct==false){
                alert("NÃO ACHOU " + codprod);
            }else
                alert("ACHOU " + SelectedProduct.NomeDoProduto);
    */

            alert("FIM");
    }
    function onSelectedProduct(){
            codprod="GERAL/458";
            alert(codprod);
            $.when(getProductSQL(codprod)).pipe(function(dta) {
                //alert("WHEN");
                var deferreds = [];
                //build an array of deferred SQL transactions
                //each deferred transaction should populate an order object, then push it into the final ordersArr array
                SelectedProduct = {};
				SelectedProduct.CodigoDoProduto="";
				SelectedProduct.Edicao="";
				SelectedProduct.CodigoDeBarra="";
				SelectedProduct.NomeDoProduto="";
				SelectedProduct.TituloResumido="";
				SelectedProduct.QuantidadeDeDecimais=0;
				SelectedProduct.IdImposto=0;
				SelectedProduct.IdUnidadeDeMedida=0;
				SelectedProduct.Preco=0;
				SelectedProduct.IdListaDePreco=0;
				SelectedProduct.IdProducao="";
                SelectedProduct.QtdeObs = 0;

                if (dta.rows.length > 0) {
                    //alert("ACHOU");                    
                    for (var i=0; i<dta.rows.length; i++) {
        				SelectedProduct = {};
                        SelectedProduct.CodigoDoProduto = dta.rows.item(i).CodigodoProduto ;
        				SelectedProduct.Edicao = dta.rows.item(i).Edicao;
        				SelectedProduct.CodigoDeBarra = dta.rows.item(i).CodigodeBarra;
        				SelectedProduct.NomeDoProduto = dta.rows.item(i).NomedoProduto;
        				SelectedProduct.TituloResumido = dta.rows.item(i).TituloResumido;
        				SelectedProduct.IdProducao = dta.rows.item(i).IdProducaoFinal;
        				SelectedProduct.QuantidadeDeDecimais = dta.rows.item(i).QuantidadedeDecimais;
        				SelectedProduct.IdImposto = dta.rows.item(i).ID_IMPOSTO;
        				SelectedProduct.IdUnidadeDeMedida = dta.rows.item(i).ID_UNIDADE_DE_MEDIDA;
        				SelectedProduct.Preco = dta.rows.item(i).Preco;
        				SelectedProduct.IdListaDePreco = dta.rows.item(i).ID_LISTA_PRECO;
                        SelectedProduct.QtdeObs = dta.rows.item(i).QtdeObs;
                        alert(SelectedProduct.NomeDoProduto);
                    }
                    //$.when.apply(null, deferreds); //run all the deferred functions

                }else {
                    console.log(dta.rows);    
                    alert("No records found!");
                }
            }).done(function() {
                alert("DONE");                
            }).fail(function(error) {
                alert("Failed!");
                alert("Failed!" + error.message);
                
            });

            
		}

    function onSelectedProduct3(){
            codprod="GERAL/458";
            alert(codprod);
            $.when(getProductSQL(codprod), getCategoriesItensDescriptionSQL(codprod)).pipe(function(dtaProd, dtaDesc) {
                //dta1 is the deferred promise/result from the getHeaderDataSQL function
                //dta2 is the deferred promise/result from the getDetailDataSQL function
                //dta3 is the deferred promise/result from the getNoteDataSQL function                        

                alert("AQUI");

                SelectedProduct = {};
                SelectedProduct.hasProduct=false;
				SelectedProduct.CodigoDoProduto="";
				SelectedProduct.Edicao="";
				SelectedProduct.CodigoDeBarra="";
				SelectedProduct.NomeDoProduto="";
				SelectedProduct.TituloResumido="";
				SelectedProduct.QuantidadeDeDecimais=0;
				SelectedProduct.IdImposto=0;
				SelectedProduct.IdUnidadeDeMedida=0;
				SelectedProduct.Preco=0;
				SelectedProduct.IdListaDePreco=0;
				SelectedProduct.IdProducao="";
                SelectedProduct.QtdeObs = 0;
                SelectedProduct.Descriptions = [];

                if (dtaProd.rows.length > 0) {
                    alert("ACHOU");                    
                    var prodrow = dtaProd.rows.item(0); 

    				SelectedProduct = {};
                    SelectedProduct.hasProduct=true;
                    SelectedProduct.CodigoDoProduto = prodrow.CodigodoProduto ;
    				SelectedProduct.Edicao = prodrow.Edicao;
    				SelectedProduct.CodigoDeBarra = prodrow.CodigodeBarra;
    				SelectedProduct.NomeDoProduto = prodrow.NomedoProduto;
    				SelectedProduct.TituloResumido = prodrow.TituloResumido;
    				SelectedProduct.IdProducao = prodrow.IdProducaoFinal;
    				SelectedProduct.QuantidadeDeDecimais = prodrow.QuantidadedeDecimais;
    				SelectedProduct.IdImposto = prodrow.ID_IMPOSTO;
    				SelectedProduct.IdUnidadeDeMedida = prodrow.ID_UNIDADE_DE_MEDIDA;
    				SelectedProduct.Preco = prodrow.Preco;
    				SelectedProduct.IdListaDePreco = prodrow.ID_LISTA_PRECO;
                    SelectedProduct.QtdeObs = prodrow.QtdeObs;
                    SelectedProduct.Descriptions = [];
                    alert(SelectedProduct.NomeDoProduto);
                    alert("DESC " + dtaDesc.rows.length);
                    for (var k = 0; k < dtaDesc.rows.length; k++) { //loop over line item results
                        console.log(dtaDesc.rows.item(k).dsobservacao);
                        alert(dtaDesc.rows.item(k).dsobservacao);
                        // ObsObrigatoria , ObsQtdeMaxima , idobservacao , dsobservacao , desc_pocket , desc_producao , desc_pdv , idproducao 
                        
                        SelectedProduct.Descriptions.push(dtaDesc.rows.item(k)); //push each line item object into the detail array
                        alert("desc " + k );
                    }            

                    
                }else {
                    console.log(dta.rows);    
                    alert("No records found!");
                }

                alert("OK");

            
            }).done(function() {
                alert("DONE");                
            }).fail(function(error) {
                alert("Failed!");
                alert("Failed!" + error.message);
                
            });

            
		}

    function getProduct(codprod){
        console.log(codprod);
        return $.Deferred(function(d) {
            //codprod="GERAL/456";
           
            //$.when(getHeaderDataSQL(ordernum), getDetailDataSQL(ordernum), getNoteDataSQL(ordernum)).done(
            
            $.when(getProductSQL(codprod), getCategoriesItensDescriptionSQL(codprod)).done(
            function(dtaProd, dtaDesc) {
                //dta1 is the deferred promise/result from the getHeaderDataSQL function
                //dta2 is the deferred promise/result from the getDetailDataSQL function
                //dta3 is the deferred promise/result from the getNoteDataSQL function                        

                alert("AQUI");

                SelectedProduct = {};
                SelectedProduct.hasProduct=false;
				SelectedProduct.CodigoDoProduto="";
				SelectedProduct.Edicao="";
				SelectedProduct.CodigoDeBarra="";
				SelectedProduct.NomeDoProduto="";
				SelectedProduct.TituloResumido="";
				SelectedProduct.QuantidadeDeDecimais=0;
				SelectedProduct.IdImposto=0;
				SelectedProduct.IdUnidadeDeMedida=0;
				SelectedProduct.Preco=0;
				SelectedProduct.IdListaDePreco=0;
				SelectedProduct.IdProducao="";
                SelectedProduct.QtdeObs = 0;
                SelectedProduct.Descriptions = [];

                if (dtaProd.rows.length > 0) {
                    alert("ACHOU");                    
                    var prodrow = dtaProd.rows.item(0); 

    				SelectedProduct = {};
                    SelectedProduct.hasProduct=true;
                    SelectedProduct.CodigoDoProduto = prodrow.CodigodoProduto ;
    				SelectedProduct.Edicao = prodrow.Edicao;
    				SelectedProduct.CodigoDeBarra = prodrow.CodigodeBarra;
    				SelectedProduct.NomeDoProduto = prodrow.NomedoProduto;
    				SelectedProduct.TituloResumido = prodrow.TituloResumido;
    				SelectedProduct.IdProducao = prodrow.IdProducaoFinal;
    				SelectedProduct.QuantidadeDeDecimais = prodrow.QuantidadedeDecimais;
    				SelectedProduct.IdImposto = prodrow.ID_IMPOSTO;
    				SelectedProduct.IdUnidadeDeMedida = prodrow.ID_UNIDADE_DE_MEDIDA;
    				SelectedProduct.Preco = prodrow.Preco;
    				SelectedProduct.IdListaDePreco = prodrow.ID_LISTA_PRECO;
                    SelectedProduct.QtdeObs = prodrow.QtdeObs;
                    SelectedProduct.Descriptions = [];
                    alert(SelectedProduct.NomeDoProduto);
                    alert("DESC " + dtaDesc.rows.length);
                    for (var k = 0; k < dtaDesc.rows.length; k++) { //loop over line item results
                        console.log(dtaDesc.rows.item(k).dsobservacao);
                        alert(dtaDesc.rows.item(k).dsobservacao);
                        // ObsObrigatoria , ObsQtdeMaxima , idobservacao , dsobservacao , desc_pocket , desc_producao , desc_pdv , idproducao 
                        
                        SelectedProduct.Descriptions.push(dtaDesc.rows.item(k)); //push each line item object into the detail array
                        alert("desc " + k );
                    }            

                    
                }else {
                    console.log(dta.rows);    
                    alert("No records found!");
                }

                alert("OK");
                return function(d) {
                    d.resolve();    //return the promise
                }
                
            }).fail(function(etx, err) {
                 d.reject(err, etx) //return the error if any transaction failed
            });

          });
        
		}
    
//    var ordersArr = [];
    
/*    function getOrders() {

        $.when(getMyOrdersSQL()).pipe(function(dta) {
            var deferreds = [];
            //build an array of deferred SQL transactions
            //each deferred transaction should populate an order object, then push it into the final ordersArr array
            if (dta.rows.length > 0) {
                for (var i=0; i<dta.rows.length; i++) {
                    //console.log(dta.rows.item(i).order_num);
                    deferreds.push(getOrdStuff(dta.rows.item(i).order_num)); //push in a function for each order in the getMyOrdersSQL resultset
                }
                $.when.apply(null, deferreds); //run all the deferred functions

            }else {
                console.log(dta.rows);    
                alert("No records found!");
            }
        }).done(function() {
            
        }).fail(function() {
            alert("Failed!");
        });
    }
*/
/*    function getOrdStuff(ordernum) {
        console.log(ordernum);
        return $.Deferred(function(d) {
            var orderObj = new Object(); //object to hold the order info
            //getDriverNoteStatment
            //getOrdeDetSingle
            //getOrdHeaderSingleStatement
            
            $.when(getHeaderDataSQL(ordernum), getDetailDataSQL(ordernum), getNoteDataSQL(ordernum)).done(
            function(dta1, dta2, dta3) {
                //dta1 is the deferred promise/result from the getHeaderDataSQL function
                //dta2 is the deferred promise/result from the getDetailDataSQL function
                //dta3 is the deferred promise/result from the getNoteDataSQL function                        
                var orderHeader = dta1.rows.item(0); 

                var orderNotes = dta3.rows.item(0);

                orderObj.order_num = orderHeader.order_num;
                orderObj.status = orderHeader.status;
                orderObj.shipto_num = orderHeader.shipto_num;
                orderObj.po_num = orderHeader.po_num;
                orderObj.billto_num = orderHeader.billto_num;
                
                
                var onObj = new Object(); //order notes object
                orderObj.notes = orderNotes.notes;
                orderObj.notes_dtstamp = orderNotes.dtstamp;

                var odArr = []; //order detail array to hold order line items objects

                for (var k = 0; k<dta2.rows.length; k++) { //loop over line item results
                    console.log(dta1.rows.item(0).order_num+' has '+dta2.rows.length+' line items');
                    var odObj = new Object();
                    var orderDetails = dta2.rows.item(k);
                    odObj.line_num = orderDetails.line_num;
                    odObj.part_num = orderDetails.part_num;
                    odObj.qty = orderDetails.qty;
                    odObj.part_desc = orderDetails.part_desc;
                    odArr.push(odObj); //push each line item object into the detail array
                    
                }            
                
                orderObj.lineitems = odArr;
                ordersArr.push(orderObj);
                console.log("got stuff");
                console.log(ordersArr);
                var alertStr = "There are ";
                alertStr += ordersArr.length+' orders in the orderArr array.';
                alert(alertStr);
                return function(d) {
                    d.resolve();    //return the promise
                }
                
            }).fail(function(etx, err) {
                 d.reject(err, etx) //return the error if any transaction failed
            });
        
            
        });
        
            
    }
*/

