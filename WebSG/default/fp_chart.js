let tbDep = '';
let donutChartDep = '';
let matrizApi = new Array;
let content = false;
let compUltimoAno = ultimoAno();

let gbParceiro = {
    idparceiro: [],
    descricao: [],
}

const objLink = {
    btncustomes: 'fp_chart_customes.html',
    btninss: 'fp_chart_inss.html',
    btnfgts: 'fp_chart_fgts.html',
    btnliquido: 'fp_chart_liquido.html',
}

function ultimoSemestre() {
    let resultBanco = [];
    let resultCompetencia = [];
    var data = new Date();
    var ano = data.getFullYear();
    var mes = data.getMonth();
    var contMes = data.getDate() < 10 ? parseInt(mes - 1) : parseInt(mes);
    var i = 0;
    while (i <= 6) {
        if (contMes == 0) {
            ano = parseInt(ano) - 1;
            contMes = 12;
        }

        resultBanco[i] = ano + '-' + (contMes < 9 ? '0' + contMes : contMes) + '-01';
        resultCompetencia[i] = (contMes < 9 ? '0' + contMes : contMes) + '/' + ano;
        contMes--;
        i++;
    }

    return [resultBanco, resultCompetencia];
}

function ultimoAno() {
    let resultado = new Array;

    var data = new Date();
    var ano = data.getFullYear();
    var mes = data.getMonth();
    var contMes = data.getDate() < 10 ? parseInt(mes - 1) : parseInt(mes);
    var newdate;
    var i = 5;
    while (i >= 0) {
        if (contMes == 0) {
            ano = parseInt(ano) - 1;
            contMes = 12;
        }

        resultado[i] = ano + '-' + (contMes < 9 ? '0' + contMes : contMes) + '-01';

        contMes--;
        i--;
    }

    return resultado
}

function randomColor(opacidade = 1) {
    let r = parseInt(Math.random() * 255);
    let g = parseInt(Math.random() * 255);
    let b = parseInt(Math.random() * 255);

    return "rgb(" + r + "," + g + "," + b + ")";
}

function coresCRG(pos) {
    let valor;
    valor = pos == 0 ? '#004494' : pos == 1 ? '#F5AB00' : pos == 2 ? '#C3C3C9' : '#008f94';
    return valor;
}

function loadData() {
    let arrSemestre = ultimoSemestre();
    let item = '';
    $('#grdcompetencia').html(item);
    for (let x = 0; x < arrSemestre[0].length; x++) {
        item += `<option value='${arrSemestre[0][x]}'>${arrSemestre[1][x]}</option>`;
    }
    $('#grdcompetencia').html(item);
}

function loadTipoFolha() {
    document.getElementById('grdtipofolha').innerHTML = '';
    let item = '';
    $.each(loadAPI('fp_list_tipo_folha', matrizApi, 0), function (i, dado) {
        item += "<option value='" + dado.idtipo_folha + "'>" + dado.descricao + "</option>";
    });

    document.getElementById('grdtipofolha').innerHTML = item;
}

function loadParceiro() {
    document.getElementById('grdparceiro').innerHTML = '';
    let item = '';
    $.each(loadAPI('fp_list_parceiro_grupo', matrizApi, 0), function (i, dado) {
        item += "<option value='" + dado.idparceiro_grupo + "'>" + dado.grupo_descricao + "</option>";
    });

    document.getElementById('grdparceiro').innerHTML = item;
}

function loadLoja() {
    gbParceiro.idparceiro.splice(0, gbParceiro.idparceiro.length);
    gbParceiro.descricao.splice(0, gbParceiro.descricao.length);

    $("#edtlojamulti").empty();
    let idparceiro = document.getElementById('grdparceiro').value;
    let item = " <option value='0'>Todos</option>";
    matrizApi[1] = idparceiro;
    matrizApi[2] = 'idparceiro_grupo';
    $.each(loadAPI('fp_list_parceiro_bi', matrizApi, 2), function (i, dado) {

        if (dado.quantidade == '0') {
            matrizApi[2] = 'idparceiro_bi';
            $.each(loadAPI('fp_list_parceiro_bi', matrizApi, 2), function (ii, dadoo) {
                gbParceiro.idparceiro.push(dadoo.idparceiro);
                gbParceiro.descricao.push(dadoo.parceiro);
                item += " <option value='" + dadoo.idparceiro + "'>" + dadoo.nome_fantasia + "</option>";
            });
        }
        else {
            gbParceiro.idparceiro.push(dado.idparceiro);
            gbParceiro.descricao.push(dado.parceiro);
            item += "<option value='" + dado.idparceiro + "'>" + dado.nome_fantasia + "</option>";
        }
    });

    document.getElementById('edtlojamulti').innerHTML = item;
    document.getElementById('edtlojamulti').value = '0';

}

function loadAllChart(param, main) {
    let transition = $('.transition-valores');
    if (content) {
        $.each(transition, (i, el) => { el.style.opacity = '0' });
        setTimeout(() => {
            loadAll(param, main);
            $.each(transition, (i, el) => { el.style.opacity = '1' });
        }, 500);

    } else {
        content = true;
        loadAll(param, main);
    }
}

function selectedLoja() {
    gbParceiro.idparceiro.splice(0, gbParceiro.idparceiro.length);
    gbParceiro.descricao.splice(0, gbParceiro.descricao.length);

    let lojas = $('#edtlojamulti').val();
    lojas.forEach(element => {
        matrizApi[1] = element;
        matrizApi[2] = 'idparceiro';
        $.each(loadAPI('fp_list_parceiro_bi', matrizApi, 2), function (i, dado) {
            gbParceiro.idparceiro.push(dado.idparceiro);
            gbParceiro.descricao.push(dado.parceiro);
        });
    });
}

function loadCards() {
    let competencia = document.getElementById('grdcompetencia').value;
    let idtipo_folha = document.getElementById('grdtipofolha').value;

    matrizApi[1] = gbParceiro.idparceiro.join();
    matrizApi[2] = competencia;
    matrizApi[3] = idtipo_folha;
    $.each(loadAPI('fp_card_all', matrizApi, 3), function (i, dado) {
        dado.valor = dado.descricao != 'vlfuncionario' ? 'R$' + formatarValor(dado.valor) : formatarValor(dado.valor);
        document.getElementById(dado.descricao).innerHTML = dado.valor;
    })
}

function eventos() {
    let $btns = document.querySelectorAll('.btnlink');
    $btns.forEach(function (el, i) {
        el.addEventListener('click', (e) => btnInfo(e));
    })
}

function btnInfo(e) {
    e.preventDefault();
    window.location.href = objLink[e.target.id];
}

function clickTableDep(idx, el) {
    let exit;
    if (tbDep) {
        if (tbDep == el.id) {
            $('#' + tbDep).removeClass('trdep-selected');
            tbDep = '';
            exit = true;
        }
        else {
            $('#' + tbDep).removeClass('trdep-selected');
            $('#' + el.id).addClass('trdep-selected');
            tbDep = el.id;
        }
    }
    else {
        $('#' + el.id).addClass('trdep-selected');
        tbDep = el.id;
    }

    if (exit != true) {
        c = donutChartDep;
        var meta = c.getDatasetMeta(0),
            rect = c.canvas.getBoundingClientRect(),
            point = meta.data[idx].getCenterPoint(),
            evt = new MouseEvent('mousemove', {
                clientX: rect.left + point.x,
                clientY: rect.top + point.y
            }),
            node = c.canvas;
        node.dispatchEvent(evt);
    }
}



function loadAll(param, main) {
    if (main) {
        loadCards();
    }
    else if (param == 'start' || param == 'tipofolha') {
        loadCards();
        chartBarDep();
        chartDonutDep();
        lineChartDep();
        chartBarAnual();
    }
    else if (param == 'competencia') {
        loadLoja();
        loadCards();
        chartBarDep();
        chartDonutDep();
    }
    else if (param == 'parceiro') {
        loadLoja();
        loadCards();
        chartBarDep();
        chartDonutDep();
        lineChartDep();
        chartBarAnual();
    }
    else if (param == 'loja') {
        if ($('#edtlojamulti').val() != '') {
            selectedLoja();
            loadCards();
            chartBarDep();
            chartDonutDep();
        }
    }
}

function chartBarDep() {
    $('#barChartDep').remove();
    $('#barChartDepContainer').append('<canvas id="barChartDep" style="min-height: 500px; height: 500px; max-height: 500px; max-width: 100%;"></canvas>');

    let idparceiro = document.getElementById('grdparceiro').value;
    let comp = document.getElementById('grdcompetencia').value;
    let idtipo_folha = document.getElementById('grdtipofolha').value;

    let cont = gbParceiro.idparceiro.length - 1;
    let oldCont = cont;

    let departamento = new Array(cont + 1);
    let custo_mes = new Array(cont + 1);
    while (cont >= 0) {
        let arrayNowDep = new Array;
        let arrayNowCusto = new Array;
        matrizApi[1] = gbParceiro.idparceiro[cont];
        matrizApi[2] = comp;
        matrizApi[3] = idtipo_folha;
        matrizApi[4] = currentParam;
        $.each(loadAPI('fp_barchartdep', matrizApi, 4), function (i, dado) {
            arrayNowDep.push(dado.departamento);
            arrayNowCusto.push(dado.valor);
        });

        departamento[cont] = arrayNowDep;
        custo_mes[cont] = arrayNowCusto;
        cont--;
    }

    let barChartData;
    barChartData = {
        labels: [],
        datasets: []
    }

    barChartData.labels = Object.values(departamento[0]);
    while (oldCont >= 0) {
        barChartData.datasets[oldCont] = {
            label: gbParceiro.descricao[oldCont],
            backgroundColor: coresCRG(oldCont),
            borderColor: coresCRG(oldCont),
            pointRadius: false,
            pointColor: coresCRG(oldCont),
            pointStrokeColor: coresCRG(oldCont),
            pointHighlightFill: coresCRG(oldCont),
            pointHighlightStroke: coresCRG(oldCont),
            data: Object.values(custo_mes[oldCont])
        }

        oldCont--;
    }

    var barChartCanvas = $('#barChartDep').get(0).getContext('2d');
    var barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        datasetFill: false,
        tooltips: {
            enabled: true,
            showAllTooltips: true,
            allTooltipsOnce: true,
        }
    }

    var barChart = new Chart(barChartCanvas, {
        type: 'horizontalBar',
        data: barChartData,
        options: barChartOptions,

    })
}

function chartDonutDep() {
    document.getElementById('donutChartDepContainer').innerHTML = '';
    document.getElementById('donutChartDepContainer').innerHTML =
        "<canvas id='donutChartDep'" +
        "style='min-height: 500px; height: 500px; max-height: 500px; max-width: 100%;'></canvas>";

    let competencia = document.getElementById('grdcompetencia').value;
    let idtipo_folha = document.getElementById('grdtipofolha').value;

    let item;
    $('#tabledonutdep').empty();

    let depart = new Array;
    let custo_mes = new Array;
    let pos = 0;
    matrizApi[1] = gbParceiro.idparceiro.join();
    matrizApi[2] = competencia;
    matrizApi[3] = idtipo_folha;
    matrizApi[4] = currentParam;
    $.each(loadAPI('fp_tabledonutdep', matrizApi, 4), function (i, dado) {
        item =
            "<tr id='trdep-" + pos + "' class='transition' onclick='clickTableDep(" + pos + ",this)'>" +
            "<td>" + dado.departamento + "</td>" +
            "<td>" + formatarValor(dado.valor) + "</td>" +
            "<td>" + formatarPercentual(dado.percentual) + "</td>" +
            "</td>";
        $('#tabledonutdep').append(item);

        pos++;
        depart.push(dado.departamento);
        custo_mes.push(dado.valor);
    });

    var donutChartCanvas = $('#donutChartDep').get(0).getContext('2d')
    var donutData = {
        labels: Object.values(depart),
        datasets: [
            {
                data: Object.values(custo_mes),
                backgroundColor: ['#5bd937', '#8eb998',
                    '#632b4e', '#161072', '#2d1423', '#ae30e7',
                    '#3b7f9d', '#28cfef', '#f30802', '#a6be91',
                    '#726fea', '#fb0d2c', '#6c67f7', '#cd5fda',
                    '#af870a', '#e9cca5', '#c2ad39', '#c9d369',
                    '#81a7ef', '#318f76', '#4553ae', '#7733ef',
                    '#d58f48'],
            }
        ]
    }

    var donutOptions = {
        maintainAspectRatio: false,
        responsive: true,
    }

    donutChartDep = new Chart(donutChartCanvas, {
        type: 'doughnut',
        data: donutData,
        options: donutOptions
    })
}

function lineChartDep() {
    let idparceiro = document.getElementById('grdparceiro').value;
    let idtipo_folha = document.getElementById('grdtipofolha').value;

    let competencia = new Array;
    let competenciaTratada = new Array;
    competencia = ultimoAno();
    $(competencia).each(function (i, element) {
        competenciaTratada.push(element.substring(5, 7) + '/' + element.substring(0, 4));
    })

    let cont = 0;
    let departamentos = new Array;
    matrizApi[1] = gbParceiro.idparceiro.join();
    matrizApi[2] = idtipo_folha;
    matrizApi[3] = "='" + competencia[0] + "'";
    matrizApi[4] = '';
    matrizApi[5] = currentParam;

    $.each(loadAPI('fp_linedep', matrizApi, 5), function (i, dado) {
        departamentos.push(dado.departamento);
        cont++;
    });
    cont--;

    let oldCont = cont;
    let dataValor = new Array(cont + 1);
    let dataDepartamento = new Array();

    while (cont >= 0) {
        let arrayNowValor = new Array;
        let arrayNowDep;
        matrizApi[1] = gbParceiro.idparceiro.join();
        matrizApi[2] = idtipo_folha;
        matrizApi[3] = "BETWEEN '" + competencia[0] + "' AND '" + competencia[competencia.length - 1] + "'";
        matrizApi[4] = departamentos[cont];
        matrizApi[5] = currentParam;

        $.each(loadAPI('fp_linedep', matrizApi, 5), function (i, dado) {
            arrayNowValor.push(dado.valor);
            arrayNowDep = departamentos[cont];
        });

        dataValor[cont] = arrayNowValor;
        dataDepartamento[cont] = arrayNowDep;
        cont--;
    }

    let barChartData;
    barChartData = {
        labels: [],
        datasets: []
    }

    barChartData.labels = Object.values(competenciaTratada);

    while (oldCont >= 0) {
        barChartData.datasets[oldCont] = {
            label: dataDepartamento[oldCont],
            borderColor: randomColor(),
            data: Object.values(dataValor[oldCont])
        }

        barChartData.datasets[oldCont].fill = false;

        oldCont--;
    }

    var barChartCanvas = $('#lineChartDep').get(0).getContext('2d');
    var barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        datasetFill: false
    }

    var barChart = new Chart(barChartCanvas, {
        type: 'line',
        data: barChartData,
        options: barChartOptions
    })
}

function chartBarAnual() {
    $('#barChart').remove();
    $('#barChartContainer').append('<canvas id="barChart" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>');

    let idparceiro = document.getElementById('grdparceiro').value;
    let idtipo_folha = document.getElementById('grdtipofolha').value;

    let cont = gbParceiro.idparceiro.length - 1;
    let oldCont = cont;

    let competencia = ultimoAno();
    for (let t = 0; t < competencia.length; t++) {
        competencia[t] = competencia[t].substring(5, 7) + '/' + competencia[t].substring(0, 4);
    }

    let dataValor = new Array(cont + 1);
    while (cont >= 0) {
        let arrayNow = new Array;
        matrizApi[1] = gbParceiro.idparceiro[cont];
        matrizApi[2] = idtipo_folha;
        matrizApi[3] = "BETWEEN '" + compUltimoAno[0] + "' AND '" + compUltimoAno[compUltimoAno.length - 1] + "'";
        matrizApi[4] = currentParam;
        $.each(loadAPI('fp_baranual', matrizApi, 4), function (i, dado) {
            arrayNow.push(dado.valor);
        });

        dataValor[cont] = arrayNow;
        cont--;
    }

    let barChartData;
    barChartData = {
        labels: [],
        datasets: []
    }

    barChartData.labels = Object.values(competencia);
    while (oldCont >= 0) {
        barChartData.datasets[oldCont] = {
            label: gbParceiro.descricao[oldCont],
            backgroundColor: coresCRG(oldCont),
            borderColor: coresCRG(oldCont),
            pointRadius: false,
            pointColor: coresCRG(oldCont),
            pointStrokeColor: coresCRG(oldCont),
            pointHighlightFill: coresCRG(oldCont),
            pointHighlightStroke: coresCRG(oldCont),
            data: Object.values(dataValor[oldCont])
        }
        //barChartData.datasets[oldCont].fill = false;
        oldCont--;
    }


    var barChartCanvas = $('#barChart').get(0).getContext('2d');
    var barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        datasetFill: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },

    }

    var barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: barChartData,
        options: barChartOptions
    })
}


