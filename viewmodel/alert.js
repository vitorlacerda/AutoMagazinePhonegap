/*globals ko*/

function AlertViewModel() {
    /// <summary>
    /// A view model that represents a single tweet
    /// </summary>

    // --- properties

    this.Msg = ko.observable();
    this.Titulo = ko.observable();

    // --- public functions

    this.init = function (t) {
        this.Msg(t.Msg);
        this.Titulo(t.Titulo);
    };

    this.showMsg = function (titulo,msg) {
        this.Msg(msg);
        this.Titulo(titulo);
        $.mobile.changePage('#alertDialog', { transition: 'pop', role: 'dialog' });
    };

}


