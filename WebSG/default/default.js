function newloadAPI(nomeAPI, param) {
    if (!localStorage.getItem("conexao_geral")) localStorage.setItem('conexao_geral', '192.168.1.6');

    let newobj = {};

    if (param) {
        if (param.length != 0) {
            for (let x = 0; x < param.length; x++) {
                newobj[`p${x + 1}`] = !param[x] ? "NULL" : param[x];
            }
        }
    }

    let resposta;
    $.ajax({
        type: "GET",
        cache: false,
        url: "http://" + localStorage.getItem("conexao_geral") + "/8LIGHT/api_sougerente/index.php/" + nomeAPI + "/",
        contentType: "application/json; charset=utf-8",
        data: newobj,
        dataType: "text",
        async: false,
        error: () => {
            console.log(`erro api: ${nomeAPI}`);
        },
        success: (result) => resposta = JSON.parse(result)
    });
    return resposta;
}

function loadAPI(nomeAPI, matrizAPI, qtdScript) {
    var pars;
    let newobj = {}
    for (let x = 1; x <= qtdScript; x++) {
        newobj[`p${x}`] = matrizAPI[x].toString();
    }

    $.ajax({
        type: "GET",
        cache: false,
        url: "http://" + localStorage.getItem("conexao_geral") + "/8LIGHT/api_sougerente/index.php/" + nomeAPI + "/",
        timeout: 3000,
        contentType: "application/json; charset=utf-8",
        data: newobj,
        dataType: "text",
        async: false,
        error: function (request, error) {
            alert("erro " + nomeAPI);
        },
        success: function (result) {
            pars = JSON.parse(result);
        }
    });
    return pars;
}

function formatarUni(valor) {
    if (valor.length == 10) {
        valor = valor[0] + '.' + valor[1] + valor[2] + valor[3] + "." + valor[4] + valor[5] + valor[6] + "." + valor[7] + valor[8] + valor[9];
    }
    if (valor.length == 9) {
        valor = valor[0] + valor[1] + valor[2] + "." + valor[3] + valor[4] + valor[5] + "." + valor[5] + valor[7] + valor[8];
    }
    if (valor.length == 8) {
        valor = valor[0] + valor[1] + "." + valor[2] + valor[3] + valor[4] + "." + valor[5] + valor[6] + valor[7];
    }
    else if (valor.length == 7) {
        valor = valor[0] + "." + valor[1] + valor[2] + valor[3] + "." + valor[4] + valor[5] + valor[6];
    }
    else if (valor.length == 6) {
        valor = valor[0] + valor[1] + valor[2] + "." + valor[3] + valor[4] + valor[5];
    }
    else if (valor.length == 5) {
        valor = valor[0] + valor[1] + "." + valor[2] + valor[3] + valor[4];
    }
    else if (valor.length == 4) {
        valor = valor[0] + "." + valor[1] + valor[2] + valor[3];
    }

    return valor
}

function formatarValor(valor) {
    if (valor == '0') {
        valor = '0,00';
    }
    else if (valor.indexOf('-') >= 0) {

        if (valor.length == 7) {
            valor = valor[0] + valor[1] + valor[2] + valor[3] + "," + valor[5] + valor[6];
        }
    }
    else {
        if (valor.length == 12) {
            valor = valor[0] + valor[1] + valor[2] + '.' + valor[3] + valor[4] + valor[5] + "." + valor[6] + valor[7] + valor[9] + "," + valor[10] + valor[11];
        }
        if (valor.length == 11) {
            valor = valor[0] + valor[1] + '.' + valor[2] + valor[3] + valor[4] + "." + valor[5] + valor[6] + valor[7] + "," + valor[9] + valor[10];
        }
        else if (valor.length == 10) {
            valor = valor[0] + '.' + valor[1] + valor[2] + valor[3] + "." + valor[4] + valor[5] + valor[6] + "," + valor[8] + valor[9];
        }
        else if (valor.length == 9) {
            valor = valor[0] + valor[1] + valor[2] + "." + valor[3] + valor[4] + valor[5] + "," + valor[7] + valor[8];
        }
        else if (valor.length == 8) {
            valor = valor[0] + valor[1] + "." + valor[2] + valor[3] + valor[4] + "," + valor[6] + valor[7];
        }
        else if (valor.length == 7) {
            valor = valor[0] + "." + valor[1] + valor[2] + valor[3] + "," + valor[5] + valor[6];
        }
        else if (valor.length == 6) {
            valor = valor[0] + valor[1] + valor[2] + "," + valor[4] + valor[5];
        }
        else if (valor.length == 5) {
            valor = valor[0] + valor[1] + "," + valor[3] + valor[4];
        }
        else if (valor.length == 4) {
            valor = valor[0] + "," + valor[2] + valor[3];
        }
    }

    return valor;
}

function formatarPercentual(valor) {
    valor = valor * 100
    valor = valor.toFixed(1);
    valor = valor.replace('.', ',') + '%';

    return valor;
}

function loadStart() {
    if (!localStorage.getItem('idusuario')) {
        window.location.href = '../index.html';
    }

    LinkReferencia();
    loadMenuLateral();
    InformacoesLogin();
}

function loadMenuLateral() {
    $("#grdMenuLateral").empty();
    var item;
    var cont = 1;
    var nivel_anterior;

    item =
        "<div id='grdMenuLateral'>" +
        "  <nav class='mt-2'>" +
        "    <ul class='nav nav-pills nav-sidebar flex-column' data-widget='treeview' role='menu' data-accordion='false'>";

    $.ajax({
        type: "GET",
        cache: false,
        url: "http://" + localStorage.getItem('conexao_geral') + "/8LIGHT/api_sougerente/index.php/menu_permissao_search/",
        timeout: 3000,
        contentType: "application/json; charset=utf-8",
        data: { 'idusuario': localStorage.getItem('idusuario') },
        dataType: "text",
        async: false,
        error: function (request, error) {
            alert("erro menu_permissao_search");
        },
        success: function (result) {
            var menus = JSON.parse(result);
            $.each(menus, function (i, menu) {

                if (menu.nivel == 1) {
                    if (cont != 1) {
                        item +=
                            "</li>" +
                            "<li class='nav-item has-treeview'>" +
                            "   <a href='#' class='nav-link'>" +
                            "     <i class='" + menu.icone + "'></i>" +
                            "     <p>" + menu.descricao +
                            "       <i class='right fas fa-angle-left'></i>" +
                            "     </p>" +
                            "   </a>";
                    }
                    else {
                        item +=
                            "<li class='nav-item has-treeview '>" +
                            "   <a href='#' class='nav-link'>" +
                            "     <i class='" + menu.icone + "'></i>" +
                            "     <p>" + menu.descricao +
                            "       <i class='right fas fa-angle-left'></i>" +
                            "     </p>" +
                            "   </a>";
                    }
                }
                else if (menu.nivel == 2 || menu.nivel == 3) {
                    var space;
                    if (menu.open_menu == 't') {
                        space = '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
                    }
                    else {
                        space = '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
                    }

                    if (menu.nivel == 2) {
                        if (menu.descricao == 'C170 Detalhado') {
                            item +=
                                "<ul class='nav nav-treeview'>" +
                                "  <li class='nav-item'>" +
                                "    <a href='#' class='nav-link'>" +
                                "      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + // + " <i class='nav-icon fas fa-money-bill-wave'></i>" +
                                "      <p>Obrigações Fiscais<i class='right fas fa-angle-down'></i></p>" +
                                "    </a>" +
                                "  </li>" +
                                "</ul>";
                        }
                        else if (menu.descricao == 'Schedule') {
                            item +=
                                "<ul class='nav nav-treeview'>" +
                                "  <li class='nav-item'>" +
                                "    <a href='#' class='nav-link'>" +
                                "      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + // + "<i class='nav-icon fas fa-calendar-check'></i>" +
                                "      <p>ERP<i class='right fas fa-angle-down'></i></p>" +
                                "    </a>" +
                                "  </li>" +
                                "</ul>";
                        }

                        item +=
                            "<ul class='nav nav-treeview'>" +
                            "  <li class='nav-item'>" +
                            "    <a href='" + menu.link + "' class='nav-link'>" +
                            "      " + space + //"<i class='" + menu.icone + "'></i>" +
                            "      <p>" + menu.descricao + "</p>" +
                            "    </a>" +
                            "  </li>" +
                            "</ul>";
                    }
                    else if (menu.nivel == 3) {
                        if (nivel_anterior == 2) {
                            item = item.substring(0, item.length - 24);
                            item = item + "<i class='right fas fa-angle-left'></i></p></a></li></ul>";
                        }

                        item = item.substring(0, item.length - 10);
                        item +=
                            "<ul class='nav nav-treeview'>" +
                            "  <li class='nav-item'>" +
                            "    <a href='" + menu.link + "' class='nav-link'>" +
                            "      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + //+ "<i class='" + menu.icone + "'></i>" +
                            "      <p>" + menu.descricao + "</p>" +
                            "    </a>" +
                            "  </li>" +
                            "</ul>" +
                            "</li>" +
                            "</ul>";
                    }

                    if (cont == menu.qtd) {
                        item = item + "</li>";
                    }
                }
                nivel_anterior = menu.nivel;
                cont++;

            });
        }
    });

    item +=
        "<li class='nav-item has-treeview'>" +
        "   <a href='../index.html' class='nav-link'>" +
        "     <i class='nav-icon fas fa-door-open'></i>" +
        "       <p>" +
        "         Sair" +
        "       </p>" +
        "   </a>" +
        "</li>" +
        /*"<li onclick='modalFeedback();' style='cursor: pointer;' class='nav-item has-treeview'>" +
        "   <a class='nav-link'>" +
        "     <i onclick='modalFeedback();' class='nav-icon fas fa-bug'></i>" +
        "       <p>" +
        "         Bug Report" +
        "       </p>" +
        "   </a>" +
        "</li>" +*/
        "</ul>" +
        "</nav>" +
        "</div>";

    $("#grdMenuLateral").append(item);
}

function LinkReferencia() {
    $("#grdMenuLink").empty();
    var item;
    var ref = localStorage.getItem('menu_ref')

    item =
        "<a href='" + ref + "' class='brand-link'>" +
        "   <img src='../img/icon_goauditt.png' alt='AdminLTE Logo' class='brand-image img-circle elevation-3' style='opacity: .8'>" +
        "   <span class='brand-text font-weight-light'><strong>GoAuditt</strong> WEB</span>" +
        "</a>";

    $("#grdMenuLink").append(item);
}

function InformacoesLogin() {
    var item;
    var varcaminho_foto;

    $("#grdInfLogin").empty();

    if (localStorage.getItem('caminho_foto') == 'null') varcaminho_foto = '../img_users/nouser.png';
    else varcaminho_foto = localStorage.getItem('caminho_foto');

    item =
        "<div id='grdInfLogin' style='margin-top:10px'>" +
        "  <div class='image'>" +
        "    <img src='" + varcaminho_foto + "' class='img-circle elevation-2' alt='User Image' style='margin-bottom:20px'>" +
        "  </div>" +
        "  <div class='info'>" +
        "    <a href='#' class='d-block'>" +
        "      " + localStorage.getItem('nome_completo') + "" +
        "    </a>" +
        "  </div>" +
        "</div>";

    $("#grdInfLogin").append(item);
}

function funcPorcentagem(valor, total) {
    let porcentagem;
    let porcentagem_tmp = parseFloat(valor) * 100;
    porcentagem = parseFloat(porcentagem_tmp) / parseFloat(total);

    var tam;
    tam = porcentagem.toString();
    tam = tam.substring(0, 4);
    porcentagem = tam;

    return porcentagem;
}

function createDataTable() {

}

function controleDatatable(table, param) {
    if (param == 'create') {
        $(table).DataTable({
            "pageLength": 99999999,
            "ordering": true,
            "autoWidth": false,
            dom: 'Bfrtip',
            buttons: {
                buttons: ['excelHtml5'],
                dom: {
                    button: {
                        tag: "button",
                        className: "btn btn-outline-secondary w-24 inline-block mr-1 mb-3 intro-x btnexcel"
                    },
                    buttonLiner: {
                        tag: null
                    }
                }
            }
        });
    }
    else {
        $(table).DataTable().clear();
        $(table).DataTable().destroy();
    }
}

function destroyDataTable(table) {
    $(table).DataTable().clear();
    $(table).DataTable().destroy();
}

function ativarAlerta(campo) {
    $(campo).addClass('alert-red');
    setTimeout(() => {
        $(campo).removeClass('alert-red');
    }, 800);
}

function putTD(i) {
    i = i.toString();
    return !isNaN(i) ? "<td class='valor-right'>" + formatarValor(i) + "</td>" : "<td>" + i + "</td>";
}

function jDisplay(campo, cod) {
    let ds = cod == 1 ? 'inline-block' : 'none';
    $(campo).css('display', ds);
    $(campo).css('opacity', cod.toString());
}

function formatarCNPJ(valor) {
    valor = valor[0] + valor[1] + '.' + valor[2] + valor[3] + valor[4] + '.' + valor[5] + valor[6] + valor[7] + '/' + valor[8] + valor[9] + valor[10] + valor[11] + '-' + valor[12] + valor[13];
    return valor;
}

function formatarData(valor) {
    return valor.slice(-2) + '/' + valor.substring(5, 7) + '/' + valor.substring(0, 4);
}

function ultimoSemetreComp() {
    let resultado = new Array;

    var data = new Date();
    var ano = data.getFullYear();
    var mes = data.getMonth();
    var contMes = parseInt(mes);
    var i = 0;
    while (i <= 5) {
        if (contMes == 0) {
            ano = parseInt(ano) - 1;
            contMes = 12;
        }

        resultado[i] = (contMes < 9 ? '0' + contMes : contMes) + '/' + ano;

        contMes--;
        i++;
    }

    return resultado
}

function ultimaComp(meses) {
    let resultado = new Array;

    var data = new Date();
    var ano = data.getFullYear();
    var mes = data.getMonth();
    var contMes = parseInt(mes);
    var i = 0;
    while (i <= (meses - 1)) {
        if (contMes == 0) {
            ano = parseInt(ano) - 1;
            contMes = 12;
        }

        resultado[i] = (contMes <= 9 ? '0' + contMes : contMes) + '/' + ano;

        contMes--;
        i++;
    }

    return resultado
}

function formatarCFOP(valor) {
    return valor.substring(0, 1) + '.' + valor.slice(-3);
}

function convertBool(valor) {
    return valor == 't';
}

function tooast(tipo, msg) {
    let Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    Toast.fire({
        type: tipo,
        title: `&nbsp &nbsp${msg}`
    })
}

function urlAtual() {
    var url_atual = window.location.href;

    let newurl = url_atual.slice(url_atual.indexOf('pages/') + 6);
    return newurl;
}

function modalFeedback() {
    let matrizBUG = [];
    $('#modal-feedback').modal('show');

    let url = urlAtual();
    matrizBUG[1] = url;
    let url_nova = loadAPI('localizar_page', matrizBUG, 1);

    $.each(url_nova, function (indice, valor) {
        $('#select-page').val(valor.descricao);
    });
}

function enviarBug() {
    let matrizBG = [];
    let urlBanco = $('#select-page').val();
    let textarea = $('#text-feedback').val();

    if (textarea == '') {
        Swal.fire('Erro',
            'Favor preencher todos os campos',
            'warning');

        return;
    };

    matrizBG[1] = cripMensagem('C', textarea);
    matrizBG[2] = urlBanco;
    matrizBG[3] = localStorage.getItem('idusuario');
    loadAPI('inserir_bug', matrizBG, 3);

    Swal.fire('Obrigado!',
        'Seu report foi recebido com sucesso',
        'success');

    $('#text-feedback').val('');
    $('#modal-feedback').modal('hide');
}

function cripMensagem(cod, mensagem) {
    var newmsg = mensagem;
    if (cod == 'C') {
        newmsg = newmsg.replace(/ç/g, 'mincedi');
        newmsg = newmsg.replace(/Ç/g, 'maxcedi');
        newmsg = newmsg.replace(/á/g, 'minac');
        newmsg = newmsg.replace(/Á/g, 'maxac');
        newmsg = newmsg.replace(/é/g, 'minec');
        newmsg = newmsg.replace(/É/g, 'maxec');
        newmsg = newmsg.replace(/ã/g, 'mintio');
        newmsg = newmsg.replace(/Ã/g, 'maxtio');
        newmsg = newmsg.replace(/ê/g, 'minchap');
        newmsg = newmsg.replace(/Ê/g, 'maxchap');
        newmsg = newmsg.replace(/à/g, 'minacinv');
        newmsg = newmsg.replace(/À/g, 'maxacinv');
        newmsg = newmsg.replace(/ó/g, 'minoc');
        newmsg = newmsg.replace(/Ó/g, 'maxoc');
        newmsg = newmsg.replace(/õ/g, 'minto');
        newmsg = newmsg.replace(/Õ/g, 'maxto');
    }
    else if (cod == 'D') {
        newmsg = newmsg.replace(/mincedi/g, 'ç');
        newmsg = newmsg.replace(/maxcedi/g, 'Ç');
        newmsg = newmsg.replace(/minac/g, 'á');
        newmsg = newmsg.replace(/maxac/g, 'Á');
        newmsg = newmsg.replace(/minec/g, 'é');
        newmsg = newmsg.replace(/maxec/g, 'É');
        newmsg = newmsg.replace(/mintio/g, 'ã');
        newmsg = newmsg.replace(/maxtio/g, 'Ã');
        newmsg = newmsg.replace(/minchap/g, 'ê');
        newmsg = newmsg.replace(/maxchap/g, 'Ê');
        newmsg = newmsg.replace(/minacinv/g, 'à');
        newmsg = newmsg.replace(/maxacinv/g, 'À');
        newmsg = newmsg.replace(/minoc/g, 'ó');
        newmsg = newmsg.replace(/maxoc/g, 'Ó');
        newmsg = newmsg.replace(/minto/g, 'õ');
        newmsg = newmsg.replace(/maxto/g, 'Õ');
    }
    return newmsg;

    /*ç = mincedi
    Ç = maxcedi
    á = minac
    Á = maxac
    é = minec
    É = maxec
    ã = mintio
    Ã = maxtio
    ê = minchap
    Ê = maxchap
    à = minacinv
    À = maxacinv*/
}

function modalControl(show, hide) {
    if (hide) $('#' + hide).modal('hide');
    $('#' + show).modal('show');
}

function valueFile(campo) {
    var arquivo = document.getElementById(campo).value;
    arquivo = arquivo.substring(12, arquivo.length);
    return arquivo.replace(/ /g, '_');
}

function acentos(palavra) {
    let newpalavra = '';
    let ComAcento = 'àâêôûãõáéíóúçüÀÂÊÔÛÃÕÁÉÍÓÚÇÜ';
    let SemAcento = 'aaeouaoaeioucuAAEOUAOAEIOUCU';

    for (let x = 0; x < palavra.length; x++) {
        if (ComAcento.indexOf(palavra[x]) > 0) newpalavra += SemAcento[ComAcento.indexOf(palavra[x])];
        else newpalavra += palavra[x];
    }
    return newpalavra;
}

function runSwitch(a) {
    "use strict";
    function l(t, e) {
        this.$element = a(t),
            this.options = a.extend({},
                this.defaults(), e),
            this.render()
    }
    l.VERSION = "3.6.0",
        l.DEFAULTS = {
            on: "On",
            off: "Off",
            onstyle: "primary",
            offstyle: "light",
            size: "normal",
            style: "",
            width: null,
            height: null
        },
        l.prototype.defaults = function () {
            return {
                on: this.$element.attr("data-on") || l.DEFAULTS.on,
                off: this.$element.attr("data-off") || l.DEFAULTS.off,
                onstyle: this.$element.attr("data-onstyle") || l.DEFAULTS.onstyle,
                offstyle: this.$element.attr("data-offstyle") || l.DEFAULTS.offstyle,
                size: this.$element.attr("data-size") || l.DEFAULTS.size,
                style: this.$element.attr("data-style") || l.DEFAULTS.style,
                width: this.$element.attr("data-width") || l.DEFAULTS.width,
                height: this.$element.attr("data-height") || l.DEFAULTS.height
            }
        }, l.prototype.render = function () {
            this._onstyle = "btn-" + this.options.onstyle,
                this._offstyle = "btn-" + this.options.offstyle;
            var t = "large" === this.options.size || "lg" === this.options.size ?
                "btn-lg" : "small" === this.options.size || "sm" === this.options.size ?
                    "btn-sm" : "mini" === this.options.size || "xs" === this.options.size ?
                        "btn-xs" : "", e = a('<label for="' + this.$element.prop("id") +
                            '" class="btn">').html(this.options.on).addClass(this._onstyle + " " + t), s = a('<label for="' +
                                this.$element.prop("id") + '" class="btn">').html(this.options.off).addClass(this._offstyle + " " + t), o = a('<span class="toggle-handle btn btn-light">').addClass(t),
                i = a('<div class="toggle-group">').append(e, s, o),
                l = a('<div class="toggle btn" data-toggle="toggle" role="button">').addClass(this.$element.prop("checked") ?
                    this._onstyle : this._offstyle + " off").addClass(t).addClass(this.options.style);
            this.$element.wrap(l), a.extend(this,
                { $toggle: this.$element.parent(), $toggleOn: e, $toggleOff: s, $toggleGroup: i }),
                this.$toggle.append(i);
            var n = this.options.width || Math.max(e.outerWidth(), s.outerWidth()) + o.outerWidth() / 2, h = this.options.height || Math.max(e.outerHeight(),
                s.outerHeight()); e.addClass("toggle-on"),
                    s.addClass("toggle-off"), this.$toggle.css({ width: n, height: h }),
                    this.options.height && (e.css("line-height", e.height() + "px"),
                        s.css("line-height", s.height() + "px")), this.update(!0), this.trigger(!0)
        }, l.prototype.toggle = function () {
            this.$element.prop("checked") ? this.off() : this.on()
        }, l.prototype.on = function (t) {
            if (this.$element.prop("disabled"))
                return !1; this.$toggle.removeClass(this._offstyle + " off").addClass(this._onstyle),
                    this.$element.prop("checked", !0), t || this.trigger()
        }, l.prototype.off = function (t) {
            if (this.$element.prop("disabled"))
                return !1; this.$toggle.removeClass(this._onstyle).addClass(this._offstyle + " off"),
                    this.$element.prop("checked", !1), t || this.trigger()
        }, l.prototype.enable = function () {
            this.$toggle.removeClass("disabled"),
                this.$toggle.removeAttr("disabled"), this.$element.prop("disabled", !1)
        },
        l.prototype.disable = function () {
            this.$toggle.addClass("disabled"),
                this.$toggle.attr("disabled", "disabled"),
                this.$element.prop("disabled", !0)
        }, l.prototype.update = function (t) {
            this.$element.prop("disabled") ?
                this.disable() : this.enable(),
                this.$element.prop("checked") ? this.on(t) : this.off(t)
        },
        l.prototype.trigger = function (t) {
            this.$element.off("change.bs.toggle"), t || this.$element.change(),
                this.$element.on("change.bs.toggle",
                    a.proxy(function () { this.update() }, this))
        },
        l.prototype.destroy = function () {
            this.$element.off("change.bs.toggle"),
                this.$toggleGroup.remove(),
                this.$element.removeData("bs.toggle"),
                this.$element.unwrap()
        }; var t = a.fn.bootstrapToggle;
    a.fn.bootstrapToggle = function (o) {
        var i = Array.prototype.slice.call(arguments, 1)[0];
        return this.each(function () {
            var t = a(this), e = t.data("bs.toggle"), s = "object" == typeof o && o; e || t.data("bs.toggle", e = new l(this, s)),
                "string" == typeof o && e[o] && "boolean" == typeof i ? e[o](i) : "string" == typeof o && e[o] && e[o]()
        })
    }, a.fn.bootstrapToggle.Constructor = l,
        a.fn.toggle.noConflict = function () {
            return a.fn.bootstrapToggle = t, this
        },
        a(function () {
            a("input[type=checkbox][data-toggle^=toggle]").bootstrapToggle()
        }),
        a(document).on("click.bs.toggle", "div[data-toggle^=toggle]",
            function (t) { a(this).find("input[type=checkbox]").bootstrapToggle("toggle"), t.preventDefault() })
} (jQuery);

function anoMes(input) {
    let dttmp = document.getElementById(input).value;
    let varano = dttmp[3] + dttmp[4] + dttmp[5] + dttmp[6];
    let varmes = dttmp[0] + dttmp[1];
    return {
        mes: varmes,
        ano: varano
    }
}

//FUNCAO RECEBE ID DO PARCEIRO E RETORNA RAZAO_SOCIAL E NOME FANTASIA TRATADO
function nomeParceiro(idparceiro) {
    let resultado;
    $.each(loadAPI('parceiro', ['', idparceiro], 1), (i, dado) => {
        resultado = dado.razao_social;
    });
    return resultado;
}