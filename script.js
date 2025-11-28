function getTransacoes() {
                const transacoesJSON = localStorage.getItem('transacoes');
                return transacoesJSON ? JSON.parse(transacoesJSON) : [];
            }
            function salvarTransacoes(transacoes) {
                localStorage.setItem('transacoes', JSON.stringify(transacoes));
            }


            function salvarReceita() { /* FUNÇÃO PARA SALVAR RECEITA NO LOCAL STORAGE */
                const inputReceita = document.getElementById('receita');
                const valorNumerico = parseFloat(inputReceita.value);
                const valor = receita.value;
                if (isNaN(valorNumerico)) {
                    alert('Por favor, insira um valor numérico válido para a receita.');
                    return;
                }

                localStorage.setItem('valorReceita', valorNumerico.toFixed(2));
                document.getElementById('tableReceita').textContent = 'R$ ' + valorNumerico.toFixed(2).replace('.', ',');
                inputReceita.value = '';
                calcularSaldo();
            };


            function salvarDespesas() { /* FUNÇÃO PARA SALVAR DESPESAS NO LOCAL STORAGE */
                const inputDespesas = document.getElementById('inputFixo');
                const valorNumerico = parseFloat(inputDespesas.value);
                if (isNaN(valorNumerico)) {
                    alert('Por favor, insira um valor numérico válido para a despesas.');
                    return;
                };
                localStorage.setItem('valorDespesas', valorNumerico.toFixed(2));
                document.getElementById('tableFixo').textContent = 'R$ ' + valorNumerico.toFixed(2).replace('.', ',');
                inputDespesas.value = '';
                calcularSaldo();
            };

            function adicionarTransacao(descricao, valor, tipo) {
                const tabelaTransacoes = document.getElementById('tabelaTransacoes');
                const novaLinha = document.createElement('tr');
                if (tipo === 'saida') {
                    novaLinha.classList.add('table-danger');
                }
                else if (tipo === 'entrada') {
                    novaLinha.classList.add('table-success');
                }


                const valorFormatado = 'R$ ' + parseFloat(valor).toFixed(2).replace('.', ',');
                novaLinha.innerHTML = `
                <td>${descricao}</td>
                <td>${valorFormatado}</td>`;


                tabelaTransacoes.appendChild(novaLinha);

            };

            function adicionarEntrada() {
                const inputDesc = document.getElementById('descEntrada');
                const inputValor = document.getElementById('inputEntrada');
                const descricao = inputDesc.value;
                const valorNumerico = parseFloat(inputValor.value);

                if (!descricao || isNaN(valorNumerico) || valorNumerico <= 0) {
                    alert('Por favor, insira uma descrição e um valor numérico válido para a entrada.');
                    return;
                }
                const novaTransacao = { descricao, valor: valorNumerico, tipo: 'entrada' };


                const transacoes = getTransacoes();
                transacoes.push(novaTransacao);
                salvarTransacoes(transacoes);

                adicionarTransacao(descricao, valorNumerico, 'entrada');
                inputDesc.value = '';
                inputValor.value = '';
                calcularSaldo();

            };

            function adicionarSaida() {
                const inputDesc = document.getElementById('descSaida');
                const inputValor = document.getElementById('inputSaida');
                const descricao = inputDesc.value;
                const valorNumerico = parseFloat(inputValor.value);

                if (!descricao || isNaN(valorNumerico) || valorNumerico <= 0) {
                    alert('Por favor, insira uma descrição e um valor numérico válido para a saída.');
                    return;
                }
                const novaTransacao = {
                    descricao: descricao,
                    valor: valorNumerico,
                    tipo: 'saida'
                };

                const transacoes = getTransacoes();
                transacoes.push(novaTransacao);
                salvarTransacoes(transacoes);

                adicionarTransacao(descricao, valorNumerico, 'saida');
                calcularSaldo();
                inputDesc.value = '';
                inputValor.value = '';

            };

            function calcularSaldo() {   /* FUNÇÃO PARA CALCULAR SALDO , PARSE FLOAT SERVE PARA TRANSFORMAR A STRING EM NUMERO */
                const receitaMensal = parseFloat(localStorage.getItem('valorReceita')) || 0;
                const despesasFixas = parseFloat(localStorage.getItem('valorDespesas')) || 0;

                const transacoes = getTransacoes();
                let totalEntradas = 0;
                let totalSaidas = 0;

                transacoes.forEach(t => {
                    if (t.tipo === 'entrada') {
                        totalEntradas += t.valor;
                    } else if (t.tipo === 'saida') {
                        totalSaidas += t.valor;
                    }
                });
                const saldo = receitaMensal + totalEntradas - despesasFixas - totalSaidas;
                document.getElementById('saldoAtual').textContent = 'R$ ' + saldo.toFixed(2).replace('.', ',');
            };

            function carregarTransacoes() {
                const transacoes = getTransacoes();
                transacoes.forEach(t => {
                    adicionarTransacao(t.descricao, t.valor, t.tipo);
                });

                const receita = parseFloat(localStorage.getItem('valorReceita')) || 0;
                document.getElementById('tableReceita').textContent = 'R$ ' + receita.toFixed(2).replace('.', ',');

                const fixo = parseFloat(localStorage.getItem('valorDespesas')) || 0;
                document.getElementById('tableFixo').textContent = 'R$ ' + fixo.toFixed(2).replace('.', ',');
                calcularSaldo()
            }
            carregarTransacoes();


            function saldoGeral() {
                const receita = parseFloat(localStorage.getItem('receita')) || 0;
                const despesasFixas = parseFloat(localStorage.getItem('inputFixo')) || 0;
                const entradas = parseFloat(localStorage.getItem('entradas')) || 0;
                const saidas = parseFloat(localStorage.getItem('saidas')) || 0;

                const saldo = receita + entradas - (despesasFixas + saidas);
                alert('Seu saldo geral é: R$ ' + saldo.toFixed(2).replace('.', ','));

            };

