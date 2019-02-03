import { Component, OnInit } from '@angular/core';

import { CalculadoraService } from '../services';

@Component({
	selector: 'app-calculadora',
	templateUrl: './calculadora.component.html',
	styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {

	private numero1: 		string
	private numero2: 		string
	private resultado: 	number
	private operacao: 	string

	constructor(private calculadoraService: CalculadoraService) { }

	ngOnInit() {
		this.limpar();
	}

	/**
	 * Inicializa todos os operadores para os valores padrão.
	 * 
	 * @returns void
	 */
	limpar():void {
		this.numero1 		= '0'
		this.numero2 		= null
		this.resultado 	= null
		this.operacao 	= null
	}

	/**
	 * Adiciona o número selecionado para o cálculo posteriormente.
	 * 
	 * @param numero string
	 * @returns void
	 */
	adicionarNumero(numero: string): void {
		if (this.operacao === null) {
			this.numero1 = this.concatenarNumero(this.numero1, numero)
		} else {
			this.numero2 = this.concatenarNumero(this.numero2, numero)
		}
	}

	/**
	 * Retorna o valor concatenado. Trata o separador decimal.
	 * 
	 * @param num_atual string
	 * @param num_concat string
	 * @returns string
	 */
	concatenarNumero(num_atual: string, num_concat: string): string {
		// se contenha apenas '0' ou null, reinicia o valor
		if (num_atual === '0' || num_atual === null) {
			num_atual = '';
		}

		// se primeiro dígito é '.', concatena com '0' antes
		if (num_concat === '.' && num_atual === '') {
			return '0.';
		}

		// se '.' digitado e já contenha um '.', apenas retorna
		if (num_concat === '.' && num_atual.indexOf('.') > -1) {
			return num_atual;
		}

		return num_atual + num_concat;
	}

	/**
	 * Executa a lógica quando um operador for selecionado.
	 * Se já possuir uma operação selecionada, executa a
	 * operação anterior, e define a nova operação.
	 * 
	 * @param operacao string
	 * @returns void
	 */
	definirOperacao(operacao: string): void {
		// define a operação se não existir uma
		if (this.operacao === null) {
			this.operacao = operacao
			return
		}

		/* 	se operação definida e número 2 selecionado,
				efetua o cálculo da operação */
		if (this.numero2 !== null) {
			this.resultado = this.calculadoraService.calcular(
				parseFloat(this.numero1),
				parseFloat(this.numero2),
				this.operacao
			)
			this.operacao 	= operacao
			this.numero1 		= this.resultado.toString()
			this.numero2 		= null
			this.resultado 	= null
		}
	}

	/**
	 * Efetua o cálculo da operação.
	 * 
	 * @returns void
	 */
	calcular(): void {
		if (this.numero2 === null) {
			return;
		}

		this.resultado = this.calculadoraService.calcular(
			parseFloat(this.numero1),
			parseFloat(this.numero2),
			this.operacao
		)
	}

	/**
	 * Retorna o valor a ser exibido na tela da calculadora.
	 * 
	 * @return string
	 */
	get display(): string {
		if (this.resultado !== null) {
			return this.resultado.toString()
		}
		if (this.numero2 !== null) {
			return this.numero2
		}
		return this.numero1
	}

}
